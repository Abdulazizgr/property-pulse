import connectDB from "@/config/database";
import Property from "@/models/Property";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import ShareButtons from "@/components/ShareButton";
import BookmarkButton from "@/components/BookmarkButton";
import PropertyContactForm from "@/components/PropertyContactForm";
import PropertyDetails from "@/components/PropertyDetails";
import PropertyImages from "@/components/PropertyImages";
import Link from "next/link";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { FaArrowLeft, FaLocationArrow } from "react-icons/fa";
import { getSessionUser } from "@/utils/getSessionUser";

const PropertyPage = async ({ params }) => {
  // Ensure params are awaited before use
  const { id } = await params; // Destructure `id` from params

  // Connect to the database
  await connectDB();
  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;
  // Fetch the property using the ID
  const propertyDoc = await Property.findById(id).lean();
  const property = convertToSerializeableObject(propertyDoc);
  const isOwner = property.owner !== userId;
  // Check if property is found
  if (!property) {
    throw new Error("Property not found");
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
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons property={property} />
              {isOwner && <PropertyContactForm property={property} />}
            </aside>
          </div>
        </div>
      </section>

      <PropertyImages images={property.images} />
    </>
  );
};

export default PropertyPage;
