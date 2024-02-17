import React from "react";
import EmpList from "./components/EmpList";
import Home from "./components/Home";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import LeaveList from "./components/LeaveList";
import EditEmpData from "./components/EditEmpData";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/empList" element={<EmpList/>} />
        <Route path="/empLeaveAdd" element={<Home/>} />
        <Route path="/empLeaveList" element={<LeaveList/>} />
        <Route path="/editEmpData/:emp_id" element={<EditEmpData />} />
        
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </>
  );
};

export default App;
