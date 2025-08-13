"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import deleteProperty from "@/app/action/deleteProperty";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from "react-icons/fa";

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const placeholderImage = "/images/placeholder.jpg";

  const openDialog = (property) => {
    setSelectedProperty(property);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedProperty(null);
    setDialogOpen(false);
  };

  const handleDeleteProperty = async () => {
    if (!selectedProperty) return;

    await deleteProperty(selectedProperty._id);
    toast.success("Property Deleted Successfully");

    const updatedProperties = properties.filter(
      (property) => property._id !== selectedProperty._id
    );
    setProperties(updatedProperties);
    closeDialog();
  };

  return (
    <>
      {/* Properties Grid */}
      <div className="grid gap-6  lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition duration-200 overflow-hidden flex flex-col"
          >
            {/* Image Section */}
            <Link href={`/properties/${property._id}`}>
              <div className="relative h-48 w-full group">
                <Image
                  src={property.images?.[0] || placeholderImage}
                  alt={property.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                  ${property.price?.toLocaleString() || "N/A"}
                </span> */}
              </div>
            </Link>

            {/* Content Section */}
            <div className="flex-1 p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {property.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {property.description}
              </p>
            </div>
            <div className="flex justify-center gap-4 text-gray-500 mb-4">
              <p>
                <FaBed className="md:hidden lg:inline" /> {property.beds}{" "}
                <span className="md:hidden lg:inline">Beds</span>
              </p>
              <p>
                <FaBath className="md:hidden lg:inline" /> {property.baths}{" "}
                <span className="md:hidden lg:inline">Baths</span>
              </p>
              <p>
                <FaRulerCombined className="md:hidden lg:inline" />
                {property.square_feet}{" "}
                <span className="md:hidden lg:inline">sqft</span>
              </p>
            </div>

            <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
              <p>
                {" "}
                <FaMoneyBill className="md:hidden lg:inline" /> Weekly
              </p>
              <p>
                {" "}
                <FaMoneyBill className="md:hidden lg:inline" /> Monthly
              </p>
            </div>
            <div className="border border-gray-100 mb-2"></div>
            <div className="flex align-middle gap-2  p-4 ">
              <FaMapMarker className="text-orange-700 mt-1" />
              <span className="text-orange-700">
                {" "}
                {property.location.city} {property.location.state}{" "}
              </span>
            </div>
            {/* Actions Section */}
            <div className="flex justify-between gap-8 p-4 border-t border-gray-100">
              <Link
                href={`/properties/${property._id}/edit`}
                className="flex-1 text-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
              >
                Edit
              </Link>
              <button
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
                type="button"
                onClick={() => openDialog(property)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      {dialogOpen && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Delete Property</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-medium">{selectedProperty.name}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                onClick={handleDeleteProperty}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileProperties;
