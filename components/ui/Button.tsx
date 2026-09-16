import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary";

const BASE =
  "inline-flex items-center justify-center rounded-sm px-5 py-2.5 text-sm no-underline transition-colors";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gold text-ink hover:bg-gold/90",
  secondary: "border border-line text-paper hover:border-paper-dim",
};

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
}) {
  const className = `${BASE} ${VARIANTS[variant]}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
