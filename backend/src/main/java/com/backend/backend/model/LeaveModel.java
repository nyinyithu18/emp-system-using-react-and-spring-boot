package com.backend.backend.model;

import lombok.Getter;
import lombok.Setter;

public class LeaveModel {

	@Getter
	@Setter
	private int leave_id;
	
	@Getter
	@Setter
	private String leave_type;
	
	@Getter
	@Setter
	private String from_date;
	
	@Getter
	@Setter
	private String to_date;
	
	@Getter
	@Setter
	private int days;
}
