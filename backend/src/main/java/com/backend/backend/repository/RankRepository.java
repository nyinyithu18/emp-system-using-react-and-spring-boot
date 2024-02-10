package com.backend.backend.repository;

import java.util.List; 

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.RankModel;

@Mapper
public interface RankRepository {

	public List<RankModel> rankList();
}
