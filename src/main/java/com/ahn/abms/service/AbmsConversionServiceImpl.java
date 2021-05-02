package com.ahn.abms.service;

import java.io.File;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ahn.abms.service.interfaces.AbmsConversionService;

@Service
public class AbmsConversionServiceImpl implements AbmsConversionService {

	@Override
	public boolean conversion(File file) {
		return false;
	}

	@Override
	public boolean conversion(String filePath) {
		return false;
	}

	@Override
	public boolean conversion(MultipartFile multipartFile) {
		// TODO Auto-generated method stub
		return false;
	}

}
