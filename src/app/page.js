
import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";
import AnimatedQuote from "../components/AnimatedQuote";

export default function Home() {
  return (
    <>
      <main className="flex justify-center items-center min-h-screen p-2 md:py-0 pt-4 pb-8">
        <div className="max-w-2xl w-full">
          {/* Frosted glass card container */}
          <div className="backdrop-blur-md bg-slate-900/60 border border-slate-800/50 rounded-2xl py-12 px-8 shadow-2xl relative z-10 md:h-[720px] flex flex-col justify-center">
            <h1 className="text-5xl font-bold animate-fade-in-up mb-8">Hi, I&apos;m Ibrahim.</h1>
            
            <p className="text-lg animate-fade-in-up mb-6" style={{ animationDelay: '200ms' }}>
              I&apos;m a 20-year-old Software Engineering student at McMaster University. 
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
            
            {/* Animated Quote - reserve space to prevent layout shift */}
            <div className="mb-8 min-h-[120px] flex items-center">
              <AnimatedQuote
                text="The man who loves walking will walk further than the man who loves the destination"
                author="Lao Tzu"
                startDelay={1000}
                letterDelay={25}
                wordDelay={100}
                className="text-2xl italic font-light text-white/50 max-w-4xl"
              />
            </div>
            
            {/* Social Media Links */}
            <div className="flex gap-6 animate-fade-in-up justify-center" style={{ animationDelay: '4000ms' }}>
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
        </div>
      </main>
    </>
  );
}
