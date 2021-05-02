package com.ahn.abms.web.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ahn.abms.dto.MemberSession;

public class ApplicationController {
	public class Forward{
		public static final String LOGIN_VIEW 						= "user/login";
		public static final String LOGIN_FAIL_VIEW 				= "user/loginFail";
		public static final String LOGIN_SUCCESS_VIEW			= "user/loginSuccess";
		public static final String MAIN_VIEW						= "main/main";
		public static final String CONTENT_VIEW					= "main/content";
		public static final String EPUB_DETAIL_VIEW         = "template/epubDetailView";
		public static final String EPUB_MODIFY_VIEW 		 = "template/epubModifyView";
	}
	
	public class Redirect {
		public static final String MAIN_REDIRECT 				= "redirect:/" ;
		public static final String LOGIN_REDIRECT             ="redirect:/login" ;
	}
	
	public class ResultCode {
		public static final int SUCCESS = 1;
		public static final int ERROR = 2;
	}
	
	@Inject protected HttpSession session;
	protected MemberSession prepareMemberSession(){
		return (MemberSession)session.getAttribute("memberSession");
	}
	
	public void setReponseHeader(HttpServletResponse httpServletResponse, String headerName, String headerValue){
		httpServletResponse.setHeader(headerName, headerValue);
	}
	
	public void setReponseJsonHeader(HttpServletResponse httpServletResponse){
		this.setReponseHeader(httpServletResponse,"Content-Type", "text/html; charset=UTF-8");
	}
}
