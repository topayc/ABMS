package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.AbmsProjectDao;
import com.ahn.abms.dao.mapper.AbmsProjectMapper;
import com.ahn.abms.model.AbmsProject;

@Repository
public class AbmsProjectDaoImp implements AbmsProjectDao {
	
	@Autowired private AbmsProjectMapper abmsProjectMapper;
	@Override
	public ArrayList<AbmsProject> getAbmsProjects(AbmsProject condition) {
		// TODO Auto-generated method stub
		return abmsProjectMapper.getAbmsProjects(condition);
	}

	@Override
	public void insertAbmsProject(AbmsProject abmsProject) {
		// TODO Auto-generated method stub
		abmsProjectMapper.insertAbmsProject(abmsProject);
	}

	@Override
	public void deleteAbmsProject(AbmsProject abmsProject) {
		// TODO Auto-generated method stub
		abmsProjectMapper.deleteAbmsProject(abmsProject);
	}

	@Override
	public void updateAbmsProject(AbmsProject abmsProject) {
		// TODO Auto-generated method stub
		abmsProjectMapper.updateAbmsProject(abmsProject);
	}

}
