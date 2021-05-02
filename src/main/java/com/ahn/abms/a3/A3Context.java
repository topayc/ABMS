package com.ahn.abms.a3;

import java.awt.Color;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;

import javax.imageio.ImageIO;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.ahn.abms.dto.AbmsProjectCreateForm;

public class A3Context {
	private A3Header header;
	private A3Project project;
	
	public static A3Context buildContextFromJSON(String data) throws JsonParseException, JsonMappingException, IOException, ParseException{
		JSONParser parser = new JSONParser();	
		JSONObject contextObj = (JSONObject)parser.parse(data);
		
		A3Context context = new A3Context();
		ObjectMapper mapper = new ObjectMapper();
		
		A3Header header = mapper.readValue(contextObj.get("header").toString(), A3Header.class);
		A3Project project = mapper.readValue(contextObj.get("project").toString(), A3Project.class);
		project.getPages().clear();
		
		JSONObject projectObject = (JSONObject)contextObj.get("project");
		JSONArray pageArray =  (JSONArray)projectObject.get("pages");
		
		if (pageArray.size() > 0) {
			for (int i = 0 ; i < pageArray.size() ; i++) {
				JSONObject pageObj = (JSONObject) pageArray.get(i);
				A3Page page = mapper.readValue(pageObj.toString(), A3Page.class);
				project.getPages().add(page);
			}
		}
		context.setHeader(header);
		context.setProject(project);
		return context;
	}

	public static A3Context newContext(AbmsProjectCreateForm form) throws Exception{
		A3Context context = new A3Context();
		context.setHeader(A3Header.newHeader(form));
		context.setProject(A3Project.newProject(form));
		return context; 
	}
	
	public void drawContext(String savePath) throws IOException{
		BufferedImage bufferedImage  = 
				new BufferedImage(this.getHeader().getWidth(), this.getHeader().getHeight(), BufferedImage.TYPE_3BYTE_BGR);
		Graphics2D g2 = bufferedImage.createGraphics();
		g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g2.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
		g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_DEFAULT);
	 	g2.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON); 
	    
		for (int j = 0; j <this.project.getPages().size() ; j++){
			A3Page page = this.project.getPages().get(j);
			g2.clearRect(page.getData().getLeft(), page.getData().getTop(), page.getData().getWidth(), page.getData().getHeight());
			g2.setColor(new Color(this.hexToIntColor(page.getData().getBackgroundColor())));
			g2.fillRect(page.getData().getLeft(), page.getData().getTop(), page.getData().getWidth(), page.getData().getHeight());
			if (!"".equals(page.getData().getBackgroundImage()) && page.getData().getBackgroundImage()!= null) {
				BufferedImage image = ImageIO.read(new URL("http://127.0.0.1:8080" + page.getData().getBackgroundImage()));
				g2.drawImage(
						image,
						page.getData().getLeft(), 
						page.getData().getTop(), 
						page.getData().getWidth(), 
						page.getData().getHeight(), 
						null
				);
			}
			if (page.getChilds().size() > 0) {
				for (int i = 0; i <page.getChilds().size(); i++){
					
					page.getChilds().get(i).draw(g2, page.getData().getLeft(), page.getData().getTop()); 
				}
			}
			
			File file = new File(savePath + "page_000" + (j+ 1) + ".png");
			ImageIO.write(bufferedImage, "png", file);
		}
	}
	

	public  int hexToIntColor(String value){
		String[] temp = value.split("#");
		 StringBuffer dec = null;
		 for(String strArr : temp){
			 dec = new StringBuffer();
			 dec.append(strArr);
		 }
		 return Integer.parseInt(dec.toString(), 16);
	}
	public A3Header getHeader() {
		return header;
	}

	public void setHeader(A3Header header) {
		this.header = header;
	}

	public A3Project getProject() {
		return project;
	}

	public void setProject(A3Project project) {
		this.project = project;
	}
	
	
}
