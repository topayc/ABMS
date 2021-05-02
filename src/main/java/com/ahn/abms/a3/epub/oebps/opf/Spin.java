package com.ahn.abms.a3.epub.oebps.opf;

import java.util.ArrayList;

import com.ahn.abms.a3.epub.ToXML;

public class Spin implements ToXML{
	private ArrayList<ItemRef> itemRefs;
	
	public Spin(){
		this.itemRefs = new ArrayList<ItemRef>();
	}

	public ArrayList<ItemRef> getItemRefs() {
		return itemRefs;
	}

	public void setItemRefs(ArrayList<ItemRef> itemRefs) {
		this.itemRefs = itemRefs;
	}

	@Override
	public String toXML() {
		return null;
	}
	
	
}
