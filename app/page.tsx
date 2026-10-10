import { HeroSection } from "@/components/hero/hero-section";
import { NavBar } from "@/components/navbar";
import { SocialBar } from "@/components/hero/bottom-links";


export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col bg-background text-foreground overflow-x-clip lg:h-[100dvh] lg:min-h-0 lg:overflow-hidden">
      <NavBar />
      <HeroSection />
      <SocialBar />

      {/* Add new sections here, e.g. <ProjectsSection /> <ExperienceSection /> <ContactSection /> */}
    </main>
  );
}
