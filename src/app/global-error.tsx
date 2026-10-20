"use client";

import "./globals.css";

export default function GlobalError({
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen grid place-items-center px-6 bg-[#fafbf7] text-[#0d1730] font-sans">
        <title>Something went wrong — Chrome Visa Solutions</title>
        <div className="max-w-xl text-center">
          <h1 className="text-[32px] font-semibold leading-tight">
            Chrome Visa Solutions is temporarily unavailable.
          </h1>
          <p className="mt-4 text-[16px] text-[#4a5462] leading-[1.7]">
            Please try again. You can also reach us at{" "}
            <a href="mailto:info@chromevisa.ca" className="underline">info@chromevisa.ca</a> or{" "}
            <a href="tel:+16475374581" className="underline">+1 (647) 537‑4581</a>.
          </p>
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="mt-8 rounded-full bg-[#67b219] px-6 py-3 text-white font-medium"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
