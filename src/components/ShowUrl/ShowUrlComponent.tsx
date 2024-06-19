"use client";
import React from "react";
import { Button } from "@nextui-org/react";

function ShowUrlComponent({valueUrl, domain, domainDev, requestBody, isJSON, isValidJson, showToast, setShowUrlVal, setShowUrl, setIsAdd, inOut, requestBodyValue }) {
  const showURLFunc = () => {
    let baseURL = "";
    console.log({ domain });
    console.log({ requestBody });
    let reqBody = "";
    reqBody = decodeURIComponent(requestBody);
    try {
      if (isJSON) {
        if (
          ((domain != "" &&
            domain != undefined) ||
            (domainDev != "" &&
              domainDev != undefined)) &&
          requestBody != "" &&
          requestBody != undefined
        ) {
          if (
            !isValidJson(
              reqBody
                ?.trim()
                .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '),
            )
          ) {
            showToast("Invalid JSON format.");
            return;
          }

          if(valueUrl.has("dev")){
            baseURL = domainDev
          } else if (valueUrl.has("pro")){
            baseURL = domain
          } else if (valueUrl.has("")){
            showToast("Please select a API URL type!")
          } else {
            baseURL = domainDev
          }

          console.log({ baseURL });
          setShowUrlVal(baseURL);
          setShowUrl(true);
        } else {
          setInterval(() => {
            setIsAdd(false);
          }, 1000);
          showToast("Missed out neither domain, key or body");
        }
      } else {
        if (
          ((domain != "" &&
            domain != undefined) ||
            (domainDev != "" &&
              domainDev != undefined)) &&
          requestBodyValue != "" &&
          requestBodyValue != undefined &&
          inOut?.keyReqBody != "" &&
          inOut?.keyReqBody != undefined
        ) {
          if (
            !isValidJson(
              reqBody
                ?.trim()
                .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '),
            )
          ) {
            showToast("Invalid JSON format.");
            return;
          }
            if(valueUrl.has("dev")){
              baseURL = domainDev + "?" + inOut?.keyReqBody + "=" + encodeURIComponent(
                JSON.stringify(
                  JSON.parse(
                    reqBody
                      ?.trim()
                      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '),
                  ),
                ),
              );
            } else if (valueUrl.has("pro")){
              baseURL = domain + "?" + inOut?.keyReqBody + "=" + encodeURIComponent(
                JSON.stringify(
                  JSON.parse(
                    reqBody
                      ?.trim()
                      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '),
                  ),
                ),
              );
            } else if (valueUrl.has("")){
              showToast("Please select a API URL type!")
               }   else {
              baseURL = domainDev + "?" + inOut?.keyReqBody + "=" + encodeURIComponent(
                JSON.stringify(
                  JSON.parse(
                    reqBody
                      ?.trim()
                      .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '),
                  ),
                ),
              );
            }
  
          console.log({ baseURL });
          setShowUrlVal(baseURL);
          setShowUrl(true);
        } else {
          setInterval(() => {
            setIsAdd(false);
          }, 1000);
          showToast("Missed out neither domain, key or body");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={showURLFunc} className="mr-2 text-white" color="primary">
        Show URL
      </Button>
    </div>
  );
}

export default ShowUrlComponent;
