package com.backend.backend.repository;

import java.util.List; 

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.EmpModel;

@Mapper
public interface EmpRepository {

	public int addEmp(EmpModel empModel);
	public int deleteEmp(int emp_id);
	public List<EmpModel> empList();
	public EmpModel searchById(int emp_id);
	public int editEmp(EmpModel empModel);
}
