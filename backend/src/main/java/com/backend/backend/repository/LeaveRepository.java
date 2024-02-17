package com.backend.backend.repository;

import java.util.List;   

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.EmpModel;

@Mapper
public interface LeaveRepository {

	public int addLeave(EmpModel empModel);
	public int addEmployee(EmpModel empModel);
	public int deleteLeave(int leave_id);
	public List<EmpModel> leaveList();
	public List<EmpModel> empLeaveList();
	public EmpModel searchByLeaveId(int leave_id);
	public int editLeave(EmpModel empModel);
}
