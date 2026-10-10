import Image from "next/image";
import { navLinks } from "@/data/site";

export function NavBar() {
  return (
    <header className="flex h-[7dvh] shrink-0 items-center justify-between px-5 sm:px-8 md:px-10 lg:h-[8dvh] lg:px-10">
      <a
        href="#"
        aria-label="ADG home"
        className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
      >
        <Image
          src="/logo-nav.svg"
          alt="ADG monogram"
          width={48}
          height={36}
          priority
          className="h-7 sm:h-8 w-auto"
        />
      </a>
      <nav
        aria-label="Primary"
        className="hidden bg-[#1b1b1a] text-[#ede9df] rounded-full pl-5 pr-5 sm:pl-10 sm:pr-10 py-2.5 items-center gap-5 sm:gap-14 lg:flex"
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[10px] sm:text-[11px] font-medium tracking-wide hover:opacity-60 transition-opacity rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ede9df]"
          >
            {link}
          </a>
        ))}
      </nav>
      <button
        type="button"
        aria-label="Open menu"
        className="rounded-sm p-2 text-2xl leading-none lg:hidden"
      >
        <span aria-hidden>☰</span>
      </button>
    </header>
  );
}
