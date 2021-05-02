package com.ahn.abms.a3.epub.oebps.opf;

import java.util.ArrayList;

import com.ahn.abms.a3.epub.Writeable;

public class Metadata implements Writeable{
	private ArrayList<String> nsDataList;
	private ArrayList<String> metaPropertyList; 
	private String ns;
	
	public Metadata(){
		this.nsDataList = new ArrayList<String>();
		this.metaPropertyList = new ArrayList<String>();
		this.ns = "dc";
	}
	
	public void setNsData(String name, String value){
		
	}
	
	public void setMetaProperty(String name, String value){
		
	}

	@Override
	public void write(String parentPath) {
		// TODO Auto-generated method stub
		
	}
}
