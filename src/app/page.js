
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
          
          {/* Animated Quote - appears after all text content */}
          <div className="mb-8 text-2xl italic font-light text-white/50 leading-relaxed">
            <span className="animate-fade-in-up inline-block" style={{ animationDelay: '1000ms' }}>The</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '1200ms' }}>man</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '1400ms' }}>who</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '1600ms' }}>loves</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '1800ms' }}>walking</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '2000ms' }}>will</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '2200ms' }}>walk</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '2400ms' }}>further</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '2600ms' }}>than</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '2800ms' }}>the</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '3000ms' }}>man</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '3200ms' }}>who</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '3400ms' }}>loves</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '3600ms' }}>the</span>
            <span className="animate-fade-in-up inline-block ml-2" style={{ animationDelay: '3800ms' }}>destination</span>
            <div className="animate-fade-in-up mt-3 text-right text-white/30 text-lg" style={{ animationDelay: '4200ms' }}>
              — Lao Tzu
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex gap-6 animate-fade-in-up justify-center" style={{ animationDelay: '4600ms' }}>
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
