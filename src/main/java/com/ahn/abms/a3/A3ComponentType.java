package com.ahn.abms.a3;

public enum A3ComponentType {
	PAGE(Values.PAGE), 
	 IMAGE(Values.IMAGE), 
	TEXT(Values.TEXT),
	LINK(Values.LINK);

  private String type;

  private A3ComponentType(String type) {
      this.type = type;
  }

  public String getType() {
      return type;
  }

  public static class Values {
	  public static final String PAGE = "page";
      public static final String IMAGE = "image";
      public static final String TEXT = "text";
      public static final String LINK = "link";
      public static final String POPUP = "popup";
  }
}
