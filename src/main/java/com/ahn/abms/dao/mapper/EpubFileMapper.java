package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.Epub;
import com.ahn.abms.model.EpubFile;

public interface EpubFileMapper {
	public ArrayList<EpubFile> getEpubFiles(EpubFile condition);
}
