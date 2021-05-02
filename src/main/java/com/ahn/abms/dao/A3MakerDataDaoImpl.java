package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.A3MakerDataDao;
import com.ahn.abms.dao.mapper.A3MakerDataMapper;
import com.ahn.abms.model.A3MakerData;

@Repository
public class A3MakerDataDaoImpl implements A3MakerDataDao {
	
	@Autowired A3MakerDataMapper a3MakerDataMapper;
	
	@Override
	public ArrayList<A3MakerData> getA3MakerDatas(A3MakerData a3MakerData) {
		return a3MakerDataMapper.getA3MakerDatas(a3MakerData);
	}

	@Override
	public void insertA3MakerData(A3MakerData a3MakerData) {
		a3MakerDataMapper.insertA3MakerData(a3MakerData);
	}

	@Override
	public void deleteA3MakerData(A3MakerData a3MakerData) {
		a3MakerDataMapper.deleteA3MakerData(a3MakerData);
	}	

	@Override
	public void updateA3MakerData(A3MakerData a3MakerData) {
		a3MakerDataMapper.updateA3MakerData(a3MakerData);
	}

}
