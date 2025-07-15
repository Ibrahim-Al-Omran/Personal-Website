import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const projects = [
  {
    title: "PinPoint",
    type: "Solo Project",
    description:
      "A geography quiz game that tests users with interactive flag and capital-based questions. Includes a survival mode and global leaderboard.",
    tech: ["React", "Node.js", "Firebase"],
    link: "https://pinpoint-ibrs.vercel.app",
    repo: "https://github.com/Ibrahim-Al-Omran/PinPoint",
    highlight: "Live leaderboard that tracks highest streaks.",
  },
  {
    title: "Rescue Drone Mission",
    type: "Group School Project",
    description:
      "A simulated drone exploration system for a fictional island disaster game. Designed for safe autonomous navigation and return-to-base strategy.",
    tech: ["Java"],
    repo: "https://github.com/arian-fallahpour/2AA4-A2",
    highlight: "Efficient autonomous logic for exploration strategy.",
  },
  {
    title: "Dynamic Tic Tac Toe",
    type: "Solo Project",
    description:
      "A scalable version of Tic Tac Toe supporting custom board sizes and win conditions. Built with OOP principles.",
    tech: ["Java"],
    repo: "https://github.com/Ibrahim-Al-Omran/Dynamic_TicTacToe",
    highlight: "Fully dynamic win detection (horizontal, vertical, diagonals).",
  },
  {
    title: "Autonomous Recycling System",
    type: "Solo Project",
    description:
      "A bottle-sorting system using weight and color sensors, integrated with a robotic arm. Achieved over 90% accuracy across tests.",
    tech: ["Python", "QLabs"],
    repo: "https://github.com/Ibrahim-Al-Omran/Recycling_System_1P13",
    highlight: "Sensor data filtering and robotic control pipeline.",
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">My Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((proj) => (
          <Card key={proj.title} className="hover:shadow-md transition">
            <CardContent className="p-5 space-y-3">
              <CardTitle className="text-xl font-semibold">{proj.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{proj.type}</p>
              <p>{proj.description}</p>
              <p className="text-sm italic text-gray-500">Highlight: {proj.highlight}</p>
              <div className="flex flex-wrap gap-2 text-xs">
                {proj.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 pt-2">
                {proj.link && (
                  <Link href={proj.link} className="text-blue-600 underline" target="_blank">
                    Live
                  </Link>
                )}
                <Link href={proj.repo} className="text-blue-600 underline" target="_blank">
                  GitHub
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
