package com.ahn.abms.a3;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

import javax.imageio.ImageIO;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonTypeName;

@JsonTypeName(A3ComponentType.Values.IMAGE)
public class A3Image extends A3BaseComponent{
	A3ImageData data;
	
	
	public A3ImageData getData() {
		return data;
	}
	
	@Override
	public void draw(Graphics2D g2,int offsetX, int offsetY) throws IOException, IOException {
		super.draw(g2,offsetX, offsetY);
		System.out.println("이미지를 그립니다");
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
	
	public void setData(A3ImageData data) {
		this.data = data;
	}

	public static class A3ImageData {
		private int no;
		private int left;
        private int top;
        private String type;
        private int width;
        private int height;
        boolean fixRatio;
        @JsonProperty("background-image")
        private String backgroundImage;
        private String wrapperId;
        private String name;
        private String id;
        @JsonProperty("UUID")
        private String UUID;
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
		public int getNo() {
			return no;
		}
		public void setNo(int no) {
			this.no = no;
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
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
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
