import { Button, Label, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/ApiResources";
import ExcelExport from "./ExcelExport";
import { editEmployeeData } from "../service/EmpService";
import EmpTableData from "./EmpTableData";
import EmpTablePagination from "./EmpTablePagination";
import axios from "axios";

const EmpList = () => {
  const [empData, setEmpData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [empLeaveData, setEmpLeaveData] = useState([]);

  const fileName = "Emp Datas";

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(7);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fetch Emp Data
  const FetchEmpData = async () => {
    const res = await api.get("/empList");
    setEmpData(res.data);
    setFilteredData(res.data);
  };

  // Fetch Emp and Leave Data
  const FetchEmpLeaveData = async () => {
    const res = await api.get("/empLeaveList");
    setEmpLeaveData(res.data);
  };

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Import Excel file
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      if (file != null) {
        await axios.post("http://localhost:8080/uploadFile", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFile(null);
        alert("File uploaded successfully");
        console.log("success");
      } else {
        alert("Please choose excel file on your device!");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fetchEditData = async (emp) => {
    await editEmployeeData(emp);
    //console.log(emp);
  };

  // Check delete Employee Data
  const handleCheckDelete = (emp_id) => {
    if (window.confirm("Are you sure?")) {
      const editempdata = empData.map((emp) => {
        if (emp.emp_id == emp_id) {
          return { ...emp, checkdelete: true };
        }
        return emp;
      });

      editempdata.map((emp) => {
        if (emp.emp_id === emp_id) {
          fetchEditData(emp);
        }
      });
    }
  };

  useEffect(() => {
    FetchEmpData();
    FetchEmpLeaveData();
  }, []);

  return (
    <div className="mt-6">
      <div className="flex justify-between mx-6">
        <div></div>
        <div className="flex flex-rows gap-4">
          <div className="flex">
            <Label
              htmlFor="search"
              value="Search"
              className="mt-2 me-1 text-md"
            />
            <TextInput
              id="search"
              type="text"
              sizing="md"
              placeholder="ID... / Name... "
              onChange={(e) =>
                setEmpData(
                  filteredData.filter(
                    (f) =>
                      f.emp_id == e.target.value ||
                      f.emp_name.toLowerCase().includes(e.target.value)
                  )
                )
              }
            />
          </div>
          <div>
            <Link to="/">
              <Button className="btn bg-blue-500 w-20">Go</Button>
            </Link>
          </div>

          <div className="flex">
            <input
              type="file"
              className="border bg-slate-200 w-60 me-4 rounded-lg"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              onClick={handleFileUpload}
              className="btn bg-blue-500"
            >
              Import
            </Button>
          </div>
          <div>
            <ExcelExport excelData={empLeaveData} fileName={fileName} />
          </div>
        </div>
      </div>
      <EmpTableData
        empData={empData.slice(
          (currentPage - 1) * postPerPage,
          currentPage * postPerPage
        )}
        handleCheckDelete={handleCheckDelete}
      />
      <EmpTablePagination
        postPerPage={postPerPage}
        totalPost={empData.length}
        paginate={paginate}
      />
    </div>
  );
};

export default EmpList;
