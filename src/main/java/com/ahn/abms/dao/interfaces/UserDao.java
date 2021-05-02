package com.ahn.abms.dao.interfaces;

import java.util.ArrayList;

import com.ahn.abms.model.User;

public interface UserDao {
	public ArrayList<User> getUsers(User condition);
	public void insertUser(User user);
	public void updateUser(User user);
	public void deleteUser(User user);
}
