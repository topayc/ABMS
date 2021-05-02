<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="easyui-layout"  id ="user_manage_container" data-options="fit:true,border:false,split:true">
	<div  data-options="region:'center',split:true,border:false"  style ="height:100%;width:100%" >
			<table id = "user_list_grid" style ="width:100%"></table>
	</div>
</div>
<div id="userWnd" style ="padding:5px;display:none" >
	<div style = "padding:15px;padding-top:5px" >
		  <p class = "blue_message" style="margin-bottom:10px">
		  	<strong></strong>
		  </p>
		 <form  id="userForm"  name = "userForm"  enctype="multipart/form-data" method="post" action = "<c:url value='submitMemberForm'/>">
			<div style="margin-bottom:20px">
				<input  id = "memberName"  name = "memberName"  style="width:100%" data-options="label:'*이름',labelPosition : 'top'" />
			</div>

			<div style="margin-bottom:20px">
				<input  id = "memberId"  name = "memberId" style="width:100%" data-options="label:'*아이디',labelPosition : 'top'" />
			</div>
			
			<div style="margin-bottom:20px">
			    <input type = "text"  id  = "memberPassword" name="memberPassword"   style="width:100%" data-options="label:'*비밀번호',labelPosition : 'top'">
			</div>
			<input type ="hidden" id = "submitAction" name="submitAction" value = "CREATE">
			<input type ="hidden" id = "memberNo" name="memberNo"  value = "0">
		</form>
	</div>
</div>

<script>
	function submitUserForm(action){
		if ($('input[name=memberId]').val().trim().length == 0) {
			$.messager.alert('입력 오류', "사용자 ID를  입력해주세요", 'error');
			return false;
		}
		if ($('input[name=memberName]').val().trim().length == 0) {
			$.messager.alert('입력 오류', "사용자 이름을 입력해주세요", 'error');
			return false;
		}
		
		if ($('input[name=memberPassword]').val().trim().length == 0) {
			$.messager.alert('입력 오류', "사용자 비밀번호를 입력해주세요", 'error');
			return false;
		}
		$('#userForm').form('submit');
	}
	
	function deleteUser(){
		var selectedRow = $('#user_list_grid').datagrid('getSelected');
		if (!selectedRow) {
			$.messager.alert("삭제할 사용자 선택", "삭제할 사용자를 먼저 선택해주세요", '');
			return;
		}
		prepareUserForm("DELETE");
		$.messager.confirm({
			title: '사용자 삭제',
			msg: '선택한 사용자를 정말로 삭제하시겠습니까?',
			fn: function(r){
				if (r){
					$.ajax({
					  type: "POST",
					  url: "/abms/submitMemberForm",
					  data: {memberNo : selectedRow.memberNo, submitAction : "DELETE" },
					  success: function(res){
						  	$('#user_list_grid').datagrid('reload');
						  	$.messager.alert(res.messageTitle, res.messageText, 'info');
					  },
					  dataType: "json"
					});
				}
			}
		});
	}
	
	function prepareUserForm(action) {
		switch(action) {
		case "CREATE":
			$('#memberId').textbox('setValue','');
			$('#memberId').textbox('readonly',false);
			$('#memberPassword').textbox('setValue','');
			$('#memberName').textbox('setValue','');
			$('#memberNo').val(0);
			$('#submitAction').val(action);
			break;
		case "MODIFY":
			var selectedRow = $('#user_list_grid').datagrid('getSelected');
			$('#memberId').textbox('setValue',selectedRow.memberId);
			$('#memberId').textbox('readonly');
			$('#memberPassword').textbox('setValue',selectedRow.memberPassword);
			$('#memberName').textbox('setValue',selectedRow.memberName);
			$('#memberNo').val(selectedRow.memberNo);
			$('#submitAction').val(action);
			break;
		case "DELETE":
			var selectedRow = $('#user_list_grid').datagrid('getSelected');
			$('#memberId').textbox('setValue','');
			$('#memberPassword').textbox('setValue','');
			$('#memberName').textbox('setValue','');
			$('#memberNo').val(selectedRow.memberNo);
			$('#submitAction').val(action);
			break;
		case "CLEAR":
			$('#memberId').textbox('setValue','');
			$('#memberPassword').textbox('setValue','');
			$('#memberName').textbox('setValue','');
			$('#memberNo').val(0);
			$('#submitAction').val("CREATE");
			break;
		}	
	}
	
	function openUserForm(userAction){
		var title;
		if (userAction == "CREATE") {
			title = "사용자 생성";
		}
		
		if  (userAction == "MODIFY") {
			var selectedRow = $('#user_list_grid').datagrid('getSelected');
			if (!selectedRow) {
				$.messager.alert("수정할 사용자 선택", "수정하려는  사용자를 먼저 선택해주세요", '');
				return;
			}else {
				title = "사용자 수정" ;
				var targetRowIndex;
				var targetRow;
				var rows = $('#user_list_grid').datagrid('getRows');
				
				for (var i = 0; i < rows.length; i++) {
					if (rows[i].memberNo == selectedRow.memberNo) {
						targetRowIndex = i;
						targetRow = rows[i];
						break;
					}
				}
			}
		}
		prepareUserForm(userAction);
		$('#userWnd').dialog({
			width:350,
		    height:330,
		    modal : true,
		    cls:'c2',
		    inline:true,
		    collapsible : false,
		    minimizable : false,
		    maximizable: false,
		    title : title,
		    shadow : false,
		  	buttons:[{
					text:'확인',
					iconCls:'icon-ok',
					handler:function(){ submitUserForm(userAction); }
					},
				{
					text:'닫기',
					handler:function(){
						$('#userWnd').dialog('close');
					}
				}]
		});
	}
	
	//$('#userWnd').dialog();
	//$('#userWnd').dialog("close");
	$('#memberId').textbox();
	$('#memberPassword').textbox();
	$('#memberName').textbox();
	$('#user_manage_container').layout();;
	$('#user_list_panel').panel();
	$('#user_list_grid').datagrid({
		rownumbers:true,
		singleSelect:true,
		showHeader : true,
		striped : true,
		//title : "패키징 이북 리스트 ",
		collapsible:false,
		fitColumns:true,
		url : '/abms/getMembers',
		method : "get",
		toolbar: [{
			iconCls: "fa fa-refresh fa-lg icon-center" ,
			position : "right",
			handler: function(){	$('#user_list_grid').datagrid('reload');}
			},'-', {
				//text : "생성",
				iconCls: "fa fa-plus-square fa-lg icon-center" ,
				position : "right",
				handler: function(){
					openUserForm('CREATE');
				}
			},{
				//text : "수정",
				iconCls: "fa fa-pencil-square-o fa-lg icon-center" ,
				position : "right",
				handler: function(){	openUserForm('MODIFY');}
			},'-', {
				//text : "삭제",
				iconCls: "fa fa-scissors fa-lg icon-center" ,
				position : "right",
				handler: function(){deleteUser("DELETE");	}
			}
		
		],
		
		onSelect : function(index, row) {
		},
		onLoadSuccess : function(data){
			$('#user_list_grid').datagrid('unselectAll');
		},
		border:true,
	    columns:[[
	      {field:'memberNo',width:20,align:'left',title : 'No',hidden:true},
	      {field:'memberName',width:20,align:'left',title : '이름'},
	      {field:'memberId',width:20,align:'left',title : '아이디'},
	      {field:'memberPassword',width:20,align:'left',title : '비밀번호'},
	      {field:'memberType',width:20,align:'left',title : '타입'},
	      {field:'createTime',width:20,align:'left',title : '생성일'}
	    ]]
	});
	
	$('#userForm').form({
		onSubmit : function(data){ },
		success : function(data){
			$('#user_list_grid').datagrid('reload');
			console.log(data);
			 var res = JSON.parse(data);
			 $.messager.alert({
				 title: res.messageTitle,
				msg: res.messageText,
				fn: function(){
					$('#userWnd').dialog('close');
				}
			 });
			 prepareUserForm("CLEAR");
		}
	});
</script>
