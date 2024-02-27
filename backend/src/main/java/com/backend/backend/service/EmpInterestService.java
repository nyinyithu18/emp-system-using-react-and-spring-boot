package com.backend.backend.service;

import java.util.List;

import com.backend.backend.model.EmpModel;

public interface EmpInterestService {

	public int addEmpInterest(EmpModel empModel);
	public List<EmpModel> empInterestList();
	public int editEmpInterest(EmpModel empModel);
}
