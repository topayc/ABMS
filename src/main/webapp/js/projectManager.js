
var curOverAbmsProjectNo = 0;
var appConfig = {};
var selectedEpubRow;

function openAbmsEditor(){
	var selectedRow = $('#epub_list_grid').datagrid('getSelected');
	if (!selectedRow) {
		$.messager.alert("프로젝트  선택", "수정하실 프로젝트를 선택해주세요", '');
		return;
	}
	console.log("selcted epub");
	console.log(selectedRow);
	
	window.location.href = "/abms/A3maker/editor.html?abmsProjectNo=" + selectedRow.abmsProjectNo;
}

function openConvertFileUploadWnd(){
	$('#addConvertFileType').combobox('select','A3MAKER');
	$('#addConvertFile').filebox('setText','');
	$('#addConvertFile').filebox('setValue','');
	$('#addConvertFileAbmsProjectNo').val(curOverAbmsProjectNo);
	
	$('#addConvertFileUploadWnd').dialog({
		width:380,
	    height:300,
	    modal : true,
	    cls:'c6',
	    inline:true,
	    collapsible : false,
	    minimizable : false,
	    maximizable: false,
	    title : "&nbsp; 변환 파일 업로드",
	    shadow : false,
	  	buttons:[{
			text:'확인',
			iconCls:'icon-ok',
			handler:function(){
				var fileValue = $('#addConvertFile').filebox('getValue')
				var fileText = $('#addConvertFile').filebox('getText')
				console.log("getValue : "  + fileValue);
				console.log("getText: "  + fileText);
				if (!fileText || fileText.trim().length < 1) {
					$.messager.alert({
						title: '입력 오류',
						msg: '<br/>&nbsp;업로드할 파일을 선택해주세요',
						//border : "thin",
						cls : "c6",
						bodyCls : 'blue_message'
					});
					return;
				}
				$('#add_convert_file_upload_form').form('submit');
				}
			},
		{
			text:'취소',
			handler:function(){
				$('#addConvertFileType').combobox('select','A3MAKER');
				$('#addConvertFile').filebox('setText','');
				$('#addConvertFile').filebox('setValue','');
				$('#addConvertFileAbmsProjectNo').val(0);
				$('#addConvertFileUploadWnd').dialog('close');
			}
		}]
	});	
}

function deleteAbmsProject(){
	var selectedRow = $('#epub_list_grid').datagrid('getSelected');
	if (!selectedRow) {
		$.messager.alert("삭제할 프로젝트  선택", "삭제하려는  프로젝트를  먼저 선택해주세요", '');
		return;
	}
	
	$.messager.confirm({
		title: 'EPUB 삭제',
		msg: '선택한 프로젝트를 정말로 삭제하시겠습니까?',
		fn: function(r){
			if (r){
				$.ajax({
				  type: "POST",
				  url: "/abms/deleteAbmsProject",
				  data: {abmsProjectNo : selectedRow.abmsProjectNo},
				  success: function(res){
				  	$('#epub_list_grid').datagrid('reload');
				  	setDetailContainerText('');
				  	clearDetailContainer();
				  	clearAbmsProjectForm();
				  	$.messager.alert(res.messageTitle, res.messageText, 'info');
				  },
				  dataType: "json"
				});
			}
		}
	});

}
function openAddFileWnd(){
	
}

function openAbmsProjectFormWnd(action) {
	var title;
	clearAbmsProjectForm();
	if (action == "CREATE") {
		title = "A3Editor 프로젝트 생성 ";
	}
	if (action == "MODIFY") {
		var selectedRow = $('#epub_list_grid').datagrid('getSelected');
		console.log(">>> Modify Project");
		console.log(selectedRow);
		if (!selectedRow) {
			$.messager.alert("수정할 프로젝트 선택", "수정하려는  프로젝트를  먼저 선택해주세요", '');
			return;
		}else {
			title = "A3Editor 프로젝트 수정" ;
			
			setCurOverAbmsProject(selectedRow);
			var targetRowIndex;
			var targetRow;
			var rows = $('#epub_list_grid').datagrid('getRows');
			
			for (var i = 0; i < rows.length; i++) {
				if (rows[i].abmsProjectNo == selectedRow.abmsProjectNo) {
					targetRowIndex = i;
					targetRow = rows[i];
					break;
				}
			}
			
			changeSubmitButtonText("수정")
			setFormValue(targetRow);
			console.log(targetRow);
		}
	}
	$('#abmsProjectFormWnd').dialog({
		width:530,
	    height:550,
	    modal : true,
	    cls:'c6',
	    inline:true,
	    collapsible : false,
	    minimizable : false,
	    maximizable: false,
	    title : title,
	    shadow : false,
	  	buttons:[{
			text:'확인',
			iconCls:'icon-ok',
			handler:function(){
				if (action == "CREATE") $("#abmsProjectNo").val('0');
				submitAbmsProjectForm(); 
			}
			},
		{
			text:'닫기',
			handler:function(){
				$('#abmsProjectFormWnd').dialog('close');
				clearAbmsProjectForm();
			}
		}]
	});	
	
}
function modifyAbmsProject(){
	console.log(curOverAbmsProjectNo);
	
	var targetRowIndex;
	var targetRow;
	var rows = $('#epub_list_grid').datagrid('getRows');
	
	for (var i = 0; i < rows.length; i++) {
		if (rows[i].abmsProjectNo == curOverAbmsProjectNo) {
			targetRowIndex = i;
			targetRow = rows[i];
			break;
		}
	}
	clearAbmsProjectForm();
	changeSubmitButtonText("수정")
	setFormValue(targetRow);
	console.log(targetRow);
}
function changeSubmitButtonText(text){
	$('#confirm_btn').linkbutton({text : text});
}

function setFormValue(targetRow){
	$('#convertFileType').combobox('disable');
	$('#convertFile').filebox('disable');

	$('#projectWidth').textbox('disable');
	$('#projectHeight').textbox('disable');
	
	$('#convertFileAttach').val("N");
	$('#abmsProjectNo').val(targetRow.abmsProjectNo);
	$('#action').val("MODIFY");
	$('#projectTitle').textbox('setValue', targetRow.projectTitle);
	$('#projectWidth').textbox('setValue', targetRow.projectWidth);
	$('#projectHeight').textbox('setValue', targetRow.projectHeight);
	$('#writer').textbox('setValue', targetRow.writer);
	$('#writerDesc').textbox('setValue', targetRow.writerDesc);
	$('#projectDesc').textbox('setValue', targetRow.projectDesc);
}

function clearAbmsProjectForm() {
	$('#convertFileType').combobox('enable');
	$('#convertFile').filebox('enable');
	$('#projectWidth').textbox('enable');
	$('#projectHeight').textbox('enable');
	
	$('#abmsProjectForm').form('clear');
	$('#convertFileType').combobox('clear');
	$('#convertFileType').combobox('reset');
	$('#convertFileType').combobox('select','A3MAKER');
	$('#convertFileAttach').val("N");
	$('#projectHeight').val("0");
	$('#action').val("CREATE");
	changeSubmitButtonText("생성")
}

function submitAbmsProjectForm() {
	if ($('input[name=projectTitle]').val().trim().length == 0) {
		$.messager.alert('입력 오류', "프로젝트 제목 입력해주세요", 'error');
		return false;
	}

	if ($('input[name=projectWidth]').val().trim().length == 0) {
		$.messager.alert('입력 오류', "이펍 가로 사이즈를 입력해주세요", 'error');
		return false;
	}

	if (!$.isNumeric($('input[name=projectWidth]').val())) {
		$.messager.alert('입력 오류', "가로 입력은 숫자만 입력가능합니다", 'error');
		return false;
	}

	if ($('input[name=projectHeight]').val().trim().length == 0) {
		$.messager.alert('입력 오류', "이펍 세로 사이즈를 입력해주세요", 'error');
		return false;
	}

	if (!$.isNumeric($('input[name=projectHeight]').val())) {
		$.messager.alert('입력 오류', "세로 입력은 숫자만 입력가능합니다", 'error');
		return false;
	}

	if ($('input[name=writer]').val().trim().length == 0) {
		$.messager.alert('입력 오류', "저자(저작권자) 이름을 입력해주세요", 'error');
		return false;
	}
	
	if ($('input[name=projectDesc]').val().trim().length == 0) {
		$.messager.alert('입력 오류', "이폅 설명을 입력해주세요", 'error');
		return false;
	}
	console.log($('#abmsProjectForm').serialize());
	$('#abmsProjectForm').form('submit');
 }

function projectSizeFormatter(value,row,index){
	return row.projectWidth + " x " + row.projectHeight;
}

function projectStatusFormatter(value,row,index) {
	var status = row.projectStatus;
	return '&nbsp;<i class = "fa fa-spinner fa-spin fa-lg"></i>' + '&nbsp;' + status;
}

function publicStatusFormatter(value,row,index) {
	var status = row.publicStatus;
	return '&nbsp;<i></i>' + '&nbsp;' + status;
}

function projectActionFormatter(value,row,index){
	selectedEpubRow = row;
	return '<a href="javascript:void(0)" onmouseover = "setCurOverAbmsProject('+ row.abmsProjectNo+ ')" class = "mb" ></a> ';
}

function setCurOverAbmsProject(projectNo) {
	curOverAbmsProjectNo = projectNo;
}

function loadProjectDetailInfo (projectNo) {
	$('#project_detail_container').load("/abms/abmsProjectDetail?projectNo=" + projectNo,
			function(response, status, xhr) {
				if (status != "success")
					console.log(response);
			});
}

function loadProjectDetailInfo2(abmsProjectNo) {
	$.getJSON("/abms/abmsProjectDetail2?abmsProjectNo=" + abmsProjectNo, function(response){
		console.log(">>> Proejct Detail Info");
		console.log(JSON.stringify(response));
		if (response.resultCode == 100) {
			setAbmsProjectDetailContent(response.data);
		}else {
			$.messager.alert('상세 정보 요청 오류', "정보 생성중 에러 발생했습니다", 'error');
		}
	});
}

function setAbmsProjectDetailContent(data){
	$('#project_detail_content').show();
	
	var detailGridData = [];
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;제목</strong>', itemValue : '&nbsp;' + data.projectTitle});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;저자</strong>', itemValue : '&nbsp;' + data.writer});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;저자 설명</strong>', itemValue : '&nbsp;' + data.writerDesc});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;프로젝트 상세 </strong>', itemValue : '&nbsp;' + data.projectDesc});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;해상도</strong>', itemValue : '&nbsp;' + data.projectWidth + " x " + data.projectHeight});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;페이지 수</strong>', itemValue : '&nbsp;' + data.pageCount});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;프로젝트 상태 </strong>', itemValue : '&nbsp;' + data.projectStatus});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;프로젝트 공개 </strong>', itemValue : '&nbsp;' + data.publicStatus});
	detailGridData.push({itemName : '&nbsp;<strong><i class="fa fa-caret-right" aria-hidden="true"></i>&nbsp;파일</strong>', itemValue : '&nbsp;' + ''});
  var coverPath = data.coverFileWebPath ? data.coverFileWebPath : '/epub/images/default_book_cover.png';
  $('#project_img').attr('src', coverPath);
	$('#project_detail_grid').datagrid({data : detailGridData})
}

function setDetailContainerText(text){
	$('#project_detail_container').panel("setTitle", '<i class="fa fa-book" ></i><strong>&nbsp;'+text +'</strong>');
}

function clearDetailContainer() {
	$('#epub_detail_content').hide();
}

function setViewLayout() {
	$('.easyui-layout').layout();	
	$('#epub_list_grid').datagrid({
		rownumbers:true,
	//	title : "EPUB 리스트",
		singleSelect:true,
		collapsible:false,
		striped : true,
		fitColumns:true,
		url : '/abms/listAbmsProject',
		method : "get",
		
		toolbar: [{
			iconCls: "fa fa-refresh fa-lg icon-center" ,
			position : "right",
			handler: function(){	$('#epub_list_grid').datagrid('reload');}
			},'-', {
				//text : "생성",
				iconCls: "fa fa-plus-square fa-lg icon-center" ,
				position : "right",
				handler: function(){
					openAbmsProjectFormWnd('CREATE');
				}
			},'-',{
				//text : "Add File",
				iconCls: "fa fa-plus-circle fa-lg icon-center" ,
				position : "right",
				handler: function(){
					var selectedRow = $('#epub_list_grid').datagrid('getSelected');
					if (!selectedRow) {
						$.messager.alert("EPUB 선택", "파일을 추가하려는 EPUB를 먼저 선택해주세요", '');
						return;
					}
					openConvertFileUploadWnd();
				}
			},'-', {
				//text : "수정",
				iconCls: "fa fa-pencil-square-o fa-lg icon-center" ,
				position : "right",
				handler: function(){	openAbmsProjectFormWnd('MODIFY');}
			},'-', {
				//text : "삭제",
				iconCls: "fa fa-scissors fa-lg icon-center" ,
				position : "right",
				handler: function(){deleteAbmsProject();	}
			},'-', {
				//text : "Editor",
				iconCls: "fa fa-desktop fa-lg icon-center" ,
				position : "right",
				handler: function(){
						openAbmsEditor()	
					}
			},'-', {
				//text : "Viewer",
				iconCls: "fa fa-columns fa-lg icon-center" ,
				position : "right",
				handler: function(){
					var selectedRow = $('#epub_list_grid').datagrid('getSelected');
					if (!selectedRow) {
						$.messager.alert("EPUB 선택", "Viewer로 열 EPUB을 선택해주세요", '');
						return;
					}
					openAbmsEditor(selectedRow.abmsProjectNo);	
					
					}
			},'-', {
				//text : "EPUB download",
				iconCls: "fa fa-download fa-lg icon-center" ,
				position : "right",
				handler: function(){	}
			},'-', {
				//text : "Download",
				iconCls: "fa fa-download fa-lg icon-center" ,
				position : "right",
				handler: function(){	}
			},'-', {
				//text : "Export",
				iconCls: "fa fa-share fa-lg icon-center" ,
				position : "right",
				handler: function(){	}
			},'-'
		
		],
		
		onSelect : function(index, row) {
			var projectNo = row.abmsProjectNo;
			var projectTitle = row.projectTitle;
			//$('#project_detail_container').panel("setTitle", "[" + epubTitle + "] 상세 정보");
			selectedEpubRow = row;
			setDetailContainerText(projectTitle);
			loadProjectDetailInfo2(projectNo);
		},
		
		onLoadSuccess : function(data){
			$('#epub_list_grid').datagrid("unselectAll");
			$('.mb').menubutton({
			    menu: '#mm',
			    iconCls: 'icon-edit',
			    plain : true,
			    height : '23px',
			    width : '50px',
			    onMouseOver : function(){
			    	console.log("메뉴 버튼");
			    }
			});
		
		},
		selectOnCheck : false,
		checkOnSelect : false,
		border:false,
	    columns:[[
	     // {field:'check',width:30,align:'left',title : '선택',checkbox : true},
	        {field:'action',width:20,align:'center', halign : 'center',formatter : projectActionFormatter},
	      {field:'abmsProjectNo',width:20,align:'left',title : 'pNo',hidden:true},
	      {field:'memberNo',width:40,align:'left',title : '등록자',hidden:true},
	      {field:'writer',width:40,align:'left',title : '저자'},
	      {field:'writerDesc',width:40,align:'left',title : '저자 설명',hidden:true},
	      {field:'projectTitle',width:70,align:'left',title : '제목'},
	      {field:'projectDesc',width:150,align:'left',title : '설명'},
	      {field:'size',width:45,align:'left',title : '해상도', formatter : projectSizeFormatter},
	      {field:'projectStatus',width:45,align:'left',title : '프로젝트 상태',formatter : projectStatusFormatter},
	      {field:'publicStatus',width:45,align:'left',title : '공개 여부 ',formatter : publicStatusFormatter},
	      {field:'pageCount',width:30,align:'left',title : '페이지 수'},
	      {field:'createTime',width:70,align:'left',title : '등록일'},
	    ]]
	
	});
	

	$('#abmsProjectForm').form({
		onSubmit : function(data){ },
		success : function(data){
			$('#epub_list_grid').datagrid('reload');
			setDetailContainerText('');
			selectedEpubRow = null;
			clearDetailContainer();
			 var res = JSON.parse(data);
			 $.messager.alert({
				 title: res.messageTitle,
				msg: res.messageText,
				fn: function(){
					$('#abmsProjectFormWnd').dialog('close');
					}
			 });
			 clearAbmsProjectForm();
			 
		}
	});
	
	$('#add_convert_file_upload_form').form({
		onSubmit : function(data){ },
		success : function(data){
			var res = JSON.parse(data);
			$.messager.alert(res.messageTitle, res.messageText, 'info');
			clearAbmsProjectForm();
			
		}
	});
	
	$('.easyui-panel').panel();	
	$('#convertFileType').combobox({
		showItemIcon: true,
    data: [
        {value:'A3MAKER',text:' A3Editor',iconCls:'icon-ok',selected : true},
        {value:'EPUB',text:' EPUB',iconCls:'icon-ok'},
        {value:'ZIP',text:' ZIP',iconCls:'icon-ok'},
        {value:'PDF',text:' PDF',iconCls:'icon-ok'}
       // {value:'WORD',text:' WORD',iconCls:'icon-ok'},
       // {value:'PPT',text:' PPT',iconCls:'icon-ok'},
       // {value:'EXCEL',text:' EXCEL',iconCls:'icon-ok'},
       // {value:'HWP',text:' HWP',iconCls:'icon-ok'}
    ],
    editable: false,
    panelHeight: 'auto',
    label: '변환 파일 타입',
    labelPosition: 'top',
    required:false,
		multiple:false,
		onSelect : function(record){
			appConfig.selUploadType = record; 
		}
	});	
	
	$('#addConvertFileType').combobox({
		showItemIcon: true,
		data: [
			{value:'A3MAKER',text:' A3Editor',iconCls:'icon-ok',selected : true},
			{value:'EPUB',text:' EPUB',iconCls:'icon-ok'},
			{value:'ZIP',text:' ZIP',iconCls:'icon-ok'},
			{value:'PDF',text:' PDF',iconCls:'icon-ok'}
			// {value:'WORD',text:' WORD',iconCls:'icon-ok'},
			// {value:'PPT',text:' PPT',iconCls:'icon-ok'},
			// {value:'EXCEL',text:' EXCEL',iconCls:'icon-ok'},
			// {value:'HWP',text:' HWP',iconCls:'icon-ok'}
			],
			editable: false,
			panelHeight: 'auto',
			label: '변환 파일 타입',
			labelPosition: 'top',
			required:false,
			multiple:false,
			onSelect : function(record){
				appConfig.selUploadType = record; 
			}
	});	

	
	$('.easyui-linkbutton').linkbutton();	
	$('.easyui-textbox').textbox({
	});	
  
	$('#coverImageFile').filebox({
		buttonText: '&nbsp;선택&nbsp;&nbsp;  ',
		buttonAlign: 'left',
		buttonIcon : "fa fa-file",
		onChange : function(newValue, oldValue){
		}
	});
	
	$('#convertFile').filebox({
		buttonText: '&nbsp;선택&nbsp;&nbsp;  ',
		buttonAlign: 'left',
		buttonIcon : "fa fa-file",
		onChange : function(newValue, oldValue){
			if (newValue != oldValue ) {
				$('#convertFileAttach').val("Y");
			}
		}
	});
	
	$('#addConvertFile').filebox({
		buttonText: '&nbsp;선택&nbsp;&nbsp;  ',
		buttonAlign: 'left',
		buttonIcon : "fa fa-file"
	});
	
	$('#project_detail_grid').datagrid({
 		fitColumns : true,
 		//showHeader : false,
 		scrollbarSize : '0',
 		striped : true,
 		singleSelect:true,
 		collapsible:false,
 		border: false,
 		onSelect : function(index, row) {
			$(this).datagrid('unselectRow', index);
		},
 	  columns:[[
     {field:'itemName',title:'&nbsp;&nbsp;<strong>항 목</strong>',width:20},
     {field:'itemValue',title:'&nbsp;&nbsp;<strong>내 용</strong>',width:80}
 ]]
 	});
 	$('#project_detail_content').panel({ border : false });
 	$('#project_detail_content_layout').layout({ border : false });
 	$('#project_detail_content').hide();
 	
 	$('.validatebox-text').removeClass('validatebox-text');
}

setViewLayout();