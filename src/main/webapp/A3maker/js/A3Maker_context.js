A3Maker = A3Maker || {};
$(function () {
    A3Maker.contextMenu= {
    	requestActionEnums : {'PAGE' : 1, 'COMPONENT' : 2, 'NONE' : 3},
        isShown: false,
        selector : $(A3Maker.contextHTML),
        
        initControl: function () {
            this.selector.appendTo($('body'));
            this.selector.css('position', 'absolute');
            this.selectorZIndex = this.selector.css('zIndex');
            this.initializeEventHandlers();
            this.selector.hide();
        },

        initializeEventHandlers : function(){
            var context = this;
        	this.selector.click(function(){
            	A3Maker.controller.closeInsertTableLayer();
            	A3Maker.controller. closeInsertShapeLayer();
            });
        	  var context  = this;
            this.selector.find('.action').bind('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                var action = $(this).data('action');
                context.handleEvent(action, this);
                context.close();
                
            });
            this.addShortCutEventHandler();  // 단축 키 이벤트 핸들러 등록 
        },
        
        addShortCutEventHandler : function () {
            var context = this;
            $(document).bind('keydown', function (e) {
                var action = "";
                if (e.ctrlKey && (String.fromCharCode(e.which).toLowerCase() === 'c'))  action = "copy";
                if (e.ctrlKey && (String.fromCharCode(e.which).toLowerCase() === 'x'))  action = "cut";
                if (e.ctrlKey && (String.fromCharCode(e.which).toLowerCase() === 'v'))  action = "paste";
                if (e.ctrlKey && (String.fromCharCode(e.which).toLowerCase() === 'd'))  action = "delete";
                if (e.ctrlKey && (String.fromCharCode(e.which).toLowerCase() === 'f'))   action = "front";
                if (e.ctrlKey && (String.fromCharCode(e.which).toLowerCase() === 'b'))  action = "back";
                if (e.ctrlKey && (String.fromCharCode(e.which).toLowerCase() === 'n'))  action = "new page";
          		if (action != "") {
                
                	var node = A3Maker.controller.$tree.tree("getSelectedNode");
                	context.requestType = node.data.type == 'page' ? context.requestActionEnums.PAGE : context.requestActionEnums.COMPONENT;
                    context.handleEvent.call(context, action);
                 	context.close();
                }
            });
        },

        show: function (propertyType, x, y) {
            this.requestType = propertyType;
            if (this.isShown) this.close();
            
            var selectedPage = A3Maker.getSelectedPage();
            var selectedComponent = A3Maker.getSelectedComponent();
            var childButtons = A3Maker.controller.getMenuSet(selectedComponent);
            
            A3Maker.controller.applyToolButtonChange(selectedComponent);
            this.showComponentInContext(childButtons);
            
						var windowX = window.screenX;
						var windowY = window.screenY;
						var windowWidth = $(window).width();
						var windowHeight = $(window).height();
						var windowRigth  = windowX + windowWidth;
						var windowHeight = windowY + windowHeight;
			
            this.isShown = true;
            this.selector.show();

           	x = x + this.selector.width()  + 15 >= windowWidth ?  x  - this.selector.width()  -15  : x+ 5;  
           	y = y + this.selector.height() + 15 >= windowHeight ? y - this.selector.height() - 15 : y;  
            
            this.selector.css('left', x);
            this.selector.css('top', y);
            this.selector.css('zIndex', '99999');
            
            var selectedPage = A3Maker.getSelectedPage();
  	        if (selectedPage.$pageHolderSelector.find('.cross_grid_line').is(':visible')) {
  		        $(".toggle_grid_text").html("눈금 숨기기");
  	        } else {
  		        $(".toggle_grid_text").html("눈금 보이기");
  	        }
        },

        //컨텍스트 메뉴에 사용될 수 있는 컴포넌트 삽입 메뉴 
        showComponentInContext: function (childButtons) {
            $('li .rbtn').hide();
            $.each(childButtons, function (i, childButton) {
                $("li button." + childButton + "_btn").show();
            });
        },

        close: function () {
            if (!this.isShown) return;
            $('li .rbtn').show();
            $("li.buttonmenu").show();
            this.selector.hide();
            this.isShown = false;
            this.selector.css('zIndex', this.selectorZIndex);
            //this.removeShortCutEventHandler();  // 단축키 이벤트 핸들러 해제 
        },
		
        canContextAction : function(actionName){
            if (A3Maker.multiSelectionRect.getMultiSelectedComponentCount() > 1){
                alert("현재 다중 선택상의 " + actionName + " 액션은 지원하지 않습니다");
                return false;
            }else {
                return true;
            }
        },
        
        showGridLine : function(){
        	var selectedPage = A3Maker.getSelectedPage();
    		if (selectedPage.$pageHolderSelector.find(".cross_grid_line").is(':visible')){
    			var size=  A3Maker.statusBar.getGridMarkerSize();
    			var css = "cross_grid_line_" + size;
    			selectedPage.$pageHolderSelector.find(".cross_grid_line")
    				.removeClass( )
    				.addClass("cross_grid_line")
    				.addClass(css);
    		}
        },
        
        toggleGridLine : function(enable){
        	var selectedPage = A3Maker.getSelectedPage();
        	var size=  A3Maker.statusBar.getGridMarkerSize();
        	var css = "cross_grid_line_" + size;
          	if (selectedPage.$pageHolderSelector.find(".cross_grid_line").is(':visible')) {
          		selectedPage.$pageHolderSelector.find(".cross_grid_line").removeClass().addClass("cross_grid_line").hide();
                $(".toggle_grid_text").html("눈금 보이기");
            } else {
                selectedPage.$pageHolderSelector.find(".cross_grid_line").show();
                selectedPage.$pageHolderSelector.find(".cross_grid_line").addClass(css);
                $(".toggle_grid_text").html("눈금 숨기기");
            }
        },
        
        handleEvent: function (action, elem) {
            var cType = null;
            var selectedPage = A3Maker.getSelectedPage();
            var selectedComponent = A3Maker.getSelectedComponent();

            switch (action) {
            	//해당 페이지의 모든 컴포넌트 제거
                case "clear_all":
                    selectedPage.clearAll();
                    return;
                case "toggle_grid_line":
                	this.toggleGridLine();
                return;
                    
                case "copy":
                    if (!this.canContextAction(action)) return;
                    if (selectedComponent != null) A3Maker.clipBoard.set(selectedComponent);
                    return;
                    
                case "cut":
                    if (!this.canContextAction(action)) return;
                    if (selectedComponent.data.type == "popup") A3Maker.controller.enableBeforeGrayPanel(false, null);

                    if (selectedComponent != null) {
                        selectedPage.removeComponent(selectedComponent);
                        A3Maker.setSelectedComponent(null);
                        A3Maker.clipBoard.set(selectedComponent);
                        if (selectedPage.childs.length == 0) A3Maker.controller.applyToolButtonChange( A3Maker.getSelectedPage());
                        A3Maker.controller.enableBeforeGrayPanel(false, null);
                    }
                    return;
                
                case "paste":
                    if (!this.canContextAction(action)) return;
                    var sourceComponent  = A3Maker.clipBoard.get();
                    if (!sourceComponent) return;
                    
                    var  container = null; 
                    var selectedComponent = A3Maker.getSelectedComponent();

                    if (!selectedComponent){
                    	if (sourceCompoent.type == 'listrow') {
                    		alert('listrow can`t be add to any components except listcomponent' );
                    		container = null;
                    	}else {
                    		container = A3Maker.getSelectedPage();
                    	}
                    }else {
                    	if (sourceComponent.data.type == "listrow"){
                    		if  (selectedComponent.data.type !='list'){
                    			alert('listrow can`t be add to any components except listcomponent' );
                    			container = null;
                    		}else container = selectedComponent;
                    	}else if ( selectedComponent.data.type == 'listrow' || selectedComponent.data.type == 'popup'){
                    		container = selectedComponent;
                    	}else {
                    		container = selectedComponent.parent;
                    	} 
                    }

                    if (container){
                    	var pasteComponent = container.createComponent(sourceComponent.data.type, false, false);
                    	A3Maker.cloneComponentForContextAction(pasteComponent , sourceComponent);
                    	pasteComponent.parent.addComponent(pasteComponent);
                    	A3Maker.attchComponentForContextAction(pasteComponent);
                    	pasteComponent.setSelectStatus(true);
                    	pasteComponent.selectStatus = true;
                    	A3Maker.setSelectedComponent(pasteComponent);
                    	/*
                    	 *복사된 컴포넌트의 부모가 리스트 로우 일경우, 리스트 로우에서 안보이는 영역에 위치할 수 있기 때문에 컴포넌트의 위치를 조정 
                    	 */
                    	if (selectedComponent.data.type == 'listrow'){
                    		pasteComponent.setPositionAndWidth(
                    				10,10, pasteComponent.width,pasteComponent.height
                    		);
                    	}

                    } 
                    A3Maker.clipBoard.reset();                   
                    return;

                case "delete":
                	if (!this.canContextAction(action)) return;
                	if (this.requestType == this.requestActionEnums.PAGE) {
                		if (confirm("페이지내의 모든 컴포넌트도 삭제가 됩니다. 진행하시겠습니까") == true) {
                			//page slider setting
                			var sliderValue = 0;
                    		for (var i = 0; i < A3Maker.project.pages.length; i++){
                    			if (selectedPage.UUID === A3Maker.project.pages[i].UUID) {
                    				sliderValue  = i;
                    				break;
                    			}
                    		}
                    		
                    		A3Maker.statusBar.setPageSlider({
                    			value : sliderValue == 0 ? sliderValue : sliderValue
                    		});
                    		
                			A3Maker.removePage(selectedPage);
                			A3Maker.setSelectedComponent(null);
                			A3Maker.setSelectedPage(null);
                    		
                			//현재 사이트바타입이 섬네일뷰인경우 , 섬네일 페이지 갱신
                			if (A3Maker.sidebar.sidebarType === A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW) {
                				A3Maker.sidebar.updateSideThumbnailView();
                			}
                		}
                       
                    } else if (this.requestType == this.requestActionEnums.COMPONENT){
                    	if (selectedComponent){
		                    if (selectedComponent.data.type == "popup") A3Maker.controller.enableBeforeGrayPanel(false, null);
                    		selectedComponent.parent.removeComponent(selectedComponent);
                        	
                        	if (selectedPage.childs.length == 0)  A3Maker.controller.applyToolButtonChange(A3Maker.getSelectedPage());
                        	A3Maker.setSelectedComponent(null);
                       }
                    }
                    return;
                    
                case "front":return;
                case "back":return;
                case "new_page":A3Maker.project.createPage();break;
                case "in_img":cType = "image";break;
                case "in_txt":cType = "text";break;
                case "in_box":cType = "box";break;
                case "in_table":cType = "table";break;
                case "in_link":cType = "link";break;
                case "in_order":cType = "order";break;
                case "in_popup":cType = "popup";break;
                case "in_list":cType = "list";break;
                case "in_listrow":cType = "listrow";break;
                case "in_script":cType = "script";break;
            }

            if (cType) {
              if (cType == "box") {
              	A3Maker.controller.closeInsertTableLayer();
              	A3Maker.controller.closeInsertShapeLayer();
              	A3Maker.controller.openInsertShapeLayer(elem);
              	//A3Maker.controller.openInsertShapeLayer(this.selector.get(0));
              	return;
              }
              
              if ( cType =="table") {
              	A3Maker.controller.closeInsertTableLayer();
              	A3Maker.controller.closeInsertShapeLayer();
              	A3Maker.controller.openInsertTableLayer(elem);
                //A3Maker.controller.openInsertTableLayer(this.selector.get(0));
              	return;
              }
              this.close();
              var selectedPage = A3Maker.getSelectedPage();
              var selectedComponent = A3Maker.getSelectedComponent();
              var component = "";
              
              if (cType == "script" ) {
              	newComponent = selectedPage.createComponent(cType, true, true);
                  newComponent.attach();
                  newComponent.setSelectStatus(true);
                  menusetComponent = newComponent;
              } else if (selectedComponent) {
                  if (selectedComponent.parent.type == "listrow" || selectedComponent.parent.type == "list" || selectedComponent.parent.type == "popup") {
                      component = selectedComponent.parent.createComponent(cType, true);
                      component.attach();
                      component.setSelectStatus(true);
                      component.selectStatus = true;
                      A3Maker.setSelectedComponent(component);
                  }

                  else if (selectedComponent.data.type == "listrow" || selectedComponent.data.type == "list" || selectedComponent.data.type == "popup") {
                      component = selectedComponent.createComponent(cType, true);
                      component.parent = selectedComponent;
                      component.attach();
                      component.setSelectStatus(true);
                      component.selectStatus = true;
                      A3Maker.setSelectedComponent(component);
                  } else {
                      component = selectedPage.createComponent(cType, true);
                      component.attach();
                      component.setSelectStatus(true);
                      component.selectStatus = true;
                      A3Maker.setSelectedComponent(component);
                  }
                } else {
                    component = selectedPage.createComponent(cType, true);
                    component.attach();
                    component.setSelectStatus(true);
                    component.selectStatus = true;
                    A3Maker.setSelectedComponent(component);
                }
                A3Maker.controller.applyToolButtonChange(component);
                event.stopPropagation();
            }
        },
        
        removeShortCutEventHandler: function () {
            $('.shortcut').off('keydown', function (e) { });
        },
        
        copyPopupChilds: function (copy, original) {
            $.each(original.childs, function (index, child) {
                var component = copy.createComponent(child.type);
                component.x = child.x;
                component.y = child.y;
                component.width = child.width;
                component.height = child.height;
                component.fixRatio = child.fixRatio;

                switch (component.data.type) {
                    case "image":
                        component.src = child.src;
                        break;
                    case "text":
                        component.text = child.text;
                        component.fontFamily = child.fontFamily;
                        component.fontSize = child.fontSize;
                        component.color = child.color;
                        break;
                    case "link":
                        component.src = child.src;
                        component.linkType = child.linkType;
                        component.position = child.position;
                        break;
                    case "order":
                        component.src = child.src;
                        component.menu = child.menu;
                        component.price = child.price;
                        component.menuId = child.menuId;
                        component.unit = child.unit;
                        component.stock = child.stock;
                        break;
                }
            });
        },

        copyListChilds: function(copyList, originalList){
            $.each(originalList.childs, function (index, child) {
                var component = copyList.createComponent(child.type);
                component.x = child.x;
                component.y = child.y;
                component.width = child.width;
                component.height = child.height;
                component.fixRatio = child.fixRatio;

                $.each(child.childs, function (index, child) {
                    var childComponent = component.createComponent(child.type);
                    switch (component.data.type) {
                        case "image":
                            component.src = child.src;
                            break;
                        case "text":
                            component.text = child.text;
                            component.fontFamily = child.fontFamily;
                            component.fontSize = child.fontSize;
                            component.color = child.color;
                            break;
                        case "link":
                            component.src = child.src;
                            component.linkType = child.linkType;
                            component.position = child.position;
                            break;
                        case "order":
                             component.src = child.src;
                       		component.menu = child.menu;
                        	component.price = child.price;
                        	component.menuId = child.menuId;
                        	component.unit = child.unit;
                        	component.stock = child.stock;
                            break;
                     }
                });
            });
        },

        clone: function (copy, original) {
            copy.x = original.x;
            copy.y = original.y;
            copy.width = original.width;
            copy.height = original.height;
            copy.fixRatio = original.fixRatio;
            
            switch (original.type) {
                case "image":
                    copy.src = original.src;
                    break;
                case "text":
                    copy.text = original.text;
                    copy.fontFamily = original.fontFamily;
                    copy.fontSize = original.fontSize;
                    copy.color = original.color;
                    break;
                case "link":
                    copy.src = original.src;
                    copy.linkType = original.linkType;
                    copy.position = original.position;
                    break;
                case "order":
                    copy.src = original.src;
                    copy.menu = original.menu;
                    copy.price = original.price;
                    copy.menuId = original.menuId;
                    copy.stock = original.stock;
                    copy.unit = original.unit;
                    break;
                case "popup":
                    if (original.childs.length > 0) {
                        this.copyPopupChilds(copy, original);
                    }
                    copy.permitComponents = original.permitComponents.slice(0);
                    break;
                case "list":
                    if (original.childs.length > 0) {
                        this.copyListChilds(copy, original);
                    }
                    break;
                case "listrow":
                    copy.childs = original.childs.slice(0);
                    copy.permitComponents = original.permitComponents.slice(0);
            }
        }
    };
    A3Maker.contextMenu.initControl();
});

