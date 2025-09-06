"use client";
import React, { useState } from "react";
import { User, Edit3, Package, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
//   const [activeTab, setActiveTab] = useState("listings");
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-green-50 p-4 md:p-8">
      <div className=" w-full justify-center items-center mx-auto flex flex-col md:flex-row gap-6">
        {/* Left Panel */}
        <div className="w-full md:w-80 bg-white rounded-xl p-6 shadow-md flex-shrink-0">
          {/* Profile Picture */}
          <div className="relative mb-6 flex flex-col items-center">
            <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
              <User className="w-16 h-16 text-green-500" />
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="absolute top-0 right-4 bg-green-200 hover:bg-green-300 p-2 rounded-full transition-colors"
            >
              <Edit3 className="w-4 h-4 text-green-700" />
            </button>
          </div>

          {/* User Info */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-gray-700">User Info</h3>
            <div className="space-y-3">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label className="block text-sm text-gray-500 mb-1 capitalize">
                    {field}
                  </label>
                  {isEditing ? (
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={userInfo[field]}
                      onChange={(e) =>
                        handleInputChange(field, e.target.value)
                      }
                      className="w-full bg-green-50 border border-green-200 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                  ) : (
                    <div className="bg-green-50 rounded px-3 py-2 text-gray-700">
                      {userInfo[field]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-green-400 hover:bg-green-500 px-4 py-2 rounded-lg font-semibold text-white transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold text-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Navigation</h3>
            <div className="space-y-2">
              <button
                onClick={() => router.push("/listings")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                    : "bg-green-50 hover:bg-green-100 text-green-700"
                `}
              >
                <Package className="w-5 h-5" />
                <span>My Listings</span>
              </button>
              <button
                onClick={() => router.push("/cart")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors 
                    : "bg-green-50 hover:bg-green-100 text-green-700"
                `}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>My Purchases</span>
              </button>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
}
