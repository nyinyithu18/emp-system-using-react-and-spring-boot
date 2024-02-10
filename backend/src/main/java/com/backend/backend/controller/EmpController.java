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

import com.backend.backend.model.EmpModel;
import com.backend.backend.service.empserviceimpl.EmpServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EmpController {

	@Autowired
	private EmpServiceImpl empServiceImpl;
	
	@PostMapping(value = "/addEmp", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int addEmp(@RequestBody EmpModel empModel){
		return empServiceImpl.addEmp(empModel);
	}
	
	@DeleteMapping(value = "/deleteEmp/{emp_id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int deleteEmp(@PathVariable ("emp_id") String emp_id) {
		int empId = Integer.parseInt(emp_id);
		return empServiceImpl.deleteEmp(empId);
	}
	
	
	@GetMapping(value = "/empList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<EmpModel> empList() {
		return empServiceImpl.empList();
	}
	
	@GetMapping(value = "/searchEmpId", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public EmpModel searchById(@RequestParam (name = "emp_id") String emp_id) {
		int empId = Integer.parseInt(emp_id);
		return empServiceImpl.searchById(empId);
	}
	
	@PutMapping(value = "/editEmp", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int editEmp(@RequestBody EmpModel empModel) {
		return empServiceImpl.editEmp(empModel);
	}
}
