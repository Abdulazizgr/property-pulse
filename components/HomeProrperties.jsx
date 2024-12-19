import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

import connectDB from "@/config/database";
import Property from "@/models/Property";

const HomeProperties = async () => {
  await connectDB();

  const RecentProperties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();
  // const RecentProperties = properties.slice(0, 3);
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">
            Recent Properties
          </h1>
          {/* <!-- Properties --> */}
          {RecentProperties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RecentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-lg my-6 px-6">
        <Link
          href={`/properties`}
          className="block bg-black text-white text-center py-4 px-6  rounded-xl hover:bg-gray-700"
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
