<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
 <div  id ="epub_detail_content"   style="width:94%;height:100%;">
 	<div id ="epub_detail_content_layout"    data-options="fit:true">
 		<div  data-options="region:'west',split:true,border:false"  style="overflow:hidden;width:270px;padding:4px"  >
 			<div  id ="book_img"  >
 				<img style ="width : 100%;height:100%" src = " ${epubJoinCommand.coverFileWeb != null ? epubJoinCommand.coverFileWeb : '/epub/images/default_book_cover.png' }">
 			</div>
 		</div>

 		<div  data-options="region:'center',split:true,border:false"  style ="padding:10px;padding-top:15px;padding-left:20px" >
 			<table  id ="book_detail_grid" style="width:100%;" >
		        <thead>
		            <tr>
		                <th data-options="field:'itemName',width:20"></th>
		                <th data-options="field:'itemValue',width:100"></th>
		            </tr>
		        </thead>
		        
		        <tbody>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;제목</strong></td><td>&nbsp;${epubJoinCommand.epubTitle}</td>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;저자</strong></td><td>&nbsp;${epubJoinCommand.writer}</td>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;저자 설명</strong></td><td>&nbsp;${epubJoinCommand.writerDesc}</td>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;책 설명</strong></td><td >&nbsp;${epubJoinCommand.epubDesc}</td>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;해상도</strong></td><td>&nbsp;${epubJoinCommand.width} x ${epubJoinCommand.height}</td>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;파일 크기</strong></td><td>&nbsp;${epubJoinCommand.fileSize}</td>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;페이지 수</strong></td><td>&nbsp;${epubJoinCommand.totalPageCount}</td>
	        		<tr><td>&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;파일</strong></td><td>&nbsp;${epubJoinCommand.orgFileName}</td>
	    		</tbody>
   		 </table>
 		</div>
 	</div>
 </div>
 
 <script>
 	$('#book_detail_grid').datagrid({
 		fitColumns : true,
 		showHeader : false,
 		scrollbarSize : '0',
 		striped : true,
 		singleSelect:true,
 		collapsible:false,
 		border: true
 	});
 	$('#epub_detail_content').panel({ border : false });
 	$('#epub_detail_content_layout').layout({ border : false });
 </script>