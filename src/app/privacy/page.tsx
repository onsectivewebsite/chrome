import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Chrome Visa Solutions",
  description: "How Chrome Visa Solutions collects, uses and protects the information you send us.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="October 20, 2026"
      sections={[
        {
          heading: "What we collect",
          body: (
            <p>
              We collect only what you choose to send us through the contact
              and assessment forms on this website, such as your name, email,
              phone number, and the immigration details you enter. We do not
              use advertising trackers on this site.
            </p>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              Your submission is delivered by email to our office and used
              solely to respond to your enquiry and assess your immigration
              options. We do not sell, rent or share your information with
              third parties for marketing.
            </p>
          ),
        },
        {
          heading: "Service providers",
          body: (
            <p>
              Form submissions are transmitted through an email delivery
              provider acting on our behalf. Providers are permitted to
              process your information only to deliver it to us.
            </p>
          ),
        },
        {
          heading: "Retention and your rights",
          body: (
            <p>
              We keep enquiry records only as long as needed to respond and to
              meet our professional record-keeping obligations. Under
              Canada&apos;s Personal Information Protection and Electronic
              Documents Act (PIPEDA), you may request access to, correction
              of, or deletion of your personal information at any time.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Privacy requests can be sent to{" "}
              <a href="mailto:info@chromevisa.ca" className="text-[#2a6e95] underline underline-offset-4">
                info@chromevisa.ca
              </a>{" "}
              or by mail to 8450 Creditview Rd, Brampton, ON L6Y 0G4.
            </p>
          ),
        },
      ]}
    />
  );
}
