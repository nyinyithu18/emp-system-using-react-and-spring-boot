import React, { useEffect, useState } from "react";
import {
  Label,
  TextInput,
  Select,
  Textarea,
  Button,
} from "flowbite-react";
import { Link } from "react-router-dom";
import { api } from "../api/ApiResources";
import { empDataPost } from "../service/EmpService";
import LeaveTableData from "./LeaveTableData";
import LeaveTablePagination from "./LeaveTablePagination";

const EmpData = () => {
  const [rankData, setRankData] = useState([]);
  const [depData, setDepData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  const [empName, setEmpName] = useState("");
  const [nrc, setNrc] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [rankdata, setRank] = useState("");
  const [dep, setDep] = useState("");
  const [address, setAddress] = useState("");

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [nrcError, setNrcError] = useState("");

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage] = useState(4);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Name validation
  const handleNameChange = (event) => {
    const { value } = event.target;
    setEmpName(value);
    if (!value.trim()) {
      setNameError("Name is required");
    }
  };

  // Email Validation
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setEmailError("Invalid email address");
    }
  };

  // NRC validation
  const handleNrcChange = (event) => {
    const { value } = event.target;
    setNrc(value);
    if (!value.trim()) {
      setNrcError("Nrc is required");
    }
  };

  // Emp Data Post
  const EmpDataPost = async () => {
    if (
      empName != "" &&
      nrc != "" &&
      phone != "" &&
      email != "" &&
      dob != "" &&
      address != ""
    ) {
      const postData = {
        emp_name: empName,
        nrc: nrc,
        phone: phone,
        email: email,
        dob: dob,
        rank: rankdata,
        dep: dep,
        address: address,
        active: false,
        checkdelete: false
      };
      //console.log(postData);
      await empDataPost(postData);
      setEmpName("");
      setNrc("");
      setPhone("");
      setEmail("");
      setDob("");
      setRank("");
      setDep("");
      setAddress("");
    } else {
      window.confirm("Please fill Employee Data !")
    }
  };

  // fetch rank datas
  const FetchRank = async () => {
    const res = await api.get("/rankList");
    setRankData(res.data);
  };

  // fetch department datas
  const FetchDepartment = async () => {
    const res = await api.get("/depList");
    setDepData(res.data);
    //console.log(depData);
  };

  // fetch leave list
  const FetchLeaveList = async () => {
    const res = await api.get("/leaveList");
    setLeaveData(res.data);
    //console.log(leaveData);
  };

  useEffect(() => { 
    FetchRank();
    FetchDepartment();
    FetchLeaveList();
  }, [leaveData]);

  return (
    <>
      <div className="flex justify-center">
        <div className="lg:flex lg:justify-around lg:w-full">
          <div className="flex max-w-md mt-3 flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                value={empName}
                onChange={handleNameChange}
                type="text"
                sizing="md"
                className="w-96"
              />
              {nameError && <div className="text-red-500">{nameError}</div>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nrc" value="NRC" />
              </div>
              <TextInput
                id="nrc"
                value={nrc}
                onChange={handleNrcChange}
                type="text"
                sizing="md"
                className="w-96"
              />
              {nrcError && <div className="text-red-500">{nrcError}</div>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <TextInput
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                sizing="md"
                className="w-96"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type="text"
                sizing="md"
                className="w-96"
              />
              {emailError && <div className="text-red-500">{emailError}</div>}
            </div>
          </div>
          <div className="flex max-w-md flex-col mt-3 gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="dob" value="Date Of Birth" />
              </div>
              <TextInput
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
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
                required
                onChange={(e) => setRank(e.target.value)}
                className="w-96"
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-2 mx-2">
        <div className="mt-8 mx-6 flex justify-center lg:justify-between">
          <h1 className="text-xl font-bold">Leave List</h1>
          <span></span>
        </div>
        <LeaveTableData leaveData={leaveData.slice(
          (currentPage - 1) * postPerPage,
          currentPage * postPerPage
        )} />
        <LeaveTablePagination
        postPerPage={postPerPage}
        totalPost={leaveData.length}
        paginate={paginate}
        />
        <div className="flex justify-around">
          <span></span>
          <span></span>
          <span></span>
          <div className="flex flex-row gap-4">
            <Button
              type="button"
              onClick={() => EmpDataPost()}
              className="btn bg-blue-500"
            >
              Save
            </Button>
            <Button type="button" className="btn bg-red-500">
              Delete
              </Button>
            <Link to="/empList">
              <Button className="btn bg-blue-500">List</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmpData;
