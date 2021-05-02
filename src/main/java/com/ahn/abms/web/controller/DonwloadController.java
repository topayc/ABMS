package com.ahn.abms.web.controller;

import java.io.File;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.ahn.abms.common.UploadDir;
import com.ahn.abms.common.Constants.SaveFileType;
import com.ahn.abms.manager.AbmsFileManager;

@Controller
@RequestMapping(value = "/download")
public class DonwloadController {
	
	@Autowired AbmsFileManager abmsFileManager;
	
	@RequestMapping(value = "/donwload", method = RequestMethod.GET)
	public ModelAndView getEpubInfo( 
			@RequestParam(value = "epubNo", required = true) int epubNo,
			@RequestParam(value = "fileName", required = true) String fileName,
			@RequestParam(value = "fileType", required = true) String fileType,
			HttpServletResponse httpServletResponse) throws Exception {
		UploadDir dir = UploadDir.valueFrom(fileType);
		String filePath  = this.abmsFileManager.getLocalPath(SaveFileType.EPUB, epubNo, fileName);
		File downloadFile = new File(filePath);
		return new ModelAndView("downloadView", "downloadFile", downloadFile);
	}	
}
