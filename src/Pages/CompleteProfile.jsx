import { useEffect, useState } from "react";
import logo from "../assets/margdarshakendra-logo.webp";
import axios from "axios";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";

 const CompleteProfile = () => {
  const navigate = useNavigate();

  const [userID, setUserID] = useState();
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    mobile: "",
    whatsap: "",
    dob: "",
    gender: "",
    login: "",
    pic_url: "",
    userID: "",
    address: "",
    placeID: "",
    pic_url: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const fetchProfile = async () => {
    const userID = localStorage.getItem("userID");
    setUserID(userID);
    try {
      const response = await axios.post(
        "https://certc.in:7000/api/getuserdata",
        { userID }
      );
      if (response.status === 200) {
        setFormValues({ ...response.data.User[0] });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          alert("User not found, Please login again");
          navigate("/login");
        }
      }
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({ ...formValues, file: e.target.files[0] });
      const picUrl = URL.createObjectURL(file);
      setFormValues((prevValues) => ({
        ...prevValues,
        pic_url: picUrl,
      }));
    }
  };

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const uploadProfilePic = async () => {
    const formData = new FormData();
    if (!formValues.file) {
      return alert("Select Profile Picture");
    }
    formData.append("file", formValues.file);
    formData.append("folderId", "1IQnC99iIWmOe7xxAwMl8_OnPth8ClREa");

    try {
      const response = await fetch(
        "https://certc.in:7000/api/uploadfile-on-googledrive",
        { method: "POST", body: formData }
      );
      if (response.ok) {
        const data = await response.json();
        await updateProfile(data.fileUrl);
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Upload Profile Pic Error:", error);
      alert("Failed to upload profile picture. Using default picture.");
      await updateProfile(
        "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formValues.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formValues.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formValues.dob) {
      newErrors.dob = "Date of Birth is required";
    }
    if (!formValues.whatsap) {
      newErrors.whatsap = "Whatsapp Number is required";
    }
    if (!formValues.address) {
      newErrors.address = "Address is required";
    }
    if (!formValues.placeID) {
      newErrors.placeID = "Pin Code is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await uploadProfilePic();
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Profile update failed. Please try again later.");
    }
  };

  const updateProfile = async (pic_url) => {
    const payload = {
      userID: userID,
      login: formValues.login,
      mobile: formValues.mobile,
      whatsappMobile: formValues.whatsap,
      email: formValues.email,
      name: formValues.name,
      gender: formValues.gender,
      DOB: formValues.dob,
      address: formValues.address,
      pic_url: pic_url,
      placeID: formValues.placeID,
    };

    try {
      const response = await axios.put("https://certc.in:7000/api/updateuser", payload);
      if (response.data.message === "User updated successfully") {
        navigate("/dashboard");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      alert("Failed to update profile. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100 flex justify-center items-center">
    {/* Logo */}
    <div className="absolute top-4 left-4">
      <img src={logo} alt="Logo" className="w-36" />
    </div>
  
    {/* Card Container */}
    <div className="bg-white p-8 w-full max-w-4xl shadow-lg rounded-xl">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800">Complete Your Profile</h2>
        <p className="text-gray-500 mt-2">Help us know you better by filling out the details below.</p>
      </div>
  
      {/* Form */}
      <div className="bg-white p-6 shadow-sm rounded-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <img
              src={formValues.pic_url || "https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png"}
              alt="Profile Picture"
              className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md mb-4"
            />
            <label
              htmlFor="profilePic"
              className="text-sm text-blue-600 cursor-pointer hover:underline"
            >
              Upload Profile Picture
            </label>
            <input
              type="file"
              onChange={handleProfilePicChange}
              accept="image/*"
              id="profilePic"
              className="hidden"
            />
          </div>
  
          {/* Name, Gender, and Dob Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700 block text-left">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={handleOnInputChange}
                value={formValues.name}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="gender" className="text-sm font-medium text-gray-700 block text-left">
                Gender
              </label>
              <select
                name="gender"
                onChange={handleOnInputChange}
                value={formValues.gender}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
          </div>
  
          {/* Mobile, WhatsApp, Email Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="mobile" className="text-sm font-medium text-gray-700 block text-left">
                Mobile
              </label>
              <input
                type="text"
                value={formValues.mobile}
                placeholder="Mobile"
                disabled
                className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 text-gray-600 outline-none"
              />
            </div>
            <div>
              <label htmlFor="whatsap" className="text-sm font-medium text-gray-700 block text-left">
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsap"
                value={formValues.whatsap}
                placeholder="Enter WhatsApp Number"
                onChange={handleOnInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.whatsap && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsap}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700 block text-left">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleOnInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>
  
          {/* Date of Birth, Address, Pin Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="dob" className="text-sm font-medium text-gray-700 block text-left">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={formValues.dob}
                onChange={handleOnInputChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            <div>
              <label htmlFor="address" className="text-sm font-medium text-gray-700 block text-left">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={handleOnInputChange}
                placeholder="Enter your address"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>
            <div>
              <label htmlFor="placeID" className="text-sm font-medium text-gray-700 block text-left">
                Pin Code
              </label>
              <input
                type="text"
                name="placeID"
                value={formValues.placeID}
                onChange={handleOnInputChange}
                placeholder="Pin Code"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              {errors.placeID && (
                <p className="text-red-500 text-sm mt-1">{errors.placeID}</p>
              )}
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-200"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default CompleteProfile