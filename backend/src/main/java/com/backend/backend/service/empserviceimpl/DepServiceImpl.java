package com.backend.backend.service.empserviceimpl;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.DepModel;
import com.backend.backend.repository.DepRepository;
import com.backend.backend.service.DepService;

@Service
public class DepServiceImpl implements DepService{

	@Autowired
	private DepRepository depRepository;
	
	@Override
	public List<DepModel> depList() {
		return depRepository.depList();
	}

}
