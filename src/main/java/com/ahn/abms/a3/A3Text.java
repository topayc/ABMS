package com.ahn.abms.a3;

import java.awt.Color;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.io.IOException;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonTypeName;

@JsonTypeName(A3ComponentType.Values.TEXT)
public class A3Text extends A3BaseComponent{
	
	private A3TextData data; 
	
	@Override
	public void draw(Graphics2D g2,int offsetX, int offsetY) throws IOException {
		super.draw(g2,offsetX, offsetY);
		g2.setColor(new Color(super.des(this.data.getColor())));
		g2.setFont(new Font(this.data.getFontFamily(),Font.PLAIN, (int)(this.str2intSize(this.data.getFontSize())/0.75)));
		
		FontMetrics fm = g2.getFontMetrics();
		int fontHeight = fm.getHeight() - fm.getDescent();
		g2.drawString(this.data.getText(), offsetX + this.data.getLeft(), offsetY + this.data.getTop() + fontHeight);
		
		System.out.println(this.data.getFontFamily() + " : " + this.data.getFontSize() + " : " + this.str2intSize(this.data.getFontSize()));
		System.out.println(offsetX + " : " + offsetY + " : " + this.data.getLeft() + " : " + this.data.getTop());
	}
	
	
	public A3TextData getData() {
		return data;
	}


	public void setData(A3TextData data) {
		this.data = data;
	}


	public static class A3TextData  {
		private int no;
		private int left;
        private int top;
        private int width;
        private int height;
        private String type;
        private boolean fixRatio;
        private String placeHolder;
        private String text;
        @JsonProperty("font-family")
        private String fontFamily;
        @JsonProperty("font-size")
        private String fontSize;
        @JsonProperty("font-weight")
        private String fontWeight;
        private String color;
        private String wrapperId;
        private String name;
        private String id;
        @JsonProperty("UUID")
        private String UUID;
        private String displayName;
        
        
		
		public String getDisplayName() {
			return displayName;
		}
		public void setDisplayName(String displayName) {
			this.displayName = displayName;
		}
		public int getLeft() {
			return left;
		}
		public void setLeft(int left) {
			this.left = left;
		}
		public int getTop() {
			return top;
		}
		public void setTop(int top) {
			this.top = top;
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
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public boolean isFixRatio() {
			return fixRatio;
		}
		public void setFixRatio(boolean fixRatio) {
			this.fixRatio = fixRatio;
		}
		public String getPlaceHolder() {
			return placeHolder;
		}
		public void setPlaceHolder(String placeHolder) {
			this.placeHolder = placeHolder;
		}
		public String getText() {
			return text;
		}
		public void setText(String text) {
			this.text = text;
		}
		public String getFontFamily() {
			return fontFamily;
		}
		public void setFontFamily(String fontFamily) {
			this.fontFamily = fontFamily;
		}
		public String getFontSize() {
			return fontSize;
		}
		public void setFontSize(String fontSize) {
			this.fontSize = fontSize;
		}
		public String getFontWeight() {
			return fontWeight;
		}
		public void setFontWeight(String fontWeight) {
			this.fontWeight = fontWeight;
		}
		public String getColor() {
			return color;
		}
		public void setColor(String color) {
			this.color = color;
		}
		public int getNo() {
			return no;
		}
		public void setNo(int no) {
			this.no = no;
		}
		public String getWrapperId() {
			return wrapperId;
		}
		public void setWrapperId(String wrapperId) {
			this.wrapperId = wrapperId;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getUUID() {
			return UUID;
		}
		public void setUUID(String uUID) {
			UUID = uUID;
		}
		
		
	}
}
