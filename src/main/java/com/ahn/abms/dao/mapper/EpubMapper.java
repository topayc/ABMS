package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.Epub;

public interface EpubMapper {
	public ArrayList<Epub> getEpubs(Epub condition);
	public void insertEpub(Epub epub);
	public void deleteEpub(Epub epub);
	public void updateEpub(Epub epub);
}
