"use client";

import Image from "next/image";
import { socials, email, previousPortfolios } from "@/data/site";

export function ContactSection({ year }: { year: number }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-name"
      className="flex min-h-screen flex-col bg-foreground px-5 pt-10 pb-4 text-[#E9E6DE] sm:px-8 md:px-10 lg:px-14"
    >
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <ul className="flex flex-col items-center gap-1 md:items-start">
          {socials.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-2xl font-extrabold tracking-tight uppercase leading-[1.15] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9E6DE] sm:text-3xl lg:text-[2rem]"
              >
                {label} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-0.5 text-base leading-snug font-light sm:text-lg md:items-end md:text-right lg:text-2xl">
          <a
            href={`mailto:${email}`}
            className="link-underline transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9E6DE]"
          >
            {email}
          </a>
          <p>Malabon City, NCR</p>
          <p>Philippines</p>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 items-center justify-items-center gap-10 py-12 md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:gap-6">
        <div className="order-2 text-center md:order-1 md:justify-self-start md:text-left">
          <p className="text-sm font-light tracking-wide uppercase sm:text-base">
            Previous portfolio:
          </p>
          <ul className="mt-2 flex flex-col items-center gap-1 md:items-start">
            {previousPortfolios.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-sm font-light sm:text-base"
              >
                <span aria-hidden>•</span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9E6DE]"
                >
                  {item.label} <span aria-hidden>↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 md:order-2 md:justify-self-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={351}
            height={180}
            className="h-auto w-44 sm:w-56 md:w-64 lg:w-[320px]"
          />
        </div>

        <nav
          aria-label="Footer"
          className="order-3 flex flex-col items-center gap-1 text-sm font-light tracking-wide uppercase sm:text-base md:items-end md:justify-self-end md:text-right"
        >
          <button
            type="button"
            onClick={scrollToTop}
            className="link-underline cursor-pointer transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9E6DE]"
          >
            HOME
          </button>
          <a
            href="#projects"
            className="link-underline transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9E6DE]"
          >
            Projects
          </a>
        </nav>
      </div>

      <div className="flex flex-col">
        <p className="text-center text-[10px] tracking-[0.08em] uppercase text-[#E9E6DE]/80 sm:text-xs lg:text-sm">
          Full-stack developer
        </p>
        <h2
          id="contact-name"
          className="mt-1 text-center font-black whitespace-nowrap uppercase leading-[0.9] tracking-[-0.03em] text-[7.4vw] sm:text-[7.6vw] md:text-[7.8vw] lg:text-[8.3vw]"
        >
          Adrian M. De Guzman
        </h2>
        <p className="mt-4 text-center text-[9px] tracking-wide uppercase text-[#E9E6DE]/40 sm:text-[10px]">
          © {year} All rights reserved - Adrian M. De Guzman
        </p>
      </div>
    </section>
  );
}
