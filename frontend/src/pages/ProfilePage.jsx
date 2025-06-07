import React, { useState } from "react";
import { Camera, Mail, Calendar, Shield, User, Edit3 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { formatJoinDate } from "../constants/formatDates";

const ProfilePage = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  // Handle image upload (mock Cloudinary integration)
  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 mt-12">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Profile Settings
          </h1>
          <p className="text-slate-400"> Your account information</p>
        </div>

        {/* Main Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl border border-white/20">
            {/* Profile Picture Section */}
            <div className="text-center my-12">
              <div className="relative inline-block">
                <div
                  className={`relative ${
                    isUpdatingProfile ? "animate-pulse cursor-not-allowed" : ""
                  }`}
                >
                  <img
                    src={selectedImage || authUser.profilePic || "/avatar.jpg"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg"
                  />
                </div>

                <label
                  className={`absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg`}
                >
                  <Camera size={18} className={`cursor-pointer`} />
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              {/* <div className="mt-4">
                <h2 className="text-2xl font-bold text-white">
                  {authUser.fullName}
                </h2>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-slate-300"></span>
                </div>
              </div> */}
            </div>

            {/* Information Cards */}
            <div className="space-y-4">
              {/* Full name Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl mr-4">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                      Full Name
                    </h3>
                    <p className="text-white text-lg font-medium">
                      {authUser.fullName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-xl mr-4">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                      Email Address
                    </h3>
                    <p className="text-white text-lg font-medium">
                      {authUser.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl mr-4">
                    <Calendar size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                      Member Since
                    </h3>
                    <p className="text-white text-lg font-medium">
                      {formatJoinDate(authUser.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Status Card */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl mr-4">
                    <Shield size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                      Account Status
                    </h3>
                    <div className="flex items-center mt-1">
                      <p className="text-white text-lg font-medium capitalize">
                        {authUser && "Active"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Instructions */}
            <div className="mt-8 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
              <div className="flex items-start">
                <div className="bg-purple-500/20 p-2 rounded-lg mr-3 mt-0.5">
                  <Edit3 size={16} className="text-purple-400" />
                </div>
                <div>
                  <h4 className="text-purple-300 font-medium mb-1">
                    Editable Content
                  </h4>
                  <p className="text-slate-400 text-sm">
                    Only your profile picture can be updated. Click the camera
                    icon to upload a new image.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
