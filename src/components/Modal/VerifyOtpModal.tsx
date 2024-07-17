"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { deployHtml, runningApp } from "@/services/deployapp.service";
import { debounce } from "@mui/material";
import { validateOtpToVerifiedRegister } from "@/services/validateopt.service";
import { showToastSuccess } from "@/services/commonfunction.service"
import { useRouter } from "next/navigation";

export default function VerifyOtpModal({
  email,
  isVerifyOtpModalOpen,
  setIsVerifyOtpModalOpen,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);
  const router = useRouter();
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    setIsVerifying(true);

    validateOtpToVerifiedRegister(email, otpValue).then((res) => {
      console.log({ res });
      if (res?.status === 200) {
        showToastSuccess("You have registered successfully! Please sign in your account.");
        setIsVerifying(false);
        setIsVerifyOtpModalOpen(false);
        router.push("/signin");
      }
      setIsVerifying(false);
    });

    // Simulating API call
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Submitting OTP:", otpValue);
    // Add your verification logic here
  };

  const handleVerifiedInEmail = () => {
    setIsVerifyOtpModalOpen(false);
    window.open("https://mail.google.com/mail/u/");
  }

  return (
    <div>
      <Modal
        size="4xl"
        isOpen={isVerifyOtpModalOpen}
        onOpenChange={() => setIsVerifyOtpModalOpen(false)}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <div className="flex h-fit flex-col bg-gray-100 md:flex-row">
                  <div className="flex flex-col justify-center bg-blue-600 p-12 text-white md:w-1/2">
                    <h1 className="mb-6 text-4xl font-bold">
                      Verify Your Account
                    </h1>
                    <p className="mb-8 text-xl">
                      Enter the 6-digit code we sent to your email to confirm
                      your account and get started.
                    </p>
                    <div className="mt-auto">
                      <p className="text-sm opacity-75">Need help?</p>
                      <p className="text-lg font-semibold">
                        support@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center p-12 md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full max-w-md"
                    >
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-between gap-2">
                          {otp.map((data, index) => (
                            <motion.input
                              key={index}
                              type="text"
                              maxLength="1"
                              ref={(ref) => (inputRefs.current[index] = ref)}
                              value={data}
                              onChange={(e) => handleChange(e.target, index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                              className="h-12 w-12 rounded-lg border-2 border-gray-300 text-center text-2xl font-semibold outline-none transition focus:border-blue-500 focus:ring focus:ring-blue-200"
                              whileFocus={{ scale: 1.05 }}
                            />
                          ))}
                        </div>
                        <motion.button
                          type="submit"
                          disabled={isVerifying}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full rounded-lg bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-50"
                        >
                          {isVerifying ? "Verifying..." : "Verify"}
                        </motion.button>
                      </form>
                      <p className="mt-6 text-center text-gray-600">
                        Didnt receive the code?{" "}
                        <motion.button
                          className="font-medium text-blue-600 hover:underline focus:outline-none"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Resend
                        </motion.button>
                          <br />
                          <span>or </span>
                        <motion.button
                          onClick={()=>handleVerifiedInEmail()}
                          className="font-medium text-blue-600 hover:underline focus:outline-none"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Verify in email
                        </motion.button>
                      </p>
                    </motion.div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {/* {!loading ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Run
                  </Button>
                ) : (
                  <Button color="primary">
                    <div className="custom-loader"></div>
                  </Button>
                )} */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
