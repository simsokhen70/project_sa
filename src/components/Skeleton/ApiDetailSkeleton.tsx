"use client";
import React from 'react'
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Skeleton } from '@nextui-org/react'


function ApiDetailSkeleton() {
  return (
    <div className="-mx-4 flex flex-wrap justify-center">
    <div className="w-full px-4 lg:w-10/12">
      <div>
        <div className="flex justify-start items-center gap-3 mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight">
          <ArrowBackIosNewOutlinedIcon />
          <Skeleton className="h-5 w-2/5 rounded-lg"/>
        </div>
          <div className="flex items-center gap-3 mb-5">
            <div className="max-w-[300px] flex items-center gap-3">
                <Skeleton className="flex rounded-full w-12 h-12"/>
            </div>
              <Skeleton className="h-5 w-2/5 rounded-lg"/>
        </div>
        <div>
          <div className="mb-4">
            <div className="mb-4">
              <div className="flex w-full justify-between gap-x-20">
                <div className="w-full space-y-2">
                  <Skeleton className="h-3 w-1/5 rounded-lg"/>
                  <Skeleton className="h-10 w-3/5 rounded-lg"/>
                </div>
                <div className=" w-full space-y-2 ">
                  <Skeleton className="h-3 w-1/5 rounded-lg"/>
                  <Skeleton className="h-10 w-3/5 rounded-lg"/>
                </div>
              </div>
            </div>
            <p className="py-2 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
              <Skeleton className="h-3 w-1/5 rounded-lg"/>
            </p>
            <Skeleton className="h-10 w-[10%] rounded-lg"/>
          </div>
          <div className="flex w-full flex-col ">
            <span className="pt-2 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
              <Skeleton className="h-3 w-1/5 rounded-lg"/>
            </span>
            <Skeleton className="h-10 w-3/5 rounded-lg mt-2"/>
            <div className="flex items-center gap-4 mt-3">
              <Skeleton className="h-10 w-[10%] rounded-lg"/>
              <Skeleton className="h-10 w-[10%] rounded-lg"/>
            </div>
            <div className="flex items-center gap-1 mt-3">
              <Skeleton className="h-40 w-3/5 rounded-lg"/>
              <Skeleton className="h-40 w-3/5 rounded-lg"/>
            </div>

          </div>
          <div className="my-4 flex items-center justify-between">
            <div className="flex w-2/5 gap-3 items-center">
              <Skeleton className="h-10 w-1/5  rounded-lg"/>
              <Skeleton className="h-10 w-1/5  rounded-lg"/>
            </div>
            <Skeleton className="h-10 w-[10%]  rounded-lg"/>
          </div>

          <hr></hr>
          <div className="mb-4 mt-6">
              <Skeleton className="h-10 w-2/5  rounded-lg"/>
          </div>
          <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-3 w-1/5  rounded-lg"/>
          <Skeleton className="h-3 w-1/5  rounded-lg"/>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ApiDetailSkeleton