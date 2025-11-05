'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import CopyTextButton from "@/component/copytextbutton";

export default function Profile(){

    interface User {
        username: string;
        email: string;
        role: string;
        profilePicture?: string;
        referralNumber?:string;
    }
    interface Form {
        username:string;
        email:string;
        profilePicture?:string;
    }
    
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        email:"",
        username:"",
        profilePicture:""
    })

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:8099/auth/me", {
          credentials: "include", // biar dapet cookie
        });
        // if (!res.ok) throw new Error("Not logged in");

        const data = await res.json();
        console.log(data);
        setUser(data.user);
        setFormData({email:data.user.email,username:data.user.username, profilePicture:data.user.profilePicture})
        setPreview(data.user.profilePicture)
      } catch (err) {
        setUser(null); // token tidak valid atau belum login
      }
    };

    checkLogin();
  }, []);
  const [isModalOpened, setIsModalOpened] = useState(false);
  
    const openModal = () => {
      setIsModalOpened(true);
    };
  
    const closeModal = () => {
      setIsModalOpened(false);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImageFile(file);
          setPreview(URL.createObjectURL(file));
        }
      };

    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const form = new FormData();
        form.append("username", formData.username);
        form.append("email", formData.email);
    
        if (imageFile) {
            console.log('imageFile ada')
          form.append("profilePicture", imageFile);
        }
    
        try {
          const res = await fetch("http://localhost:8099/auth/edit-profile", {
            method: "POST",
            body: form,
            credentials: "include"
          });
          console.log(res)
          if (!res.ok) throw new Error("Upload gagal");
        
    
          alert("Update Profile Success");
    
        } catch (error) {
          console.error(error);
          alert("Failed to Update Profile");
        }
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleLogout = async () => {
    const res = await fetch("http://localhost:8099/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = res.json();
      console.log(data);
      if (res.ok) {
        setUser(null);
        alert("berhasil logout");
      }
    };


    return(
        <main className="flex justify-center items-center font-rethink text-white bg-[#071029] w-full min-h-screen">
            <section className="h-fit py-20 px-40 w-fit gap-5 flex flex-col justify-center items-center border bg-gradient-to-r from-white/2 to-white/7 border-white/5 shadow-2xl rounded-lg overflow-hidden m-3 mt-19">
                <div className="flex gap-10 justify-center items-center">
                    <div className="flex justify-center items-center ">
                        {
                            user?.profilePicture ?
                        <Image src={user?.profilePicture} alt="photo profile" height={150} width={150} className="rounded-full object-cover"/> 
                        :
                        <Image src="/photoprofile.png" alt="photo profile" height={150} width={150} className="rounded-full object-cover"/>
                        }
                    </div>
                    <div className="tracking-wider gap-2 flex flex-col">
                        <p className="text-white/50">Username:  <span className="text-white font-bold">{user?.username}</span></p>
                        <p className="text-white/50">Email:  <span className="text-white font-bold">{user?.email}</span></p> 
                        <p className="text-white/50">Role:  <span className="text-white font-bold">{user?.role}</span></p>
                        <div className="text-white/50">Referral Code:  <span className="text-white font-bold">{user?.referralNumber}</span> <CopyTextButton text={user?.referralNumber as string} /></div>
                        
                    </div>
                </div>
                <div className="flex gap-10">
                     <button onClick={openModal} className="mt-5 h-10 w-45 rounded-sm hover:scale-101 transition hover:cursor-pointer bg-gradient-to-r hover:from-indigo-600/50 hover:to-indigo-600/70 from-indigo-600/20 to-indigo-600/30 border-indigo-600/25 shadow-2xl">Edit Profile</button>
                     <button onClick={handleLogout} className="mt-5 h-10 w-45 rounded-sm hover:scale-101 transition hover:cursor-pointer bg-gradient-to-r hover:from-indigo-600/50 hover:to-indigo-600/70 from-indigo-600/20 to-indigo-600/30 border-indigo-600/25 shadow-2xl">Logout</button> 
                </div>
           



                {isModalOpened && (
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition">
                      <div className="bg-gray-900 rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
                        
                        <div className="justify-between bg-gradient-to-r from-indigo-700/25 to-indigo-600/10 border-b border-white/10 text-white py-4 px-10 flex items-center rounded-t-lg">
                          <div className=" flex items-center gap-3">
                            <p className="font-bold text-xl">Edit Profile</p>
                          </div>
                          <button
                            onClick={closeModal}
                            className=" hover:bg-indigo-700 hover:cursor-pointer rounded-full h-10 w-10 flex justify-center items-center p-2 transition-colors"
                          >
                            <p className="text-2xl font-semibold">x</p>
                          </button>
                        </div>
            
                      
                        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-5">
                            <div className="flex gap-10 justify-center items-center">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="input-style hover:bg-indigo-600/40 hover:scale-101 transition bg-white/5 rounded-sm px-5 py-1 w-fit flex justify-center items-center"
                                        />
                                        {preview && (
                                        <img
                                            src={preview?preview:"/photoprofile.png"}
                                            alt="Preview"
                                            className="h-50 w-50 object-cover rounded-full border border-white/30"
                                        />
                                        )}
                                </div>
                                <div className="tracking-wider gap-2 flex flex-col">
                                    <div className="flex gap-4 items-center justify-between">
                                        <label className="items-center flex">
                                            <p className="text-sm text-white/70">Username</p>
                                            </label>
                                            <input
                                            type="text"
                                            name="username"
                                            onChange={handleChange}
                                            value={formData.username}
                                            placeholder="username"
                                            required
                                            className="flex items-center text-sm w-50 px-3 py-1 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                            />
                                    </div>
                                    <div className="flex gap-4 items-center justify-between">
                                        <label className="items-center flex">
                                            <p className="text-sm text-white/70">Email</p>
                                            </label>
                                            <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            value={formData.email}
                                            placeholder="email"
                                            required
                                            className="flex items-center text-sm w-50 px-3 py-1 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                            />
                                    </div>
                                        
                                    
                                </div>
                            </div>
                            <div className="flex gap-10 justify-center items-center">
                                <button type="submit" className="mt-5 h-10 px-20 rounded-sm hover:scale-101 transition hover:cursor-pointer bg-gradient-to-r hover:from-indigo-600/50 hover:to-indigo-600/70 from-indigo-600/20 to-indigo-600/30 border-indigo-600/25 shadow-2xl">Submit Edit Profile</button>
                            </div>   
                      </form>
                    </div>
                  </div>
                  )}
            </section>
        </main>
    )
}
