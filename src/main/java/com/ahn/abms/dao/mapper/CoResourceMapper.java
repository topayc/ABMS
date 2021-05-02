package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.CoResource;

public interface CoResourceMapper {
	public ArrayList<CoResource> getCoResource(CoResource condition);
	public void insertCoResource(CoResource coResource);
	public void deleteCoResource(CoResource coResource);
	public void updateCoResource(CoResource coResource);
}
