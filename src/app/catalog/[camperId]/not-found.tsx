import Link from "next/link";

export default function CamperNotFound() {
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
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Camper not found</h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        This camper doesn&apos;t exist or is no longer available.
      </p>
      <Link href="/catalog" className="btn btn-accent">
        Back to catalog
      </Link>
    </div>
  );
}
