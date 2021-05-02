package com.ahn.abms.a3.epub.oebps.opf;

public class OPF {
	private Metadata metaData;
	private Manifest manifest;
	private static String fileName = "context.opf";
	private String parentPath;
	private String data;
	
	public OPF(String parentPath, String data){
		this.parentPath = parentPath;
		this.data = data;
	}
	public Metadata getMetaData() {
		return metaData;
	}
	public void setMetaData(Metadata metaData) {
		this.metaData = metaData;
	}
	public Manifest getManifest() {
		return manifest;
	}
	public void setManifest(Manifest manifest) {
		this.manifest = manifest;
	};
	
	
}
