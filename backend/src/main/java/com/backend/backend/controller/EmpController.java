package com.backend.backend.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

import jakarta.servlet.http.HttpServletResponse;

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
	
	@PutMapping(value = "/editEmpImage", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public int editEmpImage(@RequestParam("emp_id") int empId,
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
		return empServiceImpl.editEmpImage(empModel);
	}
	
	@GetMapping(value = "/printEmpDetails", produces = MediaType.TEXT_PLAIN_VALUE)
	@ResponseBody
	public ResponseEntity<String> printEmpDetails(@RequestParam (name = "emp_id") String emp_id) {
		int empId = Integer.parseInt(emp_id);
		EmpModel emp = empServiceImpl.searchById(empId);
		
		StringBuilder textContent = new StringBuilder();
		textContent.append("                      Empllyee Details   \n");
		textContent.append("ID          >> ").append(emp.getEmp_id()).append("\n");
        textContent.append("Name        >> ").append(emp.getEmp_name()).append("\n");
        textContent.append("NRC         >> ").append(emp.getNrc()).append("\n");
        textContent.append("Phone       >> ").append(emp.getPhone()).append("\n");
        textContent.append("Email       >> ").append(emp.getEmail()).append("\n");
        textContent.append("DOB         >> ").append(emp.getDob()).append("\n");
        textContent.append("Rank        >> ").append(emp.getRank()).append("\n");
        textContent.append("Department  >> ").append(emp.getDep()).append("\n");
        textContent.append("Address     >> ").append(emp.getAddress()).append("\n");
	
        return ResponseEntity.ok().body(textContent.toString());
	}
	
	
	public void pdfExport(EmpServiceImpl empServiceImpl) {
		this.empServiceImpl = empServiceImpl;
	}
	
	@GetMapping("/pdfExport/{emp_id}")
	@ResponseBody
	public void empPDFExport(@PathVariable("emp_id") String emp_id, HttpServletResponse response) {
		response.setContentType("application/pdf");
		DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd:hh:mm:ss");
		String currentDateTime = dateFormatter.format(new Date());
		
		String headerKey = "Content-Disposition";
		String headerValue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
		response.setHeader(headerKey, headerValue);
		
		
		try {
			int empID = Integer.parseInt(emp_id);	
			byte[] pdfContent = empServiceImpl.pdfExport(empID);
			response.getOutputStream().write(pdfContent);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
