import { Avatar, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function AllLinkDes({ setLinkDescription, linkDescription }) {
  console.log({ linkDescription });
  
  const handleDeleteFileDoc = async (file, index) => {
    console.log({ file });
    console.log({ index });
    if (file) {
      const newData = [
        ...linkDescription.slice(0, index),
        ...linkDescription.slice(index + 1),
      ];
      setLinkDescription(newData);
      //   setFileNames([...allImage, ...newData])
    } else {
      console.log("error");
    }
    console.log({ linkDescription });
  };

  return (
         <div>
            {linkDescription ?(
            <>
            {linkDescription?.map((file, index) => (
                <div key={index} className="p-2 h-full">
                <div className="relative flex border-collapse items-center rounded-lg border border-gray-200 bg-slate-200 p-3">
                  <Tooltip content={file}>
                    <Link href={file} target="_blank" className="line-clamp-1 break-all text-blue-600 w-[345px] hover:text-blue-800">{file}</Link>
                  </Tooltip>
                    <div
                    className="absolute right-2 hover:cursor-pointer"
                    onClick={() => handleDeleteFileDoc(file, index)}
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
            </>
            ):(
                <></>
            )}
            
         </div>
  
  );
}

export default AllLinkDes;
