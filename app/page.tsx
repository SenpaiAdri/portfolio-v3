import { HeroSection } from "@/components/hero/hero-section";
import { ProjectSection } from "@/components/project/project-section";
import { ContactSection } from "@/components/contact/contact-section";
import { NavBar } from "@/components/navbar";

// Read at build time: the copyright year is captured in the static shell.
async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Home() {
  const year = await getCopyrightYear();

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground overflow-x-clip">
      <NavBar />
      <HeroSection />
      <ProjectSection />
      <ContactSection year={year} />
    </main>
  );
}
