import "../styles/globals.css";
import Navbar from "@/components/navbar";
import CursorLight from "@/components/CursorFollower";

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
  themeColor: "#030612",  
}


export default function RootLayout({ children }) {
  return (
  <html lang="en" className="dark h-full">
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
