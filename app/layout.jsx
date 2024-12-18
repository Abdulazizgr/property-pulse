import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "My Next.js App",
  keywords: "next.js, react, javascript",
  icon: "/favicon.ico",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default MainLayout;
