package com.ahn.abms.web.controller;

import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.ahn.abms.a3.A3Context;
import com.ahn.abms.common.Constants.SaveFileType;
import com.ahn.abms.dao.interfaces.AbmsProjectDao;
import com.ahn.abms.dao.interfaces.AbmsProjectJoinCommandDao;
import com.ahn.abms.dao.interfaces.EditorDataDao;
import com.ahn.abms.dao.interfaces.MemberDao;
import com.ahn.abms.dto.AbmsProjectCreateForm;
import com.ahn.abms.dto.MemberSession;
import com.ahn.abms.dto.Response;
import com.ahn.abms.manager.AbmsFileManager;
import com.ahn.abms.model.AbmsProject;
import com.ahn.abms.model.AbmsProjectJoinCommand;
import com.ahn.abms.model.EditorData;
import com.ahn.abms.service.interfaces.AbmsConversionService;

@Controller
@SessionAttributes("modifyEpubModel")
public class AbmsController extends ApplicationController {

	public static class AccessPoint {
		public static final String SUBMB_LOGIN = "/";
		public static final String CONTENT = "/content";
		public static final String UPLOAD_ABMS_CONVERSION_FILE = "/uploadAbmsConversionFile";
		public static final String ABMS_PROJECT_DETAIL = "/abmsProjectDetail";
		public static final String ABMS_PROEJCT_DETAIL2 = "/abmsProjectDetail2";
		public static final String LIST_ABMS_PROJECT = "/listAbmsProject";
		public static final String DELETE_ABMS_PROJECT = "/deleteAbmsProject";
		public static final String CREATE_ABMS_PROJECT = "/createAbmsProject";
	}

	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

	@Autowired
	private ServletContext servletContext;
	@Autowired
	private AbmsConversionService conversionService;

	@Autowired
	private MemberDao memberDao;
	@Autowired
	private AbmsFileManager abmsFileManager;;
	@Autowired
	private AbmsProjectDao abmsProjectDao;
	@Autowired
	private EditorDataDao editorDataDao;
	@Autowired
	private AbmsProjectJoinCommandDao abmsProjectJoinCommandDao;

	@RequestMapping(value = AbmsController.AccessPoint.SUBMB_LOGIN, method = RequestMethod.GET)
	public String submitLogin(HttpServletRequest request, HttpSession httpSession, Model model) {
		model.addAttribute("memberSession", (MemberSession) httpSession.getAttribute("memberSession"));
		return Forward.MAIN_VIEW;
	}

	@RequestMapping(value = AbmsController.AccessPoint.CONTENT, method = RequestMethod.GET)
	public String content(@RequestParam(value = "reqCode", required = true, defaultValue = "intro") String reqCode,
			Model model) {
		model.addAttribute("reqCode", reqCode);
		return Forward.CONTENT_VIEW;
	}

	@RequestMapping(value = AbmsController.AccessPoint.UPLOAD_ABMS_CONVERSION_FILE, method = RequestMethod.POST)
	@ResponseBody
	public Response uploadAbmsResouceFile(
			@RequestParam(value = "addConvertFileAbmsProjectNo", required = true) int abmsProjectNo,
			@RequestParam(value = "uploadFileType", required = true) String uploadFileType,
			@RequestParam(value = "uploadFile", required = true) MultipartFile uploadFile,
			HttpServletResponse httpServletResponse) {
		System.out.println("추가 파일 업로드  " + abmsProjectNo);
		Response response = new Response();
		if (!this.abmsFileManager.isAllowedConvertFile(uploadFile.getOriginalFilename())) {
			response.setResultCode(400);
			response.setResult("error");
			response.setMessageTitle("파일 업로드 에러");
			response.setMessageText("해당 확장자의 파일은 업로드 및 변환할 수 없습니다.");
		} else {
			// 파일을 변환하는 작업 추가
		}
		return response;
	}

	@RequestMapping(value = AbmsController.AccessPoint.ABMS_PROJECT_DETAIL, method = RequestMethod.GET)
	public String abmsProjectDetail(@RequestParam(value = "abmsProjectNo", required = true) int abmsProjectNo, Model model) {
		AbmsProjectJoinCommand condition = new AbmsProjectJoinCommand();
		condition.setAbmsProjectNo(abmsProjectNo);
		try {
			AbmsProjectJoinCommand data = this.abmsProjectJoinCommandDao.getAbmsProjectJoinCommands(condition).get(0);
			model.addAttribute("abmsProjectJoinCommand", data);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return Forward.EPUB_DETAIL_VIEW;
	}

	@SuppressWarnings("finally")
	@RequestMapping(value = AbmsController.AccessPoint.ABMS_PROEJCT_DETAIL2, method = RequestMethod.GET)
	@ResponseBody
	public Response abmsProjectDetail2(@RequestParam(value = "abmsProjectNo", required = true) int abmsProjectNo, Model model) {
		Response response = new Response();
		System.out.println("상세 요청 프로젝트 : " + abmsProjectNo);
		response.setResultCode(100);
		response.setResult("success");
		response.setMessageTitle("Project 상세 정보");
		response.setMessageText("Project 상세 정보");
		response.setRequestCode("Project Detail");
		try {
			AbmsProjectJoinCommand condition = new AbmsProjectJoinCommand();
			condition.setAbmsProjectNo(abmsProjectNo);
			response.setData(this.abmsProjectJoinCommandDao.getAbmsProjectJoinCommands(condition).get(0));
		} catch (Exception e) {
			e.printStackTrace();
			response.setResultCode(300);
			response.setResult("error");
			response.setMessageText("PROJECT 상세 정보 요청 에러");
			response.setMessageTitle("PROJECT 상세 정보 요청 에러");
		} finally {
			return response;
		}
	}

	@RequestMapping(value = AbmsController.AccessPoint.LIST_ABMS_PROJECT, method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<AbmsProject> listAbmsProject(
			@RequestParam(value = "pageNo", required = false, defaultValue = "1") int pageNo,
			HttpServletResponse httpServletResponse) {
		this.setReponseJsonHeader(httpServletResponse);
		try {
			AbmsProject condition = new AbmsProject();
			ArrayList<AbmsProject> projects = this.abmsProjectDao.getAbmsProjects(condition);
			System.out.println("프로젝트 갯수 " + projects.size());
			return projects;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings("finally")
	@RequestMapping(value = AbmsController.AccessPoint.DELETE_ABMS_PROJECT, method = RequestMethod.POST)
	@ResponseBody
	public Response deleteAbmsProject(@RequestParam(value = "abmsProjectNo", required = true) int abmsProjectNo,
			HttpServletResponse httpServletResponse) {
		this.setReponseJsonHeader(httpServletResponse);
		System.out.println("PROJECT 제거 : " + abmsProjectNo);
		Response response = new Response();

		AbmsProject condition = new AbmsProject();
		condition.setAbmsProjectNo(abmsProjectNo);

		EditorData eCond = new EditorData();
		eCond.setAbmsProjectNo(condition.getAbmsProjectNo());
		try {
			this.abmsProjectDao.deleteAbmsProject(condition);
			if (this.editorDataDao.getEditorDatas(eCond).size() > 0) {
				this.editorDataDao.deleteEditorData(eCond);
			}

			response.setResultCode(100);
			response.setMessageText("PROECT가  삭제되었습니다.");
			response.setMessageTitle("PROJECT 삭제");
		} catch (Exception e) {
			response.setResultCode(200);
			response.setMessageText("PROJECT를  삭제중 오류가 발생했습니다.");
			response.setMessageTitle("PROJECT 삭제 오류");
			e.printStackTrace();
		} finally {
			return response;
		}
	}

	@RequestMapping(value = AbmsController.AccessPoint.CREATE_ABMS_PROJECT, method = RequestMethod.POST)
	@ResponseBody
	public Response createAbmsProject(@ModelAttribute AbmsProjectCreateForm createForm,
			HttpServletResponse httpServletResponse, HttpSession session) {

		this.setReponseJsonHeader(httpServletResponse);
		Response response = new Response();
		response.setRequestCode(createForm.getAction());
		System.out.println(createForm.getAction());
		try {

			if (createForm.getAction().equals("CREATE")) {
				MemberSession memberSession = (MemberSession) session.getAttribute("memberSession");
				AbmsProject project = new AbmsProject();
				System.out.println("프로젝트 생성 유저 번호  : " + memberSession.getMemberNo());
				project.setMemberNo(memberSession.getMemberNo());
				project.setProjectWidth(createForm.getProjectWidth());
				project.setProjectHeight(createForm.getProjectHeight());
				project.setProjectStatus("NORMAL");
				project.setPublicStatus("Y");
				project.setWriter(createForm.getWriter());
				project.setWriterDesc(createForm.getWriterDesc());
				project.setProjectTitle(createForm.getProjectTitle());
				project.setProjectDesc(createForm.getProjectDesc());

				String newFileName = "";
				
				/* 프로젝트 Cover File 생성 및 저장 */
				if (!createForm.getCoverImageFile().isEmpty()) {
					if (this.abmsFileManager.isAllowedImageFile(createForm.getCoverImageFile().getOriginalFilename())) {
						newFileName = abmsFileManager.creatNewFileName(createForm.getCoverImageFile().getOriginalFilename());
						project.setCoverFileOrgName(createForm.getCoverImageFile().getOriginalFilename());
						project.setCoverFileNewName(newFileName);
						project.setCoverFileWebPath(abmsFileManager.getWebPath(SaveFileType.COVER_IMAGE,  project.getAbmsProjectNo(), newFileName));
						project.setCoverFileLocalPath(abmsFileManager.getLocalPath(SaveFileType.COVER_IMAGE, project.getAbmsProjectNo(), newFileName));
						this.abmsFileManager.saveFile(SaveFileType.COVER_IMAGE, project.getAbmsProjectNo(), createForm.getCoverImageFile(), newFileName);
						System.out.println("이미지 웹 경로 : " + project.getCoverFileWebPath());
					}
				}
				/* 프로젝트 정보 insert*/
				this.abmsProjectDao.insertAbmsProject(project);

				/*
				 * 프로젝트 신규 생성시 기본 EditorData 생성 및 Insert
				 */
				EditorData editorData = new EditorData();
				editorData.setAbmsProjectNo(project.getAbmsProjectNo());
				editorData.setType("JSON");

				createForm.setAbmsProjectNo(project.getAbmsProjectNo());
				A3Context context = A3Context.newContext(createForm);
				ObjectMapper mapper = new ObjectMapper();

				editorData.setData(mapper.writeValueAsString(context));
				System.out.println(">>> 프로젝트 생성시 기본 에디터 데이");
				System.out.println(mapper.writeValueAsString(context));

				this.editorDataDao.insertEditorData(editorData);

				response.setReserved1(project.getAbmsProjectNo());
				response.setResultCode(100);
				response.setMessageText("프로젝트가  생성되었습니다.");
				response.setReserved1(project.getAbmsProjectNo());
				response.setMessageTitle("프로젝트  생성");

				/*
				 * 프로젝트 생성시 변환 업로드 파일이 존재하면, 파일을 EPUB으로 변환후, 프로젝트 데이타에 추가
				 */
				if (!createForm.getConvertFile().isEmpty()) {
					if (this.abmsFileManager.isAllowedConvertFile(createForm.getConvertFile().getOriginalFilename())) {
						if (createForm.getConvertFileAttach().equals("Y")) {
							this.conversionService.conversion(createForm.getConvertFile());
						}
					} else {
						// response.setMessageText("EPUB이 생성되었으나, 변환 파일이 적절치
						// 않습니다. .");
					}
				}
			} else if (createForm.getAction().equals("MODIFY")) {
				AbmsProject project = new AbmsProject();
				project.setAbmsProjectNo(createForm.getAbmsProjectNo());
				AbmsProject targetProject = this.abmsProjectDao.getAbmsProjects(project).get(0);

				targetProject.setProjectTitle(createForm.getProjectTitle());
				targetProject.setWriter(createForm.getWriter());
				targetProject.setWriterDesc(createForm.getWriterDesc());
				targetProject.setProjectDesc(createForm.getProjectDesc());

				String newFileName = "";
				if (!createForm.getCoverImageFile().isEmpty()) {
					newFileName = abmsFileManager.creatNewFileName(createForm.getCoverImageFile().getOriginalFilename());
					targetProject.setCoverFileOrgName(createForm.getCoverImageFile().getOriginalFilename());
					targetProject.setCoverFileNewName(newFileName);
					targetProject.setCoverFileWebPath(abmsFileManager.getWebPath(SaveFileType.COVER_IMAGE,targetProject.getAbmsProjectNo(), newFileName));
					targetProject.setCoverFileLocalPath("");
				}

				this.abmsProjectDao.updateAbmsProject(targetProject);
				this.abmsFileManager.saveFile(SaveFileType.COVER_IMAGE, targetProject.getAbmsProjectNo(), createForm.getCoverImageFile(), newFileName);
				/*
				 * EditorData update
				 */
				EditorData editorCondition = new EditorData();
				editorCondition.setAbmsProjectNo(createForm.getAbmsProjectNo());
				ArrayList<EditorData> editorDatas = this.editorDataDao.getEditorDatas(editorCondition); 
				if (editorDatas.size() > 0) {
					EditorData editorData = editorDatas.get(0);
					JSONParser jsonParser = new JSONParser();
					JSONObject data = (JSONObject) jsonParser.parse(editorData.getData());
					((JSONObject) data.get("project")).put("projectName", createForm.getProjectTitle());
					((JSONObject) data.get("project")).put("projectDesc", createForm.getProjectDesc());
					((JSONObject) data.get("header")).put("writer", createForm.getWriter());
					((JSONObject) data.get("header")).put("writerDesc", createForm.getWriterDesc());
					System.out.println(data);
					editorData.setData(data.toString());
					this.editorDataDao.updateEditorData(editorData);
				}

				response.setResultCode(100);
				response.setMessageText("EPUB이 수정되었습니다.");
				response.setMessageTitle("EPUB 수정");
				response.setReserved1(createForm.getAbmsProjectNo());
			}
			return response;

		} catch (Exception e) {
			response.setResultCode(200);
			response.setMessageText("EPUB 작업중 에러 발생");
			response.setMessageTitle("EPUB 에러");
			e.printStackTrace();
			return response;
		}
	}
}
