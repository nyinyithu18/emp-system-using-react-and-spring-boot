import React, { useRef, useState } from 'react'
import * as XLSX from 'xlsx';
import { uploadExcelFile } from '../service/EmpService';
import { Button } from 'flowbite-react';

const ImportExcel = () => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) =>{
      setFile(event.target.files[0]);
    }

    const hanleUpload = async() =>{
      const formData = new FormData();
      formData.append('file', file);

      //await uploadExcelFile(formData)
    }
  return (
    <div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Button
            type="button"
            onClick={hanleUpload}
            className="btn bg-blue-500"
          >
            Import
          </Button>
        </div>
  )
}

export default ImportExcel