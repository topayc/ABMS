package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.AbmsProject;

public interface AbmsProjectMapper {
	public ArrayList<AbmsProject> getAbmsProjects(AbmsProject condition);
	public void insertAbmsProject(AbmsProject abmsProject);
	public void deleteAbmsProject(AbmsProject abmsProject);
	public void updateAbmsProject(AbmsProject abmsProject);
}
