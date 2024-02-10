package com.backend.backend.repository;

import java.util.List; 

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.DepModel;

@Mapper
public interface DepRepository {

	public List<DepModel> depList();
}
