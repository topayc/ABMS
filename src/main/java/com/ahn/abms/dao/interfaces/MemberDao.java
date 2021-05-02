package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.Member;

public interface MemberDao {
	public ArrayList<Member> getMembers(Member condition);
	public void insertMember(Member member);
	public void updateMember(Member member);
	public void deleteMember(Member member);
}
