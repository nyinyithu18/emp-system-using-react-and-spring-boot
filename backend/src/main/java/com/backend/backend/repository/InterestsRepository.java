package com.backend.backend.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.EmpModel;

@Mapper
public interface InterestsRepository {

	public List<EmpModel> interestList();
}
