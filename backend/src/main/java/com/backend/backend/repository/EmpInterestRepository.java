package com.backend.backend.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.EmpModel;

@Mapper
public interface EmpInterestRepository {

	public int addEmpInterest(EmpModel empModel);
	public List<EmpModel> empInterestList();
}
