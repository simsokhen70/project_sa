"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@nextui-org/react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getSession } from "@/api/inteceptor";
import IframeModal from "../Modal/IframeModal";
import UpdateSaveApiModal from "../Modal/UpdateSaveApiModal";

function SaveApiHistory({ items, btnClickUpdate, setIdUpdate, sessions }) {
  const [selectRow, setSeleectRow] = useState("");
  useEffect(() => {
    }, [selectRow]);
  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  };
  const formatDateForUi = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[parseInt(month) - 1];
    const formattedDate = `${parseInt(day)} ${monthName}, ${year}`;

    return formattedDate;
  };

  const formatDateDifference = (startDate) => {
    const startDateObjFormated = formatDate(startDate);
    const currentDate = new Date();
    const startDateObj = new Date(startDateObjFormated);

    const timeDifference = currentDate.getTime() - startDateObj.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      return "Today";
    } else if (daysDifference === 1) {
      return "1 day ago";
    } else if (daysDifference < 7) {
      return `${daysDifference} days ago`;
    } else if (daysDifference < 30) {
      const weeksDifference = Math.floor(daysDifference / 7);
      return `${weeksDifference} week${weeksDifference > 1 ? "s" : ""} ago`;
    } else if (daysDifference < 365) {
      const monthsDifference = Math.floor(daysDifference / 30);
      return `${monthsDifference} month${monthsDifference > 1 ? "s" : ""} ago`;
    } else {
      const yearsDifference = Math.floor(daysDifference / 365);
      return `${yearsDifference} year${yearsDifference > 1 ? "s" : ""} ago`;
    }
  };
  return (
    <tr className="rounded-none">
      {items.length !== 0 ? (
        items?.map((item) => (
          <td
            key={item?._id}
            className={`flex items-center justify-between rounded-none border border-gray-200 p-2 ring-0  ${item?._id == selectRow? "bg-[#dbdffc]" : "hover:bg-black/5"}`}
          >
            <div>
              <div className="text-[12px] font-semibold text-inherit">
                <p>Last modify on {formatDateForUi(item?.end_date)}</p>
              </div>
              <div className="flex items-center justify-start gap-1 p-2 text-[12px] text-inherit">
                <Avatar
                  className="h-6 w-6 text-tiny"
                  src={sessions?.prfl_PHTG ? sessions?.prfl_PHTG  : "https://cdn3d.iconscout.com/3d/premium/thumb/business-worker-avatar-11428381-9236975.png"}
                />
                <div className="flex flex-row gap-1 px-2">
                  <p>{item?.userId}</p>
                  <p>Saved on</p>
                  <p>{formatDateForUi(item?.start_date)}</p>
                  <p>{formatDateDifference(item?.start_date)}</p>
                </div>
              </div>
            </div>
            <div>
              <Button
                isIconOnly
                color="primary"
                variant="light"
                aria-label="Edit saved"
                onClick={() => {
                  btnClickUpdate(item?._id), setIdUpdate(item?._id),  setSeleectRow(item?._id);
                }}
              >
                <EditNoteIcon />
              </Button>
              {/* <UpdateSaveApiModal /> */}
              <Button
                isIconOnly
                color="primary"
                variant="light"
                aria-label="View"
                onClick={() => {
                  btnClickUpdate(item?._id), setIdUpdate(item?._id), setSeleectRow(item?._id);
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </div>
          </td>
        ))
      ) : (
        <td className="flex items-center justify-between rounded-none border border-gray-200 p-2 ring-0 hover:bg-black/5">
          <p className="flex h-60 w-full items-center justify-center text-center text-[14px] text-inherit">
            No data available
          </p>
        </td>
      )}
    </tr>
  );
}

export default SaveApiHistory;
