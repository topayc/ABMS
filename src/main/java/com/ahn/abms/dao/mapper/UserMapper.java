package com.ahn.abms.dao.mapper;

import java.util.ArrayList;

import com.ahn.abms.model.User;


public interface UserMapper {
	public ArrayList<User> getUsers(User condition);
	public void insertUser(User user);
	public void updateUser(User user);
	public void deleteUser(User user);
}
