import { Button, Table } from "flowbite-react";
import React from "react";
import AddLeave from "./AddLeave";
import { leaveEditData } from "../service/LeaveService";

const LeaveTableData = ({ leaveData }) => {
  // Fetch Edit Leave Data
  const fetchEditData = async (leave) => {
    await leaveEditData(leave);
    console.log(leave);
  };

  // Check delete Employee Data
  const handleCheckDelete = (leave_id) => {
    if (window.confirm("Are you sure?")) {
      const editleavedata = leaveData.map((leave) => {
        if (leave.leave_id == leave_id) {
          return { ...leave, deleted: true };
        }
        return leave;
      });

      editleavedata.map((leave) => {
        if (leave.leave_id === leave_id) {
          fetchEditData(leave);
        }
      });
    }
  };

  return (
    <div className="overflow-x-auto mx-5 my-7">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Employee ID</Table.HeadCell>
          <Table.HeadCell>Leave Type</Table.HeadCell>
          <Table.HeadCell>From Date</Table.HeadCell>
          <Table.HeadCell>To Date</Table.HeadCell>
          <Table.HeadCell>Days</Table.HeadCell>
          <Table.HeadCell>
            <AddLeave />
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {leaveData.length > 0 ? (
            leaveData.map((leave, index) => {
              if (leave.deleted == false) {
                return (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {leave.emp_id}
                    </Table.Cell>
                    <Table.Cell>{leave.leave_type}</Table.Cell>
                    <Table.Cell>{leave.from_date}</Table.Cell>
                    <Table.Cell>{leave.to_date}</Table.Cell>
                    <Table.Cell>{leave.days}</Table.Cell>
                    <Table.Cell>
                      <Button
                        type="button"
                        onClick={() => handleCheckDelete(leave.leave_id)}
                        className="btn bg-red-500"
                      >
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                );
              }
            })
          ) : (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                No Data
              </Table.Cell>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
              <Table.Cell>No Data</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default LeaveTableData;
