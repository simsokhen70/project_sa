"use client";

import React, { useEffect, useState } from "react";
import {
  Back,
  Book,
  Bookmark,
  Buildings,
  Category,
  Document,
  MonitorMobbile,
} from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(()=> {

  }, [session])

  return (
    <div className="w-60 p-0 z-50 shrink-0 md:block h-screen sticky top-0 overflow-hidden">
      <div className="w-full h-full bg-white border-r">
        <div className="p-4 md:p-6 flex flex-col cursor-pointer group items-center gap-2 text-center">

          <Avatar
            isBordered
            className="h-[60px] w-[60px] rounded-3xl"
            src={
              session?.user?.profile
            }
          />
          <div className="flex flex-col">
            <p className="text-md font-bold">{session?.user?.username}</p>
            <p className="text-small text-default-500">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between h-full ">
          <div className="flex flex-col gap-1 ">
            <div className=" text-gray-500 font-medium space-y-2 md:px-2 text-sm">
              <Link
                href="/web"
                className={`flex ${pathname === "/app/employee-assets" ? "text-[#378CE7]" : ""
                  } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <Buildings variant="Outline" size={20} />
                Project
              </Link>
            </div>
            <div className=" text-gray-500 font-medium space-y-2 md:px-2 text-sm">
              <Link
                href={"/web/monitoring"}
                className={`flex ${pathname === "/app/items" ? "text-[#378CE7]" : ""
                  } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <MonitorMobbile size={20} />
                Monitoring
              </Link>
            </div>
            <div className=" text-gray-500 font-medium space-y-2 md:px-2 text-sm">
              <Link
                href={"/web/setting"}
                className={`flex ${pathname === "/app/all-categories" ? "text-[#378CE7]" : ""
                  } hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
              >
                <Category size={20} />
                Setting
              </Link>
            </div>
          </div>
          <div>
            <Button>
              <Back size="32" color="#FF8A65" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
