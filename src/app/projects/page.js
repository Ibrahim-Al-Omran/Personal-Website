import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold animate-fade-in-up" style={{ color: '#201201' }}>My Projects</h1>
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
