package com.backend.backend.repository;

import org.apache.ibatis.annotations.Mapper;

import com.backend.backend.model.Users;

@Mapper
public interface AccountAuthenticationRepository {

	Users findByAccount(String username);
}
