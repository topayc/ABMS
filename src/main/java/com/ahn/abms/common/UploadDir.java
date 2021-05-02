package com.ahn.abms.common;

public enum UploadDir {
	COVER_IMAGE("_coverimage"), 
	EPUB("_epub"),                      
	ORG_FILE("_org"),
	IMAGE("_images"),
	A3_JSON("_a3_json"),
	A3_CAPTURE("_a3_capture"),
	A3_USER_RESOURCE("_a3_user_resource");
	
	private final String value;
	
	UploadDir(String value) {
		this.value = value;
	}
	
	public String value(){
		return this.value;
	}
	
	public static UploadDir valueFrom(String value) throws Exception{
		if (value.equalsIgnoreCase("image")) {
			return IMAGE;
		}else if (value.equalsIgnoreCase("converimage")){
			return COVER_IMAGE;
		}else if (value.equalsIgnoreCase("org")){
			return ORG_FILE;
		}else if (value.equalsIgnoreCase("epub")){
			return EPUB;
		}else if (value.equalsIgnoreCase("a3_json")){
			return A3_JSON;
		}
		else if (value.equalsIgnoreCase("a3_capture")){
			return A3_CAPTURE;
		}
		else if (value.equalsIgnoreCase("a3_user_resource")){
			return A3_USER_RESOURCE;
		} else {
			throw new Exception("Unknown value : " + value);
		}
	}
}
