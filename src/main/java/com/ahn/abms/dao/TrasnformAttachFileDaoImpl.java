package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.TransformAttachFileDao;
import com.ahn.abms.dao.mapper.TransformAttachFileMapper;
import com.ahn.abms.model.TransformAttachFile;

@Repository
public class TrasnformAttachFileDaoImpl implements TransformAttachFileDao {
	
	@Autowired TransformAttachFileMapper transformAttachFileMapper;
	@Override
	public ArrayList<TransformAttachFile> getTransformAttachFiles(TransformAttachFile condition) {
		// TODO Auto-generated method stub
		return transformAttachFileMapper.getTransformAttachFiles(condition);
	}

	@Override
	public void insertTransformAttachFile(TransformAttachFile transformFileAttach) {
		// TODO Auto-generated method stub
		transformAttachFileMapper.insertTransformAttachFile(transformFileAttach);
	}

	@Override
	public void deleteTransformAttachFile(TransformAttachFile transformFileAttach) {
		// TODO Auto-generated method stub
		transformAttachFileMapper.deleteTransformAttachFile(transformFileAttach);
	}

	@Override
	public void updateTransformAttachFile(TransformAttachFile transformFileAttach) {
		// TODO Auto-generated method stub
		transformAttachFileMapper.updateTransformAttachFile(transformFileAttach);
	}

}
