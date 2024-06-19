"use client";
import React, { useState } from "react";
import { DateRangePicker } from "@nextui-org/react";

function SaveApiHeader({ filteredData, setRowsPerPage, setPage, savedData, setStartDate, setEndDate }) {

  const handleChangeDate = (e) => {
    const { start, end } = e;

    const formatDateString = (dateObj) => {
      const year = dateObj.year;
      const month = String(dateObj.month).padStart(2, "0");
      const day = String(dateObj.day).padStart(2, "0");
      return `${year}${month}${day}`;
    };

    const formattedStartDate = formatDateString(start);
    const formattedEndDate = formatDateString(end);

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  };
  const formatDate = (dateString) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  };


  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);
  return (
    <div>
      <div className="mb-4 mt-6">
        <DateRangePicker
          label="StartDate - EndDate"
          className="max-w-xs"
          onChange={handleChangeDate}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-small text-default-400">
          Total {savedData.length} data
        </span>
        <label className="flex items-center text-small text-default-400">
          Rows per page:
          <select
            className="bg-transparent text-small text-default-400 outline-none"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default SaveApiHeader;
