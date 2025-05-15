import React from "react";
import { useState } from "react";
import { useUser } from "@civic/auth-web3/react";
import BottomNav from "../components/BottomNav";

const CustomerCare = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 pb-20 flex flex-col">
      <div className="mx-auto max-w-fit rounded-full  content-center shadow-md p-6 mb-8">
        <img
          className="customer-image"
          src="public/images/Customer Service Day.jpg"
          alt=""
        />
      </div>
      {/* Header */}
      <h1 className="text-2xl text-center font-bold mb-8">Contact Us</h1>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 mb-8 flex-1"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Submit your message request"
            required
          ></textarea>
        </div>
        <>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Submit
          </button>
        </>
      </form>
    </div>
  );
};

export default CustomerCare; // 👈 Must be present
