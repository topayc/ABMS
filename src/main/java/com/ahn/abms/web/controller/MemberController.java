package com.ahn.abms.web.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ahn.abms.common.SubmitAction;
import com.ahn.abms.dao.interfaces.MemberDao;
import com.ahn.abms.dto.MemberSession;
import com.ahn.abms.dto.Response;
import com.ahn.abms.model.Member;

@Controller
public class MemberController extends ApplicationController{
	
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	@Autowired private MemberDao memberDao;
	
	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(Locale locale, Model model) {
		return "member/login";
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public String submitLogin(
			@RequestParam String memberId,
			@RequestParam String memberPassword,
			HttpServletRequest request, HttpSession httpSession, Model model) {
		
		if (memberId == null || memberPassword == null) {
			model.addAttribute("message", "잘못된 요청입니다");
			return Forward.LOGIN_VIEW;
		}else {
			Member memberCondition = new Member();
			memberCondition.setMemberId(memberId);
			memberCondition.setMemberPassword(memberPassword);
			ArrayList<Member> members = this.memberDao.getMembers(memberCondition);
			
			if (members.size() < 1 || members.size() > 1) {
				model.addAttribute("message", "아이디 혹은 비밀번호가 잘못되었습니다");
				return Forward.LOGIN_VIEW;
			}else {
				Member member = members.get(0);

				MemberSession memberSession = new MemberSession();
				memberSession.setMemberNo(member.getMemberNo());
				memberSession.setMemberId(member.getMemberId());
				memberSession.setMemberName(member.getMemberName());
				memberSession.setLoginTime(new Date());
				memberSession.setRemoteIp(request.getRemoteAddr());
				memberSession.setMemberType(member.getMemberType());
				httpSession.setAttribute("memberSession", memberSession);
				return Redirect.MAIN_REDIRECT;
			}
		}

		/*
		ObjectMapper mapper = new ObjectMapper();

		try {
			System.out.println("Transfer Json mapper");
			System.out.println(mapper.writeValueAsString(userSession));
		} catch (Exception e) {
		}
		*/
	}	
	
	@RequestMapping(value = "/getMembers", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Member> getUser(@RequestParam(value = "memberNo", required = false, defaultValue = "0") int memberNo) {
		Response response = new Response();
		response.setRequestCode("getMembers");
		Member memberCondition = new Member();
		if (memberNo != 0) {
			memberCondition.setMemberNo(memberNo);
		} 
		return this.memberDao.getMembers(memberCondition);
	}
	
	@RequestMapping(value = "/logout")
	public String logout(HttpSession httpSession, Model model) {
		httpSession.removeAttribute("memberSession");
		return Redirect.LOGIN_REDIRECT;
	}
	
	@RequestMapping(value = "/submitMemberForm", method = RequestMethod.POST)
	@ResponseBody
	public Response submitUserForm(
			@RequestParam(value = "memberId",required = false) String memberId,
			@RequestParam(value = "memberName",required = false)  String memberName,
			@RequestParam(value = "memberPassword",required = false)  String memberPassword,
			@RequestParam(value = "submitAction",required = false)  String submitAction,
			@RequestParam(value = "memberNo",required = false)  int memberNo) throws Exception {
		System.out.println(submitAction);
		System.out.println(memberId);
		System.out.println(memberPassword);
		System.out.println(memberNo);
		String action = SubmitAction.valueFrom(submitAction).value();
		Response response = new Response();
		response.setRequestCode(submitAction);
		response.setResultCode(100);
		response.setMessageTitle("사용자 " + action);
		response.setMessageText("잘 처리되었습니다.");
		
		Member member = null;
		Member memberCondition = new Member();
		if (submitAction.equals("CREATE")) {
			member = new Member();
			member.setMemberId(memberId);
			member.setMemberPassword(memberPassword);
			member.setMemberName(memberName);
			member.setMemberType("COMMON");
			response.setMessageText("사용자 계정이 생성되었습니다. ");
			this.memberDao.insertMember(member);
		}else if (submitAction.equals("MODIFY")){
			memberCondition.setMemberNo(memberNo);
			ArrayList<Member> members =  this.memberDao.getMembers(memberCondition);
			
			if (members.size() !=1) {
				response.setRequestCode(submitAction);
				response.setResultCode(200);
				response.setMessageTitle("사용자 " + action);
				response.setMessageText("처리중 에러 발생 : 잘못된 요청");
				return response;
			}
			
			Member targetMember = members.get(0);
			targetMember.setMemberId(memberId);
			targetMember.setMemberPassword(memberPassword);
			targetMember.setMemberName(memberName);
			targetMember.setMemberType("COMMON");
			response.setMessageText("사용자 계정이 변경되었습니다. ");
			this.memberDao.updateMember(targetMember);
			
		}else if (submitAction.equals("DELETE")){
			memberCondition.setMemberNo(memberNo);
			response.setMessageText("사용자 계정이 삭제되었습니다. ");
			this.memberDao.deleteMember(memberCondition);
		}else {
			response.setRequestCode(submitAction);
			response.setResultCode(200);
			response.setMessageTitle("사용자 " + action);
			response.setMessageTitle("처리중 에러 발생");
		}
		return response;
	}
}
