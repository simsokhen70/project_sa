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
import {deployHtml, runningApp} from "@/services/deployapp.service"
import { debounce } from "@mui/material";
import ConfigDomainModal from "./ConfigDomainModal";

export default function RunContainerModal({ isOpens, valueIma, setIsOpens }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [valueCont, setValueCont] = useState("");
  const [valuePort, setValuePort] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpenDomain, setIsOpenDomain] = useState(false);

  const handleSubmit = () =>{
    if(valueCont == "" || valueCont == undefined){
      showToast("Please enter branch name")
    } else if(valuePort == "" || valuePort == undefined){
      showToast("Please enter repository url")
    } else if(valueIma == "" || valueIma == undefined){
      showToast("Please enter app name")
    } else if(valueCont != "" || valueCont != undefined || valueIma != "" || valueIma != undefined || valuePort != "" || valuePort != undefined) {
      runningApp(valueCont, valueIma, valuePort).then((result) => {
        setLoading(true);
        if(result.status == 200){
          console.log({result});
          setIsOpenDomain(true);
          setIsOpens(false);
        }

      }).catch((err) => {
        console.log({err})
        setLoading(false);
        showToast(err.message);
      });
      setIsOpens(false)
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

      <Modal isOpen={isOpens} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              Start running :
              </ModalHeader>
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                {!loading ? (
                <Button color="primary" onClick={()=>{handleSubmit()}}>
                  Run
                </Button>
                ): (
                  <Button color="primary">
                      <div className="custom-loader"></div>
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
