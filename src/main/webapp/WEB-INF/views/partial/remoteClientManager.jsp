<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<div id = "client_container" style="width:100%;height:100%"   >
	<div  id = "client_panel" style="width:100%;height:100%"   >
		<table id = "client_grid" style ="width:100%;height:100%"></table>
	</div>
</div>


<script>
$('#client_panel').panel();
$('#client_grid').datagrid({
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
      {field:'clientNo',width:20,align:'left',title : 'lNo',hidden:true},
      {field:'clientName',width:20,align:'left',title : '클라이언트'},
      {field:'clientId',width:20,align:'left',title : 'ID'},
      {field:'clientPassword',width:20,align:'left',title : 'PASS'},
      {field:'clientValid',width:20,align:'left',title : '라이센스'},
      {field:'clientValid',width:20,align:'left',title : '허용 아이피 범위'},
      {field:'clientType',width:20,align:'left',title : '타입'},
      {field:'createTime',width:20,align:'left',title : '생성일'}
    ]]
});

</script>