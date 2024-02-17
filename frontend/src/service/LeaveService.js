import { api } from "../api/ApiResources";

export const leaveDataPost = (leaveDate) =>{
    return api.post("/addLeave", leaveDate);
}

export const leaveEditData = (data) => {
    return api.put('/editLeave', data)
}
