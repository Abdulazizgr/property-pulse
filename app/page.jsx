import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProrperties";
import InfoBoxes from "@/components/InfoBoxes";
import Link from "next/link";
import ConnectDB from "@/config/database";

const HomePage = () => {
  // ConnectDB();
  // console.log(process.env.MONGODB_URI);
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
