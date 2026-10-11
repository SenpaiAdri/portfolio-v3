interface Project {
  title: string;
  description: string;
  link: string | undefined;
  image: string[];
  tech: string[];
  date: string;
  role: string;
}

export const projects: Project[] = [
  {
    title: "Pasada",
    description: "Designed and implemented the driver app for the Pasada Ecosystem. Designed the centralized PostgreSQL database schema in Supabase for the entire platform. Implemented real-time location tracking using the Google Maps API.",
    link: undefined,
    image: [],
    tech: ["Flutter", "Dart", "Google Maps API", "Supabase", "PostgreSQL"],
    date: "2025",
    role: "Mobile Developer",
  },
  {
    title: "AI-Blogpost",
    description: "Developed an autonomous blog posting platform without human intervention. ",
    link: "https://ai-blogpost.vercel.app/",
    image: [],
    tech: ["Next.js", "Vercel", "RSS feeds", "Python", "Github Actions", "OpenRouter", "Supabase", "PostgreSQL"],
    date: "2026",
    role: "Developer",
  },
  {
    title: "Lootbx",
    description: "Collaborated with developers to build and maintain a live streaming platform. Implemented a responsive live chat service that delivers client's needs. Engineered admin dashboard modules for category management and automated reward distributions.",
    link: "https://lootbx.com/",
    image: [],
    tech: ["React(vite)", "Golang", "Socket.io", "MongoDB"],
    date: "2026",
    role: "Intern Full-Stack Developer",
  },
  {
    title: "Unique Co",
    description: "Designed and developed a website for a local bouquet and gift shop. Applied SEO best practices to improve search engine visibility.",
    link: "https://unique-co.pages.dev/",
    image: [],
    tech: ["React(vite)", "Cloudflare", "Google Search Console", "GSAP", "Lenis", "Resend"],
    date: "2026",
    role: "Developer & Designer",
  }
];
