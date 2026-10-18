import { socials } from "@/data/site";

export function SocialBar() {
  return (
    <div className="z-10 flex items-center justify-end bg-foreground text-[#e9e6de] pr-20 md:pr-[12%] lg:pr-[35%] py-4">
      <ul className="border-l border-white/50 pl-4">
        {socials.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-[10px] tracking-[0.15rem] uppercase link-underline link-underline-offset focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9e6de]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
