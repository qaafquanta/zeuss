"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import cookieParser from "cookie-parser";
  
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  })

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const res = await fetch("http://localhost:8099/auth/login",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(formData),
        credentials:"include" //biar cookienya masuk
      })
      if(!res.ok){
        const errorData = await res.json()
        alert(errorData.message || "General Login Error")
      }else{
        alert("Login Success")
        setFormData({
          email:"",
          password:""
        })
      }

    }catch(error){
      console.error(error);
      alert("Server Error")
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className="font-rethink min-h-screen flex items-center justify-center bg-[#071029] p-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-white/20">
        <h1 className="text-3xl font-bold text-white  text-center mb-6 tracking-wide">
          Welcome To Zeuss
        </h1>
        <p className="text-center text-white/80 mb-8 text-sm">
          Please log in to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="youremail@example.com"
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-white  text-sm mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={formData.password}
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

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-white/70 mt-6 text-sm">
          Don`t have an account?{" "}
          <a
            href="/register"
            className="text-white font-semibold cursor-pointer hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
