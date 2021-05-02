<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id = "epub_package_container" >
	<div data-options="region:'south',split:true,border: true,collapsible:true"  style = "height: 50%" title = "전송 및 패키징 설정" >
		<div id = "transfer_container" >
			<div   data-options="region:'west',split:true,border:false" style="padding:20px;width : 50%;height : 100%;" >
				<div  id= "transfer_list_panel" style="margin-bottom:10px;height : 150px;width:100%"></div>
				<form style = "padding: 0px" id="packaging_form"  enctype="multipart/form-data" name = "epub_form" method="post" action = "<c:url value='/createEpub'/>">
				   <div style="margin-bottom:10px">
				       <input class="easyui-textbox" id ="transferType"  name="transferType" style="width:100%" data-options="label:'&nbsp;전송 타입',labelPosition : 'top'">
				   </div>
				   
				   <div style="margin-bottom:10px">
				      <input class="easyui-textbox" id ="remoteIp"  name="remoteIp" style="width:100%" data-options="label:'&nbsp;전송 서버 IP (xxx.xxx.xxx.xxx)',labelPosition : 'top'">
				   </div>
				   
				   <div style="margin-bottom:10px">
				    	   <input class="easyui-textbox" id ="targetPort"  name="targetPort" style="width:100%" data-options="label:'&nbsp;전송 서버 Port',labelPosition : 'top'">
				   </div>
				    <div style="margin-bottom:10px">
				       <input class="easyui-textbox" id ="targetId"  name="targetId" style="width:100%" data-options="label:'&nbsp;계정 ID',labelPosition : 'top'">
				   </div>
				    <div style="margin-bottom:10px">
				       <input class="easyui-textbox" id ="targetPassword"  name="targetPassword" style="width:100%" data-options="label:'&nbsp;계정 비밀번호',labelPosition : 'top'">
				   </div>
				
					<div style="text-align:right;padding:1px 0">
				      <a href="javascript:void(0)" class="easyui-linkbutton"  id = "confirm_btn" data-options = "iconCls: 'icon-ok', plain : false" onclick="submitPackageForm()" style="width:80px">전송</a>
				      <a href="javascript:void(0)" class="easyui-linkbutton"  id = "clear_btn"  onclick="clearEpubForm()" style="width:80px">취소</a>
				  </div>
				 </form>
			</div>
			
			<div   data-options="region:'center',split:true,border:false" style="padding:7px;width : 50%;height : 100%;" > </div>
			
		</div>
	</div>
	
	<div  data-options="region:'center',split:true,border:true"  style="width:100%;height:20%"   >
		<table id = "package_abms_project_list" style ="width:100%"></table>
	</div>

</div>
<script>
	function projectSizeFormatter(value,row,index){
		return row.projectWidth + " x " + row.projectHeight;
	}

	$('#epub_package_container').layout({
		fit:true,
		border: false
	});

	$('#transfer_container').layout({
		fit:true,
		border:false,
		split : false
	});
	$('#transfer_list_panel').panel({
		title : "선택한 전송 목록 ",
		collapsible:true,
		border : true
	});
	$('#transfer_list_panel').panel('destroy');
	$('.easyui-panel').panel();
	$('.packaging_form').form();
	$('.easyui-textbox').textbox(
			
			{
				iconAlign : 'left',
				/*
				icons: [{
					iconCls:'icon-add',
					handler: function(e){
						//$(e.data.target).textbox('setValue', 'Something added!');
					}
				}]
			*/
			}		
	);
	$('.easyui-linkbutton').linkbutton();
	
	$('#package_abms_project_list').datagrid({
		rownumbers:true,
		showHeader : true,
		selectOnCheck : false,
		checkOnSelect : false,
		striped : true,
		//title : "패키징 이북 리스트 ",
		singleSelect:false,
		collapsible:false,
		fitColumns:true,
		url : '/abms/listAbmsProject',
		method : "get",
		toolbar: [{
			iconCls: "fa fa-refresh fa-lg icon-center" ,
			position : "right",
			handler: function(){	$('#package_abms_project_list').datagrid('reload');}
		}
		
		],
		
		onSelect : function(index, row) {
			$(this).datagrid('unselectRow', index);
			var epubNo = row.epubNo;
			var epubTitle = row.epubTitle;
		},
		
		border:false,
	    columns:[[
	      {field:'check',width:30,align:'left',title : '선택',checkbox : true},
	      {field:'abmsProjectNo',width:20,align:'left',title : 'aNo',hidden:true},
	      {field:'memberNo',width:40,align:'left',title : '등록자',hidden:true},
	      {field:'writer',width:40,align:'left',title : '저자'},
	      {field:'writerDesc',width:40,align:'left',title : '저자 설명',hidden:true},
	      {field:'projectTitle',width:70,align:'left',title : '제목'},
	      {field:'projectDesc',width:150,align:'left',title : '설명'},
	      {field:'size',width:45,align:'left',title : '해상도', formatter : projectSizeFormatter},
	      {field:'createTime',width:70,align:'left',title : '작성일'}
	    ]]
	});
	
	$('#transferType').combobox({
		showItemIcon: true,
	    data: [
	        {value:'WEB',text:' WEB ',iconCls:'icon-ok',selected : true},
	        {value:'FTP',text:' FTP ',iconCls:'icon-ok'},
	        {value:'TCP',text:' TCP/IP (전용 포트 및 전용프로토콜 서버)',iconCls:'icon-ok'}
	    ],
	    editable: false,
	    panelHeight: 'auto',
	    label: '전송 타입',
	    labelPosition: 'top',
	    required:false,
		multiple:false,
	});	
</script>

