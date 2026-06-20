import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import BootstrapClient from "@/components/BootstrapClient";

export const metadata = {
  title: "Premium Products Store",
  description: "Explore, manage, and discover premium products with Next.js App Router.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
