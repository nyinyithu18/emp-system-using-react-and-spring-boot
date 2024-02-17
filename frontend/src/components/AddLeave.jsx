import React, { useState, useEffect } from "react";
import { Select, Button, Modal, TextInput, Label } from "flowbite-react";
import { leaveDataPost } from "../service/LeaveService";
import { Link } from "react-router-dom";

const AddLeave = () => {
  const [openModal, setOpenModal] = useState(false);
  const [emp_id, setEmpId] = useState();
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [day, setDay] = useState(0);

  const leaveTypeDatas = [
    { value: "Medical Leave", text: "Medical Leave" },
    { value: "Casual Leave", text: "Casual Leave" },
    { value: "Annual Leave", text: "Annual Leave" },
    { value: "Earned Leave", text: "Earned Leave" },
  ];

  const LeaveDataPost = async () => {
    if (
      emp_id != "" &&
      leaveType != "" &&
      fromDate != "" &&
      toDate != "" &&
      day != ""
    ) {
      const postData = {
        emp_id: emp_id,
        leave_type: leaveType,
        from_date: fromDate,
        to_date: toDate,
        days: day,
        deleted: false,
      };
      //console.log(postData);
      await leaveDataPost(postData);
      onCloseModal();
      setEmpId();
      setLeaveType("");
      setFromDate("");
      setToDate("");
      setDay("");
    } else {
      window.confirm("Please fill the input !")
    }
  };

  const handleEmpId = (event) =>{
    setEmpId(event.target.value)
  }

  function onCloseModal() {
    setOpenModal(false);
  }

  useEffect(() => {
    // Calculate the difference in days whenever toDate or fromDate changes
    if (fromDate && toDate) {
      const fromDateTime = new Date(fromDate).getTime();
      const toDateTime = new Date(toDate).getTime();
      const differenceInMilliseconds = Math.abs(toDateTime - fromDateTime);
      const differenceInDays = Math.ceil(
        differenceInMilliseconds / (1000 * 3600 * 24)
      );
      setDay(differenceInDays);
    } else {
      // If either fromDate or toDate is empty, set the difference to 0
      setDay(0);
    }
  }, [fromDate, toDate]);

  return (
    <div>
      <Link to="/empLeaveAdd">
        <Button onClick={() => setOpenModal(true)}>Add</Button>
      </Link>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex justify-between mx-6">
          <span className="text-xl pt-5 ms-1 font-medium text-gray-900 dark:text-white">
            Leave Form
          </span>
          <Link to="/">
            <Modal.Header className="w-12" />
          </Link>
        </div>
        <hr />
        <Modal.Body>
          <div className="grid grid-cols-2 gap-10 mx-2">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="emp_id" value="Employee ID" />
              </div>
              <TextInput
                id="emp_id"
                type="number"
                value={emp_id}
                size="md"
                onChange={handleEmpId}
                required
              />
            </div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="leaveType" value="Leave Type" />
              </div>
              <Select
                id="leaveType"
                onChange={(e) => setLeaveType(e.target.value)}
                required
              >
                {leaveTypeDatas.length > 0 ? (
                  leaveTypeDatas.map((leave, index) => {
                    return (
                      <option key={index} value={leave.value}>
                        {leave.text}
                      </option>
                    );
                  })
                ) : (
                  <option>No Data</option>
                )}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="fromdate" value="From Date" />
              </div>
              <TextInput
                id="fromdate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="todate" value="To Date" />
              </div>
              <TextInput
                id="todate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="day" value="Day" />
              </div>
              <TextInput
                id="day"
                type="text"
                min={new Date().toISOString().split("T")[0]}
                value={day}
                disabled
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-around">
          {emp_id != "" &&
          leaveType != "" &&
          fromDate != "" &&
          toDate != "" &&
          day != "" ? (
            <Link to="/">
              <Button type="button" onClick={() => LeaveDataPost()}>
                Add
              </Button>
            </Link>
          ) : (
            <Button type="button" onClick={() => LeaveDataPost()}>
              Add
            </Button>
          )}

          <Button
            className="btn bg-red-500"
            onClick={() => setOpenModal(false)}
          >
            <Link to="/">Cancel</Link>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddLeave;
