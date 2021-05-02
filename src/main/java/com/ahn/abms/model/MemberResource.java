package com.ahn.abms.model;

public class MemberResource {
	private int memberResourceNo;
	private int abmsProjectNo;
	private int memberNo;
	private String orgFileName;
	private String newFileName;
	private String fileName;
	private long fileSize;
	private String fileType;
	private String localAccessPath;
	private String webAccessPath;
	private String createTime;
	
	
	public int getMemberNo() {
		return memberNo;
	}
	public void setMemberNo(int memberNo) {
		this.memberNo = memberNo;
	}
	public int getMemberResourceNo() {
		return memberResourceNo;
	}
	public void setMemberResourceNo(int memberResourceNo) {
		this.memberResourceNo = memberResourceNo;
	}
	public int getAbmsProjectNo() {
		return abmsProjectNo;
	}
	public void setAbmsProjectNo(int abmsProjectNo) {
		this.abmsProjectNo = abmsProjectNo;
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
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
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
	public String getLocalAccessPath() {
		return localAccessPath;
	}
	public void setLocalAccessPath(String localAccessPath) {
		this.localAccessPath = localAccessPath;
	}
	public String getWebAccessPath() {
		return webAccessPath;
	}
	public void setWebAccessPath(String webAccessPath) {
		this.webAccessPath = webAccessPath;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
	
	
}
