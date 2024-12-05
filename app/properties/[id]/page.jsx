// "use client";

// Uncomment the "use client" directive if using React components that require it
"use client";

import { useRouter, useParams, useSearchParams, usePathname } from "next/navigation";

const PropertyPage = ({ params, searchParams }) => {
  const router = useRouter();
  const localParams = useParams(); // Only use if required
  const localSearchParams = useSearchParams(); // Only use if required
  const pathname = usePathname(); // Only use if required

  return (
    <div className="text-2xl">
      Property Page {searchParams?.name}
      {/* Uncomment if you want to render more details */}
      {/* <div className="text-2xl">Dynamic Route ID: {localParams?.id}</div> */}
      {/* <div className="text-2xl">Search Param Name: {localSearchParams?.get("name")}</div> */}
      {/* <div className="text-2xl">Current Pathname: {pathname}</div> */}
      {/* <button
        className="block ml-4 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => router.replace("/")}
      >
        Go to Home
      </button> */}
    </div>
  );
};

export default PropertyPage;
