"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import VerifyOtpModal from "@/components/Modal/VerifyOtpModal";
import { registerUser } from "@/services/authservice.service";
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
    setIsVerifyOtpModalOpen(true);

    // setLoading(true);
    // registerUser(username, password, email, "string").then((res) => {
    //     console.log({res})
    //     if(res.status === 200) {
    //         setLoading(false);
    //         setIsVerifyOtpModalOpen(true);
    //     }
    //     setLoading(false);

    // })

    // console.log({ username, password, email, profile });
  };

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
                        className={`dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-gray-50 transition-all duration-300 ease-in-out hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${
                          isDragActive ? "border-primary" : "border-gray-300"
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
