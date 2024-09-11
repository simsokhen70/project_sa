"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import VerifyOtpModal from "@/components/Modal/VerifyOtpModal";
import { registerUser } from "@/services/authservice.service";
import axios from "axios";
import { API_URL } from "@/api/inteceptor";
import { showToast } from "@/services/commonfunction.service";
import { signIn } from "next-auth/react";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerifyOtpModalOpen, setIsVerifyOtpModalOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setProfile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (profile !== null) {
      console.log("hahahah", profile)
      formData.append('image', profile);
      try {
        const response = await axios.post(`${API_URL}/api/v1/images/file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('File uploaded successfully', response.data);
        const userProfile = `${API_URL}/api/v1/images/getImage?fileName=${response?.data?.payload}`
        const res = await registerUser(username, password, email, userProfile);
        console.log({ res });
        if (res.status === 200) {
          setLoading(false);
          setIsVerifyOtpModalOpen(true);
        } else {
          showToast(res?.response?.data?.message)
          setLoading(false);
        }
      } catch (error) {
        console.error('Error uploading file', error);
        setLoading(false);
      }
    } else {
      try {
        const dfProfile = "https://img.freepik.com/premium-vector/3d-character-businessman-working-laptop-computer_595064-185.jpg"
        const res = await registerUser(username, password, email, dfProfile);
        if (res.status === 200) {
          setLoading(false);
          setIsVerifyOtpModalOpen(true);
        } else {
          showToast(res?.response?.data?.message)
          setLoading(false);
        }
      } catch (error) {
        console.error('Error uploading file', error);
        setLoading(false);
      }
    }
  }

  

return (
  <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
    <div className="container">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto max-w-[500px] rounded-md bg-white px-6 py-10 shadow-xl dark:bg-dark sm:p-[60px]">
            <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
              Create your account
            </h3>
            <p className="mb-11 text-center text-base font-medium text-body-color">
              Join us for a seamless experience.
            </p>
            <form onSubmit={handleSubmit}>
              <Tabs aria-label="Options">
                <Tab key="form" title="User Detail">
                  {/* Username, email, and password fields remain the same */}
                  <div className="mb-8">
                    <label
                      htmlFor="username"
                      className="mb-3 block text-sm font-medium text-body-color dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-md border border-transparent bg-[#f8f8f8] px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm font-medium text-body-color dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-transparent bg-[#f8f8f8] px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm font-medium text-body-color dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-transparent bg-[#f8f8f8] px-6 py-3 text-base text-body-color placeholder-body-color outline-none focus:border-primary focus:border-opacity-100 focus-visible:shadow-none dark:border-white dark:border-opacity-10 dark:bg-[#2C303B] dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                </Tab>
                <Tab key="profile" title="Profile">
                  {/* Modern Profile Upload UI */}
                  <div className="mb-8">
                    <label className="mb-3 block text-sm font-medium text-body-color dark:text-white">
                      Profile Picture
                    </label>
                    <div
                      {...getRootProps()}
                      className={`dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${isDragActive ? "border-primary" : "border-gray-300"
                        }`}
                    >
                      <input {...getInputProps()} />
                      {profile ? (
                        <div className="relative h-full w-full">
                          <Image
                            src={URL.createObjectURL(profile)}
                            alt="Profile preview"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                            <p className="text-center text-white">
                              Click or drag to replace
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <svg
                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>
              </Tabs>

              <div className="mb-6">
                <button
                  type="submit"
                  className="flex h-[50px] w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="custom-loader"></div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <div className="my-3 flex justify-center items-center">
                <hr className="w-full" />
                <span className="mx-2"> Or </span>
                <hr className="w-full" />
                </div>
                <button
                  onClick={()=>signIn("google")}
                  className="border-stroke mb-6 flex w-full items-center justify-center rounded-xl border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
                >
                  <span className="mr-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_95:967)">
                        <path
                          d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_95:967">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign up with Google
                </button>
              </div>
            </form>
            <p className="text-center text-base font-medium text-body-color">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    {/* Background SVG remains the same */}
    <VerifyOtpModal email={email} isVerifyOtpModalOpen={isVerifyOtpModalOpen} setIsVerifyOtpModalOpen={setIsVerifyOtpModalOpen} />
  </section>
);
}
