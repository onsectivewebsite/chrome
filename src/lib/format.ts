export const TYPE_TINT: Record<string, string> = {
  "News release": "bg-[#67b219]/[0.10] text-[#4f8a13] border-[#67b219]/30",
  Backgrounder: "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
  Statement: "bg-[#84c739]/[0.10] text-[#4f8a13] border-[#84c739]/30",
  "Media advisory": "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30",
  Speech: "bg-[#67b219]/[0.10] text-[#4f8a13] border-[#67b219]/30",
  "Express Entry draw": "bg-[#67b219]/[0.10] text-[#4f8a13] border-[#67b219]/30",
};

export const DEFAULT_TINT = "bg-[#3e94c7]/[0.10] text-[#2a6e95] border-[#3e94c7]/30";

export function formatDate(iso: string): string {
  // Date-only strings (YYYY-MM-DD) are parsed as UTC; pin the zone so the
  // displayed day doesn't shift.
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00Z` : iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Toronto",
  });
}
