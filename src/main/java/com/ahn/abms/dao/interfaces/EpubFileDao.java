package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.Epub;
import com.ahn.abms.model.EpubFile;

public interface EpubFileDao {
	public ArrayList<EpubFile> getEpubFiles(EpubFile condition);
}
