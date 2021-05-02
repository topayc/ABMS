package com.ahn.abms.a3;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;

import javax.imageio.ImageIO;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonTypeName;

@JsonTypeName(A3ComponentType.Values.LINK)
public class A3Link extends A3BaseComponent{
	private A3LinkData data;
	
	
	public A3LinkData getData() {
		return data;
	}
	public void setData(A3LinkData data) {
		this.data = data;
	}
	
	@Override
	public void draw(Graphics2D g2,int offsetX, int offsetY) throws IOException {
		super.draw(g2,offsetX, offsetY);
		System.out.println("링크컴포넌트 배경 이미지를  그립니다");
		System.out.println(this.data.getLeft() + " : " +  this.data.getTop() + " : " + this.data.getWidth() + " : " +  this.data.getHeight());
		System.out.println("http://127.0.0.1:8080" + this.data.backgroundImage);
		
		if (!this.data.getBackgroundImage().startsWith("/") || 
				this.data.getBackgroundImage().startsWith("images") || 
				"images/img_image.png".equals(this.data.getBackgroundImage())) return;
		
		BufferedImage image = ImageIO.read(new URL("http://127.0.0.1:8080" + this.data.getBackgroundImage()));
		g2.drawImage(
				image, 
				this.data.getLeft()+ offsetX, 
				this.data.getTop() + offsetY, 
				this.data.getWidth(), 
				this.data.getHeight(), 
				null
		);
	}
	
	public static class A3LinkData{
		private int left;
        private int top;
        private int width;
        private int height;
        private String type;
        private boolean fixRatio;
        	@JsonProperty("background-image")
        private String backgroundImage;
        private String linkType;
        private String position;
        private String text;
        @JsonProperty("font-family")
        private String fontFamily;
        @JsonProperty("font-size")
        private String fontSize;
        @JsonProperty("font-weight")
        private String fontWeight;
        private String color;
        private String wrapperId;
        @JsonProperty("UUID")
        private String UUID;
        private String id;
        private int no;
        private String name;
        private String displayName;
        private int radius;
        
		public int getRadius() {
			return radius;
		}
		public void setRadius(int radius) {
			this.radius = radius;
		}
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
		public String getBackgroundImage() {
			return backgroundImage;
		}
		public void setBackgroundImage(String backgroundImage) {
			this.backgroundImage = backgroundImage;
		}
		public String getLinkType() {
			return linkType;
		}
		public void setLinkType(String linkType) {
			this.linkType = linkType;
		}
		public String getPosition() {
			return position;
		}
		public void setPosition(String position) {
			this.position = position;
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
		public String getWrapperId() {
			return wrapperId;
		}
		public void setWrapperId(String wrapperId) {
			this.wrapperId = wrapperId;
		}
		public String getUUID() {
			return UUID;
		}
		public void setUUID(String uUID) {
			UUID = uUID;
		}
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public int getNo() {
			return no;
		}
		public void setNo(int no) {
			this.no = no;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		
	}
	
}
