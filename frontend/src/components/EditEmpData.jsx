import {
  Button,
  Checkbox,
  Label,
  Select,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { editEmployeeData, searchByEmpId } from "../service/EmpService";
import { Link } from "react-router-dom";
import { api } from "../api/ApiResources";
import { leaveDataPost, leaveEditData } from "../service/LeaveService";
import { useReactToPrint } from "react-to-print";
import EmpDataPrint from "./EmpDataPrint";

const EditEmpData = () => {
  const [empData, setEmpData] = useState({
    emp_id: "",
    emp_name: "",
    nrc: "",
    phone: "",
    email: "",
    dob: "",
    address: "",
  });

  const [rank, setRank] = useState("");
  const [dep, setDep] = useState("");

  const [rankData, setRankData] = useState([]);
  const [depData, setDepData] = useState([]);
  const emp_id = useParams();
  const [leaveData, setLeaveData] = useState([]);
  const [leaveEntries, setLeaveEntries] = useState([]);

  // For Emp image upload
  const inputRef = useRef(null);
  const [image, setImages] = useState("");

  // For Validation
  const [nameError, setNameError] = useState("");
  const [nrcError, setNrcError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [count, setCount] = useState(0);

  function handle(e) {
    const eEmpData = { ...empData };
    eEmpData[e.target.id] = e.target.value;
    setEmpData(eEmpData);
  }

  // Put Edit Employee Data and Leave Data
  const EditData = async () => {
    // Validation
    if (!empData.emp_name.trim()) {
      setNameError("Name is required");
      return;
    }
    if (!empData.nrc.trim()) {
      setNrcError("NRC is required");
      return;
    }
    if (!empData.phone.trim()) {
      setPhoneError("Phone is required");
      return;
    }
    if (!empData.email.trim()) {
      setEmailError("Email is required");
      return;
    }

    const empEditData = {
      emp_id: emp_id.emp_id,
      emp_name: empData.emp_name,
      nrc: empData.nrc,
      phone: empData.phone,
      email: empData.email,
      dob: empData.dob,
      rank: rank,
      dep: dep,
      address: empData.address,
    };

    // Put Emp Data
    const empEditResponse = await editEmployeeData(empEditData);
    //console.log("Employee Edit Successfully", empEditResponse);

    for (const entry of leaveEntries) {
      if (!entry.deleted) {
        const postLeaveData = {
          leave_id: entry.leave_id,
          emp_id: emp_id.emp_id,
          leave_type: entry.leave_type,
          from_date: entry.from_date,
          to_date: entry.to_date,
          days: entry.days,
        };
        if (entry.leave_id) {
          //Put Edit Leave Data
          const leaveResponse = await leaveEditData(postLeaveData);
          //console.log("Leave Edit Successfully", leaveResponse);
          alert("Employee and Leave datas updated successfully!");
        } else {
          // Post leave datas
          const leaveResponse = await leaveDataPost(postLeaveData);
          //console.log("Leave Add Successfully", leaveResponse);
          alert("Employee and Leave datas updated successfully!");
        }
      }
    }
    setNameError("");
    setNrcError("");
    setPhoneError("");
    setEmailError("");
  };

  // Fetch Request Data For Rank, Department, Leave, SearchByEmpId
  useEffect(() => {
    const fetchData = async () => {
      const rankResponse = await api.get("/rankList");
      setRankData(rankResponse.data);

      const depResponse = await api.get("/depList");
      setDepData(depResponse.data);

      const emp = await searchByEmpId(emp_id.emp_id);
      setEmpData(emp.data);

      const leaveList = await api.get("/leaveList");
      setLeaveData(leaveList.data);
    };

    fetchData();
  }, [count]);

  useEffect(() => {
    const relevantLeaveEntries = leaveData.filter(
      (leave) => leave.emp_id == emp_id.emp_id && leave.deleted == false
    );
    setLeaveEntries(relevantLeaveEntries);
  }, [leaveData, emp_id]);

  // Add Leave Form
  const handleAddEntry = () => {
    const newEntry = {
      emp_id: emp_id.emp_id,
      leave_type: "",
      from_date: "",
      to_date: "",
      days: "",
    };
    setLeaveEntries([...leaveEntries, newEntry]);
  };

  const handleLeaveTypeChange = (index, value) => {
    const updatedEntries = [...leaveEntries];
    updatedEntries[index]["leave_type"] = value;
    setLeaveEntries(updatedEntries);
  };

  // Put Edit Leave Data For Soft Delete
  const handleSearchLeave = async (searchLeave) => {
    const res = leaveEditData(searchLeave);
    //console.log("success delete", res);
    setCount(leaveEntries.length);
  };

  // Remove Leave Form
  const handleRemoveEntry = (index, leave_id) => {
    if (leave_id) {
      if (window.confirm("Are you sure?")) {
        const updatedEntries = leaveEntries.map((entry, i) => {
          if (i == index) {
            return { ...entry, deleted: true };
          }
          return entry;
        });

        updatedEntries.map((searchLeave) => {
          if (searchLeave.leave_id === leave_id) {
            handleSearchLeave(searchLeave);
          }
        });
      }
    } else {
      const updatedEntries = [...leaveEntries];
      updatedEntries.splice(index, 1);
      setLeaveEntries(updatedEntries);
    }
  };

  // Handle Leave Input
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEntries = [...leaveEntries];
    updatedEntries[index][name] = value !== undefined ? value : "";

    if (name === "from_date" || name === "to_date") {
      const startDate = new Date(updatedEntries[index].from_date);
      const endDate = new Date(updatedEntries[index].to_date);

      // Check if both dates are valid
      if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
        const differenceInTime = endDate.getTime() - startDate.getTime();
        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 3600 * 24)
        );
        updatedEntries[index]["days"] = differenceInDays;
      } else {
        // If either date is invalid, set days to empty string or handle the error accordingly
        updatedEntries[index]["days"] = "";
      }
    }

    setLeaveEntries(updatedEntries);
  };

  // Leave Types
  const leaveTypeDatas = [
    { value: "Medical Leave", text: "Medical Leave" },
    { value: "Casual Leave", text: "Casual Leave" },
    { value: "Annual Leave", text: "Annual Leave" },
    { value: "Earned Leave", text: "Earned Leave" },
  ];

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const onImageChange = (event) => {
    setImages(event.target.files[0]);
  };

  return (
    <div>
      

      <div className="flex justify-center">
        <div className="lg:flex lg:justify-around lg:w-full">
          <div className="flex justify-center justify-items-center mt-3 lg:mt-12 lg:pt-4">
            <div>
              <h1 className="text-center text-lg mb-3">
                {image ? image.name : "Choose an image"}
              </h1>
              <div onClick={handleImageClick} className="cursor-pointer w-56">
                {image ? (
                  <img
                    className="rounded-full"
                    src={URL.createObjectURL(image)}
                    alt=""
                  />
                ) : (
                  <img src="../photo/image-upload.png" alt="" />
                )}
                <input
                  type="file"
                  ref={inputRef}
                  onChange={onImageChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>
          </div>
          <div className="flex max-w-md mt-3 flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="id">Emp ID</Label>
              </div>
              <TextInput
                id="id"
                value={emp_id.emp_id}
                onChange={(e) => handle(e)}
                type="number"
                sizing="md"
                className="w-96"
                readOnly
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="emp_name">
                  Name <span className="ms-1 text-red-500">*</span>
                </Label>
              </div>
              <TextInput
                id="emp_name"
                value={empData.emp_name}
                onChange={(e) => handle(e)}
                type="text"
                sizing="md"
                className="w-96"
              />
              {nameError && <div className="text-red-500">{nameError}</div>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nrc">
                  NRC <span className="ms-1 text-red-500">*</span>
                </Label>
              </div>
              <TextInput
                id="nrc"
                value={empData.nrc}
                onChange={(e) => handle(e)}
                type="text"
                sizing="md"
                className="w-96"
              />
              {nrcError && <div className="text-red-500">{nrcError}</div>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone">
                  Phone <span className="ms-1 text-red-500">*</span>
                </Label>
              </div>
              <TextInput
                id="phone"
                value={empData.phone}
                onChange={(e) => handle(e)}
                type="text"
                sizing="md"
                className="w-96"
              />
              {phoneError && <div className="text-red-500">{phoneError}</div>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">
                  Email <span className="ms-1 text-red-500">*</span>
                </Label>
              </div>
              <TextInput
                id="email"
                value={empData.email}
                onChange={(e) => handle(e)}
                type="text"
                sizing="md"
                className="w-96"
              />
              {emailError && <div className="text-red-500">{emailError}</div>}
            </div>
          </div>
          <div></div>
          <div className="flex max-w-md flex-col mt-3 gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dob" value="Date Of Birth" />
              </div>
              <TextInput
                id="dob"
                value={empData.dob}
                onChange={(e) => handle(e)}
                type="date"
                sizing="md"
                max={new Date().toISOString().split("T")[0]}
                className="w-96"
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="rank" value="Rank" />
              </div>
              <Select
                id="rank"
                onChange={(e) => setRank(e.target.value)}
                className="w-96"
                required
              >
                {rankData.length > 0 ? (
                  rankData.map((rank) => {
                    return (
                      <option value={rank.rank_name} key={rank.rank_id}>
                        {rank.rank_name}
                      </option>
                    );
                  })
                ) : (
                  <option>No Data</option>
                )}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="dep" value="Department" />
              </div>
              <Select
                id="dep"
                required
                onChange={(e) => setDep(e.target.value)}
                className="w-96"
              >
                {depData.length > 0 ? (
                  depData.map((department) => {
                    return (
                      <option
                        value={department.dep_name}
                        key={department.dep_id}
                      >
                        {department.dep_name}
                      </option>
                    );
                  })
                ) : (
                  <option>No Data</option>
                )}
              </Select>
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="address" value="Address" />
              </div>
              <Textarea
                id="address"
                placeholder="Address..."
                value={empData.address}
                onChange={(e) => handle(e)}
                required
                rows={2}
              />
            </div>
            <div>
              <h1 className="font-bold mb-2">Interest</h1>
              <div className="grid grid-rows-2 grid-flow-col">
                <div className="flex items-center gap-2 mb-2">
                  <Label htmlFor="remember">Reading </Label>
                  <Checkbox id="remember" />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="remember">Drawing</Label>
                  <Checkbox id="remember" />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="remember">Cooking</Label>
                  <Checkbox id="remember" />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="remember">Dancing</Label>
                  <Checkbox id="remember" />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="remember">Blogging</Label>
                  <Checkbox id="remember" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-2 flex justify-center lg:justify-around">
        <h1 className="text-xl ms-2 font-bold">Leave List</h1>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="overflow-x-auto lg:px-12 lg:mx-12">
        <div className="lg:mx-8">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>No.</Table.HeadCell>
              <Table.HeadCell>Leave Type</Table.HeadCell>
              <Table.HeadCell>From Date</Table.HeadCell>
              <Table.HeadCell>To Date</Table.HeadCell>
              <Table.HeadCell>Days</Table.HeadCell>
              <Table.HeadCell>
                <Button
                  type="button"
                  onClick={handleAddEntry}
                  className="btn bg-blue-500 w-20"
                >
                  Add
                </Button>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {leaveEntries.map((entry, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>
                    <Select
                      id={`leave_type_${index}`}
                      value={entry.leave_type}
                      onChange={(e) =>
                        handleLeaveTypeChange(index, e.target.value)
                      }
                      required
                    >
                      {leaveTypeDatas.map((leave, index) => (
                        <option key={index} value={leave.value}>
                          {leave.text}
                        </option>
                      ))}
                    </Select>
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="date"
                      id={`from_date_${index}`}
                      name="from_date"
                      value={entry.from_date}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="date"
                      id={`to_date_${index}`}
                      name="to_date"
                      value={entry.to_date}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <TextInput
                      type="text"
                      id={`days_${index}`}
                      name="days"
                      value={entry.days}
                      readOnly // Make it read-only
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      type="button"
                      className="btn bg-red-500 w-20"
                      onClick={() => handleRemoveEntry(index, entry.leave_id)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>

      <div className="flex justify-center lg:justify-around mt-5 mb-3">
        <span></span>
        <span></span>
        <span></span>
        <div className="flex flex-row gap-4">
          <Button
            type="button"
            onClick={() => EditData()}
            className="btn bg-blue-500 w-20"
          >
            Update
          </Button>
          <EmpDataPrint empData={empData} leaveEntries={leaveEntries} />
          <Link to="/empList">
            <Button className="btn bg-blue-500 w-20">List</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditEmpData;
