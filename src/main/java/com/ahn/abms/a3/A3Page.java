package com.ahn.abms.a3;

import java.awt.Graphics2D;
import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonProperty;

public class A3Page  {
	private A3PageData data; 
	private String typeCode;
	private ArrayList<A3BaseComponent> childs = new ArrayList<A3BaseComponent>();
	
	public void draw(Graphics2D g2,int offsetX, int offsetY) {
	}

	public A3PageData getData() {
		return data;
	}

	
	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public void setData(A3PageData data) {
		this.data = data;
	}

	public ArrayList<A3BaseComponent> getChilds() {
		return childs;
	}

	public void setChilds(ArrayList<A3BaseComponent> childs) {
		this.childs = childs;
	}

	public static class A3PageData {
		private String type;
		private String name;
		private String desc;
		private String id;
		private int width;
		private int height;
		private int top;
		private int left;
		private int no;
		private String wrapperId;
		private String displayName;

		@JsonProperty("background-color")
		private String backgroundColor;

		@JsonProperty("background-image")
		private String backgroundImage;

		@JsonProperty("UUID")
		private String UUID;
		
		
		public String getDisplayName() {
			return displayName;
		}
		public void setDisplayName(String displayName) {
			this.displayName = displayName;
		}
		public String getWrapperId() {
			return wrapperId;
		}
		public void setWrapperId(String wrapperId) {
			this.wrapperId = wrapperId;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}


		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getDesc() {
			return desc;
		}

		public void setDesc(String desc) {
			this.desc = desc;
		}

		public String getId() {
			return id;
		}

		public void setId(String id) {
			this.id = id;
		}

		public int getWidth() {
			return width;
		}

		public void setWidth(int width) {
			this.width = width;
		}

		public int getHeight() {
			return height;
		}

		public void setHeight(int height) {
			this.height = height;
		}

		
		public int getTop() {
			return top;
		}

		public void setTop(int top) {
			this.top = top;
		}

		public int getLeft() {
			return left;
		}

		public void setLeft(int left) {
			this.left = left;
		}

		public int getNo() {
			return no;
		}

		public void setNo(int no) {
			this.no = no;
		}

		public String getBackgroundColor() {
			return backgroundColor;
		}

		public void setBackgroundColor(String backgroundColor) {
			this.backgroundColor = backgroundColor;
		}

		public String getBackgroundImage() {
			return backgroundImage;
		}

		public void setBackgroundImage(String backgroundImage) {
			this.backgroundImage = backgroundImage;
		}


		public String getUUID() {
			return UUID;
		}

		public void setUUID(String uUID) {
			UUID = uUID;
		}
		
	}
}
