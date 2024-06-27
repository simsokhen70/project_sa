"use client";
import React, { useState } from "react";
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
import {
  configDomain,
  deployHtml,
  runningApp,
} from "@/services/deployapp.service";
import { debounce } from "@mui/material";
import LogViewer from "../logs/LogViewer";
import { API_URL } from "@/api/inteceptor";

export default function ConfigDomainModal({ valuePort, isOpenDomain }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [valueName, setValueName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [endLog, setEndLog] = useState(false);
  const handleSubmit = (onClose) => {
    if (valueName == "" || valueName == undefined) {
      showToast("Please enter domain name");
    } else if (valuePort == "" || valuePort == undefined) {
      showToast("Please enter repository url");
    } else if (
      valueName != "" ||
      valueName != undefined ||
      valuePort != "" ||
      valuePort != undefined
    ) {
      const servername = valueName + ".yasokhen.info";
      setLoading(true);
      setShowLog(true);
      const eventSource = new EventSource(
        `${API_URL}/api/v1/config-domain?name=${servername}&serverName=${servername}&port=${valuePort}`,
        {
          headers: { "Content-Type": "text/event-stream" },
        },
      );

      eventSource.onmessage = (event) => {
        setLogs((prevLogs) => [...prevLogs, event.data]);
        onClose();
      };

      eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        eventSource.close();
        setLoading(false);
        setEndLog(true);
        onClose();
      };

      eventSource.onopen = () => {
        console.log("Connection to server opened.");
      };

      eventSource.onclose = () => {
        console.log("Connection to server closed.");
        setLoading(false);
        setEndLog(true);
        onClose();
      };
    }
  };

  const showToast = debounce((message) => {
    toast.error(message);
  }, 1000);

  const showToastSuccess = debounce((message) => {
    toast.success(message);
  }, 1000);

  return (
    <div>
      <Modal size="5xl" className="h-fit" isOpen={isOpenDomain} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Config Domain :
              </ModalHeader>
              <ModalBody>
                {showLog ? (
                  <LogViewer logs={logs} />
                ) : (
                  <div className="space-y-3">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <div className="customShadow p-6 space-y-4">

                    <Input
                      type="text"
                      label="Domain name"
                      value={valueName}
                      onValueChange={setValueName}
                    />
                    <Input
                      type="text"
                      label="Port"
                      value={valuePort}
                      isDisabled
                    />
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                {!loading ? (
                  <Button
                    color="primary"
                    onClick={() => {
                      handleSubmit(onClose);
                    }}
                  >
                    Finish
                  </Button>
                ) : (
                  <Button color="primary">
                    <div className="custom-loader"></div>
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
