import type { AnchorHTMLAttributes } from "react";

type PillLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "solid" | "outline";
};

export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: PillLinkProps) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-5 md:px-8 py-2.5 text-[10px] font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";
  const styles =
    variant === "solid"
      ? "bg-foreground text-background"
      : "border border-foreground hover:bg-foreground hover:text-background";

  return (
    <a className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </a>
  );
}
