import "@/assets/styles/globals.css";

export const metadata = {
  title: "My Next.js App",
  keywords: "next.js, react, javascript",

  icon: "/favicon.ico",
};

const MainLayout = ({ children }) => {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
