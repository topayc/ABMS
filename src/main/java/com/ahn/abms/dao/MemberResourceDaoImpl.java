package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.MemberResourceDao;
import com.ahn.abms.dao.mapper.MemberResourceMapper;
import com.ahn.abms.model.MemberResource;

@Repository
public class MemberResourceDaoImpl implements MemberResourceDao {

	@Autowired MemberResourceMapper memberResourceMapper;
	
	@Override
	public ArrayList<MemberResource> getMemberResources(MemberResource condition) {
		// TODO Auto-generated method stub
		return memberResourceMapper.getMemberResources(condition);
	}

	@Override
	public void insertMemberResource(MemberResource memberResource) {
		// TODO Auto-generated method stub
		memberResourceMapper.insertMemberResource(memberResource);
	}

	@Override
	public void deleteMemberResource(MemberResource memberResource) {
		// TODO Auto-generated method stub
		memberResourceMapper.deleteMemberResource(memberResource);
	}

	@Override
	public void updatememberResource(MemberResource memberResource) {
		// TODO Auto-generated method stub
		memberResourceMapper.updatememberResource(memberResource);
	}

}
