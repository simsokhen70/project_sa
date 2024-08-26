'use client';
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation'
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";
import { Avatar, Button, Image, Input, Tooltip } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";
import ihttp, { api } from "@/api/inteceptor";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  const [attempt, setAttempt] = useState(3);
  const [pinValues, setPinValues] = useState(["", "", "", "", "", ""]);
  const [isVisible, setIsVisible] = useState(false);
  const [mloading, setMLoading] = useState(false);
  const [gloading, setGLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [otpPopUp, setOtpPopUp] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("")

  useEffect(() => {

  }, [session]);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };


  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  }, []);

  const handleChangePassword = () => {
    setGLoading(true)
    api.post(`/api/v1/auth/send-otp`,{
      userId: session?.userId
    }).then((res) => {
      if (res.status == 200) {
        toast.success("OTP-Code had been sent.");
        setOtpPopUp(true);
        setGLoading(false);
      } else {
        toast.error("Internal Server Error.");
        setOtpPopUp(false);
        setGLoading(false);
      }
    }).catch(() =>{
      toast.error("Internal Server Error.");
      setOtpPopUp(false);
      setGLoading(false);
    })
  }

  const handlePinChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
    if (index === 5) {
      const otp = newPinValues.join("");
      if (otp.length == 6) {
          api.post(`/api/v1/auth/otp-confirm`,{
              userId: session?.userId,
              otpCode: otp
            }).then((res) => {
              if(res.data == true){
                toast.success("Password changed successfully.");
                ihttp.put(`/api/v1/auth/new-password`,{
                  userId: session?.userId,
                  newPassword: newPassword
                })
                setOtpPopUp(false);
                setNewPassword('')
              }
            })
      }
    } else {
      setPinValues(newPinValues);
    }
  };

  const handleInputNewPassword = (e) => {
    setNewPassword(e.target.value)
  }





  return (
    <>
      <header
        className={`header bg-white customShadow left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-8"
                } `}
              >
                <Image
                  src="/images/logo/deploy-icon-8.jpg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-[50%] dark:hidden"
                />
                <Image
                  src="/images/logo/deploy-icon-8.jpg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-[50%] dark:block"
                />
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12"></ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {session == undefined ? (
                  <>
                    <Link
                      href="/signin"
                      className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="ease-in-up hidden rounded-3xl bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <User
                            as="button"
                            avatarProps={{
                              isBordered: true,
                              src:
                              session?.user?.profile ? session?.user?.profile
                                :  "https://i.pinimg.com/236x/57/33/a8/5733a895f8c7c48c17d8544a05285f0e.jpg" ,
                            }}
                            className="transition-transform"
                            description={session?.user?.email}
                            name={session?.user?.username}
                          />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="flat">
                          <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-bold">Signed in as</p>
                            <p className="font-medium">@{session?.user?.username}</p>
                          </DropdownItem>
                          <DropdownItem
                            onClick={onOpen}
                            key="setting"
                            color="danger"
                          >
                            Settings
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => signOut({ callbackUrl: '/signin' })}
                            key="logout"
                            color="danger"
                          >
                            Log Out
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>

                      <Modal
                        hideCloseButton
                        size={"3xl"}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                                <button
                                  onClick={onClose}
                                  className="absolute end-0 right-[30px] z-10 top-[30px] cursor-pointer text-black"
                                >
                                  <CloseOutlinedIcon />
                                </button>

                              <Card className="max-w-full p-4 relative z-0">
                                
                                <CardHeader className="flex gap-3">
                                  <Avatar
                                    isBordered
                                    className="h-[60px] w-[60px] rounded-3xl"
                                    src={
                                      session?.user?.profile 
                                    }
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-md">{session?.user?.username}</p>
                                    <p className="text-small text-default-500">
                                      {session?.user?.email}
                                    </p>
                                  </div>
                                </CardHeader>
                                <Divider />
                                <CardBody>
                                  <span className="mb-4 mr-3 flex items-center gap-4 text-center text-small text-default-500">
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
                                          <rect
                                            width="20"
                                            height="20"
                                            fill="white"
                                          />
                                        </clipPath>
                                      </defs>
                                    </svg>
                                    {session?.user?.email}
                                  </span>
                                  <span className="mb-4 flex items-center gap-4 text-center text-small text-default-500">
                                    <HomeRepairServiceOutlinedIcon />
                                    {session?.user?.role == "user" ? "Normal User" : "Administrator"}
                                  </span>

                                  <span className="flex items-center gap-4 text-center text-small text-default-500">
                                    <PhoneIphoneOutlinedIcon />
                                    0965601645 static
                                  </span>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                  <Input
                                    onChange={handleInputNewPassword}
                                    label="New Password"
                                    variant="bordered"
                                    placeholder="Enter your new password"
                                    endContent={
                                      <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibility}
                                      >
                                        {isVisible ? (
                                          <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
                                        ) : (
                                          <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
                                        )}
                                      </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-xs"
                                  />
                                  {newPassword != "" ? (
                                    <Tooltip content="Verify Password">
                                      <Button
                                        onClick={handleChangePassword}
                                        className="ml-4 w-[70px]"
                                        isIconOnly
                                        color="primary"
                                      >
                                        {gloading ? (
                                          <div className="custom-loader"></div>
                                        ) : (
                                          <ExitToAppIcon />
                                        )}
                                      </Button>
                                    </Tooltip>
                                  ) : (
                                    ""
                                  )}
                                </CardFooter>
                              </Card>

                              <Modal
                                size="2xl"
                                isOpen={otpPopUp}
                                onOpenChange={setOtpPopUp}
                                hideCloseButton
                                className="w-[450px]"
                              >
                                <ModalContent>
                                  {(onClose) => (
                                    <>
                                      {/* <ModalHeader className="flex flex-col gap-1">OTP Code Verification</ModalHeader> */}

                                      <ModalBody>
                                        <div className="flex flex-col items-center justify-center gap-4 p-4">
                                          <Avatar
                                            className="h-[60px] w-[60px] rounded-3xl bg-white"
                                            src="/images/logo/api-svgrepo-com.svg"
                                          />

                                          <p className="text-body-color">
                                            {`One-Time Password (${attempt})`}
                                          </p>
                                          <HStack>
                                            <PinInput>
                                              {pinValues.map((value, index) => (
                                                <PinInputField
                                                  key={index}
                                                  value={value}
                                                  onChange={(e) =>
                                                    handlePinChange(
                                                      index,
                                                      e.target.value,
                                                    )
                                                  }
                                                />
                                              ))}
                                            </PinInput>
                                          </HStack>
                                          <p className="flex items-center justify-center text-[14px] text-body-color">
                                            Have not received it yet ?
                                            {attempt <= 0 ? (
                                              <div
                                                className="ml-2 cursor-pointer text-primary underline"
                                                onClick={tryAgain}
                                              >
                                                {" "}
                                                try again{" "}
                                              </div>
                                            ) : (
                                              <span
                                                onClick={resendOtp}
                                                className="ml-2 cursor-pointer text-primary underline"
                                              >
                                                {mloading ? (
                                                  <div className="custom-loader"></div>
                                                ) : (
                                                  "resend"
                                                )}
                                              </span>
                                            )}
                                          </p>
                                        </div>
                                      </ModalBody>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
                    </div>
                  </>
                )}

                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
