package com.backend.backend.service.empserviceimpl;

import java.awt.AlphaComposite;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.Ellipse2D;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.backend.model.EmpModel;
import com.backend.backend.repository.EmpInterestRepository;
import com.backend.backend.repository.EmpRepository;
import com.backend.backend.repository.LeaveRepository;
import com.backend.backend.service.EmpService;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Image;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Rectangle;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

@Service
public class EmpServiceImpl implements EmpService {

	@Autowired
	private EmpRepository empRepository;

	@Autowired
	private LeaveRepository leaveRepository;

	@Autowired
	private EmpInterestRepository empInterestRepository;

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

	@Override
	public byte[] pdfExport(int emp_id) {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		Document document = new Document(PageSize.A4);
		try {
			PdfWriter.getInstance(document, outputStream);

			document.open();

			EmpModel employee = empRepository.searchById(emp_id);
			if (employee != null) {

				Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
				fontTitle.setSize(18);

				Paragraph title = new Paragraph("Employee Details \n" + "\n", fontTitle);
				title.setAlignment(Paragraph.ALIGN_CENTER);
				document.add(title);

				PdfPTable table = new PdfPTable(2); // 2 columns
				table.setWidthPercentage(100);
				table.setSpacingBefore(10f);
				table.setSpacingAfter(10f);

				PdfPCell detailsCell = new PdfPCell();
				detailsCell.setBorder(Rectangle.NO_BORDER);
				detailsCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
				detailsCell.setVerticalAlignment(Element.ALIGN_TOP);

				Font fontContent = FontFactory.getFont(FontFactory.HELVETICA);
				fontContent.setSize(12);

				Paragraph empDetails = new Paragraph();
				empDetails.setFont(fontContent);

				empDetails.add("Employee ID  >>  " + employee.getEmp_id() + "\n" + "\n");
				empDetails.add("Name             >>  " + employee.getEmp_name() + "\n" + "\n");
				empDetails.add("NRC               >>  " + employee.getNrc() + "\n" + "\n");
				empDetails.add("Phone            >>  " + employee.getPhone() + "\n" + "\n");
				empDetails.add("Email             >>  " + employee.getEmail() + "\n" + "\n");
				empDetails.add("DOB              >>  " + employee.getDob() + "\n" + "\n");
				empDetails.add("Rank              >>  " + employee.getRank() + "\n" + "\n");
				empDetails.add("Department   >>  " + employee.getDep() + "\n" + "\n");
				empDetails.add("Address         >>  " + employee.getAddress() + "\n");

				detailsCell.addElement(empDetails);
				table.addCell(detailsCell);

				PdfPCell imageCell = new PdfPCell();
				imageCell.setBorder(Rectangle.NO_BORDER);
				imageCell.setHorizontalAlignment(Element.ALIGN_LEFT);
				imageCell.setVerticalAlignment(Element.ALIGN_TOP);

				byte[] imageData = employee.getImage();
				if (imageData != null) {
					try {
						BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(imageData));
						int diameter = Math.min(bufferedImage.getWidth(), bufferedImage.getHeight());

						// Create a BufferedImage with a circular mask
						BufferedImage circularImage = new BufferedImage(diameter, diameter,
								BufferedImage.TYPE_INT_ARGB);
						Graphics2D g2 = circularImage.createGraphics();
						g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
						g2.setComposite(AlphaComposite.Src);
						g2.setClip(new Ellipse2D.Float(0, 0, diameter, diameter));
						g2.drawImage(bufferedImage, 0, 0, diameter, diameter, null);
						g2.dispose();

						// Convert BufferedImage back to Image
						Image circularPdfImage = Image.getInstance(circularImage, null);
						circularPdfImage.scaleToFit(100, 100); // Adjust width and height as needed

						circularPdfImage.setAlignment(Image.ALIGN_RIGHT);
						circularPdfImage.scaleToFit(100, 100);
						imageCell.addElement(circularPdfImage);
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				table.addCell(imageCell);

				document.add(table);

				List<EmpModel> interests = empInterestRepository.findInterestsByEmployeeId(emp_id);
				if (!interests.isEmpty()) {
					addInterestsData(document, interests);
				}

				List<EmpModel> leaveList = leaveRepository.findLeaveByEmployeeId(emp_id);
				if (!leaveList.isEmpty()) {
					addLeaveData(document, leaveList);
				}
			}

		} catch (DocumentException e) {
			e.printStackTrace();
		} finally {
			if (document != null) {
				document.close();
			}
		}

		return outputStream.toByteArray();
	}

	private void addInterestsData(Document document, List<EmpModel> interests) throws DocumentException {
		Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		fontTitle.setSize(14);

		Paragraph interestsTitle = new Paragraph("Interests", fontTitle);
		interestsTitle.setAlignment(Paragraph.ALIGN_LEFT);
		document.add(interestsTitle);

		// Create a bullet list for interests
		com.lowagie.text.List list = new com.lowagie.text.List(com.lowagie.text.List.UNORDERED);
		for (EmpModel interest : interests) {
			if (interest.isInterest_checked() == false) {
				list.add(new com.lowagie.text.ListItem(interest.getInterest_name()));
			}
		}

		document.add(list);
		document.add(Chunk.NEWLINE);
	}

	private void addLeaveData(Document document, List<EmpModel> leaveList) throws DocumentException {
		Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		fontTitle.setSize(14);

		Paragraph leaveTitle = new Paragraph("Leave Data", fontTitle);
		leaveTitle.setAlignment(Paragraph.ALIGN_CENTER);
		document.add(leaveTitle);

		PdfPTable table = new PdfPTable(4); // 4 columns
		table.setWidthPercentage(100);
		table.setSpacingBefore(10f);
		table.setSpacingAfter(10f);

		Font tableHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
		table.addCell(new Paragraph("Leave Type", tableHeaderFont));
		table.addCell(new Paragraph("Start Date", tableHeaderFont));
		table.addCell(new Paragraph("End Date", tableHeaderFont));
		table.addCell(new Paragraph("Days", tableHeaderFont));

		for (EmpModel leave : leaveList) {
			if (leave.isDeleted() == false) {
				table.addCell(leave.getLeave_type());
				table.addCell(leave.getFrom_date().toString());
				table.addCell(leave.getTo_date().toString());
				table.addCell(String.valueOf(leave.getDays()));
			}
		}

		document.add(table);
		document.add(Chunk.NEWLINE);
	}

}
