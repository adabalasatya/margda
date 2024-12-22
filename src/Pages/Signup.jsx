import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import { FaEnvelope, FaUser } from "react-icons/fa";
import OtpDialog from "../Components/OtpDialog"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Navbar from '../Components/navbar'

export const Sign = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    name: "",
    mobile: "",
    remember: true,
    terms: true,
    opt1: true,
    opt2: true,
    opt3: true,
    opt4: true,
    ip: "",
  });
  const [errors, setErrors] = useState({});
  const [count, setCount] = useState(0);
  const [imageHeight, setImageHeight] = useState(null);
  const imageRef = useRef(null); // Ref to get image element
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (value) => {
    setFormValues({ ...formValues, mobile: value });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleOpt = (e) => {
    const { name, value, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: checked,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.mobile)
      newErrors.mobile = "Please input your mobile number.";
    if (!formValues.email) newErrors.email = "Please input your email.";
    if (!formValues.name) newErrors.name = "Please input your name.";
    if (!formValues.terms)
      // Check the `terms` value
      newErrors.terms = "Please check Terms of Use and Privacy Policy."; // Show error related to terms
    return newErrors;
  };

  useEffect(() => {
    // Update form height based on image height Terms of Use and Privacy Policy.
    if (imageRef.current) {
      setImageHeight(imageRef.current.clientHeight);
    }
  }, []);

  const increment = () => {
    setCount((prevCount) => prevCount + 1); // Use functional update
  };

  // Function to generate a random OTP
  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
    setGeneratedOtp(otp); // Store the generated OTP
    return otp.toString(); // Convert to string for easy comparison
  };

  const sendOTPToEmail = async () => {
    const email = formValues.email;
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    const otp = generateOtp();
    const apiUrl = "https://certc.in:7000/api/margda/emailverification";
    try {
      const response = await axios.post(apiUrl, {
        email: email,
        otp: otp,
      });
      if (response.status == 200) {
        toast.success("OTP sent successfully");
        setOtpDialogOpen(true); // Open OTP dialog here
      } else if (response.status === 400) {
        alert("Email already exists, try to forget password");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      if (error.status === 400) {
        return toast.error(
          "Email alredy exist, try to forget login and password"
        );
      }
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again later.");
    }
  };

  const sendOTP = async () => {
    const mobileNumber = formValues.mobile;

    if (!mobileNumber) {
      toast.error("Please enter your mobile number.");
      return;
    }

    const otp = generateOtp(); // Generate the OTP
    const apiUrl = "https://certc.in:7000/api/sendotp"; // API URL

    try {
      const response = await axios.post(apiUrl, {
        phoneNumber: mobileNumber,
        otp: otp,
      });

      console.log("Response from OTP API:", response.data);

      if (response.status === 200) {
        toast.success("OTP sent successfully");
        setOtpDialogOpen(true); // Open OTP dialog here
      } else if (response.status === 400) {
        alert("Phone number already exists, try to forget password");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      if (error.status === 400) {
        return toast.error(
          "Phone number alredy exist, try to forget login and password"
        );
      }
      console.error("Error sending OTP:", error);
      toast.error("Error sending OTP. Please try again later.");
    }
  };

  const verifyOtp = (inputOtp) => {
    if (inputOtp == generatedOtp) {
      increment();
      toast.success("Verified successfully!");
      setOtpDialogOpen(false); // Close the OTP dialog after successful verification
      setOtpVerified(true);
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  const fetchIP = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      if (response.data && response.data.ip) {
        return response.data.ip;
      } else {
        return "0.0.0.0";
      }
    } catch (error) {
      return "0.0.0.0";
    }
  };

  const sendSignupRequest = async () => {
    if (count == 0 || count == 1) {
      return toast.error("Verify mobile number and email first");
    }

    const ip = await fetchIP();
    const { email, mobile, name } = formValues;

    const signupData = {
      email: email,
      phoneNumber: mobile,
      name: name,
      optW: formValues.opt1,
      optE: formValues.opt2,
      optC: formValues.opt3,
      optS: formValues.opt4,
      ip: ip,
    };

    const apiUrl = "https://certc.in:7000/api/usersignup";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();

      if (response.status === 200) {
        console.log(data);
        toast.success("Signup successful!");
        navigate("/login");
      } else if (data.Error) {
        alert(data.message);
        console.log(data);
      } else if (response.status === 400) {
        alert(data.message);
        console.log(data);
      } else if (response.status === 500) {
        alert(data.message);
        console.log(data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Signup failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((error) => toast.error(error)); // Show all errors using toast
      return;
    }
    sendSignupRequest();
  };

  return (
    <>
    <Navbar/>
      <div className="flex min-h-screen justify-center items-center">
        <div ref={imageRef} className="mt-30 w-1/2 hidden sm:flex">
          <img
            src="https://margdarshak.org/img/skill%20rehan.png"
            alt="Illustration"
            className="block"
          />
        </div>

        {/* Form Section */}
        <div
          className="flex flex-col justify-between p-6"
          style={{
            width: "550px",
            marginTop: "-50px",
          }}
        >
          <div className="flex items-center mb-4">
            <img
              src="https://margdarshak.in/img/Mlogo.png"
              alt=""
              className="w-12"
            />
            <h1 className="text-4xl font-bold ml-4 mb-6 mt-3">Sign Up</h1>
          </div>

          <div className="relative">
  {/* Name Input */}
  <div
    className="flex items-center border border-gray-400 rounded-lg overflow-hidden hover:border-orange-500 focus-within:border-orange-500 transition"
    style={{ width: "420px" }}
  >
    <div className="p-4">
      <FaUser className="text-black-500" />
    </div>
    <input
      id="name"
      name="name"
      type="text"
      placeholder="Name"
      value={formValues.name}
      onChange={handleInputChange}
      className="w-full p-3 text-sm focus:outline-none"
    />
  </div>
</div>

<br />

{/* Phone Input with OTP button */}
<div className="relative mb-4 space-y-2">
  <div className="flex items-center space-x-2">
    <PhoneInput
      country={"in"}
      value={formValues.mobile}
      onChange={handlePhoneChange}
      placeholder="Mobile"
      inputStyle={{
        width: "100%",
        height: "50px",
        paddingLeft: "58px",
      }}
    />
    <button
      className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 shadow-md"
      onClick={sendOTP}
    >
      OTP
    </button>
  </div>
</div>

{/* Email Input */}
<div className="flex items-center">
  <div className="flex-grow">
    <div className="flex items-center border border-gray-400 rounded-lg overflow-hidden hover:border-orange-500 focus-within:border-orange-500 transition">
      <div className="p-2">
        <FaEnvelope className="text-black-500" />
      </div>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleInputChange}
        className="w-full p-3 border-l focus:outline-none"
      />
    </div>
  </div>
  <button
    onClick={sendOTPToEmail}
    className="ml-2 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
  >
    OTP
  </button>
</div>


        
       
<br />
   

<div class="mb-4 space-y-3">
    <label class="flex items-center space-x-2">
      <input
        type="checkbox"
        id="terms"
        name="terms"
        checked={formValues.terms}
        onChange={handleInputChange}
        class="rounded focus:ring focus:ring-blue-300"
      />
      <span class="text-sm text-gray-600">
        I agree to the <a href="#" class="text-orange-600 font-medium">Terms of Use</a> and <a href="#" class="text-orange -600 font-medium">Privacy Policy</a>.
      </span>
    </label>
  </div>

  
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-600 mb-2">I consent to receive updates via:</label>
    
    <div className="flex flex-rw m-1 ">
              <div className="m-1">
                <input
                  type="checkbox"
                  name="opt1"
                  id="1-opt"
                  className="m-1"
                  checked={formValues.opt1}
                  onChange={handleOpt}
                />
                <label htmlFor="1-opt">Whatsapp</label>
              </div>
              <div className="m-1">
                <input
                  type="checkbox"
                  id="2-opt"
                  name="opt2"
                  className="m-1"
                  checked={formValues.opt2}
                  onChange={handleOpt}
                />
                <label htmlFor="2-opt">Email</label>
              </div>
              <div className="m-1">
                <input
                  type="checkbox"
                  id="3-opt"
                  className="m-1"
                  name="opt3"
                  checked={formValues.opt3}
                  onChange={handleOpt}
                />
                <label htmlFor="3-opt">Call</label>
              </div>
              <div className="m-1">
                <input
                  type="checkbox"
                  id="4-opt"
                  name="opt4"
                  className="m-1"
                  checked={formValues.opt4}
                  onChange={handleOpt}
                />
                <label htmlFor="4-opt">SMS</label>
              </div>
            </div>

    <p class="text-sm text-gray-600 mt-2">
      You can opt-out anytime by replying <b> 'STOP'</b>.
    </p>
  </div>

  
  <div class="mt-6">
    <button
      class="w-full bg-orange-500 text-white text-lg font-medium py-3 rounded-lg hover:bg-orange-600 focus:ring focus:ring-blue-300"
      onClick={handleSubmit}
    >
      Sign Up
    </button>
  </div>

  
  <div className="text-center mt-4 text-sm">
  <p className="text-black-700">
    Already have an account?{' '}
    <NavLink
      to="/login"
      className="text-orange-400 font-medium  hover:text-orange-600 transition duration-300"
    >
      Sign In
    </NavLink>
  </p>
</div>


          {/* OTP Dialog */}
          {otpDialogOpen && (
            <OtpDialog
              open={otpDialogOpen}
              onClose={() => setOtpDialogOpen(false)}
              onSubmit={verifyOtp} // Pass the verifyOtp function here
            />
          )}

          {/* Toast Notification Container */}
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </>
  );
};

export default Sign;