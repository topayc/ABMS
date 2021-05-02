A3Maker = A3Maker || {};

A3Maker.Project = function(options) {
	var defaultOptions= {
			projectSeq : -1,
			projectName : "Epub By A3Maker",
			projectDesc : "A3Maker Epub project",
			width : 600,
			height: 800,
			createTime : new Date().toString()
	}
	this.componentMap = {};
	if (options) $.extend(defaultOptions, options);
	this.data = defaultOptions;
	
	//A3Maker.extract.call(this,defaultOptions);
	this.extract(defaultOptions);
	
	this.pages = new Array();
	this.selectedPage = null;
	this.selectedComponent = null;
	this.init();
};

A3Maker.Project.prototype.init = function() {
	$('.ajax_top_loading').hide();
	
	if (A3Maker.config.autoSave) this.startAutoSave();
	if (A3Maker.config.autoValidate) this.startAutoValidate();
	if (A3Maker.config.autoSustainSession) this.startSustainSession();
	this.adjustCanvas();
};

A3Maker.Project.prototype.IsTemplateProject = function() {
	if (this.projectInfo.category_code_seq != 0) {
		return true;
	} else {
		return false;
	}
};

A3Maker.Project.isSuperUser= function() {
	if (this.memberInfo.member_gubun = 0) {
		return true;
	} else {
	return false;
	}
};

A3Maker.Project.prototype.startSustainSession = function() {
	if (!A3Maker.config.autoSustainSession) {
		$('.ajax_top_loading').hide();
		return;
	}
	this.sustainSessionIntervalId = setInterval(function() {
		A3Maker.api.A3MakerApi('sustainSession', null, function(result) {
			if (result.resultCode == -1) {
				alert("Session Error. Redirct to the login page ");
			}
		});
	}, this.sustainSessionIntervale);
};

A3Maker.Project.prototype.stopSustainSession = function() {
	clearInterval(this.sustainSessionIntervalId);
};

A3Maker.Project.prototype.startAutoSave = function(options) {
	if (!A3Maker.config.autoSave) return;
	var context = this;
	this.autoSavieId = setInterval(function() {
		context.saveProject();
	}, this.autoSaveInterval);
};

//프로젝트를 json 으로 변환
A3Maker.Project.prototype.saveProject = function() {
};

//프로젝트를 json 으로 변환
A3Maker.Project.prototype.convertProjectToJson = function() {

};

A3Maker.Project.prototype.convertPageToUploadFormat = function(PAGELIST) {
	if (PAGELIST.PAGE.length == 1) {
		PAGELIST.PAGE = PAGELIST.PAGE[0];
	}
};


A3Maker.Project.prototype.stopAutoSave = function(options) {
	clearInterval(this.autoSavieId);
};

A3Maker.Project.prototype.startAutoValidate = function(options) {
	if (!A3Maker.config.autoValidate) return;
	A3Maker.validation.startValidation(this.validationInterval);
};

A3Maker.Project.prototype.stopAutoValidate = function(options) {
	A3Maker.validation.stopValidation();
};

A3Maker.Project.prototype.extract = function(options) {
	var context = this;
	$.each(options, function(key, value) {
		context.setProperty(key, value);
	});
};

//getter
A3Maker.Project.prototype.getProperty = function(key) {
	if (this.hasOwnProperty(key)) {
		return this[key];
	} else {
		return false;
	}
};

A3Maker.Project.prototype.setProperty = function(key, value) {
	this[key] = value;
};

A3Maker.Project.prototype.adjustCanvas = function() {
	$(A3Maker.holder).css('width', this.width + "px");
	$(A3Maker.holder).css('height', this.height + "px");
	A3Maker.controller.canvasWidth = this.width;
	A3Maker.controller.canvasHeight = this.height;
};

A3Maker.Project.prototype.showPage = function(targetPage) {
	this.hideAllPage();
	$.each(this.pages, function(index, page) {
		if (page.data.UUID == targetPage.data.UUID) {
			page.$pageHolderSelector.show();
			A3Maker.setSelectedComponent(null);
			A3Maker.setSelectedPage(page);
		}
	});
	
	A3Maker.propertyWindow.setPropertyWindowPos(2,90);  
	A3Maker.propertyWindow.setInitInfo({ 
	  	name: A3Maker.getSelectedPage().data.name, 
	  	x: this.left, 
	  	y: this.right, 
	  	width: 0, 
	  	height: 0, 
	  	fixRatio: false
  	});
	A3Maker.propertyWindow.showPropertyWindow( A3Maker.getSelectedPage().data.type,100,100);
};

A3Maker.Project.prototype.hidePage = function(UUID, name) {
	$.each(this.pages, function(index, page) {
		if (page.data.UUID == UUID) {
			page.$pageHolderSelector.hide();
			return;
		}
	});
};

A3Maker.Project.prototype.hideAllPage = function() {
	$.each(this.pages, function(index, page) {
		page.$pageHolderSelector.hide();
	});
};

A3Maker.Project.prototype.removePage = function(page) {
	var index = -1;
	var context = this;
	$.each(this.pages, function(inx, childPage) {
		if (childPage.data.UUID == page.data.UUID) {
			index = inx;
			return;
		}
	});

	if (index != -1) {
		console.log("## removePage");
		console.log(index);
		this.pages.splice(index, 1);
		page.destroy();

		var node = A3Maker.controller.$tree.tree("getNodeById", page.data.UUID);
		A3Maker.controller.$tree.tree('removeNode', node);
		A3Maker.controller.$tree.tree("selectNode", null);
	}
};

//getter
A3Maker.Project.prototype.get = function(key) {
	if (this.hasOwnProperty(key)) {
		return this[key];
	} else {
		return false;
	}
};

A3Maker.Project.prototype.set = function(key, value) {this[key] = value;};

/*
 * 페이지생성, 프로젝트의 루트 노드의 마지막에 추가 
 */

A3Maker.Project.prototype.createPage = function(options) {
	var pageNo = this.createPageNo();
	var UUID = A3Maker.util.genUUID();
	var pageDefaultOptions = {
			type : "page",
			id : UUID,
			UUID : UUID,
			no : pageNo,
			name : "page" + pageNo,
			left : 0,
			top : 0, 
			width : this.width,
			height : this.height,
			'background-color' : '#ffffff',
			desc :'',
			'background-image' : ''
	}

	if (options) $.extend(pageDefaultOptions, options);
	var page = new A3Maker.Page(pageDefaultOptions);
	
	this.pages.push(page);
	this.selectedPage = page;

	A3Maker.setSelectedComponent(null);
	A3Maker.setSelectedPage(page);
	//page.show();

	A3Maker.propertyWindow.closePropertyWindow();
	A3Maker.showPage(page);
	
	var rootNode = A3Maker.controller.$tree.tree('getNodeById', A3Maker.project.projectName);
	this.addPageToNode(page, rootNode, 'appendNode');
	return page;
};

/*
페이지를 생성하여 지정한 컴포넌트의 압, 뒤에 배치 한다.
* */
A3Maker.Project.prototype.createPageInsert = function(indexVerb, targetPage,options) {
	var indexVerb = indexVerb ? indexVerb : 'first';
	var pageNo = this.createPageNo();
	var UUID = A3Maker.util.genUUID();
	
	var pageDefaultOptions = {
			type : "page",
			id : UUID,
			UUID : UUID,
			no : pageNo,
			name : "page" + pageNo,
			left : 0,
			top : 0, 
			width : this.width,
			height : this.height,
			'background-color' : '#ffffff',
			desc :'',
			'background-image' : ''
	}
	
	if (options) $.extend(pageDefaultOptions, options);
	var page = new A3Maker.Page(pageDefaultOptions);
	
	this.selectedPage = page;
	
	A3Maker.setSelectedComponent(null);
	A3Maker.setSelectedPage(page);
	//page.show();
	
	A3Maker.propertyWindow.closePropertyWindow();
	A3Maker.showPage(page);
	
	switch (indexVerb){
		case "first":
			this.pages.push(page);
			var rootNode = A3Maker.controller.$tree.tree('getNodeById', A3Maker.project.projectName);
			this.addPageToNode(page, rootNode, 'appendNode');
			break;
		
		case 'after':
			var targetPageIndex = -1;
			for(var i = 0; i < this.pages.length ; i++){
				if (targetPage.data.UUID == this.pages[i].data.UUID ){
					targetPageIndex  =  i;
					break;
				}
			}
			if (targetPageIndex != -1)  this.pages.splice(targetPageIndex  +1 , 0 , page);
			var targetNode = A3Maker.controller.$tree.tree('getNodeById', targetPage.data.UUID);
			this.addPageToNode(page,targetNode, 'addNodeAfter' );
			targetPage.$pageHolderSelector.after(page.$pageHolderSelector);
			return page;
				
			case 'before':
			break;
	}
	
	return page;
};

A3Maker.Project.prototype.addPageToNode = function(page, targetNode, nodeCommand){
	A3Maker.controller.$tree.tree(nodeCommand, {
		label : page.data.name, // name
		id : page.data.UUID,
		type : page.data.type,
		data : page
	}, targetNode);
	
	var node = A3Maker.controller.$tree.tree('getNodeById', page.data.UUID);
	A3Maker.controller.$tree.tree('selectNode', node);
}


A3Maker.Project.prototype.createPageNo = function() {
	var pageNo = 0;
	if (this.pages.length == 0) {
		pageNo = 1;
	} else {
		var arr = $.map(this.pages, function(page, inx){
			return page.data.no;
		});
		
		arr.sort(function(a,b){return a< b ? -1 : a> b? 1 : 0;  });
		pageNo = arr[arr.length-1] + 1;
	}
	return pageNo;
};

A3Maker.Project.prototype.setSelectedPage = function(page) {
	this.selectedPage = page;
};

//status 가 false 면 해당 컴포넌트를 셀렉트 컴포넌트에서 제거
// true 이면 해당 컴포넌트만을 선택하기 위해서 모든 컴포넌트의 selectstatus 를 false로 변경
A3Maker.Project.prototype.setSelectedComponent = function(component) {
	if (this.setSelectedPage ) {
		this.selectedComponent = component;
		this.selectedPage.setSelectedComponent(component);
	}
};

A3Maker.Project.prototype.changeAllComponentSelectStatus = function(page, status) {
	
	var context = this;
	if (page){
			this.changeAllComponentSelectStatusRecursive(page, status);
	}else {
		$.each(this.pages, function(index, page) {
			context.changeAllComponentSelectStatusRecursive(page, status);
		});
	}
};

A3Maker.Project.prototype.changeStatusAllComponentOfPage = function(page, status) {
	context.changeAllComponentSelectStatusRecursive(page, status);
};

A3Maker.Project.prototype.changeAllComponentSelectStatusRecursive = function(component, status) {
	var context = this;
	if (!component.hasOwnProperty('childs') || component.childs.length < 1) {
		return;
	}
	$.each(component.childs, function(index, child) {
		if (child.data.type == "popup") {
			$(child.externalWrapperQueryStr).hide();
		}
			context.EnableComponentBorderAndGrip(child, status);
			context.changeAllComponentSelectStatusRecursive(child, status);
	});
};

A3Maker.Project.prototype.EnableComponentBorderAndGrip = function(component, status) {
	if (component.data.type != "page") {
		if (status) {
			component.showBorderTool();
			component.showGripTool();
			component.selectStatus = true;
		} else {
			component.hideBorderTool();
			component.hideGripTool();
			component.selectStatus = false;
		}
	}
};

A3Maker.Project.prototype.getSelectedPage = function(options) {
	return this.selectedPage;
};

A3Maker.Project.prototype.getSelectedComponent = function(options) {
	return this.selectedComponent;
};

A3Maker.Project.prototype.changePageIndex = function(page, insertInx) {
};

