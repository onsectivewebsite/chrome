#!/usr/bin/env python3
"""
Generate ~780 substantive Canadian immigration news articles modelled on
CIC News, IRCC announcements, provincial PNP draws, and policy reporting.

Each article: 400–650 words across 5–7 paragraphs. Lead, context,
specifics, eligibility / mechanics, implications, expert commentary, and
what-applicants-should-do.

Output: src/data/news.ts
Deterministic via random.seed.
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
    "Healthcare and social services occupations",
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
    "the international student permit cap",
    "Post-Graduation Work Permit eligibility",
    "spousal open work permit eligibility",
    "Express Entry category-based selection",
    "the PGWP DLI list",
    "francophone immigration targets",
    "LMIA refusal rates",
    "asylum claim processing",
    "biometric collection requirements",
    "permanent residence card renewal",
    "citizenship oath ceremonies",
    "the Atlantic Immigration Program",
    "the Rural Community Immigration Pilot",
    "the Francophone Community Immigration Pilot",
    "the Home Care Worker Pilot",
    "the Caregivers Pilot",
    "Start-up Visa designated organizations",
    "the self-employed persons program",
    "the investor program",
    "the parents and grandparents lottery",
    "super visa medical insurance",
    "visitor visa processing",
    "eTA system updates",
    "Authorized Paid Representatives",
    "ghost consultant enforcement",
]

EE_DRAW_NUMBERS = list(range(280, 410))

EXPERT_QUOTES = [
    'Senior policy analyst Aiden Park said the move "reflects a labour-market-led shift that began with the 2023 category-based draws."',
    'Toronto-based RCIC Meena Ramachandran called it "a long-overdue alignment between IRCC operational practice and the Levels Plan."',
    'Immigration lawyer Catherine Sauvé warned that "candidates outside the favoured category should reconsider their timing — and their backup plan."',
    'CILA spokesperson Daniel Park noted that "the change does not alter eligibility, but it materially changes the strategy for profile creation."',
    '"Anyone with a profile in the pool should refresh their language scores and re-confirm their NOC code immediately," said Halifax-based RCIC Pierre Allard.',
    '"This is the operational follow-through on commitments IRCC made in last year\'s departmental plan," observed analyst Karim Hossain.',
    'Calgary RCIC Rachel Yim said the development is "the clearest signal yet that IRCC is willing to use category-based selection as a sustained tool, not a one-off."',
    '"For applicants from outside Canada, the message is to act now and not wait for an even narrower draw," said Vancouver-based RCIC Kristin Lai.',
    'Settlement-sector analyst Nadia Petrov said the change "shifts pressure onto provinces to expand their PNP capacity, particularly in healthcare-heavy regions."',
    '"The Federal Court has been increasingly receptive to procedural fairness arguments — this is consistent with that trend," noted IRPP fellow Élise Bouchard.',
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

def join_paragraphs(*paragraphs: str) -> str:
    """Join paragraphs with double newlines for the article body."""
    return "\n\n".join(p.strip() for p in paragraphs if p and p.strip())


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
    prev_cutoff = cutoff + random.randint(-12, 18)
    delta = cutoff - prev_cutoff
    direction = "tightening" if delta > 0 else ("loosening" if delta < 0 else "holding steady")

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
    p1 = summary
    p2 = (
        f"This was the {ord_label(random.randint(2, 24))} draw of the year and "
        f"the {ord_label(random.randint(2, 6))} under the {stream} category since "
        f"IRCC formally re-categorised its Express Entry approach. The previous "
        f"draw under the same category had a cut-off of {prev_cutoff}, putting "
        f"this round on a {direction} trajectory of {abs(delta)} CRS points."
    )
    p3 = (
        f"Candidates with a Notification of Interest profile in the Express Entry "
        f"pool who met the {stream} criteria and scored at or above {cutoff} on "
        f"the Comprehensive Ranking System were issued an Invitation to Apply. "
        f"Eligibility for this category is governed by section 10.3 of IRCC's "
        f"category-based selection instructions, which require either an eligible "
        f"NOC 2021 occupation, a French-language CLB 7+ result, or both, "
        f"depending on the category in question."
    )
    p4 = (
        f"Successful candidates now have 60 days to submit a complete electronic "
        f"application for permanent residence (e-APR). Required documentation "
        f"includes police certificates from every country of residence for six "
        f"months or more since age 18, an upfront medical examination from a "
        f"panel physician, proof of settlement funds (where applicable), and "
        f"reference letters that match the lead-statement and main-duties of the "
        f"declared NOC. Applications submitted late or incomplete are rejected "
        f"without refund of the processing fee."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"The next Express Entry draw is expected within seven to fourteen days. "
        f"Chrome Visa Solutions will publish a follow-up brief if the upcoming "
        f"round is targeted at a different category. Candidates currently in the "
        f"pool should re-confirm their NOC code under NOC 2021, refresh language "
        f"scores nearing their two-year expiry, and ensure their proof-of-funds "
        f"figure reflects the latest LICO threshold."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Express Entry",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Express Entry", stream, f"CRS {cutoff}", f"Draw {draw_no}"],
    }


def ord_label(n: int) -> str:
    if 10 <= n % 100 <= 20:
        suf = "th"
    else:
        suf = {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suf}"


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
    if random.random() < 0.3:
        cutoff = random.randint(60, 92)
        score_label = "ranking score"
    else:
        cutoff = random.randint(420, 720)
        score_label = "CRS score"

    title = f"{province} {code} invites {invitations:,} candidates in {stream} draw"
    summary = (
        f"The {province} Provincial Nominee Program ({code}) held a "
        f"{stream} draw on {date.strftime('%B %d, %Y')}, inviting "
        f"{invitations:,} candidates with a minimum {score_label} of {cutoff}."
    )
    p1 = summary
    p2 = (
        f"Candidates were drawn from the {code} Expression of Interest system, "
        f"which ranks profiles using a points matrix that weighs work experience, "
        f"education, language ability, employment in {province}, and family ties "
        f"to the province. Streams aligned with Express Entry, like the "
        f"{stream}, also require an active EE profile to be eligible for "
        f"a provincial nomination."
    )
    p3 = (
        f"Successful applicants now have 45 days to submit a full provincial "
        f"nomination application along with supporting evidence: language test "
        f"results (IELTS, CELPIP, or TEF/TCF), educational credential "
        f"assessments, employment records that map to a TEER 0–5 occupation, "
        f"and proof of settlement funds. The {code} reviews provincial "
        f"applications within {random.randint(60, 120)} days under current "
        f"service standards. Receiving a provincial nomination from {province} "
        f"adds 600 CRS points to a candidate's federal Express Entry profile, "
        f"effectively guaranteeing an Invitation to Apply at the next federal "
        f"draw."
    )
    p4 = (
        f"This draw fits a wider pattern of {province} prioritising occupations "
        f"in {random.choice(['healthcare', 'tech', 'construction', 'agriculture', 'transportation', 'early childhood education', 'manufacturing'])}, "
        f"in line with the province's labour market gap analysis published "
        f"earlier this year. Year-to-date, {code} has issued approximately "
        f"{random.randint(800, 6500):,} invitations across all streams."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Candidates not invited in this round but with active EOI profiles will "
        f"remain in the pool for the next draw, typically held within "
        f"{random.choice(['two', 'three', 'four'])} weeks. Chrome Visa Solutions "
        f"recommends that candidates whose ranking score sits within 30 points "
        f"of the cut-off review their language test schedule and verify whether "
        f"a higher CLB band would lift them into invitation range."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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
    title = f"IRCC publishes operational update on {topic}"
    summary = (
        f"On {date.strftime('%B %d, %Y')}, Immigration, Refugees and Citizenship "
        f"Canada issued a public update affecting {topic}. The change takes "
        f"effect in the coming weeks and is expected to affect both pending and "
        f"future applicants."
    )
    p1 = summary
    p2 = (
        f"The update was published as an operational bulletin to IRCC officers "
        f"and is consistent with commitments tabled in the 2024–2026 Immigration "
        f"Levels Plan. Stakeholders including registered consultants, "
        f"immigration lawyers, settlement agencies, and provincial counterparts "
        f"have been notified through the Department's regular consultation "
        f"channels."
    )
    p3 = (
        f"Practitioners are reviewing the bulletin in detail to assess how it "
        f"will be applied to in-progress files. Early indications suggest that "
        f"applications submitted before the effective date will be processed "
        f"under the rules in force at the time of receipt, with new submissions "
        f"following the updated framework. IRCC has confirmed that no fee "
        f"changes accompany this update, but procedural changes may affect both "
        f"the documentation required and the time-to-decision."
    )
    p4 = (
        f"The change reflects a broader pattern of IRCC modernisation under the "
        f"Department's renewed mandate. Other recent updates have included "
        f"shorter spousal open work permit processing windows, expanded "
        f"category-based Express Entry selection, and the rollout of the "
        f"Authorized Paid Representative reporting framework."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Affected applicants should review their file with a CICC-licensed "
        f"RCIC or Canadian-trained immigration lawyer before the effective date. "
        f"Chrome Visa Solutions will publish a follow-up brief outlining the "
        f"specific scenarios most likely to be impacted, including in-progress "
        f"applications, refusal-recovery cases, and clients still in the "
        f"profile-creation stage."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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
                        "fields of study not on the in-demand list"]),
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
        f"On {date.strftime('%B %d, %Y')}, IRCC published an update to the "
        f"International Student Program: {title.lower()}."
    )
    p1 = summary
    p2 = (
        f"The change is part of a broader package of reforms to the "
        f"International Student Program announced over the past 18 months. "
        f"That package includes a national cap on study permit approvals, "
        f"mandatory provincial attestation letters in most jurisdictions, "
        f"tightened Designated Learning Institution oversight, and a revised "
        f"Post-Graduation Work Permit eligibility framework based on field of "
        f"study and TEER alignment."
    )
    p3 = (
        f"Designated learning institutions, provincial regulators, and "
        f"prospective applicants should review the operational bulletin in "
        f"full. The update applies to applications submitted on or after the "
        f"effective date. Existing students with a valid study permit are not "
        f"directly affected unless they are renewing or transferring "
        f"institutions, in which case the new rules apply."
    )
    p4 = (
        f"For applicants currently preparing a study permit submission, the "
        f"practical implications include: securing the provincial attestation "
        f"letter before lodging the federal application, mapping their intended "
        f"program against the latest PGWP-eligible field-of-study list, and "
        f"ensuring the receiving institution remains on the active DLI list at "
        f"the time of decision. Refusals on these grounds are non-refundable "
        f"and complicate future applications."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Chrome Visa Solutions advises prospective international students to "
        f"book a 30-minute consult before submitting if they intend to use a "
        f"study permit as a route to permanent residence. The PGWP-to-PR "
        f"pipeline is increasingly tied to specific occupational categories, "
        f"and program selection at the study-permit stage now has long-tail "
        f"consequences."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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
        f"Employers and applicants should plan for the change."
    )
    p1 = summary
    p2 = (
        f"The update is the latest in a series of work-permit-stream "
        f"recalibrations driven by labour market data and the federal "
        f"Department's commitment to align temporary foreign worker policy with "
        f"genuine labour shortages. The framework continues to distinguish "
        f"between LMIA-based work permits — which require a positive Labour "
        f"Market Impact Assessment from ESDC — and LMIA-exempt categories such "
        f"as Intra-Company Transfers, post-graduation work permits, and spousal "
        f"open work permits."
    )
    p3 = (
        f"Existing files in queue may continue to be processed under the "
        f"previous rules, depending on the receipt date and the implementation "
        f"plan published by IRCC. New submissions filed on or after the "
        f"effective date will follow the updated framework. Compliance "
        f"obligations for employers — including the requirement to maintain "
        f"records for six years and to permit ESDC inspectors to enter the "
        f"workplace — remain in force throughout the worker's permit period."
    )
    p4 = (
        f"For affected workers, the most common questions concern bridging "
        f"options: whether a current permit can be extended under the old "
        f"rules, whether a new permit application can be lodged from inside "
        f"Canada, and whether a permanent residence pathway remains accessible. "
        f"The answer typically depends on the applicant's NOC code, the "
        f"province in which they currently work, and the time remaining on "
        f"their existing permit."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Employers should review their workforce planning and any pending "
        f"LMIA submissions in light of the change. Chrome Visa Solutions "
        f"offers a complimentary employer consultation to help businesses "
        f"identify which positions remain viable, where switching to a "
        f"PNP-based pathway makes more sense, and how to time their "
        f"submissions to avoid quota exhaustion."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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
    movement = random.choice(["climbs", "drops", "holds steady"])
    pct = random.randint(58, 94)
    title = f"LMIA approval rate in {sector} sector {movement} to {pct}% in latest ESDC quarterly report"
    summary = (
        f"Employment and Social Development Canada published its quarterly "
        f"Labour Market Impact Assessment data on {date.strftime('%B %d, %Y')}. "
        f"The {sector} sector posted a {pct}% positive LMIA rate."
    )
    p1 = summary
    p2 = (
        f"The data covers all LMIA decisions issued in the most recent quarter "
        f"and is broken down by stream — high-wage, low-wage, agricultural, "
        f"in-home caregiver, and Global Talent Stream — as well as by sector, "
        f"province, and employer size. The {sector} sector has historically "
        f"reported approval rates between {max(50, pct-15)}% and "
        f"{min(98, pct+10)}%, with refusals concentrated among employers who "
        f"could not demonstrate genuine recruitment effort or whose wage offer "
        f"fell below the prevailing-wage threshold for the role."
    )
    p3 = (
        f"For applicants and their employers, the data informs realistic "
        f"timelines and expectations. A positive LMIA opens the door to a "
        f"closed work permit and, in many cases, additional CRS points under "
        f"Express Entry (50 points for most NOC codes, 200 points for senior "
        f"managerial NOC 0 occupations). Employers facing refusals are advised "
        f"to revisit their job advertisement strategy, wage offer, and "
        f"transition-to-permanent plan before re-submitting."
    )
    p4 = (
        f"Industry observers note that the ongoing LMIA reforms — including "
        f"stricter refusal-to-process rules in metropolitan areas and an "
        f"updated Trusted Employer pilot — are reshaping how Canadian "
        f"employers approach temporary foreign worker hiring. The result is a "
        f"smaller volume of approvals but a higher rate of compliance and "
        f"longer-term retention."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Employers with active or upcoming LMIA submissions should book a "
        f"compliance review well before filing. Chrome Visa Solutions works "
        f"with ESDC inspectors and panel auditors regularly and can identify "
        f"the highest-risk areas in a draft application before it leaves the "
        f"office."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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
        f"family class sponsorship. The change has immediate implications for "
        f"in-progress and prospective applicants."
    )
    p1 = summary
    p2 = (
        f"Family class sponsorship is the second-largest pathway to permanent "
        f"residence in Canada after the economic class. Eligible sponsors "
        f"include Canadian citizens and permanent residents over 18 who "
        f"undertake a binding 3- to 20-year financial commitment to support "
        f"the sponsored relative, depending on the relationship class. The "
        f"sponsored relative must pass admissibility on medical, security, "
        f"and criminality grounds."
    )
    p3 = (
        f"Sponsors should review their evidence portfolio in light of the "
        f"update. The bar for proving a genuine and continuing relationship "
        f"in spousal applications has risen materially in recent years, with "
        f"officers now expecting joint financial accounts, shared utility "
        f"bills, joint travel records, photographic evidence with timestamps, "
        f"and corroborating affidavits from third parties. Lower-evidence "
        f"files are increasingly referred to interview or refused outright."
    )
    p4 = (
        f"Applications under the parents-and-grandparents stream remain "
        f"capacity-constrained: IRCC accepts a fixed number of complete "
        f"applications each year, drawn from a pool of sponsors who submitted "
        f"an interest-to-sponsor form during the open window. The 2026 "
        f"intake is expected to follow the lottery model with a published "
        f"acceptance ceiling. The Super Visa remains an alternative for "
        f"sponsors who cannot secure a PGP intake spot."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Chrome Visa Solutions offers a free 20-minute review for affected "
        f"sponsorship files, including a checklist of the evidence that most "
        f"often makes or breaks an application at first review. We will "
        f"publish a follow-up brief with category-specific guidance within "
        f"the next two weeks."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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
    title = sub
    summary = (
        f"On {date.strftime('%B %d, %Y')}, IRCC published a citizenship update. "
        f"Permanent residents nearing eligibility should review their physical "
        f"presence records and language evidence."
    )
    p1 = summary
    p2 = (
        f"To qualify for Canadian citizenship under the Citizenship Act, a "
        f"permanent resident must have been physically present in Canada for "
        f"at least 1,095 days during the five-year period immediately before "
        f"the application date. Days spent in Canada as a temporary resident "
        f"count for half a day, up to a maximum of 365 days. Applicants "
        f"between 18 and 54 must also demonstrate language proficiency at "
        f"CLB 4 or higher in English or French and pass the citizenship "
        f"knowledge test."
    )
    p3 = (
        f"Citizenship applications are among the most evidence-sensitive "
        f"files at IRCC. Practitioners advise applicants to build their "
        f"physical presence calculation with documentary backup — passport "
        f"stamps, CBSA travel history, employment records, school enrolment "
        f"records, lease agreements, and tax filings. Discrepancies between "
        f"declared days and travel-history records are the most common "
        f"trigger for a request for additional information."
    )
    p4 = (
        f"For applicants whose physical presence is borderline, IRCC may "
        f"refer the file to a citizenship judge for a hearing, particularly "
        f"where there are gaps in evidence or where the applicant has spent "
        f"extended periods abroad. Recent Federal Court decisions have "
        f"emphasised the duty of officers to grapple with the evidence on "
        f"the record before refusing on residency grounds."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Chrome Visa Solutions reviews citizenship eligibility on a free "
        f"15-minute call. We can help applicants determine their exact "
        f"qualifying day, identify gaps that warrant supporting affidavits, "
        f"and prepare a clean physical-presence calculation that withstands "
        f"officer review."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
    return {
        "title": title,
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
        f"IRCC's monthly processing-time update for {date.strftime('%B %Y')} "
        f"shows {area} applications now sit at {new_time} months end-to-end."
    )
    p1 = summary
    p2 = (
        f"The published figures are based on 80th-percentile completion rates "
        f"and exclude time required for biometrics, medicals, and security "
        f"checks. They reflect the average time from receipt of a complete "
        f"application to final decision under standard processing. Files with "
        f"complex inadmissibility findings, security flags, or sponsorship "
        f"interview requirements can take materially longer."
    )
    p3 = (
        f"For applicants currently in queue, this benchmark is best used as a "
        f"planning tool rather than a guarantee. IRCC's online status tools "
        f"provide individual file updates, but real-time movement is uneven: "
        f"some files receive medicals, biometrics, and approval within weeks "
        f"of submission, while others sit in queue for months before assignment "
        f"to an officer. The best predictor of file movement remains the "
        f"completeness and clarity of the original submission."
    )
    p4 = (
        f"For applicants planning to submit, the published time also informs "
        f"strategy decisions: whether to apply outland or in-Canada, whether "
        f"to pursue a parallel temporary residence option to bridge the wait, "
        f"and whether to request priority processing for humanitarian or "
        f"compassionate reasons where applicable."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Chrome Visa Solutions tracks IRCC processing times monthly and "
        f"publishes alerts when material movements occur. Clients can request "
        f"a free file-readiness check to identify documents most likely to "
        f"trigger a request for further information once the file is opened."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Processing Times",
        "source": random.choice(["CIC News", "IRCC", "Canada.ca"]),
        "tags": ["Processing Times", area.split()[0].capitalize()],
    }


def make_court(date):
    sub = random.choice([
        f"applicant in study permit refusal case",
        f"appellant in spousal sponsorship appeal",
        f"refugee claimant from {random.choice(['Iran','Nigeria','Colombia','Pakistan','Türkiye','Mexico','Eritrea'])}",
        f"work permit applicant facing misrepresentation finding",
        f"PR cardholder appealing residency obligation breach",
        f"sponsor in parents-and-grandparents appeal",
    ])
    if random.random() < 0.25:
        title = random.choice(POSITIVE_OUTCOMES)
    else:
        verb = random.choice(["rules in favour of", "rules against", "remits decision in", "grants judicial review of"])
        title = f"Federal Court {verb} {sub}"
    summary = (
        f"In a decision released on {date.strftime('%B %d, %Y')}, the Federal "
        f"Court issued a ruling that practitioners say carries broader "
        f"implications for similar files."
    )
    p1 = summary
    p2 = (
        f"The case turned on procedural fairness and the duty of officers to "
        f"provide adequate reasons. Counsel for the applicant argued that the "
        f"officer failed to consider material evidence in the record and "
        f"relied on extrinsic information without giving the applicant an "
        f"opportunity to respond. The Court agreed in part and remitted the "
        f"file for redetermination by a different officer."
    )
    p3 = (
        f"The standard of review applied was reasonableness, consistent with "
        f"the Supreme Court of Canada's framework in Vavilov. The Court found "
        f"that the officer's reasons did not engage meaningfully with the "
        f"evidence on the record and that the conclusions reached were not "
        f"transparent, intelligible, and justified within the meaning of "
        f"Vavilov. The remedy was a fresh decision on the existing record by "
        f"a new decision-maker."
    )
    p4 = (
        f"For practitioners and applicants, the decision reinforces three "
        f"practical points: file every relevant piece of evidence on the "
        f"record at first instance, anticipate procedural fairness gaps "
        f"before they materialise into refusals, and preserve the file with "
        f"clear, timestamped submissions so that the record will support a "
        f"future judicial review if needed."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Chrome Visa Solutions handles refusal-recovery and procedural "
        f"fairness response files in collaboration with senior immigration "
        f"counsel. Clients facing a refusal should obtain GCMS notes within "
        f"30 days of the decision to preserve their right to seek leave "
        f"and judicial review."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Court Decision",
        "source": random.choice(["CIC News", "Industry"]),
        "tags": ["Court", "Federal Court", "Judicial Review"],
    }


def make_industry(date):
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
    topic = random.choice(INDUSTRY_TOPICS)
    summary = (
        f"Published {date.strftime('%B %d, %Y')} — a Chrome Visa Solutions "
        f"analysis. {topic}: a deep dive into the data, the regulatory context, "
        f"and what it means for applicants and employers."
    )
    p1 = summary
    p2 = (
        f"This analysis draws on IRCC's quarterly tracking reports, ESDC "
        f"Labour Market Impact Assessment data, provincial PNP draw histories, "
        f"and on-the-ground experience from the Chrome Visa Solutions case "
        f"desk. We cite primary sources where available and note limitations "
        f"in the data where they exist."
    )
    p3 = (
        f"The Canadian immigration landscape changes quickly. What worked for "
        f"applicants in 2022 — high CRS scores carrying any candidate over "
        f"the cut-off, generous PGWP eligibility, lenient interpretation of "
        f"genuineness in spousal files — is no longer reliable. The current "
        f"environment rewards strategic profile design, evidence-rich "
        f"submissions, and a willingness to pursue parallel pathways rather "
        f"than betting on a single stream."
    )
    p4 = (
        f"For most applicants, the practical takeaways are: build redundancy "
        f"into your strategy by qualifying under more than one program where "
        f"possible, refresh language scores aggressively to maximise both "
        f"CRS points and PNP eligibility, document everything contemporaneously, "
        f"and engage a CICC-licensed RCIC or Canadian-trained immigration "
        f"lawyer before submitting if your file has any non-trivial complexity."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Chrome Visa Solutions publishes long-form analyses on a rolling "
        f"basis. Subscribe to our newsletter for new pieces, upcoming program "
        f"deadlines, and case studies of successful files (with client "
        f"consent and identifying details removed)."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
    return {
        "title": topic,
        "summary": summary,
        "body": body,
        "category": "Industry Analysis",
        "source": "Industry",
        "tags": ["Analysis", "Strategy", "Long-read"],
    }


def make_settlement(date):
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
    topic = random.choice(SETTLEMENT_TOPICS)
    title = f"Newcomer brief: {topic}"
    summary = (
        f"A practical guide for newcomers landing in Canada in "
        f"{date.strftime('%B %Y')}. This brief covers {topic} with checklists "
        f"and links to authoritative sources."
    )
    p1 = summary
    p2 = (
        f"Settlement is the part of the immigration journey that consultants "
        f"and lawyers rarely cover well — but it determines whether the first "
        f"six months feel like a fresh start or a slog. New permanent "
        f"residents and approved temporary residents should plan their "
        f"arrival with the same rigour they applied to the application "
        f"itself."
    )
    p3 = (
        f"On the day of landing, the priority list is short: confirm landing "
        f"with the Canada Border Services Agency officer, register for a "
        f"Social Insurance Number (SIN) at a Service Canada office, open a "
        f"Canadian bank account, and apply for the provincial health card. "
        f"Some provinces impose a three-month waiting period for health "
        f"coverage; private interim insurance is essential during that window."
    )
    p4 = (
        f"In the first month, focus on credential recognition (if applicable "
        f"to your profession), enrolment in language and bridging programs, "
        f"and connection with a federally funded settlement agency. Settlement "
        f"services are free for permanent residents and protected persons, "
        f"and they often unlock faster access to provincial labour market "
        f"resources, employer connections, and credentialling advice."
    )
    p5 = (
        f"Housing is typically the highest-friction item. Newcomer-friendly "
        f"landlords are concentrated in dedicated buildings and through "
        f"settlement-agency partnerships; building a credit history takes "
        f"three to six months of regular payments on a secured credit card."
    )
    p6 = (
        f"Chrome Visa Solutions's post-landing service includes an arrival "
        f"checklist, settlement-agency introductions in your destination "
        f"city, and credentialling guidance for regulated occupations. We "
        f"stay with our clients through the first 90 days at no additional "
        f"cost."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
    return {
        "title": title,
        "summary": summary,
        "body": body,
        "category": "Settlement",
        "source": "Industry",
        "tags": ["Settlement", "Newcomer", "Guide"],
    }


def make_refugee(date):
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
    topic = random.choice(REFUGEE_TOPICS)
    title = f"IRB / IRCC: {topic.capitalize()}"
    summary = (
        f"On {date.strftime('%B %d, %Y')}, an update was issued regarding "
        f"{topic}. Refugee claimants, sponsors, and counsel should note the "
        f"following operational changes."
    )
    p1 = summary
    p2 = (
        f"Eligibility, processing, and appeal rights are the core areas "
        f"affected by this update. Counsel should confirm the impact on "
        f"in-progress files within 30 days of the announcement. Both inland "
        f"claimants and resettled refugees fall within scope, although the "
        f"specific operational changes may affect the two streams differently."
    )
    p3 = (
        f"The Refugee Protection Division (RPD) of the Immigration and "
        f"Refugee Board hears in-Canada claims, while the Refugee Appeal "
        f"Division (RAD) reviews most negative RPD decisions on legal and "
        f"factual grounds. Pre-Removal Risk Assessments fall under IRCC "
        f"jurisdiction and apply to claimants whose RPD claims were rejected "
        f"and who are subject to removal. The interaction between these "
        f"streams is highly procedural and often misunderstood."
    )
    p4 = (
        f"Private sponsorship — through Sponsorship Agreement Holders or "
        f"Groups of Five — remains a critical resettlement pathway, "
        f"particularly for refugees whose UNHCR resettlement priority does "
        f"not match the timing of their need. The Resettlement Assistance "
        f"Program funds initial settlement supports for government-assisted "
        f"refugees, while private sponsors take on the financial commitment "
        f"for sponsored refugees during the first year in Canada."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Refugee claimants and sponsors should consult with experienced "
        f"counsel before submitting. The evidentiary and credibility "
        f"thresholds at the RPD are demanding and inconsistent country-by-"
        f"country. Chrome Visa Solutions partners with senior immigration "
        f"counsel for refugee files and offers initial consultations in "
        f"both English and French."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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
    title = sub
    summary = (
        f"On {date.strftime('%B %d, %Y')}, an update affected the Start-up "
        f"Visa Program. Entrepreneurs and incubators should review the change."
    )
    p1 = summary
    p2 = (
        f"The Start-up Visa is a pathway to permanent residence for "
        f"entrepreneurs whose innovative business idea has been backed by a "
        f"designated business support organization — a venture capital fund, "
        f"angel investor group, or business incubator approved by IRCC. The "
        f"program admits up to five co-founders per venture, each of whom "
        f"applies independently for permanent residence."
    )
    p3 = (
        f"Recent reforms aim to address two concerns: program backlog, which "
        f"has stretched processing times beyond the original two-year target, "
        f"and essentiality, which IRCC officers assess to ensure that each "
        f"co-founder named in the commitment letter is actually material to "
        f"the business. Co-founders judged non-essential have seen refusals "
        f"upheld at the Federal Court level in recent years."
    )
    p4 = (
        f"For entrepreneurs considering the Start-up Visa, the practical "
        f"steps are: identify a venture concept that meaningfully addresses "
        f"a Canadian or global market gap, secure a designated organization "
        f"willing to issue a commitment letter (the bar for which has risen), "
        f"prepare a business plan that withstands IRCC officer scrutiny, and "
        f"build the documentary record demonstrating each co-founder's "
        f"essentiality before filing."
    )
    p5 = random.choice(EXPERT_QUOTES)
    p6 = (
        f"Chrome Visa Solutions provides Start-up Visa consultation in "
        f"partnership with designated venture capital and incubator partners. "
        f"We assess concept-fit, prepare commitment-letter applications, and "
        f"build the essentiality file. Initial consultations are 60 minutes "
        f"and free for venture teams of three or more."
    )
    body = join_paragraphs(p1, p2, p3, p4, p5, p6)
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

    items.sort(key=lambda x: x["publishedAt"], reverse=True)
    for it in items[:12]:
        it["highlight"] = True

    word_counts = [len(it["body"].split()) for it in items]
    print(f"Generated {len(items)} items")
    print(f"Avg words per article: {sum(word_counts) // len(word_counts)}")
    print(f"Min words: {min(word_counts)} · Max words: {max(word_counts)}")

    # Write TS file
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
    lines.append("export const NEWS: NewsItem[] = [")
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
