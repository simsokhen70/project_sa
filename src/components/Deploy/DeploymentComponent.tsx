"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Switch,
  cn,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { deployHtml } from "@/services/deployapp.service";
import { debounce } from "@mui/material";
import RunContainerModal from "@/components/Modal/RunContainerModal";
import WebhookRoundedIcon from "@mui/icons-material/WebhookRounded";
import { API_URL } from "@/api/inteceptor";
import LogViewer from "@/components/logs/LogViewer";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import Image from "next/image";
import { getSession, useSession } from "next-auth/react";
import { showToast } from "@/services/commonfunction.service";
import { getAllUsers } from "@/services/user.service";
import gif from "../../../public/6LM.gif";

export default function DeploymentComponent() {
  const { data: session } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const audioRef = useRef(null);
  const [click, setClick] = useState(false);
  const [valueBr, setValueBr] = useState("");
  const [valueRep, setValueRep] = useState("");
  const [valueIma, setValueIma] = useState("");
  const [isOpens, setIsOpens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [endLog, setEndLog] = useState(false);
  const [rocketAnimation, setRocketAnimation] = useState(false);
  const [valuePro, setValuePro] = useState(new Set([]));
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [valueUsername, setValueUsername] = useState("");
  const [valueToken, setValueToken] = useState("");

  useEffect(() => {
  }, [session]);
  useEffect(() => {
    const handleEnded = () => {
      setClick(false);
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", handleEnded);
      }
    };
  });

  const handlePlayPause = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setClick(true);
  };

  const handleSubmit = (onClose) => {
    if (valueBr === "" || valueBr === undefined) {
      showToast("Please enter branch name");
    } else if (valueRep === "" || valueRep === undefined) {
      showToast("Please enter repository url");
    } else if (valueIma === "" || valueIma === undefined) {
      showToast("Please enter app name");
    } else if (isSwitchOn == true) {
      if (valueUsername === "" || valueUsername === undefined) {
        showToast("Please enter unsername");
      } else if (valueToken === "" || valueToken === undefined) {
        showToast("Please enter token");
      }
    } else if (!valuePro.has("nextjs") && !valuePro.has("static")) {
      showToast("Please select project type");
    } else {
      setRocketAnimation(true);
      handlePlayPause();
      onClose();
      setTimeout(() => {
        onOpen();
        setRocketAnimation(false);
        setClick(false);
        setLoading(true);
        setShowLog(true);
        let eventSource;
        if (!isSwitchOn) {
          eventSource = new EventSource(
            `${API_URL}/api/v1/web/build-docker-image?userId=${session?.user?.username}&parentDirectory=projects&branchName=${valueBr}&repoUrl=${valueRep}&imageName=${valueIma}&isPrivate=${true}&projectType=${valuePro.values().next().value}`,
            {
              headers: { "Content-Type": "text/event-stream" },
            },
          );
        } else {
          eventSource = new EventSource(
            `${API_URL}/api/v1/web/build-docker-image?userId=${session?.user?.username}&parentDirectory=projects&branchName=${valueBr}&repoUrl=${valueRep}&imageName=${valueIma}&isPrivate=${false}&username=${valueUsername}&token=${valueToken}&projectType=${valuePro.values().next().value}`,
            {
              headers: { "Content-Type": "text/event-stream" },
            },
          );
        }

        eventSource.onmessage = (event) => {
          setLogs((prevLogs) => [...prevLogs, event.data]);
        };

        eventSource.onerror = (err) => {
          console.error("EventSource failed:", err);
          eventSource.close();
          setLoading(false);
          setEndLog(true);
        };

        eventSource.onopen = () => {
          console.log("Connection to server opened.");
        };

        eventSource.onclose = () => {
          console.log("Connection to server closed.");
          setLoading(false);
          setEndLog(true);
        };
      }, 1000);
    }
  };


  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
    console.log(`Switch is now ${!isSwitchOn ? "On" : "Off"}`);
  };


  const projectType = [
    {
      value: "nextjs",
      label: "Next.js",
      logo: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
    },
    {
      value: "static",
      label: "Static Web",
      logo: "https://cdn.iconscout.com/icon/premium/png-256-thumb/static-web-app-8242052-6740344.png",
    },
    {
      value: "react",
      label: "React",
      logo: "https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png",
    },
    {
      value: "vue",
      label: "Vue",
      logo: "https://d3373sevsv1jc.cloudfront.net/uploads/communities_production/community/logo/1167/59f9c84a-e85d-47da-8b17-7e9bdbf2897b.png",
    },
    {
      value: "php",
      label: "PHP",
      logo: "https://static-00.iconduck.com/assets.00/php-icon-2048x2048-zjxns1zh.png",
    },
    {
      value: "spring",
      label: "Spring boot",
      logo: "https://static-00.iconduck.com/assets.00/spring-icon-256x256-2efvkvky.png",
    },
  ];

  return (
    <div className="flex h-full items-center justify-center customShadow bg-white rounded-lg">
      <h1 className="dark:text-white">Testing deployment : </h1>
      &nbsp;
      <Button onPress={onOpen}>Click to deploy</Button>
      <Modal
        size="5xl"
        className="h-fit"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          
          {(onClose) => (
            <>
            
              <ModalHeader className="flex flex-col gap-1 dark:text-white">
                Deploy Web Page
              </ModalHeader>
              <ModalBody className="relative">
              <Image
                className="absolute top-0 left-0"
                width={1200}
                height={1200}
                src={gif}
                objectFit="contain"
                alt="rocket"
                onAnimationEnd={() => setRocketAnimation(false)} // Reset animation after it ends
              />
                {showLog ? (
                  <LogViewer logs={logs} />
                ) : (
                  // <div className="logs-container">
                  //   <h2>Build Logs</h2>
                  //   <pre className="logs">
                  //     {logs.map((log, index) => (
                  //       <div key={index}>{log}</div>
                  //     ))}
                  //   </pre>
                  // </div>
                  <div className="space-y-3">
                    <p className="dark:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <hr />
                    <div className=" grid grid-cols-2 gap-2">
                      <div className="customShadow space-y-4 rounded-xl p-6">
                        <Input
                          type="text"
                          label="Parent Directory"
                          value="projects"
                          className="opacity-80"
                          isDisabled
                        />
                        <Input
                          type="text"
                          label="Branch Name"
                          value={valueBr}
                          className="opacity-80"
                          onValueChange={setValueBr}
                          // isInvalid={valueBr != "" ? false : true}
                          // errorMessage="Please enter branch name"
                        />
                        <Input
                          type="text"
                          label="Git repository URL"
                          className="opacity-80"
                          value={valueRep}
                          onValueChange={setValueRep}
                        />
                        <Input
                          type="text"
                          label="App Name"
                          className="opacity-80"
                          value={valueIma}
                          onValueChange={setValueIma}
                        />
                      </div>
                      <div className="customShadow space-y-4 rounded-xl p-6">
                        <Select
                          items={projectType}
                          label="Frameworks"
                          placeholder="Select a framework"
                          className="w-full"
                          variant="flat"
                          color="primary"
                          className="opacity-80"
                          disallowEmptySelection
                          startContent={<WebhookRoundedIcon />}
                          onSelectionChange={setValuePro}
                        >
                          {(projectType) => (
                            <SelectItem
                              startContent={
                                <Image
                                  src={projectType.logo}
                                  alt="logo"
                                  width={20}
                                  height={20}
                                />
                              }
                              key={projectType.value}
                            >
                              {projectType.label}
                            </SelectItem>
                          )}
                        </Select>
                        <Switch
                        className="opacity-80"
                          isSelected={isSwitchOn}
                          onChange={handleSwitchChange}
                          classNames={{
                            base: cn(
                              "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                              "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                              "data-[selected=true]:border-primary",
                            ),
                            wrapper: "p-0 h-4 overflow-visible",
                            thumb: cn(
                              "w-6 h-6 border-2 shadow-lg",
                              "group-data-[hover=true]:border-primary",
                              //selected
                              "group-data-[selected=true]:ml-6",
                              // pressed
                              "group-data-[pressed=true]:w-7",
                              "group-data-[selected]:group-data-[pressed]:ml-4",
                            ),
                          }}
                          startContent={
                            <LockRoundedIcon style={{ width: "10px" }} />
                          }
                          endContent={
                            <PublicRoundedIcon style={{ width: "10px" }} />
                          }
                        >
                          <div className="flex flex-col gap-1">
                            <p className="text-medium">Git repository</p>
                            <p className="text-tiny text-default-400">
                              Enable if your git repository is private
                            </p>
                          </div>
                        </Switch>
                        {isSwitchOn ? (
                          <div className="flex items-center justify-center gap-2">
                            <Input
                            className="opacity-80"
                              type="text"
                              label="Git's username"
                              value={valueUsername}
                              onValueChange={setValueUsername}
                            />
                            <Input
                            className="opacity-80"
                              type="text"
                              label="Token"
                              value={valueToken}
                              onValueChange={setValueToken}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {!endLog ? (
                  !loading ? (
                    <Button
                      color="primary"
                      onClick={() => handleSubmit(onClose)}
                    >
                      Deploy
                    </Button>
                  ) : (
                    <Button color="primary">
                      <div className="custom-loader"></div>
                    </Button>
                  )
                ) : (
                  <Button
                    color="primary"
                    onClick={() => {
                      setLoading(false), setIsOpens(true), onClose();
                    }}
                  >
                    Continue
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <RunContainerModal
        isOpens={isOpens}
        valueIma={valueIma}
        setIsOpens={setIsOpens}
      />
      <div
        className={`fixed z-[99999] h-[150vh] w-full ${rocketAnimation ? "rocketAnimation block" : "hidden"}`}
      >
        <Image
          className="absolute bottom-0 right-[40%]"
          width={300}
          height={300}
          src="https://ugokawaii.com/wp-content/uploads/2023/12/rocket.gif"
          alt="rocket"
          onAnimationEnd={() => setRocketAnimation(false)} // Reset animation after it ends
        />
      </div>
      <audio className="hidden" ref={audioRef} controls src="../../rocket2.mp3">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
