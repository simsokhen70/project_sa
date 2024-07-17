"use client";
import React from 'react'
import { Card } from '@nextui-org/card';
import { Skeleton } from '@nextui-org/react';


export default function ApplicationSkeleton() {
  return (
    <div className="flex w-full flex-wrap justify-start gap-8">
    <div>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[180px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="flex items-center justify-center space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>

    <div>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[180px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="flex items-center justify-center space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>

    <div>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[180px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="flex items-center justify-center space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>

    <div>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[180px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="flex items-center justify-center space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>

    <div>
      <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-[180px] rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="flex items-center justify-center space-y-3">
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  </div>
  )
}
