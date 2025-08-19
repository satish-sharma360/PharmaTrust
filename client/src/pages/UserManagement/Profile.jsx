import React, { useState, useRef } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { Camera, Download, LogOut } from "lucide-react";
import jsPDF from "jspdf";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, updateUserFailure, updateUserStart, updateUserSuccess } from "../../redux/userSlice";
import axios from "axios";

const Profile = () => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const {currentUser , loading , error} = useSelector(state=>state.user)

  // Dummy user data
  //   const dummyUser = {
  //     username: 'Shahaam Marzook',
  //     email: 'shahaam@example.com',
  //     phonenumber: '9876543210',
  //     address: '123, Elm Street, City',
  //     avatar: 'https://avatars.githubusercontent.com/u/165793855?v=4',
  //   };

  const [formData, setFormData] = useState(dummyUser);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Fake upload simulation
    setFile(selectedFile);
    setFilePerc(0);
    const interval = setInterval(() => {
      setFilePerc((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFormData({
            ...formData,
            avatar: URL.createObjectURL(selectedFile),
          });
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const formDataToSend = new FormData();

      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phonenumber", formData.phonenumber);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("password", formData.password);

      if (file) {
        formDataToSend.append('avatar',file)
      }

      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/update/${currentUser._id}`,formDataToSend,{headers :{'Content-Type': 'application/json'}})

      if (!data) {
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch((updateUserSuccess(data)))
      setUpdateSuccess(true)
    } catch (error) {
        dispatch(updateUserFailure(error.message))
    }
  };

  const handleDeleteUser = async () =>{
    try {
        dispatch(deleteUserStart())
        const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/delete/${currentUser._id}`)
        if (!data.success) {
            dispatch(deleteUserFailure(data.message))
            return;
        }
        dispatch(deleteUserSuccess(data))
    } catch (error) {
        dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () =>{
    try {
        dispatch(signOutUserStart())
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sign-out`)
        if (data.success) {
            dispatch(deleteUserFailure(data.message))
            return;
        }
        dispatch(deleteUserSuccess(data))
    } catch (error) {
        dispatch(deleteUserFailure(data.message))
    }
  }

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Profile Information", 20, 20);
    const tableData = [
      ["Username", formData.username],
      ["Email", formData.email],
      ["Phone", formData.phonenumber],
      ["Address", formData.address],
    ];
    doc.autoTable({
      startY: 30,
      body: tableData,
      theme: "grid",
    });
    doc.save("Profile.pdf");
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navigation />
      <div className="backdrop-blur-md bg-white/20 border border-slate-300 rounded-3xl mx-auto my-10 p-8 max-w-md flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-slate-800">Profile</h1>
          <button onClick={handleSignOut} className="flex items-center gap-1 text-red-700 font-semibold">
            <LogOut size={18} /> Log Out
          </button>
        </div>

        {/* Avatar */}
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={handleFileChange}
        />
        <img
          src={formData.avatar}
          alt="profile"
          className="h-24 w-24 rounded-full object-cover self-center cursor-pointer border border-slate-300"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {filePerc > 0 && filePerc < 100
            ? `Uploading ${filePerc}%`
            : filePerc === 100
            ? "Image successfully uploaded!"
            : ""}
        </p>

        {/* Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-3 rounded-lg bg-slate-50"
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg bg-slate-50"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            id="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            className="border p-3 rounded-lg bg-slate-50"
          />
          <input
            type="text"
            placeholder="Address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-3 rounded-lg bg-slate-50"
          />

          <button
            type="submit"
            className="bg-blue text-white p-3 rounded-lg hover:opacity-95"
          >
            Update Profile
          </button>

          {updateSuccess && (
            <p className="text-green-700 text-center">
              Profile updated successfully!
            </p>
          )}
          <button onClick={handleDeleteUser}
            type="submit"
            className="bg-red-500 text-white p-3 rounded-lg hover:opacity-95"
          >
            Delete Account
          </button>
        </form>

        {/* Export PDF */}
        <button
          onClick={handleExportPDF}
          className="flex items-center justify-center gap-2 bg-slate-700 text-white p-3 rounded-lg hover:bg-slate-800 mt-2"
        >
          <Download size={18} /> Export PDF
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
