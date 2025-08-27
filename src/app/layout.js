import "../styles/globals.css";
import CactusNavbar from "@/components/CactusNavbar";

export const metadata = {
  title: "Ibrahim Al Omran",
  description: "My personal website",
  favicon: "/favicon.ico",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",  
  themeColor: "#150901",  
}


export default function RootLayout({ children }) {
  return (
  <html lang="en" className="cactus-theme h-full">
      <body className="cactus-theme h-full m-0 p-0" style={{ 
        background: 'linear-gradient(135deg, #150901 0%, #291203 100%)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="min-h-screen">
          <CactusNavbar />
          {children}
        </div>
      </body>
    </html>
  );
}
