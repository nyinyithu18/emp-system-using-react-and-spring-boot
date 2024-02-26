package com.backend.backend.service.empserviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.EmpModel;
import com.backend.backend.repository.InterestsRepository;
import com.backend.backend.service.InterestService;

@Service
public class InterestServiceImpl implements InterestService{

	@Autowired
	private InterestsRepository interestRepo;

	@Override
	public List<EmpModel> interestList() {
		return interestRepo.interestList();
	}
}
