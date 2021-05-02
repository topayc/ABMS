package com.ahn.abms.service.interfaces;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public interface AbmsConversionService {
	
	public boolean conversion(File file);
	public boolean conversion(String filePath);
	public boolean conversion(MultipartFile multipartFile);
}
