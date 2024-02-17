import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { editEmployeeData, searchByEmpId } from "../service/EmpService";
import { Link } from "react-router-dom";
import { api } from "../api/ApiResources";

const EditEmpData = () => {
  const [empData, setEmpData] = useState({
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

  // Search By Emp Id
  const SearchByEmpId = async () => {
    const emp = await searchByEmpId(emp_id.emp_id);
    setEmpData(emp.data);
    //console.log(emp.data);
  };

  function handle(e) {
    const eEmpData = { ...empData };
    eEmpData[e.target.id] = e.target.value;
    setEmpData(eEmpData);
  }

  // Put Edit Employee Data
  const EditData = async () => {
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
    await editEmployeeData(empEditData);
  };

  useEffect(() => {
    FetchRank();
    FetchDepartment();
    SearchByEmpId();
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="lg:flex lg:justify-around lg:w-full">
          <div className="flex max-w-md mt-3 flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="emp_name" value="Name" />
              </div>
              <TextInput
                id="emp_name"
                value={empData.emp_name}
                onChange={(e) => handle(e)}
                type="text"
                sizing="md"
                className="w-96"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nrc" value="NRC" />
              </div>
              <TextInput
                id="nrc"
                value={empData.nrc}
                onChange={(e) => handle(e)}
                type="text"
                sizing="md"
                className="w-96"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <TextInput
                id="phone"
                value={empData.phone}
                onChange={(e) => handle(e)}
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
                value={empData.email}
                onChange={(e) => handle(e)}
                type="text"
                sizing="md"
                className="w-96"
              />
            </div>
          </div>
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
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center lg:justify-around mt-5">
        <span></span>
        <span></span>
        <span></span>
        <div className="flex flex-row gap-4">
          <Button
            type="button"
            onClick={() => EditData()}
            className="btn bg-blue-500"
          >
            Update
          </Button>
          <Link to="/empList">
            <Button className="btn bg-blue-500">List</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditEmpData;
