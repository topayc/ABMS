package com.ahn.abms.manager;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Calendar;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.ahn.abms.common.Constants.SaveFileType;

/*
* 파일 저장 경로 포맷 ......
* abms_ftp/abms_project/proejct_no/save_file_type / file_name  
* project_no : 프로젝트 고유 번호 
* save_file_type :  SaveFileType.class 의 enum string 
* file_name : 저장할 파일 이름                                    
*                                     
*/

@Component
public class AbmsFileManager {
	
	public static final String ABMS_ROOT_PATH = "abms_ftp";
	public static final String ABMS_PROJECT_PATH = "abms_project";
	private String domain;
	private String serverRealPath;
	private String contextPath;
	
	private static String[] allowedImageFileExt = new String[]{ "jpg","jpeg","png","JPEG","JPG" };
	private static String[] allowedConvertFileExt = new String[]{ "json","hwp","zip", "epub", "docx", "pptx","xlsx" };
	
	private String abmsRepoLocalPath;
	private String abmsProjectFileLocalPathTemplate;;
	private String abmsWebPathTemplate;
	
	@Autowired
	private ServletContext servletContext;

	@PostConstruct
	public void initAbmsFileManager() {
		this.domain = "";
		this.contextPath = this.servletContext.getContextPath();
		this.serverRealPath = this.servletContext.getRealPath("/");
		this.abmsRepoLocalPath = 
				this.serverRealPath +  
				AbmsFileManager.ABMS_ROOT_PATH + 
				File.separator + 
				AbmsFileManager.ABMS_PROJECT_PATH;
		
		this.abmsProjectFileLocalPathTemplate = 
				this.abmsRepoLocalPath + 
				File.separator + 
				"%d" + 
				File.separator + 
				"%s" + 
				File.separator + 
				"%s";
		
		this.abmsWebPathTemplate =  
				domain + 
				contextPath+ 
				"/" + 
				AbmsFileManager.ABMS_ROOT_PATH + 
				"/" + 
				AbmsFileManager.ABMS_PROJECT_PATH+ 
				"/%d"+ 
				"/%s"+ 
				"/%s";
	}

	public boolean isAllowedImageFile(String fileName) {
		String ext = this.getFileExtension(fileName); 
		if (Arrays.asList(AbmsFileManager.allowedImageFileExt).contains(ext)) {
			return true;
		}else {
			return false;
		}
	}
	
	public boolean isAllowedConvertFile(String fileName) {
		String ext = this.getFileExtension(fileName); 
		if (Arrays.asList(AbmsFileManager.allowedConvertFileExt).contains(ext)) {
			return true;
		}else {
			return false;
		}
	}
	
	public String creatNewFileName(String fileName) {
		int index = fileName.lastIndexOf(".");
		String fileExt = fileName.substring(index + 1);
		Calendar cal = Calendar.getInstance();
		long timeString = cal.getTimeInMillis();
		return String.valueOf(timeString) + "." + fileExt;
	}
	
	public String getFileExtension(String fileName) {
		int index = fileName.lastIndexOf(".");
		String fileExt = fileName.substring(index + 1);
		return fileExt;
	}
	
	/**
	 * 해당 디렉토리의 존재 여부 반환
	 * @param dir   디렉토리 
	 */
	public boolean checkDirExist(File dir){
		return dir.exists();
	}
	
	public boolean checkDirExist(String dir){
		return new File(dir).exists();
	}
	
	/**
	 * 해당 디렉토리가 없다면 디렉토리를 생성
	 * @param dir  체크할 디렉토리 
	 */
	public void initDir(File dir){
		if (!checkDirExist(dir))
			dir.mkdirs();
	}
	
	public void initDir(String dir){
		if (!checkDirExist(dir))
			new File(dir).mkdirs();
	}

	/* ABMS 자체에서 생성된 데이타의 파일 생성 /저장 메서드 */
	public void saveFile(SaveFileType type, int projectNo, String fileName, String fileData){
		this.saveFile(type, projectNo,  fileName, fileData);
	}

	/* ABMS 자체에서 생성된 데이타의 파일 생성/저장   메서드 */
	public void saveFile(SaveFileType type, int projectNo, File file, String fileData){
	
	}
	
	/* 생성된 페이지 버퍼  이미지 저장 메서드 */ 
	public void saveFile(SaveFileType type, int projectNo, BufferedImage bufferedImage, String fileName, String saveExt) throws IOException{
		this.saveFile(type, projectNo, bufferedImage, new File(fileName), saveExt);
	}
	
	/* 생성된 페이지 버퍼 이미지   저장 메서드 */ 
	public void saveFile(SaveFileType type, int projectNo, BufferedImage bufferedImage, File file, String saveExt) throws IOException{
		saveExt = saveExt != null ? saveExt : "png";
		ImageIO.write(bufferedImage, saveExt, file);
	}
	
	/*사용자가 업로드한 파일 - 리소스, 커버 이미지, 첨부파일  - 저장 메서드 */
	public void saveFile(SaveFileType type, int projectNo, MultipartFile sourceFile, String fileName ) throws IllegalStateException, IOException{
		if (type == SaveFileType.ATTACH_FILE) {
			if (!this.isAllowedImageFile(fileName)) new Exception("Invalid Convert File");
		}
		
		if (type == SaveFileType.RESOURCES) {
			if (!this.isAllowedImageFile(fileName)) new Exception("Invalid Resource File");
		}

		if (type == SaveFileType.COVER_IMAGE){
			if (!this.isAllowedImageFile(fileName)) new Exception("Invalid Image File");
		}
	
		String dir = String.format(this.abmsProjectFileLocalPathTemplate, projectNo, type.value(), "").trim();
		this.initDir(dir);
		
		String fullPath  = dir  + fileName;
		File target = new File(fullPath);
		if (!target.exists()) sourceFile.transferTo(target);
	}
	
	/* 저장 파일 형태에 따른 web 경로 반환 */
	public String getWebPath(SaveFileType type, int projectNo, String fileName){
		return String.format(this.abmsWebPathTemplate, projectNo, type.value(), fileName);
	}
	
	/* 저장 파일 형태에 따른 local  경로 반환 */
	public String getLocalPath(SaveFileType type , int proejctNo, String fileName){
		String path = String.format(this.abmsProjectFileLocalPathTemplate, proejctNo, type.value(),fileName).trim();
		return path;
	}
	
	/* 저장 파일 형태에 따른 저장 디렉토리 반*/
	public String getSaveTypePath(SaveFileType type, int projectNo, String fileName){
		String path = String.format(this.abmsProjectFileLocalPathTemplate, projectNo, type.value(),"").trim();
		return path;
	}
}
