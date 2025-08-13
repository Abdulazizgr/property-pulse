"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/action/markMessageAsRead";
import deleteMessage from "@/app/action/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
    toast.success(`Marked as ${read ? "read" : "new"}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);
    setIsDeleted(true);
    setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
    toast.success("Message Deleted");
  };

  if (isDeleted) return null;

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition duration-200 flex flex-col">
      {/* New Badge */}
      {!isRead && (
        <span className="absolute top-4 right-4 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
          New
        </span>
      )}

      {/* Header */}
      <h2 className="text-xl font-semibold mb-3">
        Property Inquiry:{" "}
        <span className="text-blue-600">{message.property.name}</span>
      </h2>

      {/* Message Body */}
      <p className="text-gray-700 mb-4">{message.body}</p>

      {/* Contact Info */}
      <ul className="text-sm text-gray-600 space-y-1 mb-4">
        <li>
          <strong>Email:</strong>{" "}
          <a
            href={`mailto:${message.email}`}
            className="text-blue-500 hover:underline"
          >
            {message.email}
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <a
            href={`tel:${message.phone}`}
            className="text-blue-500 hover:underline"
          >
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>

      {/* Actions */}
      <div className="mt-auto flex gap-3 justify-end">
        <button
          onClick={handleReadClick}
          className={`py-2 px-4 rounded-md ${
            isRead
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
          } transition`}
        >
          {isRead ? "Mark as New" : "Mark as Read"}
        </button>
        <button
          onClick={handleDeleteClick}
          className="py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MessageCard;
