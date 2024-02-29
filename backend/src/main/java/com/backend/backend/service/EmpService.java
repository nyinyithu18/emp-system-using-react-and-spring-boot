package com.backend.backend.service;

import java.util.List;

import com.backend.backend.model.EmpModel;

import jakarta.servlet.http.HttpServletResponse;

public interface EmpService {

	public int addEmp(EmpModel empModel);
	public int deleteEmp(int emp_id);
	public List<EmpModel> empList();
	public EmpModel searchById(int emp_id);
	public int editEmp(EmpModel empModel);
	public int editEmpImage(EmpModel empModel);
	public byte[] pdfExport(int emp_id);
}
