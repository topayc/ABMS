package com.ahn.abms.a3.epub.metainf;

import java.io.File;

public class MetaInf{

	private static final String META_INFO_DIR_NAME = "META-INF";
	
	private DisplayOption displayOption;
	private Container container;
	private String parentPath; 
	
	public MetaInf(){
		this.displayOption = new DisplayOption();
		this.container  = new Container();
	}
	
	public MetaInf(String parentPath){
		this.parentPath = parentPath;
		this.displayOption = new DisplayOption();
		this.container = new Container();
	}
	
	public void write() throws Exception {
		if (this.parentPath == null) {
			throw new Exception("저장할 경로가 지정되지 않았습니다");
		}
		this.displayOption.write(this.parentPath + MetaInf.META_INFO_DIR_NAME + File.separator);
		this.container.write(this.parentPath + MetaInf.META_INFO_DIR_NAME + File.separator);
	}
	
	
	public DisplayOption getDisplayOption() {
		return displayOption;
	}

	public void setDisplayOption(DisplayOption displayOption) {
		this.displayOption = displayOption;
	}

	public Container getContainer() {
		return container;
	}

	public void setContainer(Container container) {
		this.container = container;
	}

	public String getParentPath() {
		return parentPath;
	}

	public void setParentPath(String parentPath) {
		this.parentPath = parentPath;
	}



}
