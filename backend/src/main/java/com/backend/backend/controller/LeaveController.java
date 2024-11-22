package com.backend.backend.controller;

import java.util.List;    

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.model.EmpModel;
import com.backend.backend.service.empserviceimpl.LeaveServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class LeaveController {

	@Autowired
	private LeaveServiceImpl leaveServiceImpl;
	
	@PostMapping(value = "addLeave", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int addLeave(@RequestBody EmpModel empModel) {
		return leaveServiceImpl.addLeave(empModel);
	}
	
	@PostMapping(value = "uploadFile", consumes = "multipart/form-data")
	@ResponseBody
	public String excelUpload(@RequestParam ("file") MultipartFile file) {
		leaveServiceImpl.uploadFile(file);
		return "Data imported successfully!";
	}
	
	@DeleteMapping(value = "deleteLeave/{leave_id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int deleteLeave(@PathVariable ("leave_id")String leave_id) {
		int leaveId = Integer.parseInt(leave_id);
		return leaveServiceImpl.deleteLeave(leaveId);
	}
	
	@GetMapping(value = "leaveList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<EmpModel> leaveList(){
		return leaveServiceImpl.leaveList();
	}
	
	@GetMapping(value = "empLeaveList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<EmpModel> empLeaveList(){
		return leaveServiceImpl.empLeaveList();
	}
	
	@GetMapping(value = "/searchByLeaveId", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public EmpModel searchByLeaveId(@RequestParam (name = "leave_id") String leave_id) {
		int leaveId = Integer.parseInt(leave_id);
		return leaveServiceImpl.searchByLeaveId(leaveId);
	}
	
	@PutMapping(value = "editLeave", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int editLeave(@RequestBody EmpModel empModel) {
		return leaveServiceImpl.editLeave(empModel);		
	}

}