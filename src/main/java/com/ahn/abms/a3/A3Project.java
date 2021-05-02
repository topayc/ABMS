package com.ahn.abms.a3;

import java.util.ArrayList;

import com.ahn.abms.dto.AbmsProjectCreateForm;

public class A3Project {
	private int projectSeq;
	private String projectName;
	private String projectDesc;
	private String createTime;
	private int width;
	private int height;
	
	private ArrayList<A3Page> pages = new ArrayList<A3Page>();

	public static A3Project newProject(AbmsProjectCreateForm form){
		A3Project project = new A3Project();
		project.setWidth(form.getProjectWidth());
		project.setHeight(form.getProjectHeight ());
		project.setProjectSeq(form.getAbmsProjectNo());
		project.setProjectName(form.getProjectTitle());
		project.setProjectDesc(form.getProjectDesc());
		return project;
	}
	
	public int getProjectSeq() {
		return projectSeq;
	}

	public void setProjectSeq(int projectSeq) {
		this.projectSeq = projectSeq;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectDesc() {
		return projectDesc;
	}

	public void setProjectDesc(String projectDesc) {
		this.projectDesc = projectDesc;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
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

	public ArrayList<A3Page> getPages() {
		return pages;
	}

	public void setPages(ArrayList<A3Page> pages) {
		this.pages = pages;
	}
	
	
}
