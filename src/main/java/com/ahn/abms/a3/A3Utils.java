package com.ahn.abms.a3;

public class A3Utils {
	public static int str2intSize(String value){
		if (value.indexOf("pt") >0 ){
			return Integer.parseInt(value.substring(0, value.indexOf("pt")));
		}else {
			return Integer.parseInt(value);
		}
	}
	public static int des(String value){
		String[] temp = value.split("#");
		 StringBuffer dec = null;
		 for(String strArr : temp){
			 dec = new StringBuffer();
			 dec.append(strArr);
		 }
		 return Integer.parseInt(dec.toString(), 16);
	}
	
	public static int hexToIntColor(String value){
		String[] temp = value.split("#");
		 StringBuffer dec = null;
		 for(String strArr : temp){
			 dec = new StringBuffer();
			 dec.append(strArr);
		 }
		 return Integer.parseInt(dec.toString(), 16);
	}
}
