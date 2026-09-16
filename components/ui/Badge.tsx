export default function Badge({
  children,
  tone = "default",
}: {
  children: string;
  tone?: "default" | "gold" | "signal";
}) {
  const toneClass =
    tone === "gold"
      ? "text-gold border-gold/40"
      : tone === "signal"
      ? "text-signal border-signal/40"
      : "text-paper-dim border-line";

  return (
    <span
      className={`inline-block rounded-sm border px-2 py-0.5 text-xs ${toneClass}`}
    >
      {children}
    </span>
  );
}
