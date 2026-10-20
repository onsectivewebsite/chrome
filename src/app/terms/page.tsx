import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use — Chrome Visa Solutions",
  description: "Terms governing the use of the Chrome Visa Solutions website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      updated="October 20, 2026"
      sections={[
        {
          heading: "General information only",
          body: (
            <p>
              Content on this website is general information about Canadian
              immigration and is not legal advice. Immigration rules change
              frequently; always confirm requirements with Immigration,
              Refugees and Citizenship Canada (IRCC) or a licensed
              professional before acting.
            </p>
          ),
        },
        {
          heading: "No representation until retained",
          body: (
            <p>
              Submitting a form or contacting us does not create a
              consultant–client relationship. Representation begins only once
              a written service agreement has been signed by both parties.
            </p>
          ),
        },
        {
          heading: "Third-party data and links",
          body: (
            <p>
              Express Entry figures and news items are sourced from official
              Government of Canada feeds and link to the original publications.
              We are not responsible for the content or availability of
              external websites.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to{" "}
              <a href="mailto:info@chromevisa.ca" className="text-[#2a6e95] underline underline-offset-4">
                info@chromevisa.ca
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
