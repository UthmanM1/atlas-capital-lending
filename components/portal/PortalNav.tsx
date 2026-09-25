import Link from "next/link";

export function PortalNav({ items, active }: { items: [string, string][]; active: string }) {
  return (
    <nav aria-label="Portal section" style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "12px 0 24px" }}>
      {items.map(([label, href]) => (
        <Link key={href} className={`btn sm ${href === active ? "" : "ghost"}`} href={href}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export function DemoAuthBadge({ role, name }: { role: string; name: string }) {
  return (
    <p className="note" style={{ marginBottom: 16 }}>
      Demo functionality: you&apos;re viewing this as <b>{name}</b> ({role}). There is no real
      authentication — anyone can view any role in this portfolio project.{" "}
      <Link href="/portal">Switch role</Link> · <Link href="/portal/architecture">What&apos;s real vs. demo</Link>
    </p>
  );
}
