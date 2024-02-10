package com.backend.backend.service.empserviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.LeaveModel;
import com.backend.backend.repository.LeaveRepository;
import com.backend.backend.service.LeaveService;

@Service
public class LeaveServiceImpl implements LeaveService{

	@Autowired
	private LeaveRepository leaveRepository;
	
	@Override
	public int addLeave(LeaveModel leaveModel) {
		return leaveRepository.addLeave(leaveModel);
	}

	@Override
	public int deleteLeave(int leave_id) {
		return leaveRepository.deleteLeave(leave_id);
	}

	@Override
	public List<LeaveModel> leaveList() {
		return leaveRepository.leaveList();
	}

	@Override
	public LeaveModel searchByLeaveId(int leave_id) {
		return leaveRepository.searchByLeaveId(leave_id);
	}

	@Override
	public int editLeave(LeaveModel leaveModel) {
		return leaveRepository.editLeave(leaveModel);
	}

	
}
