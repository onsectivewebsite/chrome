export async function submitForm(form: HTMLFormElement): Promise<string | null> {
  try {
    const res = await fetch("/api/enquiry", { method: "POST", body: new FormData(form) });
    if (res.ok) return null;
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    return data.error ?? "Something went wrong. Please email or call us.";
  } catch {
    return "Network error. Please check your connection, or email or call us.";
  }
}
