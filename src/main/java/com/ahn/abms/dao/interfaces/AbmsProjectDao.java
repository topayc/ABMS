package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.AbmsProject;

public interface AbmsProjectDao {
	public ArrayList<AbmsProject> getAbmsProjects(AbmsProject condition);
	public void insertAbmsProject(AbmsProject abmsProject);
	public void deleteAbmsProject(AbmsProject abmsProject);
	public void updateAbmsProject(AbmsProject abmsProject);
}
