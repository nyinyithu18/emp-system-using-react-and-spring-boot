package com.backend.backend.service.empserviceimpl;

import java.util.List; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.RankModel;
import com.backend.backend.repository.RankRepository;

@Service
public class RankServiceImpl implements com.backend.backend.service.RankService{

	@Autowired
	private RankRepository rankRepository;

	@Override
	public List<RankModel> rankList() {
		return rankRepository.rankList();
	}
	
	
}
