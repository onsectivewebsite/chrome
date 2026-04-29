#!/usr/bin/env python3
"""
Generate ~650 realistic Canadian immigration news items modelled on
CIC News, IRCC announcements, provincial PNP draws, and policy reporting.

Output: src/data/news.ts (TypeScript module exporting NEWS array + types).

Deterministic via random.seed so re-runs produce the same data.
"""
import json
import random
import re
from datetime import datetime, timedelta
from pathlib import Path

random.seed(20260429)

OUT = Path(__file__).parent.parent / "src" / "data" / "news.ts"
OUT.parent.mkdir(parents=True, exist_ok=True)

TODAY = datetime(2026, 4, 29)
EARLIEST = datetime(2024, 8, 1)

# === Reference data ===

PROVINCES = [
    ("Ontario", "OINP"),
    ("British Columbia", "BC PNP"),
    ("Alberta", "AAIP"),
    ("Saskatchewan", "SINP"),
    ("Manitoba", "MPNP"),
    ("Nova Scotia", "NSNP"),
    ("New Brunswick", "NBPNP"),
    ("Prince Edward Island", "PEI PNP"),
    ("Newfoundland and Labrador", "NLPNP"),
    ("Yukon", "YNP"),
    ("Northwest Territories", "NTNP"),
]

EE_STREAMS = [
    "Canadian Experience Class",
    "Federal Skilled Worker",
    "Federal Skilled Trades",
    "Provincial Nominee Program",
    "French language proficiency",
    "STEM occupations",
    "Healthcare occupations",
    "Trade occupations",
    "Transport occupations",
    "Agriculture and agri-food occupations",
    "Education occupations",
]

OINP_STREAMS = [
    "Human Capital Priorities",
    "French-Speaking Skilled Worker",
    "Skilled Trades",
    "Employer Job Offer: Foreign Worker",
    "Employer Job Offer: International Student",
    "Masters Graduate",
    "PhD Graduate",
    "Entrepreneur",
]

BC_STREAMS = [
    "Skilled Worker",
    "International Graduate",
    "Entry Level and Semi-Skilled",
    "Healthcare Professional",
    "Tech",
    "Childcare",
    "Veterinary care",
    "Construction",
]

AAIP_STREAMS = [
    "Alberta Express Entry",
    "Alberta Opportunity Stream",
    "Rural Renewal Stream",
    "Tourism and Hospitality Stream",
    "Accelerated Tech Pathway",
    "Foreign Graduate Entrepreneur Stream",
]

SINP_STREAMS = [
    "International Skilled Worker — Express Entry",
    "International Skilled Worker — Occupations In-Demand",
    "Saskatchewan Experience",
    "Tech Talent Pathway",
    "Health Professionals",
]

MPNP_STREAMS = [
    "Skilled Worker Overseas",
    "Skilled Worker In Manitoba",
    "International Education Stream",
    "Business Investor Stream",
]

NSNP_STREAMS = [
    "Labour Market Priorities",
    "Physician Stream",
    "Skilled Worker",
    "Entrepreneur",
    "Atlantic Immigration Program",
]

NOC_2021 = [
    "21231 Software engineers",
    "21232 Software developers",
    "31300 Registered nurses",
    "32101 Licensed practical nurses",
    "21221 Information systems analysts",
    "20012 Computer and information systems managers",
    "31102 General practitioners and family physicians",
    "30010 Managers in health care",
    "33102 Nurse aides and orderlies",
    "72400 Construction millwrights",
    "72106 Welders",
    "73300 Transport truck drivers",
    "63100 Insurance agents and brokers",
    "41220 Secondary school teachers",
    "41221 Elementary school teachers",
    "60010 Restaurant managers",
    "65200 Food and beverage servers",
    "82030 Agricultural service contractors",
    "13110 Administrative assistants",
    "11202 Accounting technicians",
]

CITIES = [
    "Toronto", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Montréal",
    "Winnipeg", "Halifax", "Saskatoon", "Regina", "Charlottetown",
    "St. John's", "Fredericton", "Moncton", "Hamilton", "Kitchener",
    "London", "Mississauga", "Brampton", "Surrey", "Burnaby",
]

POLICY_TOPICS = [
    "international student permit cap",
    "Post-Graduation Work Permit eligibility",
    "spousal open work permit eligibility",
    "Express Entry category-based selection",
    "PGWP DLI list",
    "francophone immigration targets",
    "LMIA refusal rates",
    "asylum claim processing",
    "biometric collection requirements",
    "permanent residence card renewal",
    "citizenship oath ceremonies",
    "Atlantic Immigration Program",
    "Rural Community Immigration Pilot",
    "Francophone Community Immigration Pilot",
    "Home Care Worker Pilot",
    "Caregivers Pilot",
    "Start-up Visa designated organizations",
    "self-employed persons program",
    "investor program review",
    "parents and grandparents lottery",
    "super visa medical insurance",
    "visitor visa processing",
    "eTA system updates",
    "Authorized Paid Representatives",
    "ghost consultant enforcement",
]

EE_DRAW_NUMBERS = list(range(280, 410))  # plausible draw numbers

PNP_NEWS_VERBS = [
    "issues invitations",
    "holds new draw",
    "invites candidates",
    "selects nominees",
    "announces stream changes",
    "tightens eligibility",
    "expands occupation list",
    "raises minimum scores",
    "lowers minimum scores",
    "opens new intake",
    "pauses intake",
    "publishes annual results",
]

CIC_VERBS = [
    "rolls out", "tweaks", "clarifies", "delays", "accelerates",
    "expands", "narrows", "reviews", "publishes guidance on",
    "issues operational bulletin on", "consults stakeholders on",
]

POLICY_VERBS = [
    "tables changes to", "amends regulations for", "tightens",
    "loosens", "publishes targets for", "responds to criticism on",
    "audits", "issues compliance order on",
]

COURT_VERBS = [
    "rules in favour of",
    "rules against",
    "remits decision in",
    "grants judicial review of",
    "upholds IRCC decision on",
    "quashes refusal in",
]

POSITIVE_OUTCOMES = [
    "Federal Court overturns refusal of work permit",
    "IAD allows spousal sponsorship appeal",
    "Federal Court orders reconsideration of study permit refusal",
    "RAD remits refugee claim back to RPD",
    "Federal Court certifies question on procedural fairness",
    "IAD overturns medical inadmissibility refusal",
    "Federal Court restores PR status",
]

INDUSTRY_TOPICS = [
    "What the Express Entry shift means for healthcare workers",
    "How to prepare for an LMIA in 2026",
    "Why category-based draws favour francophone candidates",
    "The hidden cost of a misrepresentation finding",
    "Switching streams: from study permit to PR in three steps",
    "How RCICs differ from immigration lawyers",
    "Reading the latest IRCC quarterly tracking report",
    "Atlantic Canada's labour market pull explained",
    "PGWP changes: what graduating students need to know",
    "Top five red flags in a spousal sponsorship file",
    "How to time your Express Entry profile for the next draw",
    "The case for hiring a regulated consultant",
    "Refugee claim trends: a data-driven look at 2025",
    "Investor immigration is back — what to know",
    "Why your CRS score is not your destiny",
    "How to prepare a procedural fairness response",
]

SETTLEMENT_TOPICS = [
    "newcomer banking primer",
    "best provinces for healthcare professionals to land",
    "how to credential foreign nursing degrees",
    "Toronto vs. Vancouver: cost-of-landing breakdown",
    "school enrolment timelines by province",
    "winter readiness checklist for first-time arrivers",
    "five settlement agencies every newcomer should know",
    "how to get a SIN within 24 hours of landing",
    "navigating the Canadian rental market",
    "credit history tips for new permanent residents",
]

REFUGEE_TOPICS = [
    "asylum claim intake reaches record high",
    "IRB clears backlog ahead of schedule",
    "Safe Third Country Agreement update",
    "private refugee sponsorship cap raised",
    "Resettlement Assistance Program funding boost",
    "Roxham Road closure anniversary report",
    "claimants from Ukraine extension announced",
    "claimants from Sudan emergency stream",
    "designated countries of origin list reviewed",
    "Pre-Removal Risk Assessment processing time published",
]

PROCESSING_AREAS = [
    ("spousal sponsorship", 9, 14),
    ("parent and grandparent sponsorship", 24, 36),
    ("PR card renewal", 6, 11),
    ("citizenship grant", 7, 14),
    ("study permit (SDS)", 4, 9),
    ("study permit (non-SDS)", 8, 16),
    ("work permit (LMIA-based)", 12, 28),
    ("work permit (LMIA-exempt)", 4, 12),
    ("visitor visa (in-Canada)", 10, 26),
    ("visitor visa (overseas)", 16, 60),
    ("super visa", 10, 30),
    ("Express Entry post-ITA", 5, 8),
    ("Provincial Nominee Program (Express Entry)", 6, 11),
    ("Provincial Nominee Program (non-Express Entry)", 14, 22),
    ("Atlantic Immigration Program", 10, 14),
    ("Start-up Visa (PR)", 30, 42),
]

# === Helpers ===

def slugify(s: str) -> str:
    s = s.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")[:90]

def random_date(start: datetime, end: datetime) -> datetime:
    delta = end - start
    return start + timedelta(seconds=random.randint(0, int(delta.total_seconds())))

def fmt_iso(d: datetime) -> str:
    return d.strftime("%Y-%m-%dT%H:%M:%SZ")

def js_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)

def js_array(items, indent: int = 4):
    pad = " " * indent
    inner = ",\n".join(pad + js_str(x) for x in items)
    return "[\n" + inner + "\n" + " " * (indent - 2) + "]"

# === Item builders ===

def make_ee_draw(date):
    stream = random.choice(EE_STREAMS)
    draw_no = random.choice(EE_DRAW_NUMBERS)
    invitations = random.choice([500, 750, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 6500, 7500])
    cutoff = random.randint(420, 565)
    if "French" in stream:
        cutoff = random.randint(380, 478)
    if "STEM" in stream or "Healthcare" in stream:
        cutoff = random.randint(430, 510)
    if "Provincial Nominee" in stream:
        cutoff = random.randint(680, 808)
        invitations = random.choice([400, 600, 800, 1000])
    title = (
        f"IRCC issues {invitations:,} ITAs in Express Entry draw #{draw_no} "
        f"({stream}, CRS {cutoff})"
    )
    summary = (
        f"Immigration, Refugees and Citizenship Canada conducted Express Entry "
        f"draw #{draw_no} on {date.strftime('%B %d, %Y')}, issuing {invitations:,} "
        f"invitations to apply under the {stream} stream with a minimum CRS "
        f"score of {cutoff}."
    )
    body = (
        summary + " "
        f"This draw continues IRCC's category-based selection approach announced under "
        f"the 2024–2026 Immigration Levels Plan. Candidates with a Notification of Interest "
        f"profile in the Express Entry pool who meet the {stream} criteria and scored "
        f"at or above {cutoff} on the Comprehensive Ranking System were issued an ITA. "
        f"The previous draw under the same category had a cut-off of "
        f"{cutoff + random.randint(-12, 18)}, so the trend is "
        f"{'tightening' if random.random() > 0.5 else 'loosening'}. "
        f"Applicants now have 60 days to submit a complete electronic application for "
        f"permanent residence."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Express Entry",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Express Entry", stream, f"CRS {cutoff}", f"Draw {draw_no}"],
    }

def make_pnp_draw(date):
    province, code = random.choice(PROVINCES)
    if province == "Ontario":
        stream = random.choice(OINP_STREAMS)
    elif province == "British Columbia":
        stream = random.choice(BC_STREAMS)
    elif province == "Alberta":
        stream = random.choice(AAIP_STREAMS)
    elif province == "Saskatchewan":
        stream = random.choice(SINP_STREAMS)
    elif province == "Manitoba":
        stream = random.choice(MPNP_STREAMS)
    elif province == "Nova Scotia":
        stream = random.choice(NSNP_STREAMS)
    else:
        stream = "Skilled Worker"
    invitations = random.choice([22, 35, 48, 60, 78, 110, 145, 188, 250, 330, 420, 580, 712, 980])
    cutoff = random.randint(60, 92) if random.random() < 0.3 else random.randint(420, 720)
    title = (
        f"{province} {code} {random.choice(PNP_NEWS_VERBS)} "
        f"to {invitations:,} candidates in {stream} draw"
    )
    summary = (
        f"The {province} Provincial Nominee Program ({code}) held a "
        f"{stream} draw on {date.strftime('%B %d, %Y')}, inviting "
        f"{invitations:,} candidates with a minimum score of {cutoff}."
    )
    body = (
        summary + " "
        f"Candidates were drawn from the {code} Expression of Interest system. "
        f"Successful applicants now have 45 days to submit a full provincial "
        f"nomination application. A nomination from {province} adds 600 CRS "
        f"points to an Express Entry profile, effectively guaranteeing an "
        f"ITA in the next federal draw."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Provincial Nominee",
        "source": random.choice(["CIC News", "Provincial Government", "Canada.ca"]),
        "tags": ["PNP", province, stream, code],
        "province": province,
    }

def make_policy(date):
    topic = random.choice(POLICY_TOPICS)
    verb = random.choice(POLICY_VERBS)
    title = f"IRCC {verb} {topic}"
    summary = (
        f"On {date.strftime('%B %d, %Y')}, Immigration, Refugees and Citizenship "
        f"Canada published an update affecting {topic}. The change takes effect "
        f"in the coming weeks and may affect both pending and future applicants."
    )
    body = (
        summary + " "
        "Stakeholders including registered consultants, immigration lawyers and "
        "settlement agencies have been notified. IRCC says the adjustment is "
        "intended to align with the 2024–2026 Immigration Levels Plan and the "
        "Department's commitment to faster, fairer outcomes. Practitioners are "
        "reviewing the operational bulletin to determine its impact on "
        "in-progress files. Chrome Visa Solution will publish a follow-up brief "
        "for affected clients."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Policy Update",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca", "CIMM"]),
        "tags": ["Policy", "IRCC", topic.split()[0].capitalize()],
    }

def make_study(date):
    sub = random.choice([
        ("Canada caps international student study permits at",
         random.choice(["360,000", "385,000", "437,000", "295,000"]),
         "for the upcoming intake year"),
        ("PGWP eligibility narrows for graduates of",
         random.choice(["public-private partnership colleges",
                        "select non-DLI institutions",
                        "field of study not on the in-demand list"]),
         "starting next academic term"),
        ("New SDS country list adds",
         random.choice(["Colombia", "Peru", "Türkiye", "Egypt"]),
         "to streamlined study permit processing"),
        ("Provincial attestation letters now mandatory in",
         random.choice(["Ontario", "British Columbia", "Quebec", "Alberta"]),
         "for new study permit applications"),
        ("Off-campus work hours for international students set at",
         random.choice(["20", "24", "30"]),
         "per week, IRCC confirms"),
    ])
    title = f"{sub[0]} {sub[1]} {sub[2]}"
    summary = (
        f"IRCC announced on {date.strftime('%B %d, %Y')}: {title.lower()}. "
        "The update is part of broader reforms to the International Student Program."
    )
    body = (
        summary + " Designated learning institutions, provincial regulators, "
        "and prospective applicants should review the operational bulletin in "
        "full. The change applies to applications submitted on or after the "
        "effective date. Existing students are not affected unless renewing."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Study Permit",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Study Permit", "International Students", "PGWP"],
    }

def make_work(date):
    sub = random.choice([
        ("LMIA processing fee rises to", random.choice(["$1,000", "$1,250"]),
         "per worker", "Employment and Social Development Canada"),
        ("Global Talent Stream expands to include", random.choice(["AI infrastructure", "biotech R&D", "advanced manufacturing"]),
         "occupations", "ESDC"),
        ("Open Work Permit Pilot for Hong Kong residents extended to",
         random.choice(["February 2027", "August 2027", "December 2026"]),
         "", "IRCC"),
        ("Spousal Open Work Permit eligibility now limited to spouses of",
         random.choice(["TEER 0/1 occupations", "high-wage workers", "post-graduate work permit holders"]),
         "", "IRCC"),
        ("Atlantic Immigration Program employer designations grow to",
         f"{random.randint(2400, 4800):,}",
         "approved businesses", "IRCC"),
    ])
    title = f"{sub[0]} {sub[1]} {sub[2]}".strip()
    summary = (
        f"On {date.strftime('%B %d, %Y')}, {sub[3]} confirmed: {title.lower()}. "
        "Employers and applicants should plan for the change."
    )
    body = (
        summary + " Existing files in queue may proceed under the previous "
        "rules; new submissions follow the updated framework. Compliance "
        "obligations for employers remain in force throughout the worker's "
        "permit period."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Work Permit",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Work Permit", "LMIA", "Employment"],
    }

def make_lmia(date):
    sector = random.choice(["agriculture", "construction", "hospitality", "trucking", "healthcare", "tech", "manufacturing"])
    title = f"LMIA approval rate in {sector} sector "
    movement = random.choice(["climbs", "drops", "holds steady"])
    pct = random.randint(58, 94)
    title += f"{movement} to {pct}% in latest ESDC quarterly report"
    summary = (
        f"Employment and Social Development Canada published its quarterly "
        f"Labour Market Impact Assessment data on {date.strftime('%B %d, %Y')}. "
        f"The {sector} sector posted a {pct}% positive LMIA rate."
    )
    body = (
        summary + " The data informs employer planning, particularly in "
        "regions with active labour shortages. Employers facing refusals "
        "should review their recruitment efforts and wage offers, both of "
        "which remain the most common refusal grounds."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "LMIA",
        "source": random.choice(["CIC News", "Canada.ca", "Industry"]),
        "tags": ["LMIA", sector.capitalize(), "ESDC"],
    }

def make_family(date):
    sub = random.choice([
        f"IRCC opens new Parents and Grandparents Program intake — {random.randint(15000, 35000):,} interest forms invited",
        f"Spousal sponsorship processing time drops to {random.randint(8, 13)} months for outland applications",
        f"In-Canada spousal sponsorship now eligible for open work permit on submission, IRCC clarifies",
        "Federal Court certifies question on excessive demand exclusion for adopted children",
        "IRCC pilots new evidence framework for genuineness in spousal applications",
        f"Parents and Grandparents lottery returns {random.randint(10000, 25000):,} invitations on first day",
    ])
    title = sub
    summary = (
        f"On {date.strftime('%B %d, %Y')}, IRCC issued an update affecting "
        "family class sponsorship. The change has immediate implications for "
        "in-progress and prospective applicants."
    )
    body = summary + " Sponsors should review their evidence portfolio in "\
        "light of the update. Chrome Visa Solution offers a free 20-minute "\
        "review for affected sponsorship files."
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Family Sponsorship",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Family Sponsorship", "Spousal", "PGP"],
    }

def make_citizenship(date):
    sub = random.choice([
        f"IRCC processes {random.randint(220000, 380000):,} citizenship applications in fiscal year, surpassing target",
        f"Citizenship oath ceremonies move {random.choice(['fully online', 'to a hybrid model', 'back to in-person by default'])}",
        "New citizenship test launching next quarter, IRCC confirms",
        f"Citizenship grant processing time published at {random.randint(7, 14)} months",
        "Federal Court orders new oath ceremony format after procedural challenge",
        "Lost-Canadian Bill C-71 amendments take effect, restoring citizenship to descendants of first-generation Canadians",
    ])
    summary = (
        f"On {date.strftime('%B %d, %Y')}, IRCC published an update affecting "
        "citizenship. Permanent residents nearing eligibility should review "
        "their physical presence records and language evidence."
    )
    body = summary + " Citizenship applications continue to be one of the most "\
        "evidence-sensitive files at IRCC. Practitioners advise applicants to "\
        "build their physical presence calculation with documentary backup."
    return {
        "title": sub,
        "summary": summary,
        "body": body,
        "category": "Citizenship",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Citizenship", "PR"],
    }

def make_processing(date):
    area, lo, hi = random.choice(PROCESSING_AREAS)
    new_time = random.randint(lo, hi)
    movement = random.choice(["improves to", "lengthens to", "now"])
    title = f"Processing time for {area} {movement} {new_time} months"
    summary = (
        f"IRCC's monthly processing time update for {date.strftime('%B %Y')} "
        f"shows {area} applications now sit at {new_time} months end-to-end."
    )
    body = (
        summary + " The figures are based on 80th-percentile completion rates "
        f"and exclude time required for biometrics, medicals, and security "
        f"checks. Files with complex inadmissibility findings can take "
        f"materially longer."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Processing Times",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Processing Times", area.split()[0].capitalize()],
    }

def make_court(date):
    verb = random.choice(COURT_VERBS)
    sub = random.choice([
        f"applicant in study permit refusal case",
        f"appellant in spousal sponsorship appeal",
        f"refugee claimant from {random.choice(['Iran','Nigeria','Colombia','Pakistan','Türkiye','Mexico','Eritrea'])}",
        f"work permit applicant facing misrepresentation finding",
        f"PR cardholder appealing residency obligation breach",
        f"sponsor in parents-and-grandparents appeal",
    ])
    title = f"Federal Court {verb} {sub}"
    if random.random() < 0.25:
        title = random.choice(POSITIVE_OUTCOMES)
    summary = (
        f"In a decision released on {date.strftime('%B %d, %Y')}, the Federal Court "
        f"issued a ruling that practitioners say carries broader implications for "
        "similar files."
    )
    body = (
        summary + " The case turned on procedural fairness and the duty of "
        "officers to provide adequate reasons. Counsel for the applicant "
        "argued that the officer failed to consider material evidence in the "
        "record. The Court agreed in part and remitted the file for "
        "redetermination by a different officer."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Court Decision",
        "source": random.choice(["CIC News", "Industry"]),
        "tags": ["Court", "Federal Court", "Judicial Review"],
    }

def make_industry(date):
    topic = random.choice(INDUSTRY_TOPICS)
    summary = (
        f"Published {date.strftime('%B %d, %Y')} — a Chrome Visa Solution "
        f"analysis. {topic}: a deep dive into the data, the regulatory "
        "context, and what it means for applicants and employers."
    )
    body = (
        summary + " This piece draws on IRCC's quarterly tracking reports, "
        "ESDC LMIA data, provincial PNP draw histories, and on-the-ground "
        "experience from the Chrome Visa Solution case desk. We weigh the "
        "trade-offs candidly so you can plan with eyes open."
    )
    return {
        "title": topic,
        "summary": summary,
        "body": body,
        "category": "Industry Analysis",
        "source": "Industry",
        "tags": ["Analysis", "Strategy", "Long-read"],
    }

def make_settlement(date):
    topic = random.choice(SETTLEMENT_TOPICS)
    title = f"Newcomer brief: {topic}"
    summary = (
        f"A practical guide for newcomers landing in Canada in {date.strftime('%B %Y')}. "
        f"This brief covers {topic} with checklists and links to authoritative sources."
    )
    body = (
        summary + " Settlement is the part of the journey that immigration "
        "consultants and lawyers rarely cover well — but it determines "
        "whether the first six months feel like a fresh start or a slog. "
        "We have curated the steps that matter."
    )
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Settlement",
        "source": "Industry",
        "tags": ["Settlement", "Newcomer", "Guide"],
    }

def make_refugee(date):
    topic = random.choice(REFUGEE_TOPICS)
    title = f"IRB / IRCC: {topic.capitalize()}"
    summary = (
        f"On {date.strftime('%B %d, %Y')}, an update was issued regarding "
        f"{topic}. Refugee claimants, sponsors and counsel should note the "
        "following operational changes."
    )
    body = summary + " Eligibility, processing and appeal rights remain the "\
        "core areas affected. Counsel should confirm the impact on in-progress "\
        "files within 30 days of the announcement."
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Refugee & Asylum",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Refugee", "Asylum", "IRB"],
    }

def make_startup(date):
    sub = random.choice([
        f"IRCC reduces Start-up Visa designated organization quota to {random.randint(8, 25)} commitments per organization annually",
        "New Start-up Visa work permit pathway launches for entrepreneurs awaiting PR",
        f"Start-up Visa processing time published at {random.randint(28, 42)} months",
        "Federal Court overturns Start-up Visa refusal on essentiality finding",
        "ICCRC and CILA publish joint Start-up Visa best-practice guide",
    ])
    summary = (
        f"On {date.strftime('%B %d, %Y')}, an update affected the Start-up Visa "
        "Program. Entrepreneurs and incubators should review the change."
    )
    body = summary + " The Start-up Visa is a pathway to permanent residence "\
        "for entrepreneurs with a designated business support organization. "\
        "Recent reforms aim to address backlog and ensure essentiality "\
        "of each founder to the venture."
    return {
        "title": sub,
        "summary": summary,
        "body": body,
        "category": "Start-up Visa",
        "source": random.choice(["CIC News", "IRCC", "Industry"]),
        "tags": ["Start-up Visa", "Entrepreneurs"],
    }

CATEGORY_BUILDERS = [
    (make_ee_draw,     180),
    (make_pnp_draw,    150),
    (make_policy,       80),
    (make_study,        60),
    (make_work,         50),
    (make_lmia,         30),
    (make_family,       40),
    (make_citizenship,  30),
    (make_processing,   40),
    (make_court,        30),
    (make_industry,     35),
    (make_settlement,   20),
    (make_refugee,      20),
    (make_startup,      15),
]

def main():
    items = []
    used_slugs = set()

    for builder, count in CATEGORY_BUILDERS:
        for _ in range(count):
            date = random_date(EARLIEST, TODAY)
            item = builder(date)
            base_slug = slugify(item["title"])
            slug = base_slug
            n = 2
            while slug in used_slugs:
                slug = f"{base_slug}-{n}"
                n += 1
            used_slugs.add(slug)
            item["slug"] = slug
            item["id"] = f"n{len(items) + 1:04d}"
            item["publishedAt"] = fmt_iso(date)
            items.append(item)

    # Sort newest first
    items.sort(key=lambda x: x["publishedAt"], reverse=True)
    # Mark top 12 as highlight
    for i, it in enumerate(items[:12]):
        it["highlight"] = True

    print(f"Generated {len(items)} items")

    # === Write TS file ===
    lines = []
    lines.append("// AUTO-GENERATED by scripts/generate-news.py — do not edit by hand.")
    lines.append("// Re-run the script to regenerate.")
    lines.append("")
    lines.append("export type NewsCategory =")
    cats = sorted({i["category"] for i in items})
    for i, c in enumerate(cats):
        suffix = ";" if i == len(cats) - 1 else ""
        lines.append(f"  | {js_str(c)}{suffix}")
    lines.append("")
    lines.append("export type NewsSource =")
    srcs = sorted({i["source"] for i in items})
    for i, s in enumerate(srcs):
        suffix = ";" if i == len(srcs) - 1 else ""
        lines.append(f"  | {js_str(s)}{suffix}")
    lines.append("")
    lines.append("export type NewsItem = {")
    lines.append("  id: string;")
    lines.append("  slug: string;")
    lines.append("  title: string;")
    lines.append("  summary: string;")
    lines.append("  body: string;")
    lines.append("  category: NewsCategory;")
    lines.append("  source: NewsSource;")
    lines.append("  province?: string;")
    lines.append("  publishedAt: string;")
    lines.append("  tags: string[];")
    lines.append("  highlight?: boolean;")
    lines.append("};")
    lines.append("")
    lines.append(f"export const NEWS: NewsItem[] = [")
    for it in items:
        lines.append("  {")
        lines.append(f"    id: {js_str(it['id'])},")
        lines.append(f"    slug: {js_str(it['slug'])},")
        lines.append(f"    title: {js_str(it['title'])},")
        lines.append(f"    summary: {js_str(it['summary'])},")
        lines.append(f"    body: {js_str(it['body'])},")
        lines.append(f"    category: {js_str(it['category'])},")
        lines.append(f"    source: {js_str(it['source'])},")
        if it.get("province"):
            lines.append(f"    province: {js_str(it['province'])},")
        lines.append(f"    publishedAt: {js_str(it['publishedAt'])},")
        lines.append(f"    tags: {js_array(it['tags'], 6)},")
        if it.get("highlight"):
            lines.append("    highlight: true,")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    lines.append(f"export const CATEGORIES: NewsCategory[] = {js_array(cats, 4)};")
    lines.append("")
    lines.append("export function getNewsBySlug(slug: string): NewsItem | undefined {")
    lines.append("  return NEWS.find((n) => n.slug === slug);")
    lines.append("}")
    lines.append("")
    lines.append("export function getRelatedNews(item: NewsItem, limit = 4): NewsItem[] {")
    lines.append("  return NEWS.filter((n) => n.slug !== item.slug && n.category === item.category).slice(0, limit);")
    lines.append("}")
    lines.append("")

    OUT.write_text("\n".join(lines), encoding="utf-8")
    size_kb = OUT.stat().st_size / 1024
    print(f"Wrote {OUT} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    main()
