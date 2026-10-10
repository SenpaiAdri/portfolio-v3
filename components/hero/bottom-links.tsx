import { socials } from "@/data/site";

export function SocialBar() {
  return (
    <div className="z-10 flex h-[12dvh] shrink-0 items-center justify-end bg-[#0e0e0d] text-[#e9e6de] pr-6 sm:pr-8 md:pr-[12vw] lg:pr-[35vw] py-4">
      <ul className="border-l border-white/50 pl-4">
        {socials.map((s) => (
          <li key={s}>
            <a
              href="#"
              className="text-[10px] tracking-[0.15rem] uppercase hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e9e6de]"
            >
              {s} <span aria-hidden>↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
