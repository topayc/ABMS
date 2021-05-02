package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.MemberResource;

public interface MemberResourceMapper {
	public ArrayList<MemberResource> getMemberResources(MemberResource condition);
	public void insertMemberResource(MemberResource memberResource);
	public void deleteMemberResource(MemberResource memberResource);
	public void updatememberResource(MemberResource memberResource);
}
