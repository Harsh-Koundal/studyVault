import React, { useState } from "react";
import { User, MapPin, Settings, Upload, Download, Star, Award, Phone, Mail, Github } from "lucide-react";

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
  const [user, setUser] = useState({
    name: "John Doe",
    course: "Computer Science",
    location: "New York, USA",
    phone: "+1 234 567 890",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    github: "github.com/johndoe",
    email: "johndoe@example.com",
  });

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-20">
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
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="text-2xl font-bold text-gray-900 mb-1 border-b border-gray-300 focus:outline-none w-full mt-14"
                  />
                  <input
                    type="text"
                    value={user.course}
                    onChange={(e) => setUser({ ...user, course: e.target.value })}
                    className="text-gray-600 text-sm border-b border-gray-300 focus:outline-none w-full"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1 mt-14">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.course}</p>
                </>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                <MapPin className="w-4 h-4" />
                {user.location}
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
                    value={user.location}
                    onChange={(e) => setUser({ ...user, location: e.target.value })}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Phone</label>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
              value={studyMaterials.filter((m) => m.author === user.name).length}
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
              <Phone className="w-4 h-4" /> {user.phone}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <p className="flex items-center gap-2">
              <Github className="w-4 h-4" />{" "}
              <a
                href={`https://${user.github}`}
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
