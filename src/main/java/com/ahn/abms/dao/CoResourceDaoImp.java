package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.CoResourceDao;
import com.ahn.abms.dao.mapper.CoResourceMapper;
import com.ahn.abms.model.CoResource;

@Repository
public class CoResourceDaoImp implements CoResourceDao {

	@Autowired CoResourceMapper coResourceMapper;
	@Override
	public ArrayList<CoResource> getCoResource(CoResource condition) {
		// TODO Auto-generated method stub
		return coResourceMapper.getCoResource(condition);
	}

	@Override
	public void insertCoResource(CoResource coResource) {
		// TODO Auto-generated method stub
		coResourceMapper.deleteCoResource(coResource);
	}

	@Override
	public void deleteCoResource(CoResource coResource) {
		// TODO Auto-generated method stub
		coResourceMapper.deleteCoResource(coResource);
	}

	@Override
	public void updateCoResource(CoResource coResource) {
		// TODO Auto-generated method stub
		coResourceMapper.updateCoResource(coResource);
	}

}
