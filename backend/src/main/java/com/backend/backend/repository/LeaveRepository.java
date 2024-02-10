package com.backend.backend.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.LeaveModel;

@Mapper
public interface LeaveRepository {

	public int addLeave(LeaveModel leaveModel);
	public int deleteLeave(int leave_id);
	public List<LeaveModel> leaveList();
	public LeaveModel searchByLeaveId(int leave_id);
	public int editLeave(LeaveModel leaveModel);
}
