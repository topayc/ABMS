package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.TransformDao;
import com.ahn.abms.dao.mapper.TransformMapper;
import com.ahn.abms.model.Transform;

@Repository
public class TransformDaoImpl implements TransformDao {
	
	@Autowired TransformMapper transformMapper;
	
	@Override
	public ArrayList<Transform> getTransforms(Transform condition) {
		// TODO Auto-generated method stub
		return transformMapper.getTransforms(condition);
	}

	@Override
	public void insertTransform(Transform transform) {
		// TODO Auto-generated method stub
		transformMapper.insertTransform(transform);
	}

	@Override
	public void deleteTransform(Transform transform) {
		// TODO Auto-generated method stub
		transformMapper.deleteTransform(transform);
	}

	@Override
	public void updateTransform(Transform transform) {
		// TODO Auto-generated method stub
		transformMapper.updateTransform(transform);
	}
	

}
