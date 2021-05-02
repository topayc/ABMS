package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.EditorData;

public interface EditorDataDao {
	public ArrayList<EditorData> getEditorDatas(EditorData condition);
	public void insertEditorData(EditorData editorData);
	public void deleteEditorData(EditorData editorData);
	public void updateEditorData(EditorData editorData);
}
