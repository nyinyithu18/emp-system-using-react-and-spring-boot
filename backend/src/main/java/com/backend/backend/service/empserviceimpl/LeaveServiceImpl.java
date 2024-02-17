package com.backend.backend.service.empserviceimpl;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend.model.EmpModel;
import com.backend.backend.repository.LeaveRepository;
import com.backend.backend.service.LeaveService;

@Service
public class LeaveServiceImpl implements LeaveService{

	@Autowired
	private LeaveRepository leaveRepository;
	
	@Override
	public int addLeave(EmpModel empModel) {
		return leaveRepository.addLeave(empModel);
	}

	@Override
	public int deleteLeave(int leave_id) {
		return leaveRepository.deleteLeave(leave_id);
	}

	@Override
	public List<EmpModel> leaveList() {
		return leaveRepository.leaveList();
	}

	@Override
	public EmpModel searchByLeaveId(int leave_id) {
		return leaveRepository.searchByLeaveId(leave_id);
	}

	@Override
	public int editLeave(EmpModel empModel) {
		return leaveRepository.editLeave(empModel);
	}

	@Override
	public List<EmpModel> empLeaveList() {
		return leaveRepository.empLeaveList();
	}

	@Override
	public void uploadFile(MultipartFile file) {
		
	try (InputStream inputStream = file.getInputStream();
		Workbook workbook = new XSSFWorkbook(inputStream)) {
		
		Sheet sheet = workbook.getSheetAt(0);
		for(Row row: sheet) {
			if(row.getRowNum() == 0) {
				continue;
			}
			
			int emp_id = Integer.parseInt(getStringCellValue(row.getCell(0)));
			String empName = getStringCellValue(row.getCell(1));
            String nrc = getStringCellValue(row.getCell(2));
            String phone = getStringCellValue(row.getCell(3));
            String email = getStringCellValue(row.getCell(4));
            String dob = getStringCellValue(row.getCell(5));
            String rank = getStringCellValue(row.getCell(6));
            String dep = getStringCellValue(row.getCell(7));
            String address = getStringCellValue(row.getCell(8));
            boolean checkDelete = Boolean.parseBoolean(getStringCellValue(row.getCell(9)));
			
            String leaveType = getStringCellValue(row.getCell(10));
            String fromDate = getStringCellValue(row.getCell(11));
            String toDate = getStringCellValue(row.getCell(12));
            int days = Integer.parseInt(getStringCellValue(row.getCell(13)));
            boolean deleted = Boolean.parseBoolean(getStringCellValue(row.getCell(14)));
            
            EmpModel emp = new EmpModel();
			
			emp.setEmp_id(emp_id);
			emp.setEmp_name(empName);
			emp.setNrc(nrc);
			emp.setPhone(phone);
			emp.setEmail(email);
			emp.setDob(dob);
			emp.setRank(rank);
			emp.setDep(dep);
			emp.setAddress(address);
			emp.setCheckdelete(checkDelete);
			
            emp.setLeave_type(leaveType);
            emp.setFrom_date(fromDate);
            emp.setTo_date(toDate);
            emp.setDays(days);
            emp.setDeleted(deleted);
             leaveRepository.addEmployee(emp);
             leaveRepository.addLeave(emp);
		}
	} catch (IOException e) {
		e.printStackTrace();
	}			
	}
	
	private String getStringCellValue(Cell cell) {
	    if (cell == null) {
	        return null;
	    }
	    switch (cell.getCellType()) {
	        case STRING:
	            return cell.getStringCellValue();
	        case NUMERIC:
	            // Check if the cell contains a date and format it accordingly
	            if (DateUtil.isCellDateFormatted(cell)) {
	                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
	                return df.format(cell.getDateCellValue());
	            } else {
	                // Convert numeric value to string
	                return NumberToTextConverter.toText(cell.getNumericCellValue());
	            }
	        default:
	            return null;
	    }
	}

	
}
