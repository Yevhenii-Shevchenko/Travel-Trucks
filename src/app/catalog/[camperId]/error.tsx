"use client";

import Link from "next/link";

export default function CamperDetailsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="container"
      style={{
        padding: "120px 0",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>
        Something went wrong loading this camper
      </h1>
      <p style={{ color: "var(--color-text-muted)", maxWidth: 480 }}>
        {error.message || "An unexpected error occurred."}
      </p>
      <div style={{ display: "flex", gap: "16px" }}>
        <button className="btn btn-accent" onClick={reset}>
          Try again
        </button>
        <Link href="/catalog" className="btn btn-outline">
          Back to catalog
        </Link>
      </div>
    </div>
  );
}
