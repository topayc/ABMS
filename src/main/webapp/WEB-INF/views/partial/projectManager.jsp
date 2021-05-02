<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="easyui-layout" data-options="fit:true,border:true,split:true">
	<div  data-options="region:'south',split:true"  id = "project_detail_container"  style ="height:38%" title ="이북 상세 정보" >
		<div  id ="project_detail_content"   style="width:100%;height:100%;display:none" >
			<div id ="project_detail_content_layout"    data-options="fit:true">
				<div  data-options="region:'west',split:true,border:false"  style="overflow:hidden;width:20%;padding:4px"  >
					<div  >
						<img id ="project_img" style ="width : 100%;height:100%">
					</div>
				</div>
		
				<div  data-options="region:'center',split:true,border:true"  >
					<table  id ="project_detail_grid" style="width:100%;height : 100%" >
		  		 </table>
				</div>
			</div>
		</div>
	</div>
	<div  data-options="region:'center',split:true,border:true"  >
			<table id = "epub_list_grid" style ="width:100%"></table>
	</div>
</div>

<div id="abmsProjectFormWnd" style ="padding:5px">
	<div style = "padding:10px;padding-top:5px;padding-bottom:5px" >
	<!-- 
	  <p class = "blue_message" style="margin-bottom:20px;"> <strong>*&nbsp;새로운 프로젝트 생성시 1개의 파일만 첨부가능하며, 이후 추가 파일을 연결할 수 있습니다 </strong> </p>
	   --> 
	   <form id="abmsProjectForm"  enctype="multipart/form-data" name = "abmsProjectForm" method="post" action = "<c:url value='/createAbmsProject'/>">
			<div style="margin-bottom:10px">
			    <input class="easyui-textbox" id ="projectTitle"  name="projectTitle" style="width:100%" data-options="label:'프로젝트 타이틀 ',labelPosition : 'top'">
			</div>
	
			<div class="easyui-panel"    data-options = "border : false" style="width : 100%;margin-bottom:10px">
			    <div style="float : left;width:48%">
			    	 <input class="easyui-textbox" id ="projectWidth"  name="projectWidth" style="width:95%" data-options="label:'가로(pixel)',labelPosition : 'top'">
			    </div>
			    <div style="float : left;"> </div>
			    <div style="float : left;width:48%;position:absolute;right:9px">
			    	 <input class="easyui-textbox" id ="projectHeight"  name="projectHeight" style="width:95%;" data-options="label:'세로(pixel)',labelPosition : 'top'">
			    </div>
			</div>
			
			<div style="margin-bottom:10px">
			    <input class="easyui-textbox" type = "text"  id  = "coverImageFile" name="coverImageFile"   style="width:100%" data-options="label:'기본 표지 이미지',labelPosition : 'top'">
			</div>
			
			<div class="easyui-panel"    data-options = "border : false" style="width : 100%;margin-bottom:10px">
			    <div style="float : left;width:43%">
			   		 <input  id = "convertFileType" name = "convertFileType" style="width:100%" />
			    	  
			    </div>
			    <div style="float : left;"> </div>
			    <div style="float : left;width:48%;position:absolute;right:20px">
			    	<input class="easyui-textbox" type = "text"  id  = "convertFile" name="convertFile"   style="width:100%" data-options="label:'변환 파일',labelPosition : 'top'">
			    </div>
			</div>
			
	
			
			 <div style="margin-bottom:10px">
			    <input class="easyui-textbox" id = "writer"   name="writer" style="width:100%" data-options="label:'저자',labelPosition : 'top'">
			</div>
			
			 <div style="margin-bottom:10px">
			    <input class="easyui-textbox" id="writerDesc"  name="writerDesc" style="width:100%;height:70px" data-options="label:'저자 설명',multiline:true,labelPosition : 'top'">
			</div>
			
			<div >
			    <input class="easyui-textbox" id="projectDesc"  name="projectDesc" style="width:100%;height:70px" data-options="label:'프로젝트  상세 ',multiline:true,labelPosition : 'top'">
			</div>
			<input type ="hidden" id = "convertFileAttach" name="convertFileAttach" value = "N">
			<input type ="hidden" id = "abmsProjectNo" name="abmsProjectNo" value = "0">
			<input type ="hidden" id = "action" name="action" value = "CREATE">
		</form>
	</div>
</div>

<div id="addConvertFileUploadWnd" style ="padding:30px]">
	<div style = "padding:15px" >
	  <p class = "blue_message" style="margin-bottom:20px">
	  	<strong>*&nbsp;A3Editor Format으로 변환되어, 프로젝트에 추가됩니다.  </strong>
	  </p>
	 <form  id="add_convert_file_upload_form"  name = "add_convert_file_upload_form"  enctype="multipart/form-data" method="post" action = "<c:url value='/ç'/>">
		<div style="margin-bottom:20px">
			<input  id = "addConvertFileType" name = "addConvertFileType" style="width:100%" />
		</div>
		<div style="margin-bottom:20px">
		    <input class="easyui-textbox" type = "text"  id  = "addConvertFile" name="addConvertFile"   style="width:100%" data-options="label:'변환 파일',labelPosition : 'top'">
		</div>
		<input type ="hidden" id = "addConvertFileAbmsProjectNo" name="addConvertFileAbmsProjectNo" value = "0">
	</form>
	</div>
</div>

<div id = "mm" style="width: 260px;">
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-viewer'">EPUB3 Viewer로 열기</div>
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-undo'" onclick = "openAbmsEditor()">EPUB3 Editor로 수정</div>
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-add'" onclick="openConvertFileUploadWnd()">변환 파일 추가</div>
	<div style ="margin-bottom: 1px" class="menu-sep"></div>
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-text_edit'" onclick="openAbmsFormWnd('MODIFY')">EPUB 프로젝트 수정</div>
	<div style ="margin-bottom: 1px" class="menu-sep"></div>
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-trash'" onclick="deleteAbmsProject()">EPUB 프로젝트 삭제</div>
	<div style ="margin-bottom: 1px" class="menu-sep"></div>
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-download_arrow'">EPUB 다운로드</div>
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-download_arrow'">원본 파일 다운로드</div>
	<div style ="margin-bottom: 1px" data-options="iconCls:'icon-redo'">ABMS format(JSON) 으로 내보내기</div>
</div>

<script src="js/${reqCode}.js"></script>
<script> 

</script>

