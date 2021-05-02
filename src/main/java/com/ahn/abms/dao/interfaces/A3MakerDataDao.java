package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.A3MakerData;

public interface A3MakerDataDao {
	public ArrayList<A3MakerData> getA3MakerDatas(A3MakerData a3MakerData);
	public void insertA3MakerData(A3MakerData a3MakerData);
	public void deleteA3MakerData(A3MakerData a3MakerData);
	public void updateA3MakerData(A3MakerData a3MakerData);
}
