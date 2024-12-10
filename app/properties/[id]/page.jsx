import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import PropertyDetails from "@/components/PropertyDetails";
import Link from "next/link";
import { FaArrowLeft, FaLocationArrow } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  // Ensure params are awaited before use
  const id = params?.id; // Destructure `id` from params

  // Connect to the database
  await connectDB();

  // Fetch the property using the ID
  const property = await Property.findById(id).lean();

  // Check if property is found
  if (!property) {
    return <div className="text-2xl">Property not found</div>;
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />

      {/* <!-- Go Back --> */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            {/* <i className="fas fa-arrow-left mr-2"></i>  */}
            <FaArrowLeft className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>

      {/* <!-- Property Info --> */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            {/* <!-- Property Details --> */}
            <PropertyDetails property={property} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyPage;
