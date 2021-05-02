package com.ahn.abms.web.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ahn.abms.dto.Response;

@Controller
@RequestMapping(value = "/transmission")
public class TransmissionController {
	
	/**
	 * 전송 요청을 위한 폼 요청
	 * @param epubNo
	 * @param httpServletResponse
	 * @return
	 */
	@RequestMapping(value = "/reqTransmisttion", method = RequestMethod.GET)
	public String reqTransmisttionForm( 
			@RequestParam(value = "epubNo", required = true) int epubNo,
			HttpServletResponse httpServletResponse) {
		return null;
	}	
	
	/**
	 * 전송 요청 처리 (디폴트로 asyc 처리)
	 * @param epubNo
	 * @param httpServletResponse
	 * @return
	 */
	@RequestMapping(value = "/reqTransmisttion", method = RequestMethod.POST)
	@ResponseBody
	public Response reqTransmisttion( 
			@RequestParam(value = "epubNo", required = false, defaultValue = "0") int epubNo,
			@RequestParam(value = "epub_title", required = false, defaultValue = "") String epub_title,
			@RequestParam(value = "async", required = false, defaultValue = "Y") String async,
			@RequestParam(value = "reqUKey", required = true) String reqUUID,
			
		HttpServletResponse httpServletResponse) {
		Response response = new Response();
		return response;
	}	
}
