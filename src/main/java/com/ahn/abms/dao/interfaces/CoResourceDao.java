package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.CoResource;

public interface CoResourceDao {
	public ArrayList<CoResource> getCoResource(CoResource condition);
	public void insertCoResource(CoResource coResource);
	public void deleteCoResource(CoResource coResource);
	public void updateCoResource(CoResource coResource);
}
