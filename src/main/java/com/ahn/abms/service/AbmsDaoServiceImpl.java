package com.ahn.abms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ahn.abms.dao.interfaces.EpubDao;
import com.ahn.abms.dao.interfaces.EpubFileDao;
import com.ahn.abms.dao.interfaces.UserDao;
import com.ahn.abms.service.interfaces.AbmsDaoService;

@Service
public class AbmsDaoServiceImpl implements AbmsDaoService{
	@Autowired private UserDao epubUserDao;
	@Autowired private EpubDao epubDao;
	@Autowired private EpubFileDao epubDetailDao;
}
