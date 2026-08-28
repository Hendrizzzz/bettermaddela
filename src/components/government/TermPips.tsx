const TERM_COUNT: Record<string, number> = {
  "1st": 1,
  "2nd": 2,
  "3rd": 3,
};

export function TermPips({ ordinal }: { ordinal: string | null | undefined }) {
  const count = ordinal ? TERM_COUNT[ordinal] : undefined;
  if (!count) return null;
  return (
    <span className="term-pips" role="img" aria-label={`${ordinal} term in present position`}>
      {[1, 2, 3].map((slot) => (
        <span
          key={slot}
          className={`term-pip${slot <= count ? " term-pip--filled" : ""}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
