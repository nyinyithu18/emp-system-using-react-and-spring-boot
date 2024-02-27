package com.backend.backend.service.empserviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.EmpModel;
import com.backend.backend.repository.EmpRepository;
import com.backend.backend.service.EmpService;

@Service
public class EmpServiceImpl implements EmpService{

	@Autowired
	private EmpRepository empRepository;
	
	@Override
	public int addEmp(EmpModel empModel) {
		return empRepository.addEmp(empModel);
	}

	@Override
	public int deleteEmp(int emp_id) {
		return empRepository.deleteEmp(emp_id);
	}

	@Override
	public List<EmpModel> empList() {
		return empRepository.empList();
	}

	@Override
	public EmpModel searchById(int emp_id) {
		return empRepository.searchById(emp_id);
	}

	@Override
	public int editEmp(EmpModel empModel) {
		return empRepository.editEmp(empModel);
	}

	@Override
	public int editEmpImage(EmpModel empModel) {
		return empRepository.editEmpImage(empModel);
	}

}
