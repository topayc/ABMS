<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id = "log_container" style="width:100%;height:100%"   >
	<div  id = "log_panel" style="width:100%;height:100%"   >
		<table id = "log_grid" style ="width:100%;height:100%"></table>
	</div>
</div>

<script>
$('#log_panel').panel();
$('#log_grid').datagrid({
	rownumbers:true,
	singleSelect:true,
	showHeader : true,
	striped : true,
	collapsible:false,
	fitColumns:true,
	toolbar: [{
		iconCls: "fa fa-refresh fa-lg icon-center" ,
		position : "right",
		handler: function(){	$('#user_list_grid').datagrid('reload');}
		},'-', {
			//text : "생성",
			iconCls: "fa fa-plus-square fa-lg icon-center" ,
			position : "right",
			handler: function(){
				
			}
		},{
			//text : "수정",
			iconCls: "fa fa-pencil-square-o fa-lg icon-center" ,
			position : "right",
			handler: function(){;}
		},'-', {
			//text : "삭제",
			iconCls: "fa fa-scissors fa-lg icon-center" ,
			position : "right",
			handler: function(){	}
		}
	
	],
	
	onSelect : function(index, row) {
	},
	
	border:false,
    columns:[[
      {field:'userNo',width:20,align:'left',title : 'lNo',hidden:true},
      {field:'userName',width:20,align:'left',title : '로그 종류'},
      {field:'userId',width:20,align:'left',title : '로그 상태'},
      {field:'userPassword',width:20,align:'left',title : '로그 상세'},
      {field:'userType',width:20,align:'left',title : '사용자'},
      {field:'createTime',width:20,align:'left',title : '생성일'}
    ]]
});

</script>
