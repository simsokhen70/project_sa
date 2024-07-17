'use server';
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import ApplicationSkeleton from "@/components/Skeleton/ApplicationSkeleton";

export async function handleGetData() {
  const res = await fetch("http://localhost:8080/api/v1/user/getAllUsers", {
       cache: 'no-store'
  });
  const data = await res.json();
  return data.payload;
}

export  default async function Test() {
  // const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//  useEffect(() => {
//   async function fetchData() {
//     try {
//       const res = await fetch("http://localhost:8080/api/v1/user/getAllUsers", {
//         cache: 'no-store'
//       });
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       const result = await res.json();
//       setData(result.payload);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false); 
//     }
//   }
//   fetchData();
//   }, []);

  const data = await handleGetData();
  console.log(data);
  return (
    <div className="h-[80vh] w-full p-28">
      {data?.length == 0 ? (
          <ApplicationSkeleton />
      ) : (
        <div className="grid  grid-cols-4 items-center justify-center gap-2 ">
          {data?.map((user) => (
            <Card key={user?.id} className="w-fit py-4">
              <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                <h4 className="text-large font-bold">{user?.username}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="h-52 w-52 rounded-xl object-cover"
                  src={
                    user?.profile
                      ? user?.profile
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
                  }
                  width={270}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
