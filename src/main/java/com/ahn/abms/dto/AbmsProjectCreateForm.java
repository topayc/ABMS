package com.ahn.abms.dto;

import org.springframework.web.multipart.MultipartFile;

public class AbmsProjectCreateForm {
	private int abmsProjectNo;
	private String writer;
	private String writerDesc;
	private int projectWidth;
	private int projectHeight;
	private String projectTitle;
	private String projectDesc;
	private String converFileType;
	private MultipartFile coverImageFile;
	private String convertFileAttach;
	private MultipartFile convertFile;
	private String action;
	public int getAbmsProjectNo() {
		return abmsProjectNo;
	}
	public void setAbmsProjectNo(int abmsProjectNo) {
		this.abmsProjectNo = abmsProjectNo;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	public String getWriterDesc() {
		return writerDesc;
	}
	public void setWriterDesc(String writerDesc) {
		this.writerDesc = writerDesc;
	}
	public int getProjectWidth() {
		return projectWidth;
	}
	public void setProjectWidth(int projectWidth) {
		this.projectWidth = projectWidth;
	}
	public int getProjectHeight() {
		return projectHeight;
	}
	public void setProjectHeight(int projectHeight) {
		this.projectHeight = projectHeight;
	}
	public String getProjectTitle() {
		return projectTitle;
	}
	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}
	public String getProjectDesc() {
		return projectDesc;
	}
	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}
	public String getConverFileType() {
		return converFileType;
	}
	public void setConverFileType(String converFileType) {
		this.converFileType = converFileType;
	}
	public MultipartFile getCoverImageFile() {
		return coverImageFile;
	}
	public void setCoverImageFile(MultipartFile coverImageFile) {
		this.coverImageFile = coverImageFile;
	}
	public String getConvertFileAttach() {
		return convertFileAttach;
	}
	public void setConvertFileAttach(String convertFileAttach) {
		this.convertFileAttach = convertFileAttach;
	}
	public MultipartFile getConvertFile() {
		return convertFile;
	}
	public void setConvertFile(MultipartFile convertFile) {
		this.convertFile = convertFile;
	}
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}

	


	

	
}
