
import Link from "next/link";
import { Linkedin, Github, Mail, FileText } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className="flex justify-center items-center min-h-screen p-2 md:py-0 pt-4 pb-8">
        <div className="max-w-2xl w-full">
          <div className="backdrop-blur-md bg-[#fffef3]/80 border border-[#201201]/15 rounded-2xl py-12 px-8 shadow-xl relative z-10 flex flex-col justify-center">
            <h1 className="text-5xl font-bold animate-fade-in-up mb-8" style={{ color: '#201201' }}>Hi, I&apos;m Ibrahim.</h1>
            
            <p className="text-lg animate-fade-in-up mb-6" style={{ animationDelay: '200ms', color: '#201201' }}>
              I&apos;m a 20-year-old Software Engineering student at McMaster University, currently interning as a{' '}
              <strong>System Architect</strong> at{' '}
              <span className="amd-logo text-lg font-black">AMD</span>.
            </p>
            <p className="text-lg animate-fade-in-up mb-6" style={{ animationDelay: '400ms', color: '#201201' }}>
              I thrive on challenging myself and learn best through difficult experiences.
              My passion for technology drives everything I do.
            </p>
            <p className="text-lg animate-fade-in-up mb-6" style={{ animationDelay: '600ms', color: '#201201' }}>
              You&apos;ll find all my projects on GitHub, with my favorites showcased here.
              When I&apos;m not coding, you&apos;ll find me at the gym, on the tennis court, or exploring the latest tech on YouTube.
            </p>
            <p className="text-lg animate-fade-in-up mb-8" style={{ animationDelay: '800ms', color: '#201201' }}>
              Let&apos;s connect! Feel free to reach out through any of the links below.
            </p>
            
            {/* Social Media Links - smaller buttons & gap on mobile only */}
            <div className="flex gap-4 md:gap-6 animate-fade-in-up justify-center" style={{ animationDelay: '1200ms' }}>
              <Link
                href="https://www.linkedin.com/in/ibrahim-al-omran/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#201201]/10 border border-[#201201]/20 rounded-full hover:bg-[#201201]/35 hover:border-[#201201]/50 hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                style={{ color: '#201201' }}
                title="LinkedIn"
              >
                <Linkedin className="h-7 w-7 md:h-8 md:w-8" />
              </Link>
              
              <Link
                href="https://github.com/Ibrahim-Al-Omran"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#201201]/10 border border-[#201201]/20 rounded-full hover:bg-[#201201]/35 hover:border-[#201201]/50 hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                style={{ color: '#201201' }}
                title="GitHub"
              >
                <Github className="h-7 w-7 md:h-8 md:w-8" />
              </Link>
              
              <Link
                href="mailto:ibrahimao2005@gmail.com"
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#201201]/10 border border-[#201201]/20 rounded-full hover:bg-[#201201]/35 hover:border-[#201201]/50 hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                style={{ color: '#201201' }}
                title="Email"
              >
                <Mail className="h-7 w-7 md:h-8 md:w-8" />
              </Link>

              <Link
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#201201]/10 border border-[#201201]/20 rounded-full hover:bg-[#201201]/35 hover:border-[#201201]/50 hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                style={{ color: '#201201' }}
                title="Resume"
              >
                <FileText className="h-7 w-7 md:h-8 md:w-8" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
