import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import CursorDot from "@/components/CursorFollower";
import TileIntro from "@/components/TileIntro";
import Script from "next/script";
import { Quattrocento } from "next/font/google";

const quattrocento = Quattrocento({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "Ibrahim Al Omran",
    template: "Ibrahim Al Omran | %s",
  },
  description:
    "20-year-old Software Engineering student at McMaster University. Passionate about technology, coding, and building innovative projects. View my portfolio and connect with me.",
  keywords: [
    "Ibrahim Al Omran",
    "Software Engineering",
    "McMaster University",
    "Web Developer",
    "Student Developer",
    "Portfolio",
    "Projects",
    "Technology",
    "Programming",
    "Frontend Developer",
    "React",
    "Next.js",
    "JavaScript",
  ],
  authors: [
    {
      name: "Ibrahim Al Omran",
      url: "https://github.com/Ibrahim-Al-Omran",
    },
  ],
  creator: "Ibrahim Al Omran",
  publisher: "Ibrahim Al Omran",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ibrahimalomran.com",
    title: "Ibrahim Al Omran",
    description:
      "19-year-old Software Engineering student at McMaster University. Passionate about technology, coding, and building innovative projects.",
    siteName: "Ibrahim Al Omran",
    images: [
      {
        url: "https://ibrahimalomran.com/ia_logo_512.png",
        width: 512,
        height: 512,
        alt: "Ibrahim Al Omran Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ibrahim Al Omran",
    description:
      "19-year-old Software Engineering student at McMaster University. Passionate about technology, coding, and building innovative projects.",
    images: ["https://ibrahimalomran.com/ia_logo_512.png"],
  },
  metadataBase: new URL("https://ibrahimalomran.com"),
  alternates: {
    canonical: "/",
  },
  category: "technology",
  icons: {
    icon: [
      { url: "/ia_logo_512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico" },
      { url: "/ia_logo.png", sizes: "any", type: "image/png" },
    ],
    shortcut: "/ia_logo_512.png",
    apple: "/ia_logo_512.png",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "google-site-verification": "your-verification-code",
    "msapplication-TileColor": "#faf9f2",
    "theme-color": "#faf9f2",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#faf9f2",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ibrahim Al Omran",
    "jobTitle": "Software Engineering Student",
    "affiliation": {
      "@type": "EducationalOrganization",
      "name": "McMaster University",
    },
    "url": "https://ibrahimalomran.com",
    "logo": "https://ibrahimalomran.com/ia_logo_512.png", // ✅ Added logo
    "sameAs": [
      "https://github.com/Ibrahim-Al-Omran",
      "https://www.linkedin.com/in/ibrahim-al-omran/",
    ],
    "description":
      "19-year-old Software Engineering student at McMaster University passionate about technology and building innovative projects.",
    "knowsAbout": [
      "Software Engineering",
      "Web Development",
      "React",
      "Next.js",
      "JavaScript",
      "Programming",
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "McMaster University",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://ibrahimalomran.com",
    "name": "Ibrahim Al Omran",
    "logo": "https://ibrahimalomran.com/ia_logo_512.png",
  };

  return (
    <html lang="en" className={`dark h-full ${quattrocento.className}`}>
      <head>
        <link rel="icon" href="/ia_logo_512.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ia_logo_512.png" />
        <meta name="theme-color" content="#faf9f2" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#faf9f2" media="(prefers-color-scheme: light)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Ibrahim Al Omran" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#faf9f2" />
        <meta name="msapplication-navbutton-color" content="#c1ddff" />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              color-scheme: light;
              --safari-backdrop-color: #faf9f2;
            }
            html {
              background-color: #faf9f2 !important;
            }
            body {
              background: transparent !important;
            }
            
            @supports (-webkit-backdrop-filter: blur(20px)) {
              html::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: env(safe-area-inset-top, 44px);
                background: linear-gradient(180deg, #faf9f2 0%, rgba(250, 249, 242, 0.95) 70%, rgba(250, 249, 242, 0.8) 100%);
                z-index: 9999;
                pointer-events: none;
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
              }
            }
            
            @media (max-width: 768px) and (-webkit-min-device-pixel-ratio: 2) {
              body {
                background-attachment: fixed;
                background-image: linear-gradient(0deg, transparent 0%, rgba(193, 221, 255, 0.12) 100%);
              }
            }
            
            @supports (height: 100dvh) {
              html, body {
                min-height: 100dvh !important;
              }
            }
          `
        }} />
        <meta
          property="og:image"
          content="https://ibrahimalomran.com/ia_logo_512.png"
        />
        <meta property="og:image:width" content="512" />
        <meta property="og:image:height" content="512" />
        <meta property="og:image:type" content="image/png" />
        <meta
          name="twitter:image"
          content="https://ibrahimalomran.com/ia_logo_512.png"
        />
      </head>
      <body
        className="h-full m-0 p-0 overflow-x-hidden"
        style={{
          minHeight: "100vh",
          minHeight: "-webkit-fill-available",
          minHeight: "100dvh",
          overscrollBehavior: "none",
          WebkitOverscrollBehavior: "none",
        }}
      >
        <Script
          id="person-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <CursorDot />
        <TileIntro />
        <div
          className="min-h-screen relative"
          style={{
            minHeight: "100vh",
            minHeight: "-webkit-fill-available",
            minHeight: "100dvh",
          }}
        >
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
