package com.backend.backend.controller;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend.model.RankModel;
import com.backend.backend.service.empserviceimpl.RankServiceImpl;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class RankController {

	@Autowired
	private RankServiceImpl rankServiceImpl;
	
	@GetMapping(value = "/rankList", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public List<RankModel> empList() {
		return rankServiceImpl.rankList();
	}
}
