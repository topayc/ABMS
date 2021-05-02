package com.ahn.abms.model;

import java.util.Date;

public class EpubFile {
	private int epubDetailNo;
	private int epubNo;
	private long fileSize;
	private String fileType;
	private int attahOrder;
	private String orgFileName;
	private String newFileName;
	private String createTime;
	
	
	public int getAttahOrder() {
		return attahOrder;
	}
	public void setAttahOrder(int attahOrder) {
		this.attahOrder = attahOrder;
	}
	public int getEpubDetailNo() {
		return epubDetailNo;
	}
	public void setEpubDetailNo(int epubDetailNo) {
		this.epubDetailNo = epubDetailNo;
	}
	public int getEpubNo() {
		return epubNo;
	}
	public void setEpubNo(int epubNo) {
		this.epubNo = epubNo;
	}

	public long getFileSize() {
		return fileSize;
	}
	public void setFileSize(long fileSize) {
		this.fileSize = fileSize;
	}
	public String getFileType() {
		return fileType;
	}
	public void setFileType(String fileType) {
		this.fileType = fileType;
	}
	public String getOrgFileName() {
		return orgFileName;
	}
	public void setOrgFileName(String orgFileName) {
		this.orgFileName = orgFileName;
	}
	public String getNewFileName() {
		return newFileName;
	}
	public void setNewFileName(String newFileName) {
		this.newFileName = newFileName;
	}

	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	};
}
