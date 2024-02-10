package com.backend.backend.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.DepModel;
import com.backend.backend.service.empserviceimpl.DepServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class DepController {

	@Autowired
	private DepServiceImpl depServiceImpl;
	
	@GetMapping(value = "/depList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<DepModel> depList(){
		return depServiceImpl.depList();
	}
}
