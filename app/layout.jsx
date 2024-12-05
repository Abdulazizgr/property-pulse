import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";

export const metadata = {
  title: "My Next.js App",
  keywords: "next.js, react, javascript",

  icon: "/favicon.ico",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <NavBar />
        <main>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
