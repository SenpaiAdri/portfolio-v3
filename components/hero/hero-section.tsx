import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="grid flex-1 grid-cols-1 overflow-clip px-5 pt-5 sm:px-8 md:px-10 md:pt-6 lg:min-h-0 lg:grid-cols-[1fr_0.9fr] lg:px-10 lg:pt-4"
    >
      {/* Left column — flat on mobile/tablet (contents), real flex + justify-between on desktop */}
      <div className="contents lg:col-start-1 lg:flex lg:min-h-0 lg:flex-col lg:justify-between lg:py-2">
        {/* Bio — desktop only */}
        <p className="hidden max-w-125 text-[13px] leading-snug text-[#1d1d1c] lg:order-1 lg:block lg:text-lg">
          A Computer Science Graduate specialized in Mobile Programming. I love
          to explore new technologies, learn new skills, and adapt to the
          fast-changing tech industry.
        </p>

        {/* Title block — first on mobile/tablet, last on desktop.
            vw sizing keeps both lines edge-to-edge on phone + tablet. */}
        <div className="order-1 flex flex-col lg:order-3 lg:pb-6">
          <h1
            id="hero-title"
            className="order-1 whitespace-nowrap font-black uppercase leading-[0.85] tracking-[-0.04em] text-[15vw] lg:text-[6.5vw] xl:text-[8vw] lg:order-2 lg:mt-2 lg:whitespace-normal"
          >
            Full-stack
            <br />
            Developer
          </h1>
          <div className="order-2 mt-2 flex flex-row items-baseline justify-between gap-4 md:mt-3 lg:order-1 lg:mb-1 lg:mt-0 lg:flex-col lg:items-start lg:gap-1">
            <p className="order-1 text-[11px] font-bold uppercase tracking-[0.02em] md:text-[12px] lg:order-2 lg:text-[18px]">
              Adrian M. De Guzman
            </p>
            <p className="order-2 shrink-0 text-[8px] uppercase tracking-[0.06em] text-foreground/60 md:text-[10px] lg:order-1">
              Malabon City, Metro Manila
            </p>
          </div>
        </div>

        {/* CTA block — middle in all layouts */}
        <div className="order-2 mt-5 md:mt-7 lg:order-2 lg:mt-0">
          <p className="max-w-60 md:max-w-sm text-xl leading-6 md:leading-8 md:text-3xl lg:text-3xl">
            Available for select collaborations and project development.
          </p>
          <p className="mt-2 text-[9px] uppercase tracking-[0.08em] text-foreground/60 md:mt-3 md:text-[10px]">
            UI Systems · Web Development · AI Automation · Consultation
          </p>
          <div className="mt-3 flex flex-wrap gap-3 md:mt-4">
            <Button href="#" variant="solid">
              CONTACT ME <span aria-hidden>↗</span>
            </Button>
            <Button href="#" variant="outline">
              SEE PROJECTS <span aria-hidden>↗</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Portrait — last on mobile/tablet, right column on desktop */}
      <div className="order-3 mt-6 flex items-end justify-center md:mt-8 lg:col-start-2 lg:mt-0 lg:min-h-0 lg:justify-start">
        <div className="relative aspect-square w-[94vw] md:w-[80vw] lg:h-full lg:max-h-full lg:w-full">
          <div
            aria-hidden
            className="absolute aspect-square inset-0 rounded-full bg-[#111110]"
          />
          <Image
            src="/hero.png"
            alt="Portrait of Adrian M. De Guzman"
            fill
            priority
            sizes="(max-width: 768px) 94vw, (max-width: 1024px) 80vw, 560px"
            className="scale-[1.15] object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
