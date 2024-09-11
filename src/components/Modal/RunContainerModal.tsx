"use client";
import React, { useEffect, useState } from "react";
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
import {deployHtml, runningApp} from "@/services/deployapp.service"
import { debounce } from "@mui/material";
import ConfigDomainModal from "./ConfigDomainModal";
import { useSession } from "next-auth/react";
import { API_URL } from "@/api/inteceptor";
import LogViewer from "../logs/LogViewer";
import gif from "../../../public/6LM.gif";
import Image from "next/image";

export default function RunContainerModal({ isOpens, valueIma, setIsOpens }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();

  const [valueCont, setValueCont] = useState("");
  const [valuePort, setValuePort] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpenDomain, setIsOpenDomain] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [endLog, setEndLog] = useState(false);
  useEffect(() => {
  }, [session]);
  const handleSubmit = () =>{
    if(valueCont == "" || valueCont == undefined){
      showToast("Please enter branch name")
    } else if(valuePort == "" || valuePort == undefined){
      showToast("Please enter repository url")
    } else if(valueIma == "" || valueIma == undefined){
      showToast("Please enter app name")
    } else if(valueCont != "" || valueCont != undefined || valueIma != "" || valueIma != undefined || valuePort != "" || valuePort != undefined) {
      // runningApp(session?.user?.username, valueCont, valueIma, valuePort).then((result) => {
      //   setLoading(true);
      //   if(result.status == 200){
      //     console.log({result});
      //     setIsOpenDomain(true);
      //     setIsOpens(false);
      //   }

      // }).catch((err) => {
      //   console.log({err})
      //   setLoading(false);
      //   showToast(err.message);
      // });
        onOpen();
        setLoading(true);
        setShowLog(true);
      let eventSource;
          eventSource = new EventSource(
            `${API_URL}/api/v1/web/run-docker-container?userId=${session?.user?.username}&containerName=${valueCont}&imageName=${valueIma}&port=${valuePort}`,
            {
              headers: { "Content-Type": "text/event-stream" },
            },
          );


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
      // setIsOpens(false)
    }
  }

  const showToast = debounce((message) => {
    toast.error(message);
  }, 1000);
  
  const showToastSuccess = debounce((message) => {
    toast.success(message);
  }, 1000);

  return (
    <div className="flex h-[60vh] items-center justify-center">

      <Modal size="5xl" isOpen={isOpens} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              Start running :
              </ModalHeader>
              <ModalBody className="relative">
              <Image
                className="absolute top-0 left-0"
                width={1200}
                height={1200}
                src={gif}
                objectFit="contain"
                alt="space"
              />
              {showLog ? (
                  <LogViewer logs={logs} />
                ) : (
                  <div className="space-y-3">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <Input 
                type="text" 
                label="App name"        
                value={valueIma}
                isDisabled
                 />
                <Input 
                type="text" 
                label="Running name"
                value={valueCont}
                onValueChange={setValueCont}
                />
                <Input 
                type="text" 
                label="Port"
                value={valuePort}
                onValueChange={setValuePort}
                />
                </div>
                )}
              </ModalBody>
              <ModalFooter>
                {!endLog ? (
                !loading ? (
                <Button color="primary" onClick={()=>{handleSubmit()}}>
                  Run
                </Button>
                ): (
                  <Button color="primary">
                      <div className="custom-loader"></div>
                </Button>
                )
              ) : (
                <Button
                color="primary"
                onClick={() => {
                  setIsOpens(false), setIsOpenDomain(true);
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
      <ConfigDomainModal valuePort={valuePort} isOpenDomain={isOpenDomain} />
    </div>
  );
}
