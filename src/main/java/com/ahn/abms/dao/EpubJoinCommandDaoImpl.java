package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.EpubJoinCommandDao;
import com.ahn.abms.dao.mapper.EpubJoinCommandMapper;
import com.ahn.abms.model.EpubJoinCommand;

@Repository
public class EpubJoinCommandDaoImpl implements EpubJoinCommandDao {
	
	@Autowired private EpubJoinCommandMapper epubJoinCommandMapper;
		
	@Override
	public ArrayList<EpubJoinCommand> getEpubJoinCommands(EpubJoinCommand epubJoinCommand) {
		return this.epubJoinCommandMapper.getEpubJoinCommands(epubJoinCommand);
	}

}
