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
import { deployHtml } from "@/services/deployapp.service";
import { debounce } from "@mui/material";
import RunContainerModal from "@/components/Modal/RunContainerModal";
import { API_URL } from "@/api/inteceptor";
import LogViewer from "@/components/logs/LogViewer";

export default function Test() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [valueBr, setValueBr] = useState("");
  const [valueRep, setValueRep] = useState("");
  const [valueIma, setValueIma] = useState("");
  const [isOpens, setIsOpens] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [logs, setLogs] = useState([]);
  const [endLog, setEndLog] = useState(false);

  const handleSubmit = (onClose) => {
    if (valueBr === "" || valueBr === undefined) {
      showToast("Please enter branch name");
    } else if (valueRep === "" || valueRep === undefined) {
      showToast("Please enter repository url");
    } else if (valueIma === "" || valueIma === undefined) {
      showToast("Please enter app name");
    } else {
      setLoading(true);
      setShowLog(true);
      const eventSource = new EventSource(
        `${API_URL}/api/v1/build-docker-image?parentDirectory=projects&branchName=${valueBr}&repoUrl=${valueRep}&imageName=${valueIma}`,
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
    }
  };

  const showToast = debounce((message) => {
    toast.error(message);
  }, 1000);

  const showToastSuccess = debounce((message) => {
    toast.success(message);
  }, 1000);

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <h1>Testing deployment : </h1>
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
              <ModalHeader className="flex flex-col gap-1">
                Deploy static web page
              </ModalHeader>
              <ModalBody>
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
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <hr />
                    <div className="customShadow p-6 space-y-4">
                      <Input
                        type="text"
                        label="Parent Directory"
                        value="projects"
                        isDisabled
                      />
                      <Input
                        type="text"
                        label="Branch Name"
                        value={valueBr}
                        onValueChange={setValueBr}
                      />
                      <Input
                        type="text"
                        label="Git repository URL"
                        value={valueRep}
                        onValueChange={setValueRep}
                      />
                      <Input
                        type="text"
                        label="App Name"
                        value={valueIma}
                        onValueChange={setValueIma}
                      />
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
    </div>
  );
}
