
import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="flex justify-center min-h-screen p-2 pt-24 pb-8">
        <div className="max-w-2xl w-full">
          <h1 className="cactus-heading text-5xl font-bold animate-fade-in-up mb-8 text-center">
            Hi, I'm Ibrahim
          </h1>
          <p className="cactus-text text-lg animate-fade-in-up mb-6" style={{ animationDelay: '200ms' }}>
            I'm a 19-year-old Software Engineering student at McMaster University. 
            I thrive on challenging myself and learn best through difficult experiences. 
            My passion for technology drives everything I do.
          </p>
          <p className="cactus-text text-lg animate-fade-in-up mb-6" style={{ animationDelay: '400ms' }}>
            You'll find all my projects on GitHub, with my favorites showcased here.
          </p>
          <p className="cactus-text text-lg animate-fade-in-up mb-6" style={{ animationDelay: '600ms' }}>
            When I'm not coding, you'll find me at the gym, on the tennis court, or exploring the latest tech trends on YouTube.
            I'm always eager to stay current with emerging technologies.
          </p>
          <p className="cactus-text text-lg animate-fade-in-up mb-8" style={{ animationDelay: '800ms' }}>
            Let's connect! Feel free to reach out through any of the links below.
          </p>
          
          {/* Social Media Links */}
          <div className="flex gap-4 animate-fade-in-up justify-center flex-wrap" style={{ animationDelay: '1000ms' }}>
            <Link
              href="https://www.linkedin.com/in/ibrahim-al-omran/"
              target="_blank"
              rel="noopener noreferrer"
              className="cactus-button flex items-center gap-2 cactus-cursor-pointer"
            >
              <Linkedin className="h-5 w-5" />
              <span className="text-sm font-medium">LinkedIn</span>
            </Link>
            
            <Link
              href="https://github.com/Ibrahim-Al-Omran"
              target="_blank"
              rel="noopener noreferrer"
              className="cactus-button flex items-center gap-2 cactus-cursor-pointer"
              style={{ background: 'linear-gradient(45deg, var(--earth-brown), var(--earth-bark))' }}
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </Link>
            
            <Link
              href="mailto:ibrahimao2005@gmail.com"
              className="cactus-button flex items-center gap-2 cactus-cursor-pointer"
              style={{ background: 'linear-gradient(45deg, var(--desert-terracotta), var(--spine-orange))' }}
            >
              <Mail className="h-5 w-5" />
              <span className="text-sm font-medium">Email</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
