import { Button, Checkbox, Label, Modal, Table } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { api } from "../api/ApiResources";

const EmpDataPrint = ({ empData }) => {
  const printRef = useRef();
  const [openModal, setOpenModal] = useState(false);

  const [leaveData, setLeaveData] = useState([]);
  const [leaveEntries, setLeaveEntries] = useState([]);
  const [image, setImages] = useState("");
  const [empInterestList, setEmpInterestList] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const emp_id = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const leaveList = await api.get("/leaveList");
      setLeaveData(leaveList.data);

      const empInterests = await api.get("/empInterestList");
      setEmpInterestList(empInterests.data);
    };

    const relevantLeaveEntries = leaveData.filter(
      (leave) => leave.emp_id == empData.emp_id && leave.deleted == false
    );
    setLeaveEntries(relevantLeaveEntries);

    fetchData();
  }, [empData.emp_id]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Filter Interests Relevant With Employee
  useEffect(() => {
    const relevantEmpInterests = empInterestList.filter(
      (empinterest) => empinterest.emp_id == emp_id.emp_id
    );
    
    const selectedEmpInterests = relevantEmpInterests.map((empinterest) => {
      if (empinterest.interest_checked === false) {
        return empinterest.interest_name;
      }
    });
    setSelectedInterests(selectedEmpInterests);
  }, [empInterestList, emp_id]);

  return (
    <div>
      <Link to={`/reportEmpDatas/${empData.emp_id}`}>
        <Button className="btn bg-blue-500" onClick={() => setOpenModal(true)}>
          Report
        </Button>
      </Link>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex justify-between mx-6">
          <span className="text-xl pt-5 ms-1 font-medium text-gray-900 dark:text-white">
            Report
          </span>
          <Link to={`/editEmpData/${empData.emp_id}`}>
            <Modal.Header className="w-12" />
          </Link>
        </div>
        <hr />
        <Modal.Body>
          <div ref={printRef}>
            <h1 className="font-bold text-2xl text-center">
              Employee Information
            </h1>
            <div className="flex justify-around">
              <div className="mt-4">
                <div className="flex">
                  <h1 className="me-2">
                    Employee ID{" "}
                    <span className="ms-1">{`>> ${empData.emp_id}`}</span>
                  </h1>
                </div>
                <div className="flex mt-4">
                  <h1 className="me-2">
                    Name{" "}
                    <span className="ms-12 ps-1">{`>> ${empData.emp_name}`}</span>
                  </h1>
                </div>
                <div className="flex mt-4">
                  <h1 className="me-2">
                    NRC{" "}
                    <span className="ms-12 ps-4">{`>> ${empData.nrc}`}</span>
                  </h1>
                </div>
                <div className="flex mt-4">
                  <h1 className="me-2">
                    Phone{" "}
                    <span className="ms-12 ps-1">{`>> ${empData.phone}`}</span>
                  </h1>
                </div>
                <div className="flex mt-4">
                  <h1 className="me-2">
                    Email{" "}
                    <span className="ms-12 ps-3">{`>> ${empData.email}`}</span>
                  </h1>
                </div>
                <div className="flex mt-6">
                  <h1 className="me-2">
                    Date of Birth{" "}
                    <span className="ms-2">{`>> ${empData.dob}`}</span>
                  </h1>
                </div>
                <div className="flex mt-4">
                  <h1 className="me-2">
                    Rank{" "}
                    <span className="ms-12 ps-4">{`>> ${empData.rank}`}</span>
                  </h1>
                </div>
                <div className="flex mt-4">
                  <h1 className="me-2">
                    Department{" "}
                    <span className="ms-4">{`>> ${empData.dep}`}</span>
                  </h1>
                </div>
                <div className="flex mt-4">
                  <h1 className="me-2">
                    Address{" "}
                    <span className="ms-11">{`>> ${empData.address}`}</span>
                  </h1>
                </div>
                <div className="max-w-md">
                  <div className="mb-2 mt-6 block">
                    <Label
                      className="font-medium text-lg"
                      htmlFor="interests"
                      value="Interests"
                    />
                  </div>
                  <div className="">
                    {selectedInterests.length > 0 ? (
                      selectedInterests.map((interest, index) => {
                        if (interest !== undefined) {
                          return (
                            <div key={index}>
                              {index + 1}. {interest}
                            </div>
                          );
                        }
                      })
                    ) : (
                      <div>No Interests</div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-40 mt-5">
                {empData.image ? (
                  <img
                    className="rounded-full"
                    src={
                      image
                        ? URL.createObjectURL(image)
                        : `data:image/jpeg;base64,${empData.image}`
                    }
                    alt=""
                  />
                ) : (
                  <img src="../photo/image-upload.png" alt="" />
                )}
              </div>
            </div>
            <h1 className="ms-6 mt-6 text-lg font-medium">Leave Type</h1>
            <div className="overflow-x-auto mt-3 mx-5">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Leave Type</Table.HeadCell>
                  <Table.HeadCell>From Date</Table.HeadCell>
                  <Table.HeadCell>To Date</Table.HeadCell>
                  <Table.HeadCell>Days</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {leaveEntries.length > 0 ? (
                    leaveEntries.map((leave, index) => {
                      return (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {leave.leave_type}
                          </Table.Cell>
                          <Table.Cell>{leave.from_date}</Table.Cell>
                          <Table.Cell>{leave.to_date}</Table.Cell>
                          <Table.Cell>{leave.days}</Table.Cell>
                        </Table.Row>
                      );
                    })
                  ) : (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        No Data
                      </Table.Cell>
                      <Table.Cell>No Data</Table.Cell>
                      <Table.Cell>No Data</Table.Cell>
                      <Table.Cell>NO Data</Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-around">
          <Button
            type="button"
            className="btn bg-blue-500 w-20"
            onClick={handlePrint}
          >
            Print
          </Button>

          <Button
            className="btn bg-red-500"
            onClick={() => setOpenModal(false)}
          >
            PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmpDataPrint;
