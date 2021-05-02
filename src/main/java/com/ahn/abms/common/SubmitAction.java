package com.ahn.abms.common;

public enum SubmitAction {
	CREATE("생성"), MODIFY("수정"), DELETE("삭제"), INSERT("생성");
	
	private final String value;
	SubmitAction(String value) {
		this.value = value;
	}
	
	public String value(){
		return this.value;
	}
	
	public static SubmitAction valueFrom(String value) throws Exception{
		if (value.equalsIgnoreCase("create")) {
			return CREATE;
		}else if (value.equalsIgnoreCase("modify")) {
			return MODIFY;
		}else if (value.equalsIgnoreCase("delete")) {
			return DELETE;
		}else if(value.equalsIgnoreCase("insert")) {
			return INSERT;
		} else {
			throw new Exception("Unknown value : " + value);
		}
	}
}
