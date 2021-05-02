package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.EpubFileDao;
import com.ahn.abms.dao.mapper.EpubFileMapper;
import com.ahn.abms.model.Epub;
import com.ahn.abms.model.EpubFile;

@Repository
public class EpubFileDaoImpl implements EpubFileDao {
	@Autowired private EpubFileMapper epubDetailMapper;

	@Override
	public ArrayList<EpubFile> getEpubFiles(EpubFile condition) {
		return this.epubDetailMapper.getEpubFiles(condition);
	}
	
	
}
