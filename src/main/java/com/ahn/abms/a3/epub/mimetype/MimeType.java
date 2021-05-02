package com.ahn.abms.a3.epub.mimetype;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.commons.io.FileUtils;

import com.ahn.abms.a3.epub.ToXML;
import com.ahn.abms.a3.epub.Writeable;
import com.ahn.abms.a3.epub.metainf.DisplayOption;

public class MimeType implements ToXML, Writeable{
	private static final String fileName = "mimetype";
	public static String xmlData = "application/epub+zip";
	public String parentPath ; 
	
	public MimeType(){ }
	
	public MimeType(String parentPath){
		this.parentPath = parentPath;
	}
	
	@Override
	public String toXML() {
		return MimeType.xmlData;
	}

	
	@Override
	public void write(String parentPath) {
		File dir = new File(parentPath);
		if (!dir.exists()) dir.mkdirs();
		String path = parentPath+  MimeType.fileName;
		String xmlData = this.toXML();
		try {
			FileUtils.writeByteArrayToFile(new File(path), xmlData.getBytes("utf-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
