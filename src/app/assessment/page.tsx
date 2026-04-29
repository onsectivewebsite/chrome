import type { Metadata } from "next";
import { AssessmentForm } from "./assessment-form";

export const metadata: Metadata = {
  title: "Free Immigration Assessment — Chrome Visa Solutions",
  description:
    "Complete the Chrome Visa Solutions immigration assessment. A CICC‑licensed RCIC will review your profile and respond within one business day with the programs that apply to your case.",
};

export default function AssessmentPage() {
  return <AssessmentForm />;
}
