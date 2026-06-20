import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import NavBar from "@/components/NavBar";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: "Next.js Course Demo Portal",
  description: "Explore Next.js App Router layouts, filtration, and pre-rendering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBar />
          <main>{children}</main>
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
