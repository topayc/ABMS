package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.MemberDao;
import com.ahn.abms.dao.mapper.MemberMapper;
import com.ahn.abms.model.Member;

@Repository
public class MemberDaoImpl implements MemberDao {
	@Autowired private MemberMapper memberMapper;
	
	@Override
	public ArrayList<Member> getMembers(Member condition) {
		// TODO Auto-generated method stub
		return memberMapper.getMembers(condition);
	}

	@Override
	public void insertMember(Member member) {
		// TODO Auto-generated method stub
		memberMapper.insertMember(member);
	}

	@Override
	public void updateMember(Member member) {
		// TODO Auto-generated method stub
		memberMapper.updateMember(member);

	}

	@Override
	public void deleteMember(Member member) {
		// TODO Auto-generated method stub
		memberMapper.deleteMember(member);
	}

}
