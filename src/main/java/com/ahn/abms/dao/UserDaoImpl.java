package com.ahn.abms.dao;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ahn.abms.dao.interfaces.UserDao;
import com.ahn.abms.dao.mapper.UserMapper;
import com.ahn.abms.model.User;

@Repository
public class UserDaoImpl implements UserDao{
	@Autowired private UserMapper userMapper;
	
	@Override
	public ArrayList<User> getUsers(User condition) {
		return userMapper.getUsers(condition);
	}

	@Override
	public void insertUser(User user) {
		this.userMapper.insertUser(user);
		
	}
	
	@Override
	public void deleteUser(User user) {
		this.userMapper.deleteUser(user);
	}

	@Override
	public void updateUser(User user) {
		this.userMapper.updateUser(user);
	}
}
