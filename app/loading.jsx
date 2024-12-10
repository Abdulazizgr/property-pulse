"use client";
import ClipLoader from "react-spinners/ClockLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

const LoadingPage = () => {
  return (
    <ClipLoader
      color="#3B82F6"
      cssOverride={override}
      arial-label="Loading Spinner"
      size={150}
    />
  );
};

export default LoadingPage;
