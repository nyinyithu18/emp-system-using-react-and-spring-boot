package com.backend.backend.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.EmpModel;
import com.backend.backend.service.empserviceimpl.EmpInterestServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EmpInterestController {

	@Autowired
	private EmpInterestServiceImpl empInterestServiceImpl;
	
	@PostMapping(value = "/addEmpInterests", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int addEmpInterest(@RequestBody EmpModel empModel) {
		return empInterestServiceImpl.addEmpInterest(empModel);
	}
	
	@GetMapping(value = "/empInterestList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<EmpModel> empInterestList() {
		return empInterestServiceImpl.empInterestList();
	}
	
	@PutMapping(value = "/editEmpInterest", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int editEmpInterest(@RequestBody EmpModel empModel) {
		return empInterestServiceImpl.editEmpInterest(empModel);
	}
}
