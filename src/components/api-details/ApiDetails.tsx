import React, { useEffect, useState } from "react";
import { Snippet } from "@nextui-org/snippet";
import Link from "next/link";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { usePathname } from "next/navigation";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import { SearchIcon } from "../Application/SearchIcon";
import { getAllUserByAppIdAndProjectId } from "@/api/application";
import { getSession } from "@/api/inteceptor";

const ApiDetails = ({ id, app_id, url, name }) => {
  const pathname = usePathname();
  const [session, setSession] = useState({});

  // copy link
  const copyUrl = `https://bizweb-api.kosign.dev${pathname}/api-details/${id}`;
  const handleCopy = () => {
    navigator.clipboard.writeText(copyUrl);
  };

  return (
    <div className="flex flex-row items-center justify-between rounded-xl bg-white pl-4 pr-4 shadow-sm md:w-96 lg:w-1/2 xl:h-[70px] xl:w-[550px]">
      <div className="h-[60px] w-[10px] rounded-md bg-primary md:w-1/12 lg:w-1/6 xl:w-[10px]"></div>
      <div className="absolute ml-6 font-jetbrain">
        <div className="flex items-center">
          <span>
            <LinkOutlinedIcon className="mr-4 text-[#727272]" />
          </span>
          <span className="text-[#727272]">
            {url?.length > 40 ? url?.slice(0, 40) + ".." : url}
            <span>({name})</span>
          </span>
        </div>
        <Link
          href={`${app_id}/api-details/${id}`}
          className="text-primary underline"
        >
          {"See API details"}
        </Link>
      </div>
        <Snippet
          onCopy={handleCopy}
          symbol=""
          style={{ backgroundColor: "white", color: "black" }}
        ></Snippet>
    </div>
  );
};

export default ApiDetails;
