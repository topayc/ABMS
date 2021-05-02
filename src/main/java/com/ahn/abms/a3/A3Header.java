package com.ahn.abms.a3;

import java.util.ArrayList;

import com.ahn.abms.dto.AbmsProjectCreateForm;
import com.ahn.abms.util.Crypto;

public class A3Header {
	private String basePath; 
	private int width;
	private int height;
	private ArrayList<String> fontList = new ArrayList<String>();
	private String writer;
	private String writerDesc;
	private int majorVer;
	private int minorVer;
	private String authKey;
	private String regDate;
	private String modDate;
	
	public static A3Header newHeader(int width, int height) throws Exception{
		A3Header header = new A3Header();
		header.setWidth(width);
		header.setHeight(height);
		header.setBasePath("/abms/ftp/");
		header.setFontList(new ArrayList<String>());
		header.setMajorVer(1);
		header.setMajorVer(0);
		header.setAuthKey(Crypto.getEncMD5("ABMS Epub3 Editor"));
		return header;
	}
	
	public static A3Header newHeader(AbmsProjectCreateForm form) throws Exception{
		A3Header header = new A3Header();
		header.setWidth(form.getProjectWidth());
		header.setHeight(form.getProjectHeight());
		header.setBasePath("/abms/ftp/");
		header.setFontList(new ArrayList<String>());
		header.setMajorVer(1);
		header.setMajorVer(0);
		header.setWriter(form.getWriter());
		header.setWriterDesc(form.getWriterDesc());
		header.setAuthKey(Crypto.getEncMD5("ABMS Epub3 Editor"));
		return header;
	}
	
	
	public static A3Header newHeader() throws Exception{
		A3Header header = new A3Header();
		header.setWidth(1000);
		header.setHeight(1000);
		header.setBasePath("/abms/ftp/");
		header.setFontList(new ArrayList<String>());
		header.setMajorVer(1);
		header.setMajorVer(0);
		header.setAuthKey(Crypto.getEncMD5("ABMS Epub3 Editor"));
		
		return header;
	}

	public String getBasePath() {
		return basePath;
	}

	public void setBasePath(String basePath) {
		this.basePath = basePath;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public ArrayList<String> getFontList() {
		return fontList;
	}

	public void setFontList(ArrayList<String> fontList) {
		this.fontList = fontList;
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

	public int getMajorVer() {
		return majorVer;
	}

	public void setMajorVer(int majorVer) {
		this.majorVer = majorVer;
	}

	public int getMinorVer() {
		return minorVer;
	}

	public void setMinorVer(int minorVer) {
		this.minorVer = minorVer;
	}

	public String getAuthKey() {
		return authKey;
	}

	public void setAuthKey(String authKey) {
		this.authKey = authKey;
	}

	public String getRegDate() {
		return regDate;
	}

	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public String getModDate() {
		return modDate;
	}

	public void setModDate(String modDate) {
		this.modDate = modDate;
	}
	
	
}
