// File: ExportExcel.js
import { Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import React from 'react';
import * as XLSX from 'xlsx';

const ExportExcel = ({ data, filename }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, filename + ".xlsx");
  };

  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
     className="flex items-center gap-4">
      <Button
        onClick={exportToExcel}
        className="bg-gradient-to-r from-lime-700 to-lime-400 text-white font-bold py-2 px-4 rounded flex items-center gap-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        Export to Excel
      </Button>
    </motion.div>
    
  );
};

export default ExportExcel;