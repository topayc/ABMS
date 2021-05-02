<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="easyui-panel" title="EPUB 생성"  data-options = "border : false" style="padding:20px;width : 100%;height : 100%;">
	 <form id="epub_modify_form"   name = "epub_modify_form" method="post" action = "<c:url value='/epubModify'/>">
        <div style="margin-bottom:10px">
            <input class="easyui-textbox" id ="epubTitle"  name="epubTitle" style="width:100%" data-options="label:'제목',labelPosition : 'top'">
        </div>
        <div class="easyui-panel"    data-options = "border : false" style="width : 100%;margin-bottom:10px">
            <div style="float : left;width:48%">
            	 <input class="easyui-textbox" id ="width"  name="width" style="width:95%" data-options="label:'Width',labelPosition : 'top'">
            </div>
            <div style="float : left;"> </div>
            <div style="float : left;width:48%;position:absolute;right:9px">
            	 <input class="easyui-textbox" id ="height"  name="height" style="width:95%;" data-options="label:'Height',labelPosition : 'top'">
            </div>
        </div>

         <div style="margin-bottom:10px">
            <input class="easyui-textbox" id = "writer"   name="writer" style="width:100%" data-options="label:'저자',labelPosition : 'top'">
        </div>
        
         <div style="margin-bottom:10px">
            <input class="easyui-textbox" id="writerDesc"  name="writerDesc" style="width:100%;height:100px" data-options="label:'저자 설명',multiline:true,labelPosition : 'top'">
        </div>
        
        <div style="margin-bottom:10px">
            <input class="easyui-textbox" id="epubDesc"  name="epubDesc" style="width:100%;height:100px" data-options="label:'북 설명',multiline:true,labelPosition : 'top'">
        </div>
        <input type ="hidden" id = "fileAttach" name="fileAttach" value = "N">
        
       
    </form>
	<div style="text-align:right;padding:1px 0">
        <a href="javascript:void(0)" class="easyui-linkbutton" data-options = "iconCls: 'icon-ok', plain : false" onclick="submitEpubForm()" style="width:80px">확인</a>
        <a href="javascript:void(0)" class="easyui-linkbutton"  onclick="clearEpubForm()" style="width:80px">취소</a>
  	</div>
</div>