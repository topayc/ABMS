package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.A3MakerUserResourceDao;
import com.ahn.abms.dao.mapper.A3MakerUserResourceMapper;
import com.ahn.abms.model.A3MakerUserResource;

@Repository
public class A3MakerUserResourceDaoImpl implements A3MakerUserResourceDao {
	
	@Autowired private A3MakerUserResourceMapper a3MakerUserResourceMapper;
	
	@Override
	public ArrayList<A3MakerUserResource> getA3MakerUserResources(A3MakerUserResource a3MakerUserResource) {
		return this.a3MakerUserResourceMapper.getA3MakerUserResources(a3MakerUserResource);
	}

	@Override
	public void insertA3MakerUserResource(A3MakerUserResource a3MakerUserResource) {
		this.a3MakerUserResourceMapper.insertA3MakerUserResource(a3MakerUserResource);

	}

	@Override
	public void updateA3MakerUserResource(A3MakerUserResource a3MakerUserResource) {
		this.a3MakerUserResourceMapper.updateA3MakerUserResource(a3MakerUserResource);
	}

	@Override
	public void deleteA3MakerUserResource(A3MakerUserResource a3MakerUserResource) {
		this.a3MakerUserResourceMapper.deleteA3MakerUserResource(a3MakerUserResource);
	}

}
