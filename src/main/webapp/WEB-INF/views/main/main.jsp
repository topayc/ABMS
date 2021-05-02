<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Expires" content="-1"> 
  <meta http-equiv="Pragma" content="no-cache"> 
  <meta http-equiv="Cache-Control" content="No-Cache"> 
  <title>ABMS System | Main</title>
  <link rel="stylesheet" type="text/css" href="themes/gray/easyui.css">
  <link rel="stylesheet" type="text/css" href="themes/icon.css">
  <link rel="stylesheet" type="text/css" href="themes/color.css">
  <link rel="stylesheet" type="text/css" href="css/default.css">
  <!--  
  <link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
  -->
    <link type="text/css" rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
  <!--  
  <link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
  -->
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/jquery.easyui.min.js"></script>
  <script type="text/javascript" src="js/easyui_helper.js"></script>
  <script src="js/utils.js"></script>
  <script src="js/main.js"></script>
   <style type="text/css">
  	.blue_message {font-weight:bold;font-family:Gulim;font-size:12px;color:#1f637b}
  </style>
</head>
<body>
    <div class="container easyui-layout"  style="width:100%">
        <div data-options="region:'north',border : true" style="height:30px;" >
        	<div style="position: absolute;right : 0px;margin-top:6px;margin-right:25px" class ="member-panel">
        		<span style ="font-weight: bold">${memberSession.memberId} (${memberSession.memberType})</span>
        		<a href ="#" id = "pass_chn_btn" request_form= "user_form"  style ="margin-left : 30px;font-weight: bold">PASSWORD</a>
				<a href ="logout" style ="margin-left : 10px;font-weight: bold">LOGOUT</a>
			</div>
        </div>
        <div data-options="region:'south',split:false" style="height:1px;"></div>
        <div data-options="region:'west',split:true" title="&nbsp;ABMS CONTROL " style="width:220px;">
        	<ul id = "menu_tree" class="easyui-tree" style ="margin : 5px;margin-top : 10px" >
	            <li id ="root_node">
	                <span><span class= "sub_menu"  req_code= "intro"><strong >&nbsp;ABMS</strong></span></span>
	                <ul>
	                	 <li data-options = "iconCls :'icon-info'"><a class= "sub_menu"  req_code= "intro" ><span>&nbsp;ABMS 및 A3Editor 소개</span></a></li>
	                     <li data-options = "iconCls :'icon-manage'"><a class= "sub_menu"  req_code= "projectManager" ><span>&nbsp;프로젝트 관리</span></a></li>
<c:if test = "${memberSession.memberType == 'SUPER' }">
	                     <li data-options = "iconCls :'icon-sol'"><a class= "sub_menu"  req_code= "pacakageManager" ><span>&nbsp;프로젝트 패키징/전송</span></a></li>
	                     <li data-options = "iconCls :'icon-config_2'"><a class= "sub_menu"  req_code= "editorConfigManager" ><span>&nbsp;A3Editor 설정</span></a></li>
	                     <li data-options = "iconCls :'icon-config'"><a class= "sub_menu"  req_code= "sysConfigManager" ><span>&nbsp;ABMS/A3 Viewer 설정</span></a></li>
		                 <li data-options = "iconCls :'icon-connect'"><a class= "sub_menu"  req_code= "remoteClientManager" ><span>&nbsp;외부 클라이언트 관리</span></a></li>
		                 <li data-options = "iconCls :'icon-log'"><a class= "sub_menu"  req_code= "abmsLogManager" ><span>&nbsp;ABMS 로그</span></a></li>
		                 <li data-options = "iconCls :'icon-user'"><a class= "sub_menu"  req_code= "memberManager" ><span>&nbsp;계정 관리</span></a></li>
</c:if>
	                </ul>
	            </li>
        	</ul>
        </div>
        <div id="content_container"  data-options="region:'center'" title="&nbsp;&nbsp;" style="padding:5px">
        </div>
    </div>
</body>
</html>
