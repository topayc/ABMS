package com.ahn.abms.a3;

import java.awt.Graphics2D;
import java.io.IOException;
import org.codehaus.jackson.annotate.JsonSubTypes;
import org.codehaus.jackson.annotate.JsonSubTypes.Type;
import org.codehaus.jackson.annotate.JsonTypeInfo;

@JsonTypeInfo(
	      use= JsonTypeInfo.Id.NAME,
	      include = JsonTypeInfo.As.PROPERTY,
	      property = "typeCode"
	)
@JsonSubTypes({
	  @Type(value = A3Page.class, name = A3ComponentType.Values.PAGE),
	  @Type(value = A3Image.class, name = A3ComponentType.Values.IMAGE),
	  @Type(value = A3Link.class, name = A3ComponentType.Values.LINK),
	  @Type(value = A3Text.class, name = A3ComponentType.Values.TEXT),
	  @Type(value = A3Popup.class, name = A3ComponentType.Values.POPUP),
	})
public class A3BaseComponent {
	private String typeCode;
	
	public int str2intSize(String value){
		if (value.indexOf("pt") >0 ){
			return Integer.parseInt(value.substring(0, value.indexOf("pt")));
		}else {
			return Integer.parseInt(value);
		}
	}
	public int des(String value){
		String[] temp = value.split("#");
		 StringBuffer dec = null;
		 for(String strArr : temp){
			 dec = new StringBuffer();
			 dec.append(strArr);
		 }
		 return Integer.parseInt(dec.toString(), 16);
	}
	
	public String getTypeCode() {
		return typeCode;
	}

	public void setTypeCode(String typeCode) {
		this.typeCode = typeCode;
	}

	public  void draw(Graphics2D g2,int offsetX, int offsetY) throws IOException, IOException{}
}
