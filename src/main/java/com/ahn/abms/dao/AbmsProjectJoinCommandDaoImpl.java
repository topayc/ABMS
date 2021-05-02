package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.AbmsProjectJoinCommandDao;
import com.ahn.abms.dao.mapper.AbmsProjectJoinCommandMapper;
import com.ahn.abms.model.AbmsProjectJoinCommand;

@Repository
public class AbmsProjectJoinCommandDaoImpl implements AbmsProjectJoinCommandDao {

	@Autowired AbmsProjectJoinCommandMapper mapper;
	@Override
	public ArrayList<AbmsProjectJoinCommand> getAbmsProjectJoinCommands(AbmsProjectJoinCommand condition) {
		// TODO Auto-generated method stub
		return mapper.getAbmsProjectJoinCommands(condition);
	}

}
