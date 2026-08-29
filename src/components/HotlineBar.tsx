import Link from "next/link";
import { getRecord } from "@/data/civic";

// Emergency numbers come from the national-emergency-hotlines-2026 record.
// The directory items below are an explicit curated subset of the
// maddela-lgu-office-contacts-2023 record (municipal website archive,
// 2023-04-02). Update them only through that record — never from new research.
// Every directory item carries its 2023 vintage label in the UI.
const HOTLINE_DIRECTORY = [
  { office: "Mayor's Office", value: "(078) 374-1543", href: "tel:(078) 374-1543" },
  { office: "MEEMDO", value: "+63-947-853-8035", href: "tel:+63-947-853-8035" },
  {
    office: "Email",
    value: "mipc@maddela-quirino.gov.ph",
    href: "mailto:mipc@maddela-quirino.gov.ph",
  },
] as const;

interface EmergencyHotlinesData {
  entries: { service: string; details: string }[];
}

export function HotlineBar() {
  // getRecord throws when the reviewed record is absent, so the strip can
  // never render from unreviewed data.
  const hotlines = getRecord<EmergencyHotlinesData>("national-emergency-hotlines-2026");
  const emergency = hotlines.data.entries
    .filter((entry) => entry.details === "911" || entry.details === "143")
    .map((entry) => entry.details);
  if (emergency.length === 0) return null;

  return (
    <aside className="hotline-bar" aria-label="Emergency and municipal contact quick line">
      <div className="container hotline-bar-inner">
        <p className="hotline-bar-kicker">
          <i className="bi bi-broadcast-pin" aria-hidden="true" />
          In an emergency:{" "}
          <span className="hotline-bar-emergency">
            {emergency.map((value, index) => (
              <span key={value}>
                {index > 0 && " · "}
                <strong>{value}</strong>
              </span>
            ))}
          </span>
        </p>
        <ul className="hotline-bar-items">
          {HOTLINE_DIRECTORY.map((item) => (
            <li key={item.value} className="hotline-bar-item">
              <span className="hotline-bar-office">{item.office}</span>{" "}
              <a href={item.href}>{item.value}</a>{" "}
              <span className="hotline-bar-vintage">(2023)</span>
            </li>
          ))}
          <li className="hotline-bar-item">
            <Link href="/contact">All contacts</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
