import React, { useState } from "react";
import { User, MapPin, Settings, Upload, Download, Star, Award, Phone, Mail, Github } from "lucide-react";
import { useEffect } from "react";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Dummy StatCard component
const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-${color}-50 p-4 rounded-xl flex flex-col items-center`}>
    <div className="mb-1">{icon}</div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

// Dummy studyMaterials data
const studyMaterials = [
  { id: 1, title: "Material 1", author: "John Doe" },
  { id: 2, title: "Material 2", author: "Jane Smith" },
  { id: 3, title: "Material 3", author: "John Doe" },
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullName: "",
    stream: "",
    address: "",
    contactNumber: "",
    about: "",
    github: "",
    email: "",
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/profile`, user,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Faild to update profile:", err);
      toast.error("Failed to update profile. Try again");
    }
  };

  useEffect(() => {
    const fetchProfile = async() =>{
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/profile`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const profile = res.data;
      if (!profile || !profile.email) {
        toast.error("Invalid profile data. Please login again.");
        // localStorage.removeItem("token");
        // navigate('/login');
        return
      }
      setUser({
        fullName: profile.fullName || "",
        email: profile.email,
        contactNumber: profile.contactNumber || "",
        address: profile.address || "",
        about: profile.about || "",
        github: profile.github || "",
        stream: profile.stream || ""
      });
      console.log("profileData:",res.data)
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login");
        } else if (err.response?.status === 404) {
          toast.error("User profile not found.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          toast.error("Failed to load profile. Please try again.");
        }
      }
    }
    fetchProfile();
  }, [navigate])

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-20 mb-20">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-md">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative"></div>

        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 mb-4">
            <div className="relative">
              <div className="w-28 h-28 bg-white border-4 border-white rounded-xl flex items-center justify-center shadow-md">
                <User className="w-14 h-14 text-blue-600" />
              </div>
            </div>

            <div className="flex-1 ">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={user.fullName}
                    placeholder="enter your fullName"
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    className="text-2xl font-bold text-gray-900 mb-1 border-b border-gray-300 focus:outline-none w-full mt-14"
                  />
                  <input
                    type="text"
                    value={user.stream}
                    placeholder="enter your stream"
                    onChange={(e) => setUser({ ...user, stream: e.target.value })}
                    className="text-gray-600 text-sm border-b border-gray-300 focus:outline-none w-full"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 mt-14">{user.fullName}</h2>
                  <p className="text-gray-600 text-sm">{user.stream}</p>
                </>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <MapPin className="w-4 h-4" />
                {user.address}
              </div>
            </div>

            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-medium"
            >
              <Settings className="w-4 h-4" />
              {isEditing ? "Save" : "Edit Profile"}
            </button>
          </div>

          {isEditing && (
            <div className="mt-6 bg-gray-50 p-5 rounded-xl space-y-4 border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Location</label>
                  <input
                    type="text"
                    value={user.address}
                    placeholder="enter your address"
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone</label>
                  <input
                    type="text"
                    value={user.contactNumber}
                    onChange={(e) => setUser({ ...user, contactNumber: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">About</label>
                <textarea
                  value={user.about}
                  onChange={(e) => setUser({ ...user, about: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">GitHub</label>
                  <input
                    type="text"
                    value={user.github}
                    onChange={(e) => setUser({ ...user, github: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            <StatCard
              icon={<Upload className="w-4 h-4 text-blue-600" />}
              label="Uploads"
              value={studyMaterials.filter((m) => m.author === user.fullName).length}
              color="blue"
            />
            <StatCard
              icon={<Download className="w-4 h-4 text-green-600" />}
              label="Downloads"
              value="567"
              color="green"
            />
            <StatCard
              icon={<Star className="w-4 h-4 text-purple-600" />}
              label="Rating"
              value="4.8"
              color="purple"
            />
            <StatCard
              icon={<Award className="w-4 h-4 text-orange-600" />}
              label="Reputation"
              value="85"
              color="orange"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 md:col-span-2">
          <h3 className="font-semibold text-lg mb-3">About</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{user.about}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <h3 className="font-semibold text-lg mb-3">Contact</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {user.contactNumber}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <Github className="w-4 h-4" />{" "}
              <a
                href={`${user.github}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.github}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
