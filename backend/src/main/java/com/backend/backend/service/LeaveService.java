package com.backend.backend.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.model.EmpModel;

public interface LeaveService {

	public int addLeave(EmpModel empModel);
	public void uploadFile(MultipartFile file);
	public int deleteLeave(int leave_id);
	public List<EmpModel> leaveList();
	public List<EmpModel> empLeaveList();
	public EmpModel searchByLeaveId(int leave_id);
	public int editLeave(EmpModel empModel);
}
