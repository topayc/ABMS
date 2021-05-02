package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.EditorDataDao;
import com.ahn.abms.dao.mapper.EditorDataMapper;
import com.ahn.abms.model.EditorData;

@Repository
public class EditorDataDaoImpl implements EditorDataDao {
	
	@Autowired private EditorDataMapper  editorDataMapper;
	@Override
	public ArrayList<EditorData> getEditorDatas(EditorData condition) {
		// TODO Auto-generated method stub
		return editorDataMapper.getEditorDatas(condition);
	}

	@Override
	public void insertEditorData(EditorData editorData) {
		// TODO Auto-generated method stub
		editorDataMapper.insertEditorData(editorData);
	}

	@Override
	public void deleteEditorData(EditorData editorData) {
		// TODO Auto-generated method stub
		editorDataMapper.deleteEditorData(editorData);
	}

	@Override
	public void updateEditorData(EditorData editorData) {
		// TODO Auto-generated method stub
		editorDataMapper.updateEditorData(editorData);
	}

}
