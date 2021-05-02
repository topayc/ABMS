package com.ahn.abms.web.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.ahn.abms.a3.A3Context;
import com.ahn.abms.common.Constants.SaveFileType;
import com.ahn.abms.dao.interfaces.A3MakerDataDao;
import com.ahn.abms.dao.interfaces.A3MakerUserResourceDao;
import com.ahn.abms.dao.interfaces.AbmsProjectDao;
import com.ahn.abms.dao.interfaces.EditorDataDao;
import com.ahn.abms.dao.interfaces.EpubDao;
import com.ahn.abms.dao.interfaces.MemberDao;
import com.ahn.abms.dao.interfaces.MemberResourceDao;
import com.ahn.abms.dao.interfaces.UserDao;
import com.ahn.abms.dto.MemberSession;
import com.ahn.abms.dto.Response;
import com.ahn.abms.manager.AbmsFileManager;
import com.ahn.abms.model.AbmsProject;
import com.ahn.abms.model.EditorData;
import com.ahn.abms.model.MemberResource;

@Controller
@RequestMapping(value = "/A3Maker")
public class A3MakerController extends ApplicationController{
	
	public static class AccessPoint {
		public static final String Api = "/A3MakerApi";
	}
	
	@Autowired UserDao userDao;
	@Autowired EpubDao epubDao;
	@Autowired A3MakerDataDao a3MakerDao;
	@Autowired A3MakerUserResourceDao userResourceDao;
	@Autowired private AbmsFileManager abmsFileManager;
	
	@Autowired MemberDao memberDao;
	@Autowired AbmsProjectDao abmsProjectDao;
	@Autowired EditorDataDao editorDataDao;
	@Autowired MemberResourceDao memberResourecDao;
	
	public static class A3MakerRequest {
		private int apiCode;
		private int abmsProjectNo;
		private String data;
		private MultipartFile attach;
		public int getApiCode() {
			return apiCode;
		}
		public void setApiCode(int apiCode) {
			this.apiCode = apiCode;
		}
		public int getAbmsProjectNo() {
			return abmsProjectNo;
		}
		public void setAbmsProjectNo(int abmsProjectNo) {
			this.abmsProjectNo = abmsProjectNo;
		}
		public String getData() {
			return data;
		}
		public void setData(String data) {
			this.data = data;
		}
		public MultipartFile getAttach() {
			return attach;
		}
		public void setAttach(MultipartFile attach) {
			this.attach = attach;
		}

		
	}
	
	public static class A3MakerApi {
 		public static final int loadProjectInfo 	    = 10011;	
 		public static final int sustainSession 			= 10012;	
 		public static final int saveProject 				= 10013;	
 		public static final int loadPageTemplates	= 10014;	
 		public static final int loadClipArts 				= 10015;	
 		public static final int loadUserAssets			= 10016;	
 		public static final int loadServiceAssets		= 10017;	
 		public static final int uploadResource 				= 10018;	
 		public static final int loadUserInfo				= 10019;	
 		public static final int downLoadResource   = 10020;	
	}
	
	@RequestMapping(
			value = A3MakerController.AccessPoint.Api, 
			method = {RequestMethod.GET, RequestMethod.POST
	})
	@ResponseBody
	public Response A3MakerApi( 
			A3MakerRequest a3Request,  
			HttpSession httpSession) throws Exception {
		
		System.out.println("A3maker api request : " + a3Request.getApiCode());
		Response response = null;
		
		switch(a3Request.getApiCode()) {
			case A3MakerApi.loadProjectInfo : 
			response = this.loadProjectInfo(a3Request,httpSession);
			break;
		case A3MakerApi.sustainSession:
			response = this.sustainSession(a3Request);
			break;
		case A3MakerApi.saveProject:
			response = this.saveProject(a3Request);
			break;
		case A3MakerApi.loadPageTemplates:
			response = this.loadPageTemplates(a3Request);
			break;
		case A3MakerApi.loadClipArts:
			response = this.loadClipArts(a3Request);
			break;
		case A3MakerApi.loadUserAssets:
			response = this.loadUserAssets(a3Request);
			break;
		case A3MakerApi.loadServiceAssets:
			response = this.loadServiceAssets(a3Request);
			break;
		case A3MakerApi.uploadResource:
			response = this.uploadResource(a3Request, httpSession);
			break;
		case A3MakerApi.loadUserInfo: 
			response = this.loadUserInfo(a3Request); 
			break;
		}
		return response;
	}	

	private Response loadProjectInfo(A3MakerRequest a3Request,HttpSession httpSession) 
			throws JsonParseException, JsonMappingException, IOException{
		Response response = new Response();
		MemberSession memberSession = (MemberSession)httpSession.getAttribute("memberSession");
		if (memberSession == null) {
			response.setResultCode(3000);
			response.setMessageTitle("잘못된 요청 :  세션 만료 되었습니다 ");
			response.setMessageText("내용 : 세션 만료로 사용자 정보를 확인할 수 없습니다. 다시 로그인 해주세요.");
			return response;
		}
		
		System.out.println("유저 : " + memberSession.getMemberId()  );
		System.out.println("project  번호 : " + a3Request.getAbmsProjectNo());
		
		AbmsProject projectCond = new AbmsProject();
		ArrayList<AbmsProject> projects = this.abmsProjectDao.getAbmsProjects(projectCond);
		projectCond.setMemberNo(memberSession.getMemberNo());

		if (projects.size() < 1) {
			response.setResultCode(3000);
			response.setMessageTitle("프로젝트 정보 없음");
			response.setMessageText("해당 사용자의 프로젝트 정보가 없습니다");
			return response;
		}
		
		boolean isValid = false;
		for (AbmsProject project : projects ) {
			if (project.getAbmsProjectNo() == a3Request.getAbmsProjectNo()) {
				isValid = true;
				break;
			}
		}
		if (!isValid){
			response.setResultCode(3000);
			response.setMessageTitle("프로젝트 정보 불일치");
			response.setMessageText("잘못된 요청 : 요청한 프로젝트는 해당 사용자의 프로젝트가 아닙니다.");
			return response;
		}
		
		EditorData editorCond = new EditorData();
		editorCond.setAbmsProjectNo(a3Request.getAbmsProjectNo());
		ArrayList<EditorData> editorDataList = this.editorDataDao.getEditorDatas(editorCond);
		
		if (editorDataList.size() != 1) {
			response.setResultCode(300);
			response.setMessageTitle("프로젝트 정보 실패");
			response.setMessageText("로딩 실패");
			response.setResult("error");
			return response;
		}else {
			response.setResultCode(100);
			response.setMessageTitle("프로젝트 정보 로딩");
			response.setMessageText("로딩 완료");
			response.setResult("success");
			response.setData(editorDataList.get(0).getData());
			return response;
		}
		
	}
	
	private Response sustainSession(A3MakerRequest a3Request){
		return null;
	}
	
	private Response saveProject(A3MakerRequest a3Request) throws Exception{
		Response response = new Response();
		EditorData editorData = new EditorData();
		editorData.setAbmsProjectNo(a3Request.getAbmsProjectNo());
		System.out.println(">>> [SaveProject  Editor Data]");
		System.out.println(a3Request.getData());
		try {
			ArrayList<EditorData> datas = this.editorDataDao.getEditorDatas(editorData);
			if (datas.size() != 1){
				response.setResultCode(600);
				response.setResult("error");
				response.setMessageText("잘못된 요청입니다");
			}else {
				editorData = datas.get(0);
				editorData.setData(a3Request.getData());
				
				/* EditorData 저장 */
				this.editorDataDao.updateEditorData(editorData);
				
				/* Editor Data 로 부터 각 페이지의 스크린샷 이미지 파일 생성 및 저장  */
				A3Context context = A3Context.buildContextFromJSON(a3Request.getData());
				String savePath = this.abmsFileManager.getSaveTypePath(SaveFileType.CAPTURE, a3Request.getAbmsProjectNo(), "");
				this.abmsFileManager.initDir(savePath);
				context.drawContext(savePath);
				
				/* EditorData 로 부터 Epub3 파일 생성 */
				/*
				String epubPath = this.abmsFileManager.getSaveTypePath(SaveFileType.EPUB, a3Request.getAbmsProjectNo(), "");
				System.out.println("---> 이펍 디렉토리");
				System.out.println(epubPath);
				System.out.println("");
				
				MetaInf metaInf = new MetaInf(epubPath);
				metaInf.write();
				
				//create MimeTpe  from A3maker data
				MimeType mimeType = new MimeType();
				mimeType.write(epubPath);
				
				//create OPF  from A3maker data
				new OEBPS(epubPath, editorData .getData()).write(null);
				
				
				ObjectMapper mapper = new ObjectMapper();	
				System.out.println("맵핑된 결과====================");
				System.out.println(mapper.writeValueAsString(context));
				*/
				response.setResultCode(100);
				response.setResult("success");
				response.setMessageText("저장되었습니다");
			}
		}catch(Exception e) {
			e.printStackTrace();
			response.setResultCode(600);
			response.setResult("error");
			response.setMessageText("변환 실패");
			throw e;
		}
		return response;
	}
	
	private Response loadPageTemplates(A3MakerRequest a3Request) {
		return null;
	}
	
	private Response loadClipArts(A3MakerRequest a3Request){
		return null;
	}
	
	private Response loadUserAssets(A3MakerRequest a3Request){
		return null;
	}
	
	private Response loadServiceAssets(A3MakerRequest a3Request){
		return null;
	}
	
	@SuppressWarnings("finally")
	private Response uploadResource(A3MakerRequest a3Request, HttpSession session) throws Exception{
		System.out.println("uploadResource 요청" );
		Response response = new Response();
		try {
			if (!a3Request.getAttach().isEmpty()){
				if (this.abmsFileManager.isAllowedImageFile(a3Request.getAttach().getOriginalFilename())) {
					MemberSession memberSession = (MemberSession)session.getAttribute("memberSession");
					MultipartFile file = a3Request.getAttach();
					int projectNo = a3Request.getAbmsProjectNo();
					
					String newFileName = abmsFileManager.creatNewFileName(a3Request.getAttach().getOriginalFilename());
					this.abmsFileManager.saveFile(SaveFileType.RESOURCES, projectNo, a3Request.getAttach(), newFileName);
					MemberResource memberResource = new MemberResource();
					
					String webPath = this.abmsFileManager.getWebPath(SaveFileType.RESOURCES, projectNo, newFileName);
					String filePath = this.abmsFileManager.getLocalPath(SaveFileType.RESOURCES, projectNo, newFileName);
					
					memberResource.setAbmsProjectNo(projectNo);
					memberResource.setMemberNo(memberSession.getMemberNo());
					memberResource.setFileSize(file.getSize());
					memberResource.setFileType("PNG");
					memberResource.setOrgFileName(a3Request.getAttach().getOriginalFilename());
					memberResource.setWebAccessPath(webPath);
					memberResource.setLocalAccessPath(filePath);
					memberResource.setNewFileName(newFileName);
					this.memberResourecDao.insertMemberResource(memberResource);
					
					response.setMessageTitle("리소스 업로드 ");
					response.setMessageText("리소스 업로드 처리 완료");
					response.setRequestCode(String.valueOf(a3Request.getApiCode()));
					response.setResultCode(100);
					response.setResult("success");
					response.setData(webPath);
					
					return response;
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			response.setResultCode(600);
			response.setMessageText(e.getMessage());
			response.setRequestCode(String.valueOf(a3Request.getApiCode()));
			response.setResult("error");
		}finally {
			return response;
		}
	}
	
	private Response loadUserInfo(A3MakerRequest a3Request){
		return null;
	}
	@RequestMapping(value = "/downloadResource", method = RequestMethod.GET)
	private ModelAndView downloadResource( @RequestParam int projectSeq, @RequestParam String fileName ){
		System.out.println("다운로드 요청 파일");
		System.out.println("프로젝트 번호 : " + projectSeq);
		System.out.println("다운로드 요청 파일 : " + fileName);
		String fName = fileName.substring(fileName.lastIndexOf("/") + 1);
		System.out.println("다운로드  파싱 파일 : " + fName);
		String fPath = this.abmsFileManager.getLocalPath(SaveFileType.RESOURCES, projectSeq, fName);
		System.out.println("다운로드 경로 조작 : " + fPath);
		File file = new File(fPath);
		return new ModelAndView("downloadView", "downloadFile", file);
	}
}
