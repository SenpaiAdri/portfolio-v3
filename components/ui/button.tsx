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
    "inline-flex items-center gap-1 rounded-full px-5 py-2.5 text-[11px] font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current";
  const styles =
    variant === "solid"
      ? "bg-[#151514] text-[#f0ece2] hover:bg-black"
      : "border border-[#151514] hover:bg-[#151514] hover:text-[#f0ece2]";

  return (
    <a className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </a>
  );
}
