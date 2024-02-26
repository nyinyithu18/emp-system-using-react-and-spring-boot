package com.backend.backend.service.empserviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.EmpModel;
import com.backend.backend.repository.EmpInterestRepository;
import com.backend.backend.service.EmpInterestService;

@Service
public class EmpInterestServiceImpl implements EmpInterestService{

	@Autowired
	private EmpInterestRepository empInterestRepo;
	
	@Override
	public int addEmpInterest(EmpModel empModel) {
		return empInterestRepo.addEmpInterest(empModel);
	}

	@Override
	public List<EmpModel> empInterestList() {
		return empInterestRepo.empInterestList();
	}

}
