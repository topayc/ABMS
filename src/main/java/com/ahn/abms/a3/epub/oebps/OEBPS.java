package com.ahn.abms.a3.epub.oebps;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import org.apache.commons.io.FileUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.ahn.abms.a3.epub.ToXML;
import com.ahn.abms.a3.epub.UUIDGen;
import com.ahn.abms.a3.epub.Writeable;

public class OEBPS implements ToXML,Writeable{
	private static final String OEBPS_DIR_NAME = "OEBPS";
	private static final String OPF_FILE_NAME = "content.opf";
	
	private static final String HTML_CONTENT_DIR_NAME= "content";
	private StringBuilder metaDatas;
	private StringBuilder manifestDatas;
	private StringBuilder spinsDatas;
	private StringBuilder OEPBSBuilder;
	
	private StringBuilder htmlContents;
	
	private JSONObject jsonData = null;
	private JSONObject jsonProject = null;
	private JSONObject jsonHeader = null;
	private JSONArray jsonPage = null;
	
	private String parentPath;
	private String data;
	
	public OEBPS(String parentPath, String data){
		this.parentPath = parentPath;
		this.data = data;
		this.metaDatas = new StringBuilder();
		this.manifestDatas = new StringBuilder();
		this.spinsDatas = new StringBuilder();
		this.OEPBSBuilder = new StringBuilder();
		
		this.htmlContents = new StringBuilder();
	}

	
	@Override
	public String toXML() {
		return null;
	}

	@Override
	public void write(String parentPath) {
		if (parentPath != null) this.parentPath  = parentPath;
		this.writeOPF(data);
		this.writeConent();
		
	}
	
	private void writeConent() {
		/*
		String path = this.parentPath + OEBPS_DIR_NAME  + File.separator + this.HTML_CONTENT_DIR_NAME + File.separator;
		File f = new File(path);
		if (!f.exists())  f.mkdirs();
	
		
		path = this.parentPath + OEBPS_DIR_NAME  + File.separator + this.HTML_CONTENT_DIR_NAME + File.separator + "css/";
		f = new File(path);
		if (!f.exists())  f.mkdirs();
		
		path = this.parentPath + OEBPS_DIR_NAME  + File.separator + this.HTML_CONTENT_DIR_NAME + File.separator + "font/";
		f = new File(path);
		if (!f.exists())  f.mkdirs();
		
		path = this.parentPath + OEBPS_DIR_NAME  + File.separator + this.HTML_CONTENT_DIR_NAME + File.separator + "images/";
		f = new File(path);
		if (!f.exists())  f.mkdirs();
		
		path = this.parentPath + OEBPS_DIR_NAME  + File.separator + this.HTML_CONTENT_DIR_NAME + File.separator + "js/";
		f = new File(path);
		if (!f.exists())  f.mkdirs();
		
		path = this.parentPath + OEBPS_DIR_NAME  + File.separator + this.HTML_CONTENT_DIR_NAME + File.separator + "media/";
		f = new File(path);
		if (!f.exists())  f.mkdirs();
		*/
		this.writeHtml();
	}
	
	private void writeHtml(){
		String path = this.parentPath + OEBPS_DIR_NAME  + File.separator + this.HTML_CONTENT_DIR_NAME + File.separator;
		File f = new File(path);
		if (!f.exists()) f.mkdirs();
		
		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < this.jsonPage.size(); i++){
			JSONObject page = (JSONObject)this.jsonPage.get(i);
			String pageNo = String.format("%05d", (i+1));
			
			builder.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
			builder.append("\n");
			builder.append("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.1//EN\" \"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd\">");
			builder.append("\n");
			builder.append("<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"ko\">");
			builder.append("\n");
			builder.append("<head>");
			builder.append("\n");
			builder.append("<meta http-equiv=\"content-type\" content=\"text/html;charset=UTF-8\"/>");
			builder.append("\n");
			builder.append("<meta content=\"width="+ page.get("width") +", height=" + page.get("height") + "\" name=\"viewport\"/>");
			builder.append("\n");
			builder.append("<title></title>");
			builder.append("\n");
			builder.append("<link id=\"common_css\" type=\"text/css\" href=\"css/common.css\" rel=\"stylesheet\" media=\"screen\"/>");
			builder.append("\n");
			builder.append("<link id=\"fontface_css\" type=\"text/css\" href=\"css/fontface.css?v=0\" rel=\"stylesheet\" media=\"screen\"/>");
			builder.append("\n");
			builder.append("<link id=\"page_css\" type=\"text/css\" href=\"css/page" + pageNo+ ".css\" rel=\"stylesheet\" media=\"screen\"/>");
			builder.append("\n");
			builder.append("<script type=\"text/javascrip\" src=\"js/funcs.j\"></script>");
			builder.append("\n");
			builder.append("<script type=\"text/javascript\" src=\"js/page" + pageNo+ ".js\"></script>");
			builder.append("\n");
			String img = page.get("src").toString();
			String imgPath  = img.substring(img.lastIndexOf("/") + 1);
			String backImg = "images/page" + String.format("%05d", (i+1)) + "/" + imgPath;
			builder.append("<body style=\"position:absolute;width:"+page.get("width") +"px; height:"+page.get("width") +"px; background:" + page.get("backColor")+ ";background-image:url('"+backImg +"') ;overflow:hidden;\">");
			builder.append("\n");
			
			if (page.containsKey("childs")) {
				if (((JSONArray)page.get("childs")).size() > 0) {
					int length = ((JSONArray)page.get("childs")).size();
					for (int j = 0; j < length; j++ ) {
						JSONObject obj =(JSONObject)((JSONArray)page.get("childs")).get(j);
						builder.append(this.prepareHtmlRecursive(obj));
						builder.append("\n");
					}
				}
			}
			builder.append("<body>");
			builder.append("\n");
			builder.append("</html");
			
			try {
				FileUtils.writeByteArrayToFile(new File(path +"page" + pageNo + ".xhtml"), builder.toString().getBytes("utf-8"));
			} catch (UnsupportedEncodingException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}finally {
				builder.setLength(0);
			}
		}
	}
	
	private String prepareHtmlRecursive(JSONObject obj){
		StringBuilder b = new StringBuilder();
		b.append(this.makeStartTag(obj));
		
		if (obj.containsKey("childs")) {
			if (((JSONArray)obj.get("childs")).size() > 0) {
				int length = ((JSONArray)obj.get("childs")).size();
				for (int j = 0; j < length; j++ ) {
					JSONObject elem =(JSONObject)((JSONArray)obj.get("childs")).get(j);
					b.append(this.prepareHtmlRecursive(elem));
				}
			}
		}
		b.append(this.makeEndTag(obj));
		return b.toString();
	}
	
	private String makeStartTag(JSONObject obj){
		StringBuilder b = new StringBuilder();
		String wrapperTemplate = "position:absolute;left:%s;right:%s;width:%s;height:%s;border:none"; 
		String wrapperStyle = String.format(
				wrapperTemplate, 
				obj.get("x").toString()  + "px",  
				obj.get("y").toString()  + "px",
				obj.get("width").toString()  + "px",
				obj.get("height").toString()  + "px" );
		if (obj.get("type").toString().equals("image")) {
	
			
			b.append("<div id = \""+ obj.get("UUID")+ "\" style = \"" + wrapperStyle +"\" class = \"Mbox Mbox_" +obj.get("UUID") + "\">");
			b.append("<img/>");
		}
		if (obj.get("type").toString().equals("text")) {
			b.append("<div id = \""+ obj.get("UUID")+ "\" style = \"" + wrapperStyle +"\" class = \"Mbox Mbox_" +obj.get("UUID") + "\">");
			b.append("<p>");
		}
		
		if (obj.get("type").toString().equals("link")) {
			b.append("<div id = \""+ obj.get("UUID")+ "\" style = \"" + wrapperStyle +"\" class = \"Lbox Lbox_" +obj.get("UUID") + "\">");
			b.append("<p>");
		}
		
		return b.toString();
	}
	
	private String makeEndTag(JSONObject obj){
		StringBuilder b = new StringBuilder();
		if (obj.get("type").toString().equals("image")) {}
		if (obj.get("type").toString().equals("text")) b.append("</p>");
		if (obj.get("type").toString().equals("link")) b.append("</p>");
		
		b.append("</div>");
		return b.toString();
	}

	private void writeOPF(String data) {
		String path = this.parentPath + OEBPS_DIR_NAME  + File.separator;
		File f = new File(path);
		if (!f.exists())  f.mkdirs();
		path = path + OEBPS.OPF_FILE_NAME;
		
		StringBuilder opfData = new StringBuilder();
		JSONParser jsonParser = new JSONParser();
		
		try {
			this.jsonData = (JSONObject)jsonParser.parse(data);
			this.jsonProject = (JSONObject)jsonData.get("project");
			this.jsonHeader= (JSONObject)jsonData.get("header");
			this.jsonPage= (JSONArray)jsonProject.get("pages");

			this.OEPBSBuilder.append("<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"yes\"?>");this.OEPBSBuilder.append("\n");
			this.OEPBSBuilder.append("<package xmlns=\"http://www.idpf.org/2007/opf\" xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" unique-identifier=\"bookid\" version=\"3.0\" xml:lang=\"ko-KR\" prefix=\"rendition: http://www.idpf.org/vocab/rendition/#\">"); this.OEPBSBuilder.append("\n");
			
			this.prepareMetadata();
			this.prepareManifest();
			this.prepareSpins();
			
			this.OEPBSBuilder.append(this.metaDatas.toString());
			this.OEPBSBuilder.append(this.manifestDatas.toString());
			this.OEPBSBuilder.append(this.spinsDatas.toString());
			
			this.OEPBSBuilder.append("</package>");
			FileUtils.writeByteArrayToFile(new File(path), this.OEPBSBuilder.toString().getBytes("utf-8"));
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	private void prepareMetadata(){
		this.metaDatas.append( "<metadata xmlns:dc=\"http://purl.org/dc/elements/1.1/\" xmlns:opf=\"http://www.idpf.org/2007/opf\">");
		this.metaDatas.append("\n");
		this.metaDatas .append("<dc:identifier id=\"BookId\" opf:scheme=\"UUID\">urn:uuid:" + UUIDGen.gen() + "</dc:identifier>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:title>" + jsonProject.get("projectName") + "</dc:title>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:creator opf:role=\"au\">" + jsonHeader.get("writer") + " </dc:creator>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:contributor opf:role=\"com\">A3MAKER</dc:contributor>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:language>ko</dc:language>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:date>" + jsonProject.get("createTime") + "</dc:date>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:pagecount>" + jsonPage.size() + "</dc:pagecount>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:pagewidth>" + jsonProject.get("width") + "</dc:pagewidth>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:pageheight>" + jsonProject.get("width") + "</dc:pageheight>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:firstpage_index>0</dc:firstpage_index>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:lastpage_index>0</dc:lastpage_index>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:firstpage_label>0</dc:firstpage_label>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:startpage_index>0</dc:startpage_index>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:coverpage_count>0</dc:coverpage_count>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:pageflip_type>One</dc:pageflip_type>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<dc:pageflip_type>One</dc:pageflip_type>");
		this.metaDatas.append("\n");

		this.metaDatas .append("<meta refines=\"#creator\" property=\"role\" scheme=\"marc:relators\" id=\"role\">aut</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"dcterms:modified\">" + jsonProject.get("createTime") + "</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"dtextterms:gradeGroup\">Standard</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"dtextterms:schoolGrade\">Integrate</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"dtextterms:athorizationType\">Admit</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"dtextterms:curriculum\">Revision</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"dtextterms:courseName\">Basic</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"dtextterms:rightsHolder\"></meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"daouincube:packagingTool\">DigitalTextbook Packager</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"daouincube:packagingToolVersion\">1.00.007</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"daouincube:packagingDate\">2016-07-05T20:06:03Z</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"rendition:layout\">pre-paginated</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"rendition:orientation\">auto</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("<meta property=\"rendition:spread\">auto</meta>");
		this.metaDatas.append("\n");
		this.metaDatas.append("</metadata>");
		this.metaDatas.append("\n");
	}
	
	private void prepareManifest(){
		this.manifestDatas.append("<manifest>");
		this.manifestDatas.append("\n");
		this.manifestDatas.append("<item id=\"toc\" href=\"toc.xhtml\" properties=\"nav\" media-type=\"application/xhtml+xml\"/>");
		this.manifestDatas.append("\n");
		this.manifestDatas.append("<item id=\"cover\" href=\"content/page00001.xhtml\" media-type=\"application/xhtml+xml\"/>");
		this.manifestDatas.append("\n");
		
		JSONObject page  = null;
		for (int i = 1; i < jsonPage.size() ; i++) {
			page = (JSONObject)jsonPage.get(i);
			String pageId= String.format("page%05d", i + 1);
			String pageHref = "content/" + pageId;
			this.manifestDatas.append(String.format("<item id=\"%s.xhtml\" href=\"%s.xhtml\" media-type=\"application/xhtml+xml\"/>", pageId, pageHref)); this.manifestDatas.append("\n");
		}
		this.manifestDatas.append("</manifest>");
		this.manifestDatas.append("\n");
	}
	
	private void prepareSpins(){
		this.spinsDatas.append("<spine toc=\"ncx\">");
		this.spinsDatas.append("\n");
		this.spinsDatas.append("<itemref idref=\"cover\"/>");
		this.spinsDatas.append("\n");
		
		JSONObject page  = null;
		for (int i = 1; i < jsonPage.size() ; i++) {
			page = (JSONObject)jsonPage.get(i);
			String pageId= String.format("page%05d", i + 1);
			String pageHref = "content/" + pageId;
			this.spinsDatas.append(String.format("<itemref idref=\"%s.xhtml\"/>", pageId));
			this.spinsDatas.append("\n");
		}
		
		this.spinsDatas.append("</spine>");
		this.spinsDatas.append("\n");
	}



	public StringBuilder getMetaDatas() { return metaDatas; }
	public void setMetaDatas(StringBuilder metaDatas) { this.metaDatas = metaDatas; }
	
	public StringBuilder getManifestDatas() { return manifestDatas; }
	public void setManifestDatas(StringBuilder manifestDatas) { this.manifestDatas = manifestDatas; }

	public StringBuilder getSpinsDatas() { return spinsDatas; }
	public void setSpinsDatas(StringBuilder spinsDatas) { this.spinsDatas = spinsDatas; }

	public StringBuilder getOEPBSBuilder() { return OEPBSBuilder; }
	public void setOEPBSBuilder(StringBuilder oEPBSBuilder) { OEPBSBuilder = oEPBSBuilder; }

	public JSONObject getJsonData() { return jsonData; }
	public void setJsonData(JSONObject jsonData) { this.jsonData = jsonData; }

	public JSONObject getJsonProject() { return jsonProject; }
	public void setJsonProject(JSONObject jsonProject) { this.jsonProject = jsonProject; }

	public JSONObject getJsonHeader() { return jsonHeader; }
	public void setJsonHeader(JSONObject jsonHeader) { this.jsonHeader = jsonHeader; }

	public JSONArray getJsonPage() { return jsonPage; }
	public void setJsonPage(JSONArray jsonPage) { this.jsonPage = jsonPage; }

	public String getParentPath() { return parentPath; }
	public void setParentPath(String parentPath) { this.parentPath = parentPath; }

	public String getData() { return data; }
	public void setData(String data) { this.data = data; }

	public static String getOebpsDirName() { return OEBPS_DIR_NAME; }
	public static String getOpfFileName() { return OPF_FILE_NAME; }
}
