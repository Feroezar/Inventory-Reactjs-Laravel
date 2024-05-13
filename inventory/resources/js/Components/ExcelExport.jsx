// File: ExportExcel.js
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
    <button onClick={exportToExcel}>Export to Excel</button>
  );
};

export default ExportExcel;