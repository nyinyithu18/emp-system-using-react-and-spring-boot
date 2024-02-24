package com.backend.backend.model;

import lombok.Getter;
import lombok.Setter;

public class EmpModel {

@Getter
@Setter
private int emp_id;

@Getter
@Setter
private byte[] image;

@Getter
@Setter
private String emp_name;

@Getter
@Setter
private String nrc;

@Getter
@Setter
private String phone;

@Getter
@Setter
private String email;

@Getter
@Setter
private String dob;

@Getter
@Setter
private String rank;

@Getter
@Setter
private String dep;

@Getter
@Setter
private String address;

@Getter
@Setter
private boolean checkdelete;

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

@Getter
@Setter
private boolean deleted;

}