import "../styles/globals.css";
import Navbar from "@/components/navbar";

export const metadata = {
  title: "Ibrs",
  description: "My personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
