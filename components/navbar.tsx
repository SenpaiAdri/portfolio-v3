import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/site";
import { RollingText } from "@/components/ui/rolling-text";

export function NavBar() {
  return (
    <header className="relative z-50 flex h-[7vh] shrink-0 items-center justify-between px-5 sm:px-8 md:px-10 lg:h-[8vh] lg:px-10">
      <Link
        href="/"
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
      </Link>
      <nav
        aria-label="Primary"
        className="hidden bg-foreground text-[#ede9df] rounded-full pl-5 pr-5 sm:pl-10 sm:pr-10 py-2.5 items-center gap-5 sm:gap-14 lg:flex"
      >
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="group/roll text-[10px] sm:text-[11px] font-medium tracking-widest transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ede9df] uppercase"
          >
            <RollingText text={link.label} />
          </a>
        ))}
      </nav>
    </header>
  );
}
