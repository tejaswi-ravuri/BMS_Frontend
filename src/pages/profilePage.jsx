import { useEffect, useState } from "react";
import { User, Mail, Shield, Phone, Edit2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
  });

  const userinfo = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (userinfo) {
      setProfileData({
        name: userinfo.name || "",
        email: userinfo.email || "",
        role: userinfo.role || "",
        phone: userinfo.phone || "",
      });
    }
  }, [userinfo]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: send updated profileData to API here
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-3xl">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {profileData?.name || "No Name"}
          </h2>
          <p className="text-gray-500 capitalize">{profileData.role}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-800">
              <User size={16} />
              {profileData.name || "No Name"}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-800">
              <Mail size={16} />
              {profileData.email || "No Email"}
            </div>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2"
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-800">
              <Phone size={16} />
              {profileData.phone || "No Phone"}
            </div>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <div className="flex items-center gap-2 text-gray-800">
            <Shield size={16} />
            {profileData.role || "No Role"}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border"
          >
            <Edit2 size={16} /> Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
