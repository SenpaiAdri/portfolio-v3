import type { CSSProperties } from "react";

// Rolling label characters: on hover each one rolls down one line so the
// identical copy hidden above slides in, staggered per character via --i.
// Add `group/roll` to the hoverable ancestor (a link) for the roll to trigger.
export function RollingChar({ char, index }: { char: string; index: number }) {
  const glyph = char === " " ? "\u00A0" : char;
  return (
    <span className="relative inline-block [clip-path:inset(0)]">
      <span
        className="block transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] delay-[calc(var(--i)*25ms)] motion-reduce:transition-none group-hover/roll:translate-y-full"
        style={{ "--i": index } as CSSProperties}
      >
        <span aria-hidden className="absolute inset-x-0 bottom-full">
          {glyph}
        </span>
        <span className="block">{glyph}</span>
      </span>
    </span>
  );
}

export function RollingText({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <RollingChar key={i} char={char} index={i} />
      ))}
    </>
  );
}
