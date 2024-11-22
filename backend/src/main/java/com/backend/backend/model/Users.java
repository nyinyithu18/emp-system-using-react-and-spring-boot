package com.backend.backend.model;

import lombok.Getter;
import lombok.Setter;

public class Users {

	@Getter
	@Setter
	private int user_id;
	
	@Getter
	@Setter
	private String username;
	
	@Getter
	@Setter
	private String password;
	
	@Getter
	@Setter
	private int role_id;
}
