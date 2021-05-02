package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.EpubDao;
import com.ahn.abms.dao.mapper.EpubMapper;
import com.ahn.abms.model.Epub;

@Repository
public class EpubDaoImpl implements EpubDao {

	@Autowired private EpubMapper epubMapper;
	@Override
	public ArrayList<Epub> getEpubs(Epub condition) {
		return this.epubMapper.getEpubs(condition);
	}
	@Override
	public void insertEpub(Epub epub) {
		this.epubMapper.insertEpub(epub);
		
	}
	@Override
	public void deleteEpub(Epub epub) {
		this.epubMapper.deleteEpub(epub);
	}
	@Override
	public void updateEpub(Epub epub) {
		this.epubMapper.updateEpub(epub);
	}
}
