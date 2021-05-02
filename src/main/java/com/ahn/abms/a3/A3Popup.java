package com.ahn.abms.a3;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;

import javax.imageio.ImageIO;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonTypeName;

@JsonTypeName(A3ComponentType.Values.POPUP)
public class A3Popup extends A3BaseComponent{
	A3PopupData data;
  
	private ArrayList<A3BaseComponent> childs = new ArrayList<A3BaseComponent>();
   
	public ArrayList<A3BaseComponent> getChilds() {
		return childs;
	}
	
	public void setChilds(ArrayList<A3BaseComponent> childs) {
		this.childs = childs;
	}
	
	public A3PopupData getData() {
		return data;
	}


	public void setData(A3PopupData data) {
		this.data = data;
	}
	
	@Override
	public void draw(Graphics2D g2,int offsetX, int offsetY) throws IOException, IOException {
		//super.draw(g2,offsetX, offsetY);
	}

	public static class A3PopupData {
		private int no;
		private int left;
      private int top;
      private String type;
      private int width;
      private int height;
      private boolean fixRatio;
      @JsonProperty("background-image")
      private String backgroundImage;
      private String wrapperId;
      private String name;
      private String id;
      @JsonProperty("UUID")
      private String UUID;
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
