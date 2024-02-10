package com.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.LeaveModel;
import com.backend.backend.service.empserviceimpl.LeaveServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LeaveController {

	@Autowired
	private LeaveServiceImpl leaveServiceImpl;
	
	@PostMapping(value = "addLeave", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int addLeave(@ModelAttribute LeaveModel leaveModel) {
		return leaveServiceImpl.addLeave(leaveModel);
	}
	
	@DeleteMapping(value = "deleteLeave", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int deleteLeave(@PathVariable (name = "leave_id")String leave_id) {
		int leaveId = Integer.parseInt(leave_id);
		return leaveServiceImpl.deleteLeave(leaveId);
	}
	
	@GetMapping(value = "leaveList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<LeaveModel> leaveList(){
		return leaveServiceImpl.leaveList();
	}
	
	@PutMapping(value = "editLeave", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int editLeave(@RequestBody LeaveModel leaveModel) {
		return leaveServiceImpl.editLeave(leaveModel);
	}

}
