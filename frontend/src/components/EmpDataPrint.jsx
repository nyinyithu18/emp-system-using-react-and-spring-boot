import { Button, Modal, Table } from 'flowbite-react'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const EmpDataPrint = ({empData, leaveEntries}) => {
const printRef = useRef();
const [openModal, setOpenModal] = useState(false);
    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        
      });
  return (
    <div>
      <Link to="/reportEmpDatas">
        <Button className="btn bg-blue-500" onClick={() => setOpenModal(true)}>Report</Button>
      </Link>
      <Modal ref={printRef} show={openModal} onClose={() => setOpenModal(false)}>
        <div className="flex justify-between mx-6">
          <span className="text-xl pt-5 ms-1 font-medium text-gray-900 dark:text-white">
            Leave Form
          </span>
          <Link to="/empList">
            <Modal.Header className="w-12" />
          </Link>
        </div>
        <hr />
        <Modal.Body>
        <div className="hidden">
        <div>
          <h1 className=" text-xl text-center">Employee Information</h1>
          <div className="">
            <div className="flex mt-6">
              <h1 className="me-2">
                Employee ID :<span className="ms-12">{empData.emp_id}</span>
              </h1>
            </div>
            <div className="flex mt-4">
              <h1 className="me-2">
                Name : <span className="ms-12">{empData.emp_name}</span>
              </h1>
            </div>
            <div className="flex mt-4">
              <h1 className="me-2">
                NRC : <span className="ms-12 ps-3">{empData.nrc}</span>
              </h1>
            </div>
            <div className="flex mt-4">
              <h1 className="me-2">
                Phone : <span className="ms-11">{empData.phone}</span>
              </h1>
            </div>
            <div className="flex mt-4">
              <h1 className="me-2">
                Email :<span className="ms-12 ps-1">{empData.email}</span>
              </h1>
            </div>
            <div className="flex mt-6">
              <h1 className="me-2">Date Of Birth : {empData.dob}</h1>
            </div>
            <div className="flex mt-4">
              <h1 className="me-2">
                Rank : <span className="ms-12 ps-3">{empData.rank}</span>
              </h1>
            </div>
            <div className="flex mt-4">
              <h1 className="me-2">
                Department : <span className="ms-2">{empData.dep}</span>
              </h1>
            </div>
            <div className="flex mt-4">
              <h1 className="me-2">
                Address : <span className="ms-9">{empData.address}</span>
              </h1>
            </div>
            <h1>Leave Type</h1>
            <div className="overflow-x-auto mt-6 mx-5">
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
                      if (leave.deleted == false) {
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
                      }
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
        </div>
      </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-around">
          <Button type="button" className="btn bg-blue-500 w-20" onClick={handlePrint}>
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
  )
}

export default EmpDataPrint