import React from "react";
import { Button } from "flowbite-react";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExcelExport = ({ excelData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = (excelData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      variand="contained"
      onClick={(e) => exportToExcel(excelData, fileName)}
      className="cursor-pointer btn bg-blue-500"
    >
      Export
    </Button>
  );
};

export default ExcelExport;
