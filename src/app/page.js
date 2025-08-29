
import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="flex justify-center min-h-screen p-2 pt-24 pb-8">
        <div className="max-w-2xl w-full">
          <h1 className="text-5xl font-bold animate-fade-in-up mb-8">Hi, I&apos;m Ibrahim.</h1>
          <p className="text-lg animate-fade-in-up mb-6" style={{ animationDelay: '200ms' }}>
            I&apos;m a 19-year-old Software Engineering student at McMaster University. 
            I thrive on challenging myself and learn best through difficult experiences. 
            My passion for technology drives everything I do.
          </p>
          <p className="text-lg animate-fade-in-up mb-6" style={{ animationDelay: '400ms' }}>
            You&apos;ll find all my projects on GitHub, with my favorites showcased here.
          </p>
          <p className="text-lg animate-fade-in-up mb-6" style={{ animationDelay: '600ms' }}>
            When I&apos;m not coding, you&apos;ll find me at the gym, on the tennis court, or exploring the latest tech trends on YouTube.
            I&apos;m always eager to stay current with emerging technologies.
          </p>
          <p className="text-lg animate-fade-in-up mb-8" style={{ animationDelay: '800ms' }}>
            Let&apos;s connect! Feel free to reach out through any of the links below.
          </p>
          
          {/* Social Media Links */}
          <div className="flex gap-6 animate-fade-in-up justify-center" style={{ animationDelay: '1000ms' }}>
            <Link
              href="https://www.linkedin.com/in/ibrahim-al-omran/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all text-foreground backdrop-blur-sm"
              title="LinkedIn"
            >
              <Linkedin className="h-8 w-8" />
            </Link>
            
            <Link
              href="https://github.com/Ibrahim-Al-Omran"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all text-foreground backdrop-blur-sm"
              title="GitHub"
            >
              <Github className="h-8 w-8" />
            </Link>
            
            <Link
              href="mailto:ibrahimao2005@gmail.com"
              className="flex items-center justify-center w-16 h-16 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all text-foreground backdrop-blur-sm"
              title="Email"
            >
              <Mail className="h-8 w-8" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
