"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    username: "",
    email:"",
    password:"",
    role:"CUSTOMER",
    referralCode:""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const res = await fetch("http://localhost:8099/auth/register",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body: JSON.stringify(formData)
      }) 
      if(!res.ok){
        const errorData = await res.json()
        alert(errorData.message || "General Register Error")
      }else{
        alert("Register Success")
        setFormData(
          {
            username: "",
            email:"",
            password:"",
            role:"CUSTOMER",
            referralCode:""
          }
        )
      }

    }catch(error){
      console.error("Error: ",error)
      alert("Server error")
    }
  };

  return (
    <main className="font-rethink min-h-screen flex items-center justify-center bg-black p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white/20">
        <h1 className="text-3xl font-bold text-white  text-center mb-6 tracking-wide">
          Welcome To Zeuss
        </h1>
        <p className="text-center text-white/80 mb-8 text-sm">
          Create new account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="youremail@example.com"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-white text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="youremail@example.com"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
        
        <div>
            <label className="block text-white text-sm mb-2">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="youremail@example.com"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-white  text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-white/60 hover:text-white"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white text-sm mb-2">
              Referral Code (optional)
            </label>
            <input
              type="text"
              name="referralCode"
              value={formData.referralCode}
              onChange={handleChange}
              placeholder="youremail@example.com"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-white/70 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-white font-semibold cursor-pointer hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
