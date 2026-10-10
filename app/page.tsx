import { HeroSection } from "@/components/hero/hero-section";
import { ProjectSection } from "@/components/project/project-section";
import { NavBar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col bg-background text-foreground overflow-x-clip">
      <NavBar />
      <HeroSection />
      <ProjectSection />

    </main>
  );
}
