import Image from "next/image";
import connectDB from "@/config/database";
import profile from "@/assets/images/profile.png";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import ProfileProperties from "@/components/ProfileProperties";
import { convertToSerializeableObject } from "@/utils/convertToObject";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();
  const { userId } = sessionUser || {};

  if (!userId) {
    redirect("/login");
  }

  const propertiesDocs = await Property.find({ Owner: userId }).lean();
  const properties = propertiesDocs.map((property) =>
    convertToSerializeableObject(property)
  );

  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-400 p-6 text-white">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="text-sm opacity-90">
              Manage your personal details and listings
            </p>
          </div>

          {/* Profile Content */}
          <div className="flex flex-col md:flex-row gap-8 p-6">
            {/* Left Column - Profile Info */}
            <div className="md:w-1/3 lg:w-1/4 flex flex-col items-center text-center md:text-left">
              <Image
                className="rounded-full border-4 border-white shadow-lg"
                src={sessionUser?.user?.image || profile}
                width={160}
                height={160}
                alt={sessionUser?.user?.name || "User"}
              />
              <h2 className="text-2xl font-semibold mt-4">
                {sessionUser?.user?.name}
              </h2>
              <p className="text-gray-600">{sessionUser?.user?.email}</p>
            </div>

            {/* Right Column - Listings */}
            <div className="md:w-2/3 lg:w-3/4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Your Listings ({properties.length})
                </h2>
              </div>
              {properties.length > 0 ? (
                <ProfileProperties properties={properties} />
              ) : (
                <p className="text-gray-500 italic">
                  You haven’t added any properties yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
