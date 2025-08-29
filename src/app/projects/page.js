import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";

export const metadata = {
  title: "Projects",
};

const projects = [
  {
    title: "Schedules",
    date: "August 2025",
    type: "Solo Project",
    length: "1 month",
    description:
      "A comprehensive schedule management app that automatically parses uploaded schedules, displays shift information, shows coworkers, and syncs with Google Calendar. Adopted by the majority of coworkers at my workplace for efficient shift management.",
    tech: ["TypeScript", "Prisma", "PostgreSQL", "Supabase", "Google Calendar API", "Tailwind CSS"],
    link: "https://schedules-ashen.vercel.app/",
    repo: "https://github.com/Ibrahim-Al-Omran/Schedules",
    highlight: "Advanced XLSX file parsing with automated data extraction and seamless Google Calendar integration using Prisma ORM.",
    image: "/schedules.png",
  },
  {
    title: "Rebottal",
    date: "July 2025",
    type: "Solo Project",
    length: "1 month",
    description:
      "An AI-powered debate platform that generates intelligent counterpoints to user arguments, creating an engaging debate simulation experience. Features real-time AI responses and dynamic conversation flow.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Groq AI API"],
    link: "https://rebottal.vercel.app/",
    repo: "https://github.com/Ibrahim-Al-Omran/Rebottal",
    highlight: "Sophisticated AI API integration with conversational prompt engineering for natural debate interactions.",
    image: "/rebottal.png",
  },
  {
    title: "PinPoint",
    date: "May 2025",
    type: "Solo Project",
    length: "2 months",
    description:
      "An interactive geography quiz game featuring flag and capital challenges with survival mode and competitive global leaderboards. Successfully attracted 15+ active users with engaging gameplay mechanics.",
    tech: ["JavaScript", "React", "Node.js", "Firebase", "Vercel"],
    link: "https://pinpoint-ibrs.vercel.app",
    repo: "https://github.com/Ibrahim-Al-Omran/PinPoint",
    highlight: "Real-time leaderboard system with Firebase database integration tracking user streaks and competitive rankings.",
    image: "/pinpoint.png",
  },
  {
    title: "Rescue Drone Mission",
    date: "March 2025",
    type: "Group School Project",
    length: "2 months",
    description:
      "A sophisticated drone exploration simulation for disaster scenarios on fictional islands. Features autonomous navigation algorithms and intelligent return-to-base strategies with comprehensive safety protocols.",
    tech: ["Java"],
    repo: "https://github.com/arian-fallahpour/2AA4-A2",
    highlight: "Advanced autonomous logic implementation with strong OOP principles, design patterns, and strategic project planning methodologies.",
    image: "/rescuemission.png",
  },
  {
    title: "Autonomous Recycling System",
    date: "February 2024",
    type: "Solo Coding, Group Design",
    length: "2 months",
    description:
      "An intelligent bottle-sorting system utilizing weight and color sensor integration with robotic arm control. Achieved exceptional 90%+ accuracy across comprehensive testing scenarios.",
    tech: ["Python", "QLabs"],
    repo: "https://github.com/Ibrahim-Al-Omran/Recycling_System_1P13",
    highlight: "Advanced sensor data filtering algorithms and precise robotic control pipeline for automated waste management.",
    image: "/recycling.png",
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold animate-fade-in-up">My Projects</h1>
      <div className="projects-grid">
        {projects.map((proj, index) => (
          <div
            key={proj.title}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <ProjectCard
              title={proj.title}
              description={proj.description}
              tags={proj.tech}
              link={proj.link}
              repo={proj.repo}
              date={proj.date}
              type={proj.type}
              length={proj.length}
              highlight={proj.highlight}
              image={proj.image}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

