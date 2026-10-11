import { HeroSection } from "@/components/hero/hero-section";
import { ProjectSection } from "@/components/project/project-section";
import { ContactSection } from "@/components/contact/contact-section";
import { NavBar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground overflow-x-clip">
      <NavBar />
      <HeroSection />
      <ProjectSection />
      <ContactSection />
    </main>
  );
}
