package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.EditorData;

public interface EditorDataMapper {
	public ArrayList<EditorData> getEditorDatas(EditorData condition);
	public void insertEditorData(EditorData editorData);
	public void deleteEditorData(EditorData editorData);
	public void updateEditorData(EditorData editorData);
}
