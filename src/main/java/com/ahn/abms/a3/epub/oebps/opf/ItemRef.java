package com.ahn.abms.a3.epub.oebps.opf;

import com.ahn.abms.a3.epub.ToXML;

public class ItemRef implements ToXML {
	private String itemRef;
	
	@Override
	public String toXML() {
		return null;
	}

	public String getItemRef() {
		return itemRef;
	}

	public void setItemRef(String itemRef) {
		this.itemRef = itemRef;
	}
}
