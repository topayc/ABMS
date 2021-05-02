package com.ahn.abms.a3.epub.oebps.content;

import java.util.ArrayList;

import com.ahn.abms.common.UploadDir;

public class Content {
	
	public enum CssClassType {
		TEXT("PBox"), IMAGE("IBox");
		private final String value;
		CssClassType(String value) {
			this.value = value;
		}
		
		public String value(){
			return this.value;
		}
		
		public static CssClassType valueFrom(String value) throws Exception{
			if (value.equalsIgnoreCase("text")) {
				return TEXT;
			}else if (value.equalsIgnoreCase("image")){
				return IMAGE;
			} else {
				throw new Exception("Unknown value : " + value);
			}
		}
	}
	private ArrayList<String>cssList = new ArrayList<String>();
	private ArrayList<String>fontList = new ArrayList<String>();
	private ArrayList<String>imageList = new ArrayList<String>();
	private ArrayList<String>jsList = new ArrayList<String>();
	private ArrayList<String>mediaList = new ArrayList<String>();
	private ArrayList<String>popupList = new ArrayList<String>();
	
	private void addCss(String css) {
		this.cssList.add(css);
	}
	
	private void addFont(String css) {
		this.cssList.add(css);
	}
	
	private void addImage(String image){
		
	}
	
	private void addMediaList(String media){
		
	}
	
	private void addPopup(String popup){
		
	}

	
	
	public ArrayList<String> getCssList() {
		return cssList;
	}
	public void setCssList(ArrayList<String> cssList) {
		this.cssList = cssList;
	}
	public ArrayList<String> getFontList() {
		return fontList;
	}
	public void setFontList(ArrayList<String> fontList) {
		this.fontList = fontList;
	}
	public ArrayList<String> getImageList() {
		return imageList;
	}
	public void setImageList(ArrayList<String> imageList) {
		this.imageList = imageList;
	}
	public ArrayList<String> getJsList() {
		return jsList;
	}
	public void setJsList(ArrayList<String> jsList) {
		this.jsList = jsList;
	}
	public ArrayList<String> getMediaList() {
		return mediaList;
	}
	public void setMediaList(ArrayList<String> mediaList) {
		this.mediaList = mediaList;
	}
	public ArrayList<String> getPopupList() {
		return popupList;
	}
	public void setPopupList(ArrayList<String> popupList) {
		this.popupList = popupList;
	}
	
}
