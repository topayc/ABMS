var A3Maker = {
	holder : "#page-container",
	page : ".page",
	editorPane : ".content_container",
	project : {},
	scrollBarWidth : 0,

	message : function(message){ alert(message); },
	log : function(log){ console.log(log) },
	
	init : function() {
		var mode = "test";
		var abmsProjectNo = '';
		var lang = '';
		var member_seq = '';
		var context = this;
		var queryString = this.getUrlParams();
		if (queryString ){
			abmsProjectNo  = queryString.abmsProjectNo;
			lang = queryString.lang;
			
			if (abmsProjectNo && abmsProjectNo != ''){
				mode = 'product';
			}
		}
		
		if (mode =='test') {
			this.createProject();
			A3Maker.controller.init();
			A3Maker.canvas.init();
			A3Maker.multiSelectionRect.init();
			A3Maker.validation.init();
			A3Maker.scrollBarWidth = A3Maker.util.getScrollbarWidth();
			
		} else if (mode == 'product'){
			
			var context = this;
			A3Maker.api.A3MakerApi("loadProjectInfo",{abmsProjectNo : abmsProjectNo}, function(response){
				if (response.resultCode == 100) {
					console.log(response);
					A3Maker.createProjectFromJson(response);
					A3Maker.canvas.init();
					A3Maker.multiSelectionRect.init();
					A3Maker.validation.init();
					A3Maker.scrollBarWidth = A3Maker.util.getScrollbarWidth();
				}else {
					alert("wrong access !");
					console.log(response.messageText);
				}
			});
		}else {
			alert("wrong access !");
			console.log(response.messageText);
			return;
		}
	},
	
	createProject : function(options) {
		this.project = new A3Maker.Project(options);
		return this.project;
	},
	
	saveProject : function(){
		var jsonProject = this.createJsonFromProject();
		console.log("PROJECT  JSON DATA");
		console.log(jsonProject);
		console.log("PROJECT  저장할 프로젝트 데이타 문자");
		console.log(JSON.stringify(jsonProject));
		
		
		A3Maker.api.A3MakerApi('saveProject', {
			abmsProjectNo : A3Maker.project.projectSeq,
			data : JSON.stringify(jsonProject)
		}, function(result) {
			setTimeout(function(){alert(result.messageText);}, 30)
		});
	},
	
	createProjectFromJson : function(context) {
		var data = JSON.parse(context.data);
		
		this.header  = data.header;
		var projectJson =  data.project; 
		var selectPage = "";
		
		console.log(">> 프로젝트 로드 ");
		console.log(context);
		console.log(projectJson);
		
		var options = {
				projectSeq : projectJson.projectSeq,
				projectName : projectJson.projectName,
				projectDesc : projectJson.projectDesc,
				width : projectJson.width,
				height: projectJson.height,
				createTime : data.project.createTime,
				writer : data.header.writer,
				writerDesc : data.header.writerDesc
		};
		
		this.project = new A3Maker.Project(options);
		A3Maker.controller.init();
		
		var page;
		if (projectJson.pages.length > 0) {
			for (var i = 0; i < projectJson.pages.length ; i++){
				page = this.createPageFromJson(this.project, projectJson.pages[i]);
				if (i == 0) selectPage = page;
			}
		}
		A3Maker.sidebar.init();
		A3Maker.statusBar.init();
		
		if (selectPage ) {
			A3Maker.controller.selectPage(selectPage);
		}
		return this.project;
		
	},
	
	createPageFromJson : function(project, pageJson) {
		var page = this.project.createPageInsert(null, null, pageJson.data);
		
		if (pageJson.childs.length > 0) {
			for (var i = 0; i < pageJson.childs.length; i++){
				this.createComponentFromJson(page, pageJson.childs[i]);
			}
		}
		return page;
		
	},
	
	createComponentFromJson : function(parent, comp){
		var component = parent.createComponent(comp.data.type, true, true, comp.data);
		component.attach();
		if (typeof comp.childs !=="undefined" && comp.childs.length > 0) {
			for (var i = 0; i < comp.childs.length; i++){
				this.createComponentFromJson(component, comp.childs[i]);
			}
		}
	},
	
	createJsonFromProject : function() {
		var jsonProject = {};
		jsonProject.header = this.header;
		jsonProject.project = {
				projectSeq : this.project.projectSeq, 
				projectName : this.project.projectName,
				projectDesc :  this.project.projectDesc, 
				width : this.project.width,
				height: this.project.height, 
				createTime : this.project.createTime, 
				pages : []
		}
		
		if (this.project.pages.length > 0)  {
			for (var i = 0; i < this.project.pages.length; i++) {
				this.createJsonFromPage(jsonProject.project,  this.project.pages[i]);
			}
		}
		return jsonProject;
	},
	
	createJsonFromPage : function(project, page) {
		var jsonPage= {
				typeCode : page.data.type,
				data : page.data,
				childs : []
			};	
		if (page.childs.length > 0) {
			for (var i = 0; i < page.childs.length ; i++) {
				this.createJsonFromComponent(jsonPage, page.childs[i]);
			}
		}
		project.pages.push(jsonPage);
	},
	
	createJsonFromComponent : function(parent, comp) {
		var jsonData;
		switch(comp.data.type) {
		case "list":
		case "listrow":
		case "popup":
			jsonData = this.generateComponentJson(comp);
			parent.childs.push(jsonData);
			if (typeof comp.childs !="undefined"  && comp.childs.length > 0){
				for (var i = 0; i < comp.childs.length ; i++) {
					this.createJsonFromComponent(jsonData, comp.childs[i]);
				}
			}
			break;
		case "image":
		case "text":
		case "link":
		case "order":
			jsonData = this.generateComponentJson(comp);
			parent.childs.push(jsonData);
			break;
		}
	},
	
	generateComponentJson : function(comp) {
		var jsonData = {
			data : comp.data,
			typeCode : comp.data.type
		};
		
		switch(comp.data.type) {
		case "popup":
			jsonData['childs'] = [];
			break;
		case "list":
			jsonData['childs'] = [];
			break;
		case "listrow":
			jsonData['childs'] = [];
			break;
		}
		return jsonData;
	},

	importProjectFromJson : function(data){
		
	},
	/* 현재 프로젝트에서 페이지 템플릿을 추가
	 * 현재 프로젝트와 템플릿의 크기등이 다를 경우 페이지 템플릿 및 템플릿안의 컴포넌트들도 비율에 
	 * 따라 사이즈를 조정한다.
	 * */
	addPageTmeplateToProject : function(projectResult){
		if (!this.project){
			alert('wrong reqeust : 프로젝트가 존재하지 않습니다');	
			return;	
		}

		var projectInfo = projectResult.searchResult;
		console.log(JSON.parse(projectResult.searchResult.menu_json));
		
		var pageInfo = this.convertScreenData(JSON.parse(projectInfo.menu_json));
		
		this.loadingProjectSize = { width : projectInfo.width_size, height : projectInfo.height_size};
		this.isPageLoading = true;
		this.createPageFromJson(pageInfo,"add");
		this.loadingProjectSize = null;
		this.isPageLoading = false;
	},
	
	getUrlParams : function() {
		var params = {};
		window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) {
			params[key] = value;
		});
		return params;
	}, 

	/*해당 페이지 UUID 를 지정해서 해당 페이지를 보여준다 */
	showPage : function(page) {
		this.project.showPage(page);
	},

	/*
	 컴포넌트의 최상단 page 를 구해서 page를 보여준다
	 page 와 root project 를 제외한 자식 컴포넌트의 최상단 page 를 재귀적으로 구해
	 해당 페이지를 보여줌
	 */
	showPageFromChild : function(component) {
		if (component.data.type == 'root') {
			console.log(component.data.type + " : 해당 컴포넌트의 루트 page 객체를 구할 수 없거나 해당 객체가 page 입니다.");
			return;
		}

		if (component.data.type == 'page') {
			this.showPage(component);
			var node = A3Maker.controller.$tree.tree('getNodeById', component.UUID);
			A3Maker.controller.$tree.tree('selectNode', node);
			return;
		}

		var parentArr = [];
		this.findParentsRecursive(parentArr, component);
		this.showPage(parentArr[0]);
	},

	hidePage : function(UUID, name) {
		this.project.hidePage(UUID, name);
	},

	/*
	 컴포넌트의 최상단 page 를 구해서 page를 숨김
	 page 와 root project 를 제외한 자식 컴포넌트의 최상단 page 를 재귀적으로 구해
	 해당 페이지를 숨김
	 */
	hidePageFromChild : function(component) {
		if (component.data.type == 'root' || component.data.type == 'page') {
			console.log(component.data.type + " : 해당 컴포넌트의 루트 page 객체를 구할 수 없거나 해당 객체가 page 입니다.");
			return;
		}
		var parentArr = [];
		this.findParentsRecursive(parentArr, component);
		this.showPage(parentArr[0]);
	},

	findParentsRecursive : function(parentArr, component) {
		var parent = component.parent;
		parentArr.unshift(component.parent);
		
		if (component.parent.type == "page") {
			return parentArr;
		} else {
			this.findParentsRecursive(parentArr, parent);
		}
	},

	/* 재귀 탐색에 의한 페이지 전체 복사 */
	clonePage : function(page) {
		var context = this;
		var newPage = A3Maker.createPage();
		$.each(page.childs, function(inx, child) {
			context.cloneComponent(newPage, child);
			;
		});
		return newPage;
	},

	//재귀 구조에 의하여 복사된 컴포넌트를 일괄 attach
	attachAllComponentRecursive : function(component) {
		var context = this;
		component.parent.addComponent(component);
		component.parent.addComponentToTree(component);
		component.attach();
		$.each(component.childs, function(inx, child) {
			context.attachAllComponentRecursive(child);
		});
	},

	/*
	 재귀 탐색에 의한 객체 및 자식 복사
	 attach 가 true 일경우 복사하면서 dom 생성 및 부착한다.
	 attach false 로 하면 객체 정보 생성만 하되 , 차후 attach 를 호출해야 한다.
	 */
	cloneComponent : function(container, copy, listAdd, treeAdd) {
		var context = this;
		var newComponent = container.createComponent(copy.type, listAdd, treeAdd);
		newComponent.x = copy.x;
		newComponent.y = copy.y;
		newComponent.width = copy.width;
		newComponent.height = copy.height;
		newComponent.fixRatio = copy.fixRatio;

		switch (copy.type) {
		case "image":
			newComponent.src = copy.src;
			break;
		case "text":
			newComponent.text = copy.text;
			newComponent.fontFamily = copy.fontFamily;
			newComponent.fontSize = copy.fontSize;
			newComponent.color = copy.color;
			break;
		case "link":
			newComponent.src = copy.src;
			newComponent.linkType = copy.linkType;
			newComponent.position = copy.position;
			break;
		case "order":
			newComponent.src = copy.src;
			newComponent.menu = copy.menu;
			newComponent.price = copy.price;
			break;
		case "popup":
		case "list":
		case "listrow":
		}
		if (treeAdd == true)
			newComponent.attach();
		$.each(copy.childs, function(inx, child) {
			context.cloneComponent(newComponent, child, listAdd, treeAdd);
		});
		return newComponent;
	},

	/*
	 컨텍스트 메뉴에서 생성된 컴포넌트의 일괄 attach 및 add 용
	 */
	attchComponentForContextAction : function(component) {
		var context = this;
		component.parent.addComponentToTree(component);
		component.attach();
		//console.log('type  : ' + component.data.type + " child length : " + component.childs.length);
		$.each(component.childs, function(inx, child) {
			context.attchComponentForContextAction(child);
		});
	},

	cloneComponentForContextAction : function(newComponent, copy) {
		var context = this;
		newComponent.x = copy.x;
		newComponent.y = copy.y;
		newComponent.width = copy.width;
		newComponent.height = copy.height;
		newComponent.fixRatio = copy.fixRatio;

		switch (copy.type) {
		case "image":
			newComponent.src = copy.src;
			break;
		case "text":
			newComponent.text = copy.text;
			newComponent.fontFamily = copy.fontFamily;
			newComponent.fontSize = copy.fontSize;
			newComponent.color = copy.color;
			break;
		case "link":
			newComponent.src = copy.src;
			newComponent.linkType = copy.linkType;
			newComponent.position = copy.position;
			break;
		case "order":
			newComponent.src = copy.src;
			newComponent.menu = copy.menu;
			newComponent.price = copy.price;
			break;
		case "popup":
		case "list":
		case "listrow":
		}
		if (copy.childs && copy.childs.length > 0) {
			$.each(copy.childs, function(inx, child) {
				var nComp = newComponent.createComponent(child.type, true, false);
				context.cloneComponentForContextAction(nComp, child);
			});
		}
		return newComponent;
	},
	
		
	initialzeTooluttonEventHandler : function() {
		A3Maker.controller.init();
	},

	createPage : function() {
		if (!this.project) concole.log("No project");
		var page = this.project.createPage();
		return page;
	},

	isRegiteredPage : function(pageNo) {
		for (var page in this.pages) {
			if (pageObj.get("pageNo") == pageNo) {
				return true;
			}
		}
		return false;
	},

	changeAllComponentSelectStatus : function(page, status) {
		this.project.changeAllComponentSelectStatus(page, status);
	},
	
	changeStatusAllComponentOfPage : function(page, status){	
		this.project.changeAllComponentOfPage(page, status);
	},

	removePage : function(page) {
		this.project.removePage(page);
	},

	findPage : function(pageNo) {
		var page;
		for (var pageTemp in this.pages) {
			if ( pageNo = pageTemp.get("pageNo")) {
				page = pageTemp;
			}
		}
		return page;
	},

	getProject : function() {
		return this.project;
	},

	setSelectedPage : function(page) {
		this.project.setSelectedPage(page);
	},

	setSelectedComponent : function(component) {
		this.project.setSelectedComponent(component);
	},

	getSelectedPage : function() {
		return this.project.getSelectedPage();
	},

	getSelectedComponent : function() {
		return this.project.getSelectedComponent();
	},

	getPropery : function(property) {
		if (this.hasOwnProperty(property)) {
			return this[property];
		}
		return false;
	},

	setProperty : function(property, value) {
		this[property] = value;
	},
	
	extractVar : function(options){
		$.each(options, function(key, value) {
			this.setProperty(key, value);
		});
	}
};
