package com.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.EmpModel;
import com.backend.backend.service.empserviceimpl.InterestServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class InterestController {

	@Autowired
	private InterestServiceImpl interestServiceImpl;
	
	@GetMapping(value = "/interestList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<EmpModel> interestList() {
		return interestServiceImpl.interestList();
	}
}
