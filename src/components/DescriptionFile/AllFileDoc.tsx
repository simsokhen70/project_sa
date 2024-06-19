"use client";
import React from "react";
import { debounce } from "@mui/material";
import { Avatar } from "@nextui-org/react";
import toast from "react-hot-toast";
import ihttp, { ihttpFormData } from "@/api/inteceptor";

function AllFileDoc({setAllFile, setFileNames, allImage, allFile}) {
    const showToast = debounce((message) => {
        toast.error(message);
      }, 1000);
    const handleDownload = async (file) => {
        const getfile = file?.name;
        console.log("Selected file:", file);
        if (getfile) {
          try {
            const response = await ihttpFormData.get(
              `/api/v1/files/${getfile}/download`,
            );
            const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = `/files/${getfile}/download`;
            link.download = getfile;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (error) {
            showToast("Error downloading file!");
            console.error("Error downloading file:", error);
          }
        } else {
          showToast("Unsupported file format!");
          console.error("Unsupported file format");
        }
      };

      const handleDeleteFileDoc = async (file, index) => {
        console.log({ file });
        console.log({ index });
        if (file) {
          const newData = [
            ...allFile.slice(0, index),
            ...allFile.slice(index + 1),
          ];
          setAllFile(newData);
          setFileNames([...allImage, ...newData])
        } else {
          console.log("error");
        }
      };
  return (
    <div>
     {allFile.map((file, index) => (
      <div key={index} className="p-2 h-full">
        <div className="relative flex border-collapse items-center rounded-lg border border-gray-200 bg-slate-200 p-3">
          <button className="text-left line-clamp-1 w-[345px] hover:text-blue-600" onClick={() => handleDownload(file)}>
          {file.name}
          </button>
          <div
            className="absolute right-2 hover:cursor-pointer"
            onClick={() => handleDeleteFileDoc(file.name, index)}
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

export default AllFileDoc;
