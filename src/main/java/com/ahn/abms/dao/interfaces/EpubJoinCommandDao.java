package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.EpubFile;
import com.ahn.abms.model.EpubJoinCommand;

public interface EpubJoinCommandDao {
	public ArrayList<EpubJoinCommand> getEpubJoinCommands(EpubJoinCommand epubJoinCommand);
}
