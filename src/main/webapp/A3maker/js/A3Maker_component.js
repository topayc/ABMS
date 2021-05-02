﻿ A3Maker = A3Maker || {};

A3Maker.Component = {};

var comInx = 1;
A3Maker.Component.build = function (parent, type, options) {
    var com = "";
    type = type ? type : options.type;
    switch (type) {
        case "image": com = new A3Maker.Component.ImageComponent(parent,options); break;
        case "table": com = new A3Maker.Component.TableComponent(parent,options); break;
        case "box": com = new A3Maker.Component.TextComponent(parent,options); break;
        case "text": com = new A3Maker.Component.TextComponent(parent,options); break;
        case "link": com = new A3Maker.Component.LinkComponent(parent,options); break;
        case "order": com = new A3Maker.Component.OrderComponent(parent,options); break;
        case "popup": com = new A3Maker.Component.PopupComponent(parent,options); break;
        case "list":com = new A3Maker.Component.ListComponent(parent,options); break;
        case "listrow": com = new A3Maker.Component.ListRowComponent(parent,options); break;
        case "script": com = new A3Maker.Component.ScriptComponent(parent,options); break;
    }
    return com;
};

A3Maker.Component.Base = function (data) {
	this.data = data;
	if (this.data){
		if (typeof this.data.childs !="undefined") delete this.data.childs;

		this.isValid = false; 
		this.validationErrorMessages = []; 
		this.cornerActionTriggerRadius = this.data['type'] == "listrow" ? 0 : 8;
		this.initComponent(this.data);
		this.buildDomOject();
		
		//컴포넌트 즉시 검색을 위해 컴포넌트 아이디를 키로 객체 저장 
		A3Maker.project.componentMap[this.data.id] = this;
		
		if (this.data.type == 'listrow') {
			var totalRowHeight = 0; 
			if (this.parent.childs.length < 1) {
				this.data.top = 0;
	
			} else {
				$.each(this.parent.childs, function (inx, listRow) {
					totalRowHeight = totalRowHeight + listRow.data.height;
				});
				this.data.top = totalRowHeight;
			}
		}
	
		if (typeof this.parent != 'undefined') {
			var wrapper = this;
			wrapper.resizingBorderStr = A3Maker.resizingBorderStr;
			//기존에 보더 라인을 class 로 처리했으나, 이는 보더 두께를 차지 하여, 부자연 스러음
			// --> 그래서 컴포넌트안에 보더 div 를 배치하여 해결
			wrapper.componentBorderLine = A3Maker.componentBorderLine;
	   }
	}
};

A3Maker.Component.Base.prototype.selectEnum = {
    common: 0,
    drag_ctrl_select: 1,
    Move: 9
};



A3Maker.Component.Base.prototype.get = function (key) {
    return this[key];
};

A3Maker.Component.Base.prototype.setData = function (data) {
    for(var property in data){
    	this.data[property] = data[property];
    }
    this.refresh();
};

A3Maker.Component.Base.prototype.set = function (key, value) {
    this[key] = value;
};

A3Maker.Component.Base.prototype.initComponent = function (data) {
		if (data){
			/*아이디 및 관련 운영 변수들은 매번 생성하는 것으로 변경*/
			if (!data['id']) {
				data['id'] = data['UUID'] = data['wrapperId'] =  A3Maker.util.genUUID();
				data['no'] = this.parent.createComponentNo(data['type']);
				data['name'] = this.name = data['type'] + data['no'];
			} 
			/*
			if (typeof data['id'] == 'undefined' || !data['id']) {
				data['id'] = data['UUID'] = data['wrapperId'] =  A3Maker.util.genUUID();
				data['no'] = this.parent.createComponentNo(data['type']);
				data['name'] = this.name = data['type'] + data['no'];
			}else {
				data['wrapperId'] = data['id'] ;
			}
			*/
			
			var currentAction = this.ActionsEnum.None;
			this.isShown = false;
			this.lastMouseX = 0;
			this.lastMouseY = 0;
			this.selectStatus = false;
		}
};

A3Maker.Component.Base.prototype.buildDomOject = function () {
	  try {
	    this.wrapperStr =
	            '<div  class ="moveActionTrigger eggbon_com" style="cursor : move;position:absolute" id="' + this.data.wrapperId + '">' +
	                '<div  style="position:absolute" class="internalWrapper"></div>' +
	            '</div>';
	    this.externalWrapperQueryStr = '#' + this.data.wrapperId;
	    this.internalWrapperQueryStr = this.externalWrapperQueryStr + ' .internalWrapper';
	    this.originalElementQueryStr =   this.internalWrapperQueryStr  + " .component";
	
	    //action  
	    this.moveActionTriggerQueryStr = this.externalWrapperQueryStr ;    // 드래그 액션
	    this.topActionTriggerQueryStr = this.externalWrapperQueryStr + ' .topActionTrigger';          // 상단 리사이즈 
	    this.bottomActionTriggerQueryStr = this.externalWrapperQueryStr + ' .bottomActionTrigger';  //하단 리사이즈 
	    this.leftActionTriggerQueryStr = this.externalWrapperQueryStr + ' .leftActionTrigger';   //좌측 리사이즈 
	    this.rightActionTriggerQueryStr = this.externalWrapperQueryStr + ' .rightActionTrigger';  //우측 리사이즈
	
	    this.topLeftActionTriggerQueryStr = this.externalWrapperQueryStr + ' .topLeftActionTrigger';  // 좌측상단 리사이즈
	    this.topRightActionTriggerQueryStr = this.externalWrapperQueryStr + ' .topRightActionTrigger';  //우측 상단 리사이즈
	    this.bottomLeftActionTriggerQueryStr = this.externalWrapperQueryStr + ' .bottomLeftActionTrigger';  //좌측 하단 리사이즈
	    this.bottomRightActionTriggerQueryStr = this.externalWrapperQueryStr + ' .bottomRightActionTrigger';  //우측 하단 리사이즈 
	
	    this.topMiddleActionTriggerQueryStr = this.externalWrapperQueryStr + ' .topMiddleActionTrigger';
	    this.leftMiddleActionTriggerQueryStr = this.externalWrapperQueryStr + ' .leftMiddleActionTrigger';
	    this.rightMiddleActionTriggerQueryStr = this.externalWrapperQueryStr + ' .rightMiddleActionTrigger';
	    this.bottomMiddleActionTriggerQueryStr = this.externalWrapperQueryStr + ' .bottomMiddleActionTrigger';

	    //this.borderDrawingStr = this.externalWrapperQueryStr + " .border_drawing";
	    this.resizingGripStr = this.externalWrapperQueryStr + " .resizing_grip";
	    this.componentBorder = this.externalWrapperQueryStr + " > .component_border";
	    this.resizingGripStrDirectChild = this.externalWrapperQueryStr + "> .resizing_grip";
	    this.resizingGropActionStr = this.externalWrapperQueryStr + " .resizing_grip_action";
	
	    // border  및 grip 툴 
	    this.topDrawingQueryStr = this.externalWrapperQueryStr + ' .topDrawing';
	    this.bottomDrawingQueryStr = this.externalWrapperQueryStr + ' .bottomDrawing';
	    this.leftDrawingQueryStr = this.externalWrapperQueryStr + ' .leftDrawing';
	    this.rightDrawingQueryStr = this.externalWrapperQueryStr + ' .rightDrawing';
	    this.topLeftDrawingQueryStr = this.externalWrapperQueryStr + ' .topLeftDrawing';
	    this.topRightDrawingQueryStr = this.externalWrapperQueryStr + ' .topRightDrawing';
	    this.bottomLeftDrawingQueryStr = this.externalWrapperQueryStr + ' .bottomLeftDrawing';
	    this.bottomRightDrawingQueryStr = this.externalWrapperQueryStr + ' .bottomRightDrawing';
	    this.topMiddleDrawingQueryStr = this.externalWrapperQueryStr + ' .topMiddleDrawing';
	    this.leftMiddleDrawingQueryStr = this.externalWrapperQueryStr + ' .leftMiddleDrawing';
	    this.rightMiddleDrawingQueryStr = this.externalWrapperQueryStr + ' .rightMiddleDrawing';
	    this.bottomDrawingQueryStr = this.externalWrapperQueryStr + ' .bottomDrawing';
	    this.bottomMiddleDrawingQueryStr = this.externalWrapperQueryStr + ' .bottomMiddleDrawing';
	
	    this.textActionTriggerQueryStr = this.externalWrapperQueryStr + " .text_action_trigger";
	
	    //property window
	    this.propertyContainerQueryStr = "#property_container";
	  }catch(e) {
	  	console.log(e);
	  }
};

A3Maker.Component.Base.prototype.generateExternalContainerId = function () {

    return 'external_component_' + this.data.fullName;
};


A3Maker.Component.Base.prototype.attach = function () {
    this.createOriginElementByType(this.data.type);
    
    if (this.parent instanceof A3Maker.Page) {
    	this.parent.$pageHolderSelector.append(this.originalElement);
    }
    else { 
        $(this.parent.originalElement).append(this.originalElement);
    }
    
    this.createWrapperElement();
    if (this.data.type == "listrow") 
    	$(this.gripBottomLineStr).show();
    else 
        $(this.gripBottomLineStr).remove();
    
    if (this.data.type == "popup") $(this.externalWrapperQueryStr).css('z-index', 10000);
};

A3Maker.Component.Base.prototype.detach = function () {
    $(this.externalWrapperQueryStr).remove();
    A3Maker.propertyWindow.closePropertyWindow();
};

A3Maker.Component.Base.prototype.remove= function () {
    this.detach();
};


A3Maker.Component.Base.prototype.createWrapperElement = function () {
    this.addWrapperElements();
    this.initializeEventHandlers();
    this.adjustWrapper();
};


//component 타입에 맞는 svg ,jquery 객체를 생성 
A3Maker.Component.Base.prototype.createOriginElementByType = function (type) {

    // 현재 캔버스 축소 확대 비율에 맞게 생성 컴포넌트의 위치 및 사이즈 조정 
    var rX = this.data.left;
    var rY =  this.data.top;
    var rWidth = this.data.width;
    var rHeight =this.data.height;

    switch (type) {
    	case "image":
    		this.originalElementStr = 
    			'<img  class ="component component-image" data-component ="image" src =\"' + this.data['background-image'] + '\" style="left:' + rX + 'px;top:' + rY + 'px;width:' + rWidth + 'px;height:' + rHeight + 'px;position:absolute" ></img>';
    		this.originalElement = $(this.originalElementStr);
    		break;
    	case "text":
    		this.originalElementStr =
    			'<div style="left:' + rX + 'px;top:' + rY + 'px;width:' + rWidth+ 'px;height:' + rHeight+ 'px;position:absolute;overflow:hidden;text-overflow:hidden" >' +
            	'<textarea data-component ="text" placeholder="Insert Text" class ="component component-text text_input_area" style ="outline: none;width:100%;height:100%;border-color: Transparent;font-size :' + 
            	this.data['font-size'] + ';font-family : ' + this.data['font-family']+ ';color : ' + this.data.color + ';background-color: rgba(0,0,0,0);overflow:visible">' + this.data.text + '</textarea>' +
            	'</div>';
            this.originalElement = $(this.originalElementStr);
            break;
        case "link":
            this.originalElementStr =
            	'<img  class ="component component-link" data-component ="link" position ="' + this.data.position + '" linktype = "' + this.data.linkType + '" src =\"' + this.data['background-image'] + '\" style="left:' + rX + 'px;top:' + rY + 'px;width:' + rWidth + 'px;height:' + rHeight + 'px;position:absolute" ></img>';
            this.originalElement = $(this.originalElementStr);
            break;
        case "order":
            this.originalElementStr = '<img  class ="component component-order" data-component ="order" menuId ="'+ this.data.menuId+ '" price ="' + this.data.price + '" menu ="' + this.data.menu + '"src =\"' + this.data['background-image'] + '\" style="left:' + rX + 'px;top:' + rY + 'px;width:' + rWidth + 'px;height:' + rHeight + 'px;position:absolute" ></img>';
            this.originalElement = $(this.originalElementStr);
            break;
        case "popup":
           this.data.width = this.data.width? this.data.width: rWidth = A3Maker.project.width - (this.data.left * 2);
           this.data.height = this.data.height ? this.data.height : rHeight = A3Maker.project.width - (this.data.top *2);
           var backgroundImage = this.data['background-image'] ? 'url(' + this.data['background-image'] +')' : "";
           var backroundImageCss  = backgroundImage ? 'background-image : ' + backgroundImage+ ';' : "";
           this.originalElementStr =
            	'<div class ="component component-popup" data-component ="popup" style="left:' + rX + 'px;top:' + rY + 'px;width:' + rWidth + 'px;height:' + rHeight + 'px;position:absolute;overflow:hidden;text-overflow:hidden;background:#FFFFFF;background-size:100% 100%;'+backroundImageCss+  '" >' +
            	'</div>';
            this.originalElement = $(this.originalElementStr);
            break;
        case "list":
            this.originalElementStr =
                   '<div class ="component component-list" data-component ="list" class ="transparent_scroll" style="left:' + rX + 'px;top:' + rY + 'px;width:' + (rWidth + A3Maker.scrollBarWidth + 2) + 'px;height:' + rHeight + 'px;position:absolute;background-color:rgba(200,200,200,.5);overflow: scroll;overflow-x:hidden" ></div>';
            this.originalElement = $(this.originalElementStr);
            break;
        case "listrow":
            this.data.width = this.parent.data.width;
            this.originalElementStr =
                  '<div class ="component component-listrow" data-component ="listrow" style="width:100%;height:' + this.data.height + 'px;position:absolute;background-color:#fff;margin:0px;color:#000;overflow:hidden" ></div>';
            this.originalElement = $(this.originalElementStr);
            break;
        case "script":
        	this.originalElementStr = 
        		'<img  class ="component component-script" data-component ="script" src =\"' + this.data['background-image'] + '\" style="left:' + rX + 'px;top:' + rY + 'px;width:' + rWidth + 'px;height:' + rHeight + 'px;position:absolute" ></img>';
        	this.originalElement = $(this.originalElementStr);
        	break;
       
        case "table":
        	//cellpadding 속성은 td style에 padding 을 주면 동일한 효과가 적용되고,
        	//cellspacing 속성은 table style에 border-spacing 을 적용하면 동일한 효과가 적용된다.
        	this.data.width =  rWidth = A3Maker.project.width - (this.data.left * 2);
             
        	var trHeight  = (this.data.height / this.data.rowCnt) + 'px' ; 
        	var tdWidth  = (this.data.width / this.data.colCnt)+ 'px' ; 
        	var border = this.data['border'] + 'px ' + this.data['border-style'] + ' ' + this.data['border-color'];
        	
        	var table =	'<table  class ="component component-table" data-component ="table" style ="border-collapse:collapse;border : ' + border + 'border-spacing : '+ this.data['cellspacing']+ 'px;left:' +rX+ 'px;top:'+rY+ 'px;width:100%;height:100%;position:absolute;overflow:hidden;text-overflow:hidden;background:#FFFFFF" >';
        	var tableBody = '<tbody>'; 
        	
        	for (var row = 0; row < this.data.rowCnt ; row++){
        		var comRow = row +1;
        		tableBody += '<tr com_row ="'+comRow+ '" >';
        		for (var col = 0; col < this.data.colCnt ; col++){
        			var com_col = col + 1;
        			tableBody += '<td  com_row = "'+ comRow +'" com_col = "'+com_col +'" style ="text-align:left;vertical-align:center;padding:'+ this.data.cellpadding + 'px;"></td>';
        		}
        		tableBody += '</tr>';	
        	}
        	tableBody += '</tbody>'
        	this.originalElementStr = table + tableBody  +  "</table>";
        	this.originalElement = $(this.originalElementStr);
        	
        	this.originalElement.css('border' , border );
        	this.originalElement.find('tr').css('border' , border );
        	this.originalElement.find('td').css('border' , border );
        	
        	this.originalElement.find('tr').css('width' ,"100%");
        	this.originalElement.find('td').css('color',  this.data['color']);
        	this.originalElement.find('td').css('font-size',  this.data['font-size']);
        	this.originalElement.find('td').css('font-family' ,this.data['font-family']);
        	this.originalElement.find('td').html('<div style ="line-height:30px;margin:3px;margin-left:10px;width:100%;height:100%" contenteditable="true"></div>')
        	this.originalElement.find('td > div').css('font-size' ,this.data['font-size']);
        	this.originalElement.find('td > div').css('font-family' ,this.data['font-family']);

        	this.originalElement.css('background-color', this.data['background-color']);
        	this.originalElement.css('opacity', this.data['opacity']);
        	this.originalElement.css('filter', 'alpha(opacity = '+ this.data['opacity']+')');
        	this.originalElement.css('-ms-filter', 'alpha(opacity=' +this.data['opacity']+')');
        
        	//this.originalElement.find('td').css('width' ,tdWidth);
        	//this.originalElement.find('tr').css('height' ,trHeight);
        	break;
    }

};

A3Maker.Component.Base.prototype.addWrapperElements = function () {
    if (!this.data.type ) return;
    $(this.originalElement).wrap(this.wrapperStr);
    $(this.internalWrapperQueryStr).after(this.resizingBorderStr);
    $(this.internalWrapperQueryStr).after(this.componentBorderLine);

    var elemLeft = this.data.left + 'px';
    var elemTop = this.data.top + 'px';
    //var wrapperLeft = (elemLeft - this.cornerActionTriggerRadius) + 'px';
    //var wrapperTop = (elemTop - this.cornerActionTriggerRadius) + 'px';

    $(this.externalWrapperQueryStr).css('left', elemLeft);
    $(this.externalWrapperQueryStr).css('top', elemTop);

    $(this.originalElement).css('left', 0);
    $(this.originalElement).css('top', 0);

};

A3Maker.Component.Base.prototype.adjustWrapper = function () {
    var elemWidth = this.data.width;
    var elemHeight = this.data.height;
    var externalWrapperWidth = (elemWidth + this.cornerActionTriggerRadius * 2) + 'px';
    var externalWrapperHeight = (elemHeight + this.cornerActionTriggerRadius * 2) + 'px';

    $(this.internalWrapperQueryStr).width(elemWidth);
    $(this.internalWrapperQueryStr).height(elemHeight);
    
    $(this.externalWrapperQueryStr).width(elemWidth);
    $(this.externalWrapperQueryStr).height(elemHeight);

    //if (this.data.type == 'list'){
    	//$.each(this.childs, function(index, listrow){
    		//$(listrow.originalElementQueryStr).css('width' , elemWidth-15);
    		
    	//});
   // }
    //listrow 일 경우 순차 배치함
    if (this.data.type == 'listrow') {
        $(this.externalWrapperQueryStr).css('position', 'relative');
        var widthPercent = (this.parent.data.width / (this.parent.data.width + A3Maker.scrollBarWidth)) * 100;
        $(this.externalWrapperQueryStr).css('width', this.parent.data.width - 15);
        $(this.internalWrapperQueryStr + ' .component-listrow').css('width', this.parent.data.width - 15);
    }
};

A3Maker.Component.Base.prototype.calcValueByZoom = function (type, value) {
    if (type == "left" || type == "width") {
        return (value * A3Maker.controller.canvasWidth) / A3Maker.project.width;
    }
    if (type == "top" || type == "height") {
        return (value * A3Maker.controller.canvasHeight) / A3Maker.project.height;
    }
};

A3Maker.Component.Base.prototype.displayComponentInfo = function (selector) {
    if (this.selectStatus == true) {
        var displayText = "x : " + this.data.left + " ,  ";
        displayText += "y : " +this.data.top + "  ,  ";
        displayText += "width: " + this.data.width + "  , ";
        displayText += "height : " + this.data.height +"   ";
        $('#position').text(displayText);
    }
};

A3Maker.Component.Base.prototype.enablePropertyWindow = function (shown) {
    //console.log("[enablePropertyWindow caller]  : " + arguments.callee.caller.toString());
    if (shown) {
        //pass default infos to property window
        A3Maker.propertyWindow.setInitInfo({ 
        	name: this.data.name, 
        	x: this.data.left, 
        	y: this.data.top, 
        	width: this.data.width, 
        	height: this.data.height, 
        	fixRatio: this.data.fixRatio 
        	});
        A3Maker.propertyWindow.showPropertyWindow(
        		this.data.type/*,this.originalElement.offset().left + this.data.width + 10, this.originalElement.offset().top*/
        );
    } else {
        A3Maker.propertyWindow.closePropertyWindow();
    }
};

A3Maker.Component.Base.prototype.isContainer = function () {
    var containerInfo = {isContainer : false, type : this.data.type};
    if (this.data.type == "list" || this.data.type == 'listrow' || this.data.type == 'popup') {
        containerInfo.isContainer = true;
    }
    return containerInfo;
};


A3Maker.Component.Base.prototype.destroy = function (shown) {
    this.selectStatus = false;
    this.detach();
    A3Maker.setSelectedComponent(null);
};

A3Maker.Component.Base.prototype.setSelectStatus = function (selectStatus, ext) {
    if (selectStatus == true) {
    	A3Maker.controller.resetEditor();
    	var parentArr = [];
    	$.each(parentArr, function(inx, parent){
    		node  = A3Maker.controller.$tree.tree('getNodeById', parent.data.UUID);
    		A3Maker.controller.$tree.tree('openNode', node);
    	});

    	A3Maker.findParentsRecursive(parentArr, this);
        A3Maker.controller.enableBeforeGrayPanel(false, null);
   		
   		A3Maker.controller.applyToolButtonChange(this);
   		var node = A3Maker.controller.$tree.tree('getNodeById', this.data.UUID);
   		A3Maker.controller.$tree.tree('selectNode', node);
        A3Maker.setSelectedComponent(this);
        
        this.enablePropertyWindow(true);
        this.showBorderTool();
        this.showGripTool();

        if (parentArr.length == 1 && parentArr[0].data.type == "page") {
            if (this.data.type == "popup") A3Maker.controller.enableBeforeGrayPanel(true, this);
            $(this.externalWrapperQueryStr).show();
        }

        if (parentArr.length > 1) {
            if (parentArr[1].data.type == "popup") A3Maker.controller.enableBeforeGrayPanel(true, parentArr[1]);
            $(parentArr[1].externalWrapperQueryStr).show();
        }
        
    } else {
    	$('.attributes_center span.top_x_pos').html('');
    	$('.attributes_center span.top_y_pos').html('');
        this.enablePropertyWindow(false);
        this.hideBorderTool();
        this.hideGripTool();
        this.currentAction = this.ActionsEnum.None;

        A3Maker.controller.$tree.tree('selectNode', null);
    }
   this.selectStatus = selectStatus;
};

A3Maker.Component.Base.prototype.hideBorderTool = function () {
        $(this.componentBorder).hide();
};


A3Maker.Component.Base.prototype.showBorderTool = function () {
    $(this.componentBorder)
        .removeClass("component_border_multi_select")
        .addClass('component_border_common')
        .show();
};

A3Maker.Component.Base.prototype.showBorderSelect= function () {
    $(this.componentBorder)
        .removeClass("component_border_common")
        .addClass('component_border_multi_select')
        .show();
};

A3Maker.Component.Base.prototype.hideBorderSelect = function () {
    $(this.componentBorder)
        .removeClass("component_border_multi_select")
        .addClass('component_border_common')
        .hide();
};

A3Maker.Component.Base.prototype.show= function () {
    $(this.moveActionTriggerQueryStr).hide();
};

A3Maker.Component.Base.prototype.hide = function () {
    $(this.moveActionTriggerQueryStr).show();
};

A3Maker.Component.Base.prototype.hideGripTool = function () {
    $(this.resizingGripStr).hide();
    if (this.data.type == "listrow") {
        $(this.gripBottomLineStr).hide();
    }
};

A3Maker.Component.Base.prototype.showGripTool = function () {
    if (this.data.type == "popup" || this.data.type == "listrow" || this.data.type == "list") {
        $(this.resizingGripStrDirectChild).show();
    } else {
        $(this.resizingGripStr).show();
    }

    if (this.data.type == "listrow") {
        this.hideGripTool();
        $(this.gripBottomLineStr).show();
    }
};


A3Maker.Component.Base.prototype.createComponent = function (type, childAdd, treeAdd, options) {
    // 컨테이너 컴포넌트가 아닐 경우 자식 컴포넌트 생성 불가 
    if (!this instanceof A3Maker.Component.ListComponent &&
        !this instanceof A3Maker.Component.PopupComponent &&
        !this instanceof A3Maker.Component.ListRowComponent) throw "invalid container";

    var childAdd = typeof childAdd !== 'undefined' ? childAdd : true;
    var treeAdd  = typeof treeAdd !== 'undefined' ? treeAdd : true;

    //컨테이어에 요청 컴포넌트를 올릴 수 있는 지 체크 
    var permit = this.checkPermittable(type);
    if (!permit) throw "can`t a component in this container [" + this.data.type + "]";
    var component = A3Maker.Component.build(this, type, options);

    if (childAdd) {
        this.addComponent(component);
    }
    if (treeAdd) {
        this.addComponentToTree(component);
    }
   // console.log("childs length : " + this.childs.length);
    return component;
};

A3Maker.Component.Base.prototype.removeComponent = function (component) {
    //컨테이너 컴포넌트가 아닐 경우  액션 불가 
    if (!this instanceof A3Maker.Component.ListComponent &&
        !this instanceof A3Maker.Component.PopupComponent &&
        !this instanceof A3Maker.Component.ListRowComponent) throw "invalid container";

    var index = -1;
    $.each(this.childs, function (inx, child) {
        if (component.getProperty('UUID') == child.getProperty('UUID')) {
            index = inx;
            return;
        }
    });

    if (index != -1) {
        this.childs.splice(index, 1);
    }
    
    this.removeCompoentToTree(component);
    component.selectStatus = false;
    component.detach();
};

A3Maker.Component.Base.prototype.removeCompoentToTree = function (component) {
    var node = A3Maker.controller.$tree.tree("getNodeById", component.data.UUID);
    A3Maker.controller.$tree.tree('removeNode', node);
};


A3Maker.Component.Base.prototype.addComponent = function (addComp) {
    if (!this instanceof A3Maker.Component.ListComponent &&
            !this instanceof A3Maker.Component.PopupComponent &&
            !this instanceof A3Maker.Component.ListRowComponent) return false;
    this.childs.push(addComp);
};

A3Maker.Component.Base.prototype.addComponentToTree = function (component) {
    var parentNode = A3Maker.controller.$tree.tree("getNodeById", component.parent.data.UUID);
    A3Maker.controller.$tree.tree(
        'appendNode',
        {
            label: component.data.name,  //name
            id: component.data.UUID,
            type: component.data.type,
            data: component
        },
      parentNode
  );
};

A3Maker.Component.Base.prototype.checkPermittable = function (type) {
    var permittables = A3Maker.componentType[this.data.type].permittableChildComps;
    var permit = false;
    for (var i = 0; i < permittables.length ; i++) {
        if (permittables[i] == type) permit = true;
    }
    return permit;
};

//컨테이너 객체일 경우, 
A3Maker.Component.Base.prototype.createComponentNo = function (type) {
    var index = 0;
    var matchChilds = $.map(this.childs, function (comp) {
        if (comp.type == type) {
            return comp;
        } else {
            return null;
        }
    });

    if (Array.isArray(matchChilds)) {
        if (matchChilds.length == 0) {
            index = 1;
        } else {
            index = matchChilds[matchChilds.length - 1].no + 1;
        }
        return index;
    }
};


A3Maker.Component.Base.prototype.extract = function (options) {
    var context = this;
    $.each(options, function (key, value) {
        context.setProperty(key, value);
    });
};

//getter 
A3Maker.Component.Base.prototype.getProperty = function (key) {
    if (this.hasOwnProperty(key)) {
        return this[key];
    } else {
        return false;
    }
};

//setter 
A3Maker.Component.Base.prototype.setProperty = function (key, value) {
    this[key] = value;
};

//고유 아이디를 생성
A3Maker.Component.Base.prototype.genUUID = function () {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
};

//이벤트 액션 상수 
A3Maker.Component.Base.prototype.ActionsEnum = {
    None: 0,
    LeftResize: 1,
    TopResize: 2,
    RightResize: 3,
    BottomResize: 4,
    TopLeftResize: 5,
    BottomLeftResize: 6,
    TopRightResize: 7,
    BottomRightResize: 8,
    Move: 9
};

A3Maker.Component.Base.prototype.cornerActionTriggerRadius = 8;

A3Maker.Component.Base.prototype.showWrapper = function () {
    this.addWrapperElements();
    this.initializeEventHandlers();
    if (this.data.type == "listrow") {
      //  $(this.externalWrapperQueryStr).css("z-index", '9999999');
    }
    if (this.data.type == "listrow") {
        $(this.moveActionTriggerQueryStr).remove();
    }
};

A3Maker.Component.Base.prototype.hideWrapper = function () {
    var wrapperLeft = parseInt($(this.externalWrapperQueryStr).css('left'));
    var wrapperTop = parseInt($(this.externalWrapperQueryStr).css('top'));
    var elemLeft = (wrapperLeft + this.cornerActionTriggerRadius) + 'px';
    var elemTop = (wrapperTop + this.cornerActionTriggerRadius) + 'px';
    $(this.originalElement).css('left', elemLeft);
    $(this.originalElement).css('top', elemTop);
    $(this.originalElement).css('position', $(this.externalWrapperQueryStr).css('position'));

    $(this.externalWrapperQueryStr).replaceWith(this.originalElement);
};



A3Maker.Component.Base.prototype.initializeEventHandlers = function () {
    var wrapper = this;
	
    if (this.data.type == "listrow") {
        $(this.gripBottomLineStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.BottomResize;
            A3Maker.project.isComponentAction = true;
        });
    } else {
        $(this.topMiddleActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.stopPropagation();
            event.preventDefault();
            wrapper.currentAction = wrapper.ActionsEnum.TopResize;
            A3Maker.project.isComponentAction = true;
        });

        $(this.leftMiddleActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.stopPropagation();
            event.preventDefault();
            wrapper.currentAction = wrapper.ActionsEnum.LeftResize;
            A3Maker.project.isComponentAction = true;
        });

        $(this.rightMiddleActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.RightResize;
            A3Maker.project.isComponentAction = true;
        });

        $(this.bottomMiddleActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.BottomResize;
            A3Maker.project.isComponentAction = true;
        });
        
        /* 컴포넌트 라인 액션 이벤트*/
        if (this.data.type == "table"){
        	 $(this.bottomActionTriggerQueryStr).css('cursor' ,'move');
        	 $(this.topActionTriggerQueryStr).css('cursor' ,'move');
        	 $(this.leftActionTriggerQueryStr).css('cursor' ,'move');
        	 $(this.rightActionTriggerQueryStr).css('cursor' ,'move');
        }
        $(this.bottomActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.BottomResize;
            if (wrapper.data.type =='table') {
            	wrapper.currentAction = wrapper.ActionsEnum.Move;
            }
            A3Maker.project.isComponentAction = true;
        });
        
        $(this.topActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.TopResize;
            if (wrapper.data.type =='table') {
            	wrapper.currentAction = wrapper.ActionsEnum.Move;
            }
            A3Maker.project.isComponentAction = true;
        });
        
        $(this.leftActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.LeftResize;
            if (wrapper.data.type =='table') {
            	wrapper.currentAction = wrapper.ActionsEnum.Move;
            }
            A3Maker.project.isComponentAction = true;
        });
        
        $(this.rightActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.RightResize;
            if (wrapper.data.type =='table') {
            	wrapper.currentAction = wrapper.ActionsEnum.Move;
            }
            A3Maker.project.isComponentAction = true;
        });
        
        
        /*//-- 컴포넌트 라인 액션 이벤트 - 드래그 이벤트로 변경 end*/

        $(this.gripBottomLineStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.BottomResize;
            A3Maker.project.isComponentAction = true;
        });

        $(this.topLeftActionTriggerQueryStr).mousedown(function (event) {
        	A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.TopLeftResize;
            A3Maker.project.isComponentAction = true;
        });

        $(this.topRightActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            wrapper.currentAction = wrapper.ActionsEnum.TopRightResize;
            A3Maker.project.isComponentAction = true;
        });

        $(this.bottomLeftActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            A3Maker.project.isComponentAction = true;
            wrapper.currentAction = wrapper.ActionsEnum.BottomLeftResize;
        });

        $(this.bottomRightActionTriggerQueryStr).mousedown(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            A3Maker.project.isComponentAction = true;
            wrapper.currentAction = wrapper.ActionsEnum.BottomRightResize;
        });

        $(this.moveActionTriggerQueryStr).dblclick(function (event) {
            A3Maker.multiSelectionRect.resetSelection();
            event.preventDefault();
            event.stopPropagation();
            if (wrapper.data.type == "text") {
                $(wrapper.textInputAreaQueryStr).select();
                $(wrapper.textInputAreaQueryStr).focus();
            }
            
            if (wrapper.data.type == "script") {
            	A3Maker.codeWindow.open('JS/HTML', wrapper);
            }
        });


        if (this.data.type == "text") {
            $(wrapper.textInputAreaQueryStr).focusout(function () {
                event.preventDefault();
                wrapper.data.text = $(this).val();
            });
        }
    }
    // -------> if end 
    
    if (this.data.type == 'table'){
    	this.originalElement.hover(function(){
    		wrapper.originalElement.find('td').resizable();
    		wrapper.originalElement.find('td').resizable('enable');
    		wrapper.showBorderTool();
    	}, 
    	function(){
    		wrapper.originalElement.find('td').resizable();
    		wrapper.originalElement.find('td').resizable('disable');
    		if (wrapper.selectStatus == false) {
				wrapper.hideBorderTool();
			}
    	})
    	this.originalElement.css('cursor','text');
    	this.originalElement.find('td').click(function(){
    		//wrapper.originalElement.find('td').resizable();
    		//wrapper.originalElement.find('td').resizable('disable');
    		
    		if (wrapper.selectStatus == false) {
    			wrapper.setSelectStatus(true);
    		}
    		event.stopPropagation();
    		event.preventDefault();
    		//A3Maker.contextMenu.close();
			//A3Maker.multiSelectionRect.resetSelection();
			//A3Maker.project.isComponentAction = false;
    	});
    } else {
		$(this.moveActionTriggerQueryStr).mousedown(function(event) {
			if (A3Maker.propertyWindow.isUploading) {
				alert("now is uploading..please wait");
				return;
			}
		
			if (event.ctrlKey) {
				event.stopPropagation();
				event.preventDefault();
				/* listrow 와 popup는 개별 선택을 할 수 없음*/
				if (wrapper.data.type == "popup" || wrapper.data.type == "listrow") {
					wrapper.setSelectStatus(false);
					return;
				} 
					
				if (A3Maker.multiSelectionRect.isComponentContained(wrapper)) {
					A3Maker.multiSelectionRect.removeComponentToSelection(wrapper);
				} else {
					if (A3Maker.multiSelectionRect.getMultiSelectedComponentCount() < 1){
						var selectedComponent = A3Maker.getSelectedComponent();
						if (selectedComponent ) selectedComponent .setSelectStatus(false);	
					}
					A3Maker.multiSelectionRect.addComponentToSelection(wrapper);
				}
				return;
			} else {
				event.stopPropagation();
				event.preventDefault();
				
				if (!A3Maker.multiSelectionRect.isComponentContained(wrapper)) {
					A3Maker.contextMenu.close();
					A3Maker.multiSelectionRect.resetSelection();
					wrapper.setSelectStatus(true);
					A3Maker.project.isComponentAction = true;
				}
				if (wrapper.type ="table") {
					wrapper.originalElement.find('.component-table-hover').removeClass('component-table-hover');
				}
				wrapper.currentAction = wrapper.ActionsEnum.Move; 
			}
		});
		
		$(this.moveActionTriggerQueryStr).mouseover(function(event) {
			event.preventDefault();
			event.stopPropagation();
			
			if (event.ctrlKey || A3Maker.multiSelectionRect.isMultiSelected()) return;
			if (A3Maker.multiSelectionRect.isComponentContained(wrapper) || 
				A3Maker.multiSelectionRect.curSelectionAction == A3Maker.multiSelectionRect.selectionActionEnum.drag) 
				return;
			
			if (A3Maker.project.isComponentAction == false) {
				if (wrapper.selectStatus == false)  wrapper.showBorderTool();
			}
		});
		
		$(this.moveActionTriggerQueryStr).mouseout(function(event) {
			event.preventDefault();
			event.stopPropagation();
			if (A3Maker.multiSelectionRect.isComponentContained(wrapper)) {
				//console.log("selected");
				return;
			}
		
			if (A3Maker.project.isComponentAction == false) {
				if (wrapper.selectStatus == false) {
					wrapper.hideBorderTool();
				}
			}
		});
    }
   

	/*
	 * 모든 오브젝트가 document.mousemove 이벤트를 받고 처리하기 때문에 속도가 저하됨
	 * (아래의 이벤트를 제거하면 속도는 빨라짐)
	 * 선택된 컴포넌트만 move 이벤트를 받는 구조로 변경할 필요가 있음
	 * (선택되었을 때 doucment.move 이벤트를 걸고, 선택이 해제되었을 경우 move 이벤트를 해제하는 방법등 기타 방법이 고안되어야 함
	 * 	아래의 마우스 업 이벤트도 마찬가지 임
	 */
	$(A3Maker.editorPane).mousemove(function(event) {
		if (!event.ctrlKey) {
			//var selectedComponent = A3Maker.getSelectedComponent() 
			//if (selectedComponent && wrapper == selectedComponent) {
				wrapper.onMouseMove(event);
			//}
		}
	});

	$(A3Maker.editorPane).mouseup(function(event) {
		//if (wrapper.selectStatus) {
			//wrapper.enablePropertyWindow(true);
		//}
		A3Maker.project.isComponentAction = false;
		wrapper.currentAction = wrapper.ActionsEnum.None;
	}); 
};

A3Maker.Component.Base.prototype.onMouseMove = function (event) {
	/*테이블인 경우 이벤트 변경*/ 

	var currMouseX = event.clientX;
    var currMouseY = event.clientY;

    var deltaX = currMouseX - this.lastMouseX;
    var deltaY = currMouseY - this.lastMouseY;

    if (Math.abs(deltaX) < A3Maker.controller.snapValue &&Math.abs(deltaY) < A3Maker.controller.snapValue) 
        return;

    this.applyMouseMoveAction(deltaX, deltaY);
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
};

A3Maker.Component.Base.prototype.applyMouseMoveAction = function (deltaX, deltaY) {
	var deltaTop = 0;
    var deltaLeft = 0;
    var deltaWidth = 0;
    var deltaHeight = 0;
    if (typeof this.currentAction === 'undefined' ||  this.currentAction == this.ActionsEnum.RightResize.None) return;
    if (this.currentAction == this.ActionsEnum.RightResize ||
             this.currentAction == this.ActionsEnum.TopRightResize ||
             this.currentAction == this.ActionsEnum.BottomRightResize) {
        deltaWidth = deltaX;
        if (!A3Maker.propertyWindow.isPositionFixed) this.enablePropertyWindow(false);
    }

    if (this.currentAction == this.ActionsEnum.LeftResize ||
             this.currentAction == this.ActionsEnum.TopLeftResize ||
             this.currentAction == this.ActionsEnum.BottomLeftResize) {
        deltaWidth = -deltaX;
        deltaLeft = deltaX;
        if (!A3Maker.propertyWindow.isPositionFixed) this.enablePropertyWindow(false);
    }

    if (this.currentAction == this.ActionsEnum.BottomResize ||
             this.currentAction == this.ActionsEnum.BottomLeftResize ||
             this.currentAction == this.ActionsEnum.BottomRightResize) {
        deltaHeight = deltaY;
        if (!A3Maker.propertyWindow.isPositionFixed) this.enablePropertyWindow(false);
    }

    if (this.currentAction == this.ActionsEnum.TopResize ||
             this.currentAction == this.ActionsEnum.TopLeftResize ||
             this.currentAction == this.ActionsEnum.TopRightResize) {
        deltaHeight = -deltaY;
        deltaTop = deltaY;
        if (!A3Maker.propertyWindow.isPositionFixed) this.enablePropertyWindow(false);
    }

    if (this.currentAction == this.ActionsEnum.Move) {
        deltaLeft = deltaX;
        deltaTop = deltaY;
        if (!A3Maker.propertyWindow.isPositionFixed) this.enablePropertyWindow(false);
    }

    //현재는 type 이 listrow 인 경우 부모인 list를 적용하기 때문에 주석 처리 
    /*
    if (this.data.type == "listrow") {
        deltaLeft = 0;
        deltaTop = 0;
    }
    */

    if (A3Maker.multiSelectionRect.isComponentSelected()) {
        $.each(A3Maker.multiSelectionRect.selectionComponentArr, function (inx, com) {
            com.updatePosition(deltaLeft, deltaTop);
            com.updateSize(deltaWidth, deltaHeight);
            com.adjustWrapper();
            com.updateComponentInfo(deltaLeft, deltaTop, deltaWidth, deltaHeight);
        });
    } else {
    	// 현재 컴포넌트가 listrow 인 경우는 하단 리사이징 액션만 처리
		if (this.data.type == 'listrow'  && this.currentAction == this.ActionsEnum.BottomResize){
			
		}else {
			
		}
		
    this.updatePosition(deltaLeft, deltaTop);
    this.updateSize(deltaWidth, deltaHeight);
    this.updateComponentInfo(deltaLeft, deltaTop, deltaWidth, deltaHeight);
    
		//  선택된 컴포넌트와 맞춤 라인 그리기
		if (this.selectStatus && this.currentAction == this.ActionsEnum.Move) {
			var componentArr = A3Maker.project.getSelectedPage().childs;
			
			if (componentArr.length > 0 ) {
				var gridLines = [];
				var pageWidth  = $(A3Maker.holder).width();
				var pageHeight = $(A3Maker.holder).height();
				
				for (var i = 0; i < componentArr.length ; i++ ){
					var element = componentArr[i];
					if (this != element) {
						if (this.data.top == element.data.top || this.data.top == element.data.top + element.data.height ) {
							gridLines.push([0, this.data.top, pageWidth, this.data.top]);
							break;
						}
						
						if (this.data.top + this.data.height == element.data.top || this.data.top + this.data.height == element.data.top + element.data.height ) {
							gridLines.push([0, this.data.top + this.data.height, pageWidth, this.data.top + this.data.height]);
							break;
						}
					}
				}
				
				for (var i = 0; i < componentArr.length ; i++ ){
					var element = componentArr[i];
					if (this != element) {
						if (this.data.left == element.data.left || this.data.left == element.data.left + element.data.width) {
							gridLines.push([this.data.left, 0, this.data.left, pageHeight]);
							break;
						}
						if (this.data.left + this.data.width == element.data.left || this.data.left + this.data.width == element.data.left + element.data.width) {
							gridLines.push([this.data.left + this.data.width, 0, this.data.left + this.data.width, pageHeight]);
							break;
						}
					}
				}
				setTimeout(function(){
					A3Maker.draw.drawLines(gridLines);
					gridLines.lenght = 0; 
					gridLines= null; 
				},10)
			}
		}

    //if this resizing comonent is a listwrow,  all of rows after this row must be adjust y coodinate as delta Height;
    if (this.data.type == 'listrow' && this.currentAction == this.ActionsEnum.BottomResize)
        this.updatePositionNextRows(deltaWidth, deltaHeight);

    this.adjustWrapper();

    if (this.selectStatus) {
        A3Maker.propertyWindow.setPosition(this.data.left, this.data.top, this.data.width, this.data.height);
        A3Maker.propertyWindow.movePropertyWindow(
            $(this.originalElement).offset().left + this.data.width + 10, $(this.originalElement).offset().top);
    	};
    }
};

A3Maker.Component.Base.prototype.getAdjustValueByZoom= function (value) {
	var curZoom = A3Maker.canvas.zoom;
	if (curZoom == 100) return value;
	
	var adjustValue = 0; 
	if (curZoom < 100)  
		adjustValue = parseInt(value / (A3Maker.canvas.zoom/100));
	else 
		adjustValue = parseInt((100 * value)  / A3Maker.canvas.zoom);
	return adjustValue;
};


//축소 확대된 좌표 및 이동량을 실제 해상도 로 변경
A3Maker.Component.Base.prototype.updatePosition = function (deltaLeft, deltaTop) {
	
	var component = this;
	//드래그 하는 컴포넌트가 listrow 인 경우 부모인 list를 적용
	if (this.data.type == 'listrow') component = this.parent;
    
    var elemLeft = parseInt($(component.externalWrapperQueryStr).css('left'));
    var elemTop = parseInt($(component.externalWrapperQueryStr).css('top'));
	
	var newLeft = 0;
    var newTop = 0;
    
    
    var newLeft = elemLeft + component.getAdjustValueByZoom(deltaLeft);
   	var newTop = elemTop + component.getAdjustValueByZoom(deltaTop);
    
    $(component.externalWrapperQueryStr).css('left', newLeft + 'px');
    $(component.externalWrapperQueryStr).css('top', newTop + 'px');
};

A3Maker.Component.Base.prototype.updateSize = function (deltaWidth, deltaHeight) {
	if (this.currentAction < 1 ||  this.currentAction > 8) return;
	
    var elemWidth = parseInt($(this.originalElement).width());
    var elemHeight = parseInt($(this.originalElement).height());
    
    var newWidth  = elemWidth + this.getAdjustValueByZoom(deltaWidth);
    var newHeight = elemHeight + this.getAdjustValueByZoom(deltaHeight);
	
	var adjustDeltaWidth = this.getAdjustValueByZoom(deltaWidth);
	var adjustDeltaHeight = this.getAdjustValueByZoom(deltaHeight);
	
	var naturalWidth = $(this.originalElement).get(0).naturalWidth;
	var naturalHeight = $(this.originalElement).get(0).naturalHeight;
		
	if (this.fixRatio == true){
		newWidth  = elemWidth + adjustDeltaWidth; 
    	newHeight = elemHeight + this.getAdjustValueByZoom(parseInt((naturalHeight * deltaWidth)/naturalWidth));
	}else {
		newWidth  = elemWidth + adjustDeltaWidth;
    	newHeight = elemHeight + adjustDeltaHeight;
	}
	
    var minumalSize = 1;//this.cornerActionTriggerRadius * 2;
   
    if (newWidth < minumalSize)  newWidth = minumalSize;
    if (newHeight < minumalSize)  newHeight = minumalSize;

    $(this.originalElement).css('width', newWidth + 'px');
    $(this.originalElement).css('height', newHeight + 'px');
};

A3Maker.Component.Base.prototype.updateComponentInfo = function (deltaLeft, deltaTop, deltaWidth, deltaHeight) {
    
    var context = this;
 	if (this.data.type == 'listrow'){
	    this.data['left'] = 0; 
	    this.data['top']  =  this.data['top'];
	  
	    this.data.width + this.getAdjustValueByZoom(deltaWidth);
   	 	this.data.height + this.getAdjustValueByZoom(deltaHeight);
   	 	  
	    this.parent.data.left = this.parent.data.left + this.parent.getAdjustValueByZoom(deltaLeft);
	    this.parent.data.top = this.parent.data.top + this.parent.getAdjustValueByZoom(deltaTop);
	  
 	}else {
 		this.data.left = this.data.left + this.getAdjustValueByZoom(deltaLeft);
    	this.data.top  = this.data.top + this.getAdjustValueByZoom(deltaTop);
    	this.data.width = this.data.width + this.getAdjustValueByZoom(deltaWidth);
    	this.data.height = this.data.height + this.getAdjustValueByZoom(deltaHeight);
 	}
 	
    var minimalSize = this.cornerActionTriggerRadius * 2;
    
    if (this.data.width < minimalSize) this.data.width = minimalSize;
    if (this.data.height < minimalSize)  this.data.height = minimalSize;
        	
    if (this.selectStatus) {
     	A3Maker.propertyWindow.setPosition(this.data.left, this.data.top, this.data.width, this.data.height);
        A3Maker.propertyWindow.movePropertyWindow(
        	$(this.originalElement).offset().left + this.data.width + 10, $(this.originalElement).offset().top);
     }	
    // 현재 타입이 리스트이고, 좌 우측 리사이징 일 경우, 자식 로우의 사이즈를 변경
    if (this.data.type == "list" && ( this.currentAction == this.ActionsEnum.LeftResize || this.currentAction == this.ActionsEnum.RightResize)) {
        $.each(this.childs, function (inx, listRow) {
            listRow.data.width = context.data.width;
            $(listRow.wrapperStr).css('width', context.data.width);
            $(listRow.originalElementStr).css('width', context.data.width);
        });
    }
    // 위치 정보를 표시, 차후 이벤트 콜백으로 변경 예정 
    //this.displayComponentInfo('#position');
};


A3Maker.Component.Base.prototype.updatePositionNextRows = function (deltaWidth, deltaHeight) {
    if (this.parent.childs.length < 2) return;  // return if this.parent only have less then one row
    var nextRowIndex = -1;
    var context = this;
    
    $.each(this.parent.childs, function (inx, listrow) {
        if (listrow.data.UUID == context.data.UUID) {
            nextRowIndex = inx;
            return;
        }
    });
    //return if this listrow is the last row
    if (nextRowIndex == -1) return;
    $.each(this.parent.childs, function (inx, listrow) {
        if (inx >= nextRowIndex) {
    		console.log("[-----------updatePositionNextRows] " + inx);
            console.log(listrow.data.top + " : " + deltaHeight);
            listrow.data.top = listrow.data.top + deltaHeight;
        }
    });
};

A3Maker.Component.Base.prototype.setPositionAndWidth = function (x, y, width, height) {
    //alert(x + " : " + y + " ; " + width + " : " + height);
    var deltaLeft = -(this.data.left - x);
    var deltaTop = -(this.data.top - y);
    var deltaWidth = -(this.data.width - width);
    var deltaHeight = -(this.data.height - height);
	
	//upate position
	var elemLeft = parseInt($(this.externalWrapperQueryStr).css('left'));
    var elemTop = parseInt($(this.externalWrapperQueryStr).css('top'));
    
    var newLeft = elemLeft + deltaLeft;
   	var newTop = elemTop + deltaTop;

    $(this.externalWrapperQueryStr).css('left', newLeft + 'px');
    $(this.externalWrapperQueryStr).css('top', newTop + 'px');
    
 	//update size 
	var elemWidth = parseInt($(this.originalElement).width());
    var elemHeight = parseInt($(this.originalElement).height());
    
    var newWidth = elemWidth + deltaWidth;
    var newHeight = elemHeight + deltaHeight;

    var minumalSize = this.cornerActionTriggerRadius * 2;
   
    if (newWidth < minumalSize)  newWidth = minumalSize;
    if (newHeight < minumalSize)  newHeight = minumalSize;

    $(this.originalElement).css('width', newWidth + 'px');
    $(this.originalElement).css('height', newHeight + 'px');
     	   
    this.adjustWrapper();
    
    //update component info 
    this.data.left = x;
    this.data.top = y;
    this.data.width = width;
    this.data.height = height;
    
    var minimalSize = this.cornerActionTriggerRadius * 2;
    
    if (this.data.width < minimalSize) this.data.width = minimalSize;
    if (this.data.height < minimalSize)  this.data.height = minimalSize;
    
     if (this.selectStatus) {
     	    //상단의 x, y 좌표값 갱신
    	$('.attributes_center span.top_x_pos').html(this.data.left);
    	$('.attributes_center span.top_y_pos').html(this.data.top);
     	A3Maker.propertyWindow.setPosition(this.data.left, this.data.top, this.data.width, this.data.height);
        A3Maker.propertyWindow.movePropertyWindow(
        	$(this.originalElement).offset().left + this.data.width + 10, $(this.originalElement).offset().top);
     }	
    
    if (this.data.type == "list") {
       var context = this;
        $.each(this.childs, function (inx, listRow) {
            listRow.width = context.data.width;
            $(listRow.wrapperStr).css('width', context.data.width);
            $(listRow.originalElementStr).css('width', context.data.width);
        });
    }
     
};

A3Maker.Component.Base.prototype.setRadius = function (radius) {
	this.data.radius = radius;
	$(this.originalElement).css('border-radius', radius+'%');
};

A3Maker.Component.Base.prototype.setBorder= function (border) {
	this.border = border;
	this.updateSize(border*2,border*2);
	$(this.originalElement).css('border', border + "px solid #888");
};


A3Maker.Component.Base.prototype.setImage= function(imagePath){
	this.src = imagePath;
	$(this.originalElement).attr('src', this.src);
};
//Co

A3Maker.Component.Base.prototype.resetImage = function(){
	this.data['background-image'] = this.defaultsrc;
	$(this.originalElement).attr('src', this.data['background-image']);
};

//Component classes extends super class (Component)
A3Maker.Component.ImageComponent = function (parent , userOptions) {
	this.defaultsrc  = "images/img_image.png";
		var options = {
			left: 10, 
			top : 10, 
			type : 'image',
			width : 60, 
			height : 60, 
			fixRatio : false,
			'background-image' : this.defaultsrc
		};
    
	this.componentSettings = {
		selectable : true,
		draggablee : true,
		resizeable : false
	};
	if (userOptions) $.extend(options, userOptions);
    this.parent = parent;
    A3Maker.Component.Base.call(this, options);
};

A3Maker.Component.ImageComponent.prototype.refresh = function (parent) {
    $(this.originalElement).attr('src', this.data['background-image']);
};


A3Maker.Component.TextComponent = function (parent , userOptions) {
    var options = {
	    left: 10, 
		top : 10, 
	    width: 250, 
	    height: 80, 
	    type : 'text',
	    fixRatio: false, 
	    placeHolder : "Insert Text",
	    text : "",
	    'font-family' :  "Open Sans",
	    'font-size' : "30pt",
	    'font-weight' : 100,
	    color : "#FF862D"
    };
    
    this.componentSettings = {
        selectable : true,
        draggablee : true,
        resizeable : false
    };
    if (userOptions) $.extend(options, userOptions);
    this.parent = parent;   
    
    A3Maker.Component.Base.call(this, options);
    this.textInputAreaQueryStr = this.externalWrapperQueryStr + ' .text_input_area';
};

A3Maker.Component.TextComponent.prototype.refresh = function (parent) {
    $(this.originalElement).find('.text_input_area')
    	.val(this.data.text)
    	.css({
         fontSize: this.data['font-size'],
         fontFamily: this.data['font-family'],
         color: this.data['color']
     });
};


A3Maker.Component.LinkComponent = function (parent, userOptions) {
	this.defaultsrc  = "images/img_link.png";
    var options = {
	    left: 10, 
		top : 10, 
	    width: 60, 
	    height: 60, 
	    type : 'link',
	    fixRatio: false,
	    'background-image' : this.defaultsrc,
	    linkType :  "PageLink",
	    position :  "",
	    text : "",
	    'font-family' :  "Open Sans",
	    'font-size' : "30pt",
	    'font-weight' : 100,
	    color : "#FF862D"
    };
    this.componentSettings = {
       	selectable : true,
       	draggablee : true,
       	resizeable : false
    };
    
    if (userOptions) $.extend(options, userOptions);
    this.parent = parent;
    A3Maker.Component.Base.call(this, options);
};

A3Maker.Component.LinkComponent.prototype.refresh = function (parent) {
    $(this.originalElement).attr('src', this.data['background-image']);
};

A3Maker.Component.OrderComponent = function (parent, userOptions) {
	this.defaultsrc  = "images/img_order.png";
    var options = {
	    left: 10, 
		top : 10, 
	    width: 60, 
	    height: 60,
	    type :'order',
	    fixRatio: false,
	    'background-image' : this.defaultsrc,
	    menuId : '',
	    menu  :  "",
	    price :  "",
	    unit : '원',stock : ''
    };
    this.componentSettings = {
	    selectable : true,
	    draggablee : true,
	    resizeable : false
     };
    
    if (userOptions) $.extend(options, userOptions);
    this.parent = parent;
    A3Maker.Component.Base.call(this, options);
};

A3Maker.Component.OrderComponent.prototype.refresh = function (parent) {
    $(this.originalElement).attr('src', this.data['background-image']);
    this.enablePropertyWindow(false);
    this.enablePropertyWindow(true);
};

A3Maker.Component.OrderComponent.prototype.setProduct = function (menuId, menuName, menuPrice, stock) {
	this.menuId = menuId;
	this.menu = menuName; 
	this.price = menuPrice;
	this.stock = stock;
	
	console.log(this.menuId + " : " + this.menu + " : " + this.price + " : " + this.stock);
	$(this.externalWrapperQueryStr + ' .component-order').attr('menu', menuName);
	$(this.externalWrapperQueryStr + ' .component-order').attr('menuId', menuId);
	$(this.externalWrapperQueryStr + ' .component-order').attr("price",menuPrice);
	$(this.externalWrapperQueryStr + ' .component-order').attr("stock",stock);
	this.refresh();
};

A3Maker.Component.ListComponent = function (parent, userOptions) {
    var options = { 
    	left: 10, 
		top : 10, 
	    width: 400, 
	    height: 400,
	    type : 'list',
	    fixRatio: false
    };
    
    this.componentSettings = {
        selectable : true,
        draggablee : true,
        resizeable : false
     };
    if (userOptions) $.extend(options, userOptions);
    this.parent = parent;
    this.permitComponents = ["listrow"];
    this.childs = [];  
    A3Maker.Component.Base.call(this, options);
};

A3Maker.Component.PopupComponent = function (parent, userOptions) {
    var options = { 
    		left: 10, 
			top : 10, 
    		type :'popup',
    		fixRatio: false
    };
    
    this.componentSettings = {
        	selectable : true,
        	draggablee : true,
        	resizeable : false
        };
    if (userOptions) $.extend(options, userOptions);
    
    this.parent = parent;
    this.permitComponents = ["image", "text", "link", "order"];
    this.childs = [];  
    A3Maker.Component.Base.call(this, options);
};

A3Maker.Component.PopupComponent.prototype.refresh = function (data) {
	$(this.originalElement).css('background-size', '100% 100%');
	$(this.originalElement).css('background-image', 'url(' + this.data['background-image'] +')')
};

A3Maker.Component.ListRowComponent = function (parent, userOptions) {
    var options = { 
    		left: 10, 
			top : 10, 
    		width: 100, 
    		height: 100, 
    		type :'listrow',
    		fixRatio: false
    };
    
    this.componentSettings = {
    	selectable : true,
    	draggablee : true,
    	resizeable : false
    };
    
    if (userOptions) $.extend(options, userOptions);
    this.parent = parent;
    this.permitComponents = ["image", "text", "link", "order"];
    this.childs = []; 
    A3Maker.Component.Base.call(this, options);
    this.gripBottomLineStr = this.externalWrapperQueryStr + " .gripbottonline";
};

A3Maker.Component.ScriptComponent = function (parent, userOptions) {
	this.defaultsrc  = "images/script.png";
	var options = {
		left: 10, 
		top : 10, 
		type : 'script',
		width : 75, 
		height : 69, 
		fixRatio : false,
		'background-image' : this.defaultsrc,
		script : "" 
	};

	this.componentSettings = {
		selectable : true,
		draggablee : true,
		resizeable : false
	};
    
	if (userOptions) $.extend(options, userOptions);
    this.parent = parent;
    A3Maker.Component.Base.call(this, options);
};

A3Maker.Component.TableComponent = function (parent, userOptions) {
	var options = {
		left: 50, 
		top : 50, 
		rowCnt : 4,
		colCnt : 4,
		width : 800, 
		height : 160, 
		fixRatio : false,
		cellspacing : 0,
		cellpadding : 0,
		type : 'table',
		border : 1,
		color : "#000000",
		'background-color' : '#ffffff',
		'border-color' : "#555555",
		'border-style' : "solid",
		'opacity' : 0.6,
		'font-size' : "13px",
		'font-family' : "Malgum Gothic"
	};
	
	this.componentSettings = {
		selectable : true,
		draggablee : true,
		resizeable : false
	};
    
	if (userOptions) {
		$.extend(options, userOptions);
	}
	/* row, col 수에 따라 table height 재 조정*/ 
	options.height = options.rowCnt * 40;
	//options.width =  options.colCnt * 120;
	
    this.parent = parent;
    this.childs = [];
    A3Maker.Component.Base.call(this, options);
};


A3Maker.class.extend(
    A3Maker.Component.ImageComponent.prototype,
    new A3Maker.Component.Base(), A3Maker.class.subClassAddfuncs,
    A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
    A3Maker.Component.TextComponent.prototype,
    new A3Maker.Component.Base(),
    A3Maker.class.subClassAddfuncs,
    A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
    A3Maker.Component.LinkComponent.prototype,
    new A3Maker.Component.Base(),
    A3Maker.class.subClassAddfuncs,
    A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
    A3Maker.Component.OrderComponent.prototype,
    new A3Maker.Component.Base(),
    A3Maker.class.subClassAddfuncs,
    A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
    A3Maker.Component.PopupComponent.prototype,
    new A3Maker.Component.Base(),
    A3Maker.class.subClassAddfuncs,
    A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
    A3Maker.Component.ListComponent.prototype,
    new A3Maker.Component.Base(),
    A3Maker.class.subClassAddfuncs,
    A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
    A3Maker.Component.ListRowComponent.prototype,
    new A3Maker.Component.Base(),
    A3Maker.class.subClassAddfuncs,
    A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
	A3Maker.Component.ScriptComponent.prototype,
	new A3Maker.Component.Base(), A3Maker.class.subClassAddfuncs,
	A3Maker.Component.Base.prototype
);

A3Maker.class.extend(
		A3Maker.Component.TableComponent.prototype,
		new A3Maker.Component.Base(), A3Maker.class.subClassAddfuncs,
		A3Maker.Component.Base.prototype
	);
