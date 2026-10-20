// Firm details shown across the site. Leave RCIC_NUMBER empty until the
// real CICC licence number is confirmed — it is hidden while blank.
export const SITE = {
  name: "Chrome Visa Solutions",
  phone: "+1 (647) 537‑4581",
  phoneHref: "tel:+16475374581",
  email: "info@chromevisa.ca",
  address: "8450 Creditview Rd, Brampton, ON L6Y 0G4",
  hours: "Mon–Fri · 9am–6pm ET",
  rcicNumber: process.env.NEXT_PUBLIC_RCIC_NUMBER ?? "",
};
