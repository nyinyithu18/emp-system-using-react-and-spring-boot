import { api } from "../api/ApiResources";

export const empDataPost = (empData) =>{
    return api.post("/addEmp", empData);
}

export const searchByEmpId = (emp_id) => {
    return api.get(`/searchEmpId?emp_id=${emp_id}`)
}

export const editEmployeeData = (data) =>{
    return api.put('/editEmp', data)
}

// upload excel file
export const uploadExcelFile = (file) =>{
    return api.post('/uploadFile', file);
}