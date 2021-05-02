package com.ahn.abms.a3.epub.oebps.opf;

import java.util.ArrayList;

import com.ahn.abms.a3.epub.ToXML;

public class Manifest implements ToXML{
	private ArrayList<Item> itemList;
	
	public Manifest(){
		this.itemList = new ArrayList<Item>();
	}
	@Override
	public String toXML() {
		return null;
	}

}
