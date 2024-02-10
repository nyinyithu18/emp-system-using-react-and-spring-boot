package com.backend.backend.service;

import java.util.List;

import com.backend.backend.model.LeaveModel;

public interface LeaveService {

	public int addLeave(LeaveModel leaveModel);
	public int deleteLeave(int leave_id);
	public List<LeaveModel> leaveList();
	public LeaveModel searchByLeaveId(int leave_id);
	public int editLeave(LeaveModel leaveModel);
}
