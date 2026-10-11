import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SocialBar } from "@/components/hero/bottom-links";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mt-[-7dvh] flex min-h-dvh flex-col lg:mt-[-8dvh] lg:h-dvh lg:overflow-hidden"
    >
      <div className="flex-1 grid min-h-0 lg:min-h-0 grid-cols-1 lg:grid-cols-[1fr_0.9fr] overflow-clip px-5 sm:px-8 md:px-10 pt-[calc(7dvh+1.25rem)] md:pt-[calc(7dvh+1.5rem)] lg:px-10 lg:pt-[calc(8dvh+1rem)] text-foreground">
        {/* Left column */}
        <div className="contents lg:col-start-1 lg:flex lg:min-h-0 lg:flex-col lg:justify-between lg:py-2">
          {/* Bio */}
          <p className="hidden max-w-lg text-sm lg:order-1 lg:block lg:text-lg">
            A Computer Science Graduate specialized in Mobile Programming, loves to explore new technologies, learn new skills, and adapt to the fast-changing tech industry.
          </p>

          {/* Title block */}
          <div className="order-1 flex flex-col lg:order-3 lg:pb-6">
            <h1
              id="hero-title"
              className="order-1 whitespace-nowrap font-black uppercase leading-[0.85] tracking-[-0.04em] text-[15vw] lg:text-[6.5vw] xl:text-[8vw] lg:order-2 lg:whitespace-normal"
            >
              Full-stack
              <br />
              Developer
            </h1>
            <div className="order-2 mt-2 flex flex-row items-center justify-between gap-4 md:mt-3 lg:order-1 lg:mt-0 lg:flex-col lg:items-start lg:gap-0">
              <p className="order-1 shrink-0 text-[10px] md:text-xs lg:text-lg font-semibold uppercase tracking-widest lg:order-2 pl-1 lg:pl-2">
                Adrian M. De Guzman
              </p>
              <p className="order-2 lg:order-1 shrink-0 text-[10px] md:text-xs uppercase tracking-widest text-foreground/50 lg:pl-2">
                Malabon City, Metro Manila
              </p>
            </div>
          </div>

          {/* CTA block */}
          <div className="order-2 mt-5 md:mt-7 lg:order-2 lg:mt-0">
            <p className="max-w-60 md:max-w-sm text-xl leading-6 md:leading-8 md:text-3xl lg:text-3xl">
              Available for select collaborations and project development.
            </p>
            <p className="mt-2 text-[9px] md:text-xs uppercase tracking-widest text-foreground/50 md:mt-3">
              UI Design · Web Development · AI Automation · Consultation
            </p>
            <div className="mt-3 flex flex-wrap gap-3 md:mt-4">
              <Button href="#contact" variant="solid">
                CONTACT ME <span aria-hidden>↗</span>
              </Button>
              <Button href="#projects" variant="outline">
                SEE PROJECTS <span aria-hidden>↗</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div className="relative order-3 mt-6 flex items-end justify-center md:mt-8 lg:col-start-2 lg:mt-0 lg:min-h-0 lg:justify-start">
          <div className="relative lg:absolute lg:-left-25 aspect-square w-[94vw] md:w-[80vw] lg:h-[90%] lg:max-h-full lg:w-full">
            <div
              aria-hidden
              className="absolute lg:-top-15 lg:left-15 lg:h-[70vh] inset-0 aspect-square rounded-full bg-foreground"
            />
            <Image
              src="/hero.png"
              alt="Portrait of Adrian M. De Guzman"
              fill
              priority
              sizes="(max-width: 768px) 94vw, (max-width: 1024px) 80vw, 560px"
              className=" object-contain object-bottom"
            />
          </div>
        </div>
      </div>
      <SocialBar />
    </section>
  );
}
