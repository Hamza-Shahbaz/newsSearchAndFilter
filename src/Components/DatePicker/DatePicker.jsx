import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({setFromDate, setToDate}) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update) => {
    setDateRange(update);

    // Format dates to ISO 8601
    const formattedStartDate = update[0] ? update[0].toISOString() : null;
    const formattedEndDate = update[1] ? update[1].toISOString() : null;

    setFromDate(formattedStartDate);
    setToDate(formattedEndDate);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleDateChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      isClearable
      className="w-full px-4 h-[51px] py-2 border-2 rounded-lg outline-none focus:border-blue-500"
      placeholderText="Select a date range"
    />
  );
};

export default CustomDatePicker;
