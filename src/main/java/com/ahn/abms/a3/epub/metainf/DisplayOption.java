package com.ahn.abms.a3.epub.metainf;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import com.ahn.abms.a3.epub.ToXML;
import com.ahn.abms.a3.epub.Writeable;

public class DisplayOption implements ToXML , Writeable{
	public static String fileName = "com.apple.ibooks.display-options.xml";
	public static String xmlData = 
			"<?xml version=\"1.0\" encoding=\"UTF-8\"?><display_options><platform name=\"*\"><option name=\"specified-fonts\">true</option> </platform> </display_options>";
	@Override
	public String toXML() {
		return DisplayOption.xmlData;
	}

	@Override
	public void write(String parentPath) {
		File dir = new File(parentPath);
		if (!dir.exists()) dir.mkdirs();
		String path = parentPath+  DisplayOption.fileName;
		String xmlData = this.toXML();
		
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(path);
			try {
				fos.write(xmlData.getBytes("utf-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}finally {
			if (fos != null)
				try {
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
		}
	}
}
