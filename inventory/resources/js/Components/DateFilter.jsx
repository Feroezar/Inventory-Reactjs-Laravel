// File: DateFilter.js

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        if (startDate && endDate) {
            onDateChange(startDate, endDate);
        }
    }, [startDate, endDate]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const clearDates = () => {
        setStartDate(null);
        setEndDate(null);
        onDateChange(null, null);
    };

    return (
        <div className="flex items-center gap-4">
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="Start Date"
                className="px-4 py-2 border rounded"
            />
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                dateFormat="yyyy-MM-dd"
                placeholderText="End Date"
                className="px-4 py-2 border rounded"
            />
            <button
                onClick={clearDates}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Clear Dates
            </button>
        </div>
    );
};

export default DateFilter;
