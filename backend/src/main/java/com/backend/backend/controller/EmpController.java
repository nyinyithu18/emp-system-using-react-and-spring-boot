package com.backend.backend.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.model.EmpModel;
import com.backend.backend.service.empserviceimpl.EmpServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class EmpController {

	@Autowired
	private EmpServiceImpl empServiceImpl;
	
	@PostMapping(value = "/addEmp", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int addEmp(@RequestParam("emp_id") int empId,
            @RequestParam("emp_name") String empName,
            @RequestParam("nrc") String nrc,
            @RequestParam("phone") String phone,
            @RequestParam("email") String email,
            @RequestParam("dob") String dob,
            @RequestParam("rank") String rank,
            @RequestParam("dep") String dep,
            @RequestParam("address") String address,
            @RequestParam("checkdelete") boolean checkdelete,
            @RequestPart("image") MultipartFile imageFile) {

			EmpModel empModel = new EmpModel();
			empModel.setEmp_id(empId);
			empModel.setEmp_name(empName);
			empModel.setNrc(nrc);
			empModel.setPhone(phone);
			empModel.setEmail(email);
			empModel.setDob(dob);
			empModel.setRank(rank);
			empModel.setDep(dep);
			empModel.setAddress(address);
			empModel.setCheckdelete(checkdelete);

try {
	byte[] imageBytes = imageFile.getBytes();
    empModel.setImage(imageBytes);
} catch (IOException e) {
  e.printStackTrace();
}

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
