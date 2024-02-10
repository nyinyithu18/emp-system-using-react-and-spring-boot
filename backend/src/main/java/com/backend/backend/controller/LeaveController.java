package com.backend.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
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

}
