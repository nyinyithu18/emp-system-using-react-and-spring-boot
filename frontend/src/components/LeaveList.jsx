import React from "react";
import { Table, Button } from "flowbite-react";

const LeaveList = () => {
  return (
    <div className="overflow-x-auto mx-5 mt-6">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Employee ID</Table.HeadCell>
          <Table.HeadCell>Employee Name</Table.HeadCell>
          <Table.HeadCell>Leave Type</Table.HeadCell>
          <Table.HeadCell>From Date</Table.HeadCell>
          <Table.HeadCell>To Date</Table.HeadCell>
          <Table.HeadCell>Days</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              1
            </Table.Cell>
            <Table.Cell>Mg Mg</Table.Cell>
            <Table.Cell>Adverse weather</Table.Cell>
            <Table.Cell>9/2/2024</Table.Cell>
            <Table.Cell>10/2/2024</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>
              <div>
                <Button type="button" className="btn bg-red-500">
                  Delete
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              1
            </Table.Cell>
            <Table.Cell>Mg Mg</Table.Cell>
            <Table.Cell>Adverse weather</Table.Cell>
            <Table.Cell>9/2/2024</Table.Cell>
            <Table.Cell>10/2/2024</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>
              <div>
                <Button type="button" className="btn bg-red-500">
                  Delete
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default LeaveList;
