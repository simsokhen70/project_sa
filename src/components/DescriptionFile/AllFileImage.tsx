"use client";
import React from "react";
import { API_URL } from "@/api/inteceptor";
import { Avatar } from "@nextui-org/react";
import { Image } from "antd";

function AllFileImage({setAllImage, setFileNames, allFile, allImage}) {
    const handleDeleteFile = async (file, index) => {
        console.log({ file });
        console.log({ index });
        if (file) {
          const newData = [
            ...allImage.slice(0, index),
            ...allImage.slice(index + 1),
          ];
          setAllImage(newData);
          setFileNames([...allFile, ...newData])
    
        } else {
          console.log("error");
        }
      };
  return (
    <div className="grid grid-cols-2 ">
      {allImage.map((file, index) => (
        <div key={index} className="p-2 w-full">
          <div className="relative flex-wrap items-center justify-center ">
              <Image
                width={175}
                height={175}
                src={`${API_URL}/api/v1/images/getImage?fileName=${file.name}`}
                className="rounded-md object-cover"
                alt={file.name}
              />
            <div
              className="absolute right-0 top-0 hover:cursor-pointer mt-1"
              onClick={() => handleDeleteFile(file.name, index)}
            >
              <Avatar
                className="h-6 w-6 bg-none p-2"
                src="https://cdn-icons-png.freepik.com/256/860/860796.png?semt=ais_hybrid"
                alt="avatar"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllFileImage;
