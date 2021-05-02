package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.Epub;
import com.ahn.abms.model.TransformAttachFile;

public interface TransformAttachFileMapper {
	public ArrayList<TransformAttachFile> getTransformAttachFiles(TransformAttachFile condition);
	public void insertTransformAttachFile(TransformAttachFile transformFileAttach);
	public void deleteTransformAttachFile(TransformAttachFile transformFileAttach);
	public void updateTransformAttachFile(TransformAttachFile transformFileAttach);
}
