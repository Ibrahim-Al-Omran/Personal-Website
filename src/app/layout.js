import "../styles/globals.css";
import Navbar from "@/components/Navbar";
import CursorLight from "@/components/CursorFollower";

export const metadata = {
  title: {
    default: "Ibrahim Al Omran | Home",
    template: "Ibrahim Al Omran | %s"
  },
  description: "19-year-old Software Engineering student at McMaster University. Passionate about technology, coding, and building innovative projects. View my portfolio and connect with me.",
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
    "JavaScript"
  ],
  authors: [{ name: "Ibrahim Al Omran", url: "https://github.com/Ibrahim-Al-Omran" }],
  creator: "Ibrahim Al Omran",
  publisher: "Ibrahim Al Omran",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ibrahimalomran.com",
    title: "Ibrahim Al Omran - Software Engineering Student",
    description: "19-year-old Software Engineering student at McMaster University. Passionate about technology, coding, and building innovative projects.",
    siteName: "Ibrahim Al Omran Portfolio",
    images: [
      {
        url: "https://ibrahimalomran.com/ia_logo.png", // ✅ updated logo
        width: 1200,
        height: 630,
        alt: "Ibrahim Al Omran Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Al Omran - Software Engineering Student",
    description: "19-year-old Software Engineering student at McMaster University. Passionate about technology, coding, and building innovative projects.",
    images: ["https://ibrahimalomran.com/ia_logo.png"], // ✅ updated logo
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
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "google-site-verification": "your-verification-code", // from Search Console
    "msapplication-TileColor": "#030612",
    "theme-color": "#030612",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",  
  themeColor: "#030612",  
}

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ibrahim Al Omran",
    "jobTitle": "Software Engineering Student",
    "affiliation": {
      "@type": "EducationalOrganization",
      "name": "McMaster University"
    },
    "url": "https://ibrahimalomran.com",
    "sameAs": [
      "https://github.com/Ibrahim-Al-Omran",
      "https://www.linkedin.com/in/ibrahim-al-omran/"
    ],
    "description": "19-year-old Software Engineering student at McMaster University passionate about technology and building innovative projects.",
    "knowsAbout": ["Software Engineering", "Web Development", "React", "Next.js", "JavaScript", "Programming"],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "McMaster University"
    }
  };

  return (
    <html lang="en" className="dark h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="h-full m-0 p-0 overflow-x-hidden" style={{ 
        background: 'linear-gradient(135deg, #030612 0%, #070F29 100%)',
        minHeight: '100vh',
        minHeight: '-webkit-fill-available'
      }}>
        <CursorLight />
        <div className="min-h-screen relative" style={{
          minHeight: '100vh',
          minHeight: '-webkit-fill-available'
        }}>
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
