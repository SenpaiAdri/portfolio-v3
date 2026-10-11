"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/site";

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-50 flex h-[7dvh] shrink-0 items-center justify-between px-5 sm:px-8 md:px-10 lg:h-[8dvh] lg:px-10">
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
            className="text-[10px] sm:text-[11px] font-medium tracking-widest hover:opacity-60 transition-opacity rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ede9df] uppercase"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="rounded-sm p-2 text-2xl leading-none lg:hidden"
      >
        <span aria-hidden>{open ? "✕" : "☰"}</span>
      </button>

      {open && (
        <nav
          aria-label="Mobile"
          className="absolute inset-x-5 top-full flex flex-col items-center gap-4 rounded-2xl bg-foreground px-6 py-5 text-[#ede9df] sm:inset-x-8 md:inset-x-10 lg:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ede9df]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
