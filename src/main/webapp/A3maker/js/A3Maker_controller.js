A3Maker = A3Maker || {};
$(function () {
    A3Maker.controller = {
        selectTooButtonContainer: '',
        curZoom: 100,
        canvasWidth: 0,
        canvasHeight: 0,
        scale: 1,
        snapValue: 1,
        $snap: "",
        rulerTopStartX: 0,
        rulerLeftStartY: 0,
        tool_buttons: [
             { sel: '#tool_image', type: 'image', fn: this.clickSelect, evt: 'click', key: ['I', true], childButtons: []},
             { sel: '#tool_text', type: 'text', fn: this.clickSelect, evt: 'click', key: ['T', true], childButtons: []},
             { sel: '#tool_link', type: 'link', fn: this.clickSelect, evt: 'click', key: ['L', true], childButtons: []},
             { sel: '#tool_box', type: 'box', fn: this.clickSelect, evt: 'click', key: ['O', true], childButtons: [] },
             { sel: '#tool_hline', type: 'hline', fn: this.clickSelect, evt: 'click', key: ['O', true], childButtons: [] },
             { sel: '#tool_vline', type: 'vline', fn: this.clickSelect, evt: 'click', key: ['O', true], childButtons: [] },
             { sel: '#tool_table', type: 'table', fn: this.clickSelect, evt: 'click', key: ['O', true], childButtons: [] },
             { sel: '#tool_html', type: 'html', fn: this.clickSelect, evt: 'click', key: ['O', true], childButtons: [] },
             { sel: '#tool_order', type: 'order', fn: this.clickSelect, evt: 'click', key: ['O', true], childButtons: [] },
             { sel: '#tool_list', type: 'list', fn: this.clickSelect, evt: 'click', key: ['L', true], childButtons: ['listrow'] },
             { sel: '#tool_script', type: 'script', fn: this.clickSelect, evt: 'click', key: ['O', true], childButtons: [] },
             { sel: '#tool_popup', type: 'popup', fn: this.clickSelect, evt: 'click', key: ['N', true], childButtons: ['box', 'table', 'image', 'text', 'link', 'order', 'list'] },
             { sel: '#tool_listrow', type: 'listrow', fn: this.clickSelect, evt: 'click', key: ['R', true], childButtons: ['image', 'text', 'link','hline','vline','box','order'] }
        ],

        getMenuSet : function(component){
            var childButtons = this.findChildButtons(component);
            if (childButtons.length < 1) {
                childButtons = this.findChildButtons(component.parent);
                return childButtons;
                
            } else {
                return childButtons;
            }
        },

        findChildButtons: function (component) {
            var childButtons = '';
            if (!component || component.data.type == "page") {
                return ['box', 'image', 'text', 'link', 'order', 'popup', 'list','html', 'table','hline','vline','script'];
            }
            
            $.each(this.tool_buttons, function (inx, button) {
                if (button.type == component.data.type) {
                    childButtons = button.childButtons;
                    return;
                }
            });
            return childButtons;
        },

        applyToolButtonChange: function (component) {
            var showToolButtons = '';
            if (!component ||  component.data.type == 'page') {
                showToolButtons =  ['box', 'image', 'text', 'link', 'order', 'popup', 'list','table','html','hline','vline','script'];
            } else {
                showToolButtons = this.getMenuSet(component);
            }
            $.each(this.tool_buttons, function (i, tool_button) {
                   $(tool_button.sel).hide();
             });

            $.each(showToolButtons, function (i, childButton) {
                $("#tool_" + childButton).show();
            });
        },
        
        get: function (key) {return this[key];},
        set: function (key, value) {this[key] = value;},

        setComCount: function (pageSelector, count) {
            $(pageSelector + ' ' + '.com_count').html("&nbsp;(" + count + ")");
        },

        init: function () {
        		var context = this;
            this.initializeContextMenuEventHandler();
            this.initializePreviewEventHandler();
            this.initializeDocumentClickHandler();
            this.setProjectInfo();
            this.initTree();
            this.initializeAlignBtnEventHandler();
            this.initializeSubMenuBlock();
            this.initializeToolButtonEvent();
            $('#logo_btn').click(function () {$(A3Maker.holder).width(800); });
            this.initailizeAddPageEventHandler();
            this.initailizecreateProejctEventHandler();
            this.initailizeSaveProejctEventHandler();
            this.initailizeSnapEventHandler();
            this.initailizeKeyEventHandler();
            this.initailizeFullScreenEventHandler();
            $('#element_config').draggable({	containment : "document"});
            $( "#tabs" ).tabs();
            $("#shape_insert_layer").tooltip({
              position: {
                my: "center bottom-8",
                at: "center top",
                using: function( position, feedback ) {
                  $( this ).css( position );
                  $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
                }
              }
            });
            
          
            /*
             .draggable({
            	drag: function( event, ui ) {
                ui.position.top = Math.min($(document).height(), ui.position.top );
              },
            	axis : "y"
            });
            */
        },
        
        initializeSubMenuBlock : function(){
        	var context = this;
        	$("#table_insert_layer > #table_insert_layer_outer > #table_insert_layer_inner .table_cell").click(function(e){
        		var row = parseInt($(this).attr("row"));
				var col = parseInt($(this).attr("col"));
				context.createComponent("table", {rowCnt :row, colCnt : col});
				context.closeInsertTableLayer();
        	});
        	
        	$("#table_insert_layer > #table_insert_layer_outer > #table_insert_layer_inner .table_cell").hover(
        			function(){
        				var targetRow = parseInt($(this).attr('row'));
        				var targetCol = parseInt($(this).attr('col'));
            		
        				$("#table_insert_msg").text(targetRow + " x " + targetCol);
        				var allCells = $("#table_insert_layer > #table_insert_layer_outer > #table_insert_layer_inner .table_cell");
        				allCells.removeClass("select");
        				allCells.each(function(index){
        					var row = parseInt($(this).attr("row"));
        					var col = parseInt($(this).attr("col"));
        					if (col <= targetCol && row <= targetRow) $(this).addClass("select");
        				});
        			}, 
        			function(){}
        	)
        	/*
        	$("#table_insert_mousemove_area").bind('mousemove',function(e){
        		var x = e.offsetX;
        		var y = e.offsetY;
        		var cellWidth = 13;
        		var cellHeight = 13;
        		
        		var width ;
        		var height;
        		
        		console.log(x + " : " + y);
        		if (x <= 87) {
        			return;
        		}else {
        			if (x>192) {
        				return;
        			}else {
        				width =  ((x / 13) * 13) + 17;
        			}
        		}
        		
        		if (y <= 87) {
        			return;
        		}else {
        			if (y>180) {
        				return;
        			}else {
        				height =  ((y / 13) * 13) + 18;
        			}
        		}
        		
        		//$("#table_insert_layer_outer").width(width).height(height);
        		$("#table_insert_layer").width(width+8).height(height + 24);
        	});
        	*/
        	

        	
       
        },
        
        initailizeKeyEventHandler : function () {
            var context = this;
            $(document).bind('keydown', function (e) {
            	//Reset editor  by ESC key 
            	if (e.keyCode == 27) { 
            	  	context.resetEditor();
            	  	return; 
                }
            });
        },
        
 
        
        initailizeFullScreenEventHandler : function(){
        	  var context = this;
        	  $(".btn_full_screen").click(function(){
        		  var target = $('#zoom-container')[0]; 
              	  if (screenfull.enabled) {
              		screenfull.request(target);
              	  }
        	  });
        	  
        	  $(document).bind("fullscreenchange", function() {
        	  	if ($(document).fullScreen()){
        	  		context.propertyWindowCss = {
        	  			'left' : A3Maker.propertyWindow.positionX, 
        	  			'top' : A3Maker.propertyWindow.positionY, 
        	  		};
        	  		
        	  		context.contentContainerCss = {
        	  			'left' : $('.content_container').css('left'),
        	  			'top' : $('.content_container').css('top'),
        	  			'background-color' : $('.content_container').css('background-color'),
        	  			'width' : $('.content_container').css('width'),
        	  			'height' : $('.content_container').css('height')
        	  		}; 
        	  		context.verticalTableCss = {'background-color' : $('.vertical_table').css('background-color')};
        	  	
        	  		$('.content_container').css({'left' : '0px', 'top' : '0px','background-color' : '#000','width' : screen.width + 'px', 'height' : screen.height + 'px'});
        	  		$('.vertical_table').css({'background-color' : '#000'});
        	  		A3Maker.propertyWindow.setPropertyWindowPos(25,25);        	  	
        	  		
        	  		var offsetX = 10;
        	  		var offsetY = 10;
        	  		$.each(A3Maker.project.pages, function(inx, page){
        	  			page.$pageHolderSelector.css({'position' : 'absolute', /*'width' : '100px', 'height' : '500px', */ 'display':'block', 'left' : offsetX + 'px', 'top' : offsetY + 'px'});
        	  			offsetX += 40;        
						//offsetY +=50;        
        	  		});
        	  			
        	  	}else {
        	  		$('.content_container').css(context.contentContainerCss);
        	  		$('.vertical_table').css(context.verticalTableCss);
        	  		$.each(A3Maker.project.pages, function(inx, page){
        	  			page.$pageHolderSelector.css({'position' : 'relative','display':'none', 'left' : '0px', 'top' : '0px'});
        	  		});
        	  		A3Maker.showPage(A3Maker.getSelectedPage());
        	  		A3Maker.propertyWindow.setPropertyWindowPos(context.propertyWindowCss.left,context.propertyWindowCss.top);        	  		
        	  	}
			});
			
			$(document).bind("fullscreenerror", function() {
   				 alert("Browser rejected fullscreen change");
			});
        },
		

		// html 을 이미지로 변환
		intializeTransferToImgEventHandler : function() {
			$('.btn_html2canvas').click(function(event) {
				html2canvas($('.page'), {
					allowTaint : true,
					logging : true,
					background : '#FF0000',
					timeout : 0, 
					proxy : "html2canvasproxy.ashx",      
					onrendered : function(canvas) {
						var imgData = canvas.toDataURL("image/png");
						console.log(imgData);
						//window.open(imgData);
						console.log(canvas.width + " : "  + canvas.height);
						var imageWin = window.open("", "imageWin", "width=" + 1000 + ",height=" + canvas.height);
						imageWin.document.write("<html><body style='margin:0'>");
						imageWin.document.write("</body><html>");
						imageWin.document.title = "html2Canvas";
						imageWin.document.body.appendChild(canvas);
						
					}
				});
			});
		},
		
		initailizeSaveProejctEventHandler : function(){
			$('div.btn_save').click(function(e){
				 A3Maker.saveProject();
			});
			$('.element_config .el_title .text .btn_close').click(function(){
				A3Maker.settings.close();
			});
			
			$('div.btn_config').click(function(e){
				A3Maker.settings.open();
			});
			
			$('#exportProject').click(function(e){
				var projectData = A3Maker.createJsonFromProject();
				var jsonObj = JSON.stringify(projectData);
				var jsonData = 'data:application/json;charset=utf-8,'+ encodeURIComponent(jsonObj);
				this.href = jsonData;
				this.target = '_blank';
				var fileName = A3Maker.project.projectName.replace(/ /g, '_') +'_'+ $.datepicker.formatDate('yymmdd', new Date()) + '.txt';
				this.download = fileName;
			});
			
			$('#importProject').click(function(e){
				var html = '<input type="file" id="inputFile" style ="display:none">';
				$('body').append(html);
				$('#inputFile').trigger('click');
				$('#inputFile').change(function(e){
					var scope = this;
					var files = document.getElementById('inputFile').files;
					var file = files[0];
					var reader = new FileReader();
					reader.onloadend = function(evt) {
						if (evt.target.readyState == FileReader.DONE) {
							var data = JSON.parse(evt.target.result);
							try {
								console.log(data);
								A3Maker.importProjectFromJson(data);
								A3Maker.canvas.init();
								A3Maker.multiSelectionRect.init();
								A3Maker.validation.init();
								A3Maker.scrollBarWidth = A3Maker.util.getScrollbarWidth();
							} catch(e){
							 	console.error('import file error', e);
							}
							scope.remove();
						}
					};
					reader.readAsText(file, 'utf-8');
				});
			});
			
			$('div.btn_fullscreen').click(function(e){
			});
			
			$('div.btn_config').click(function(e){
			});
		},

    initailizecreateProejctEventHandler : function(){
            $('.btn_create_project').click(function (event) {
                A3Maker.projectWindow.show();
            });
        },
        initializeEscEventHandler: function () {
            var context = this;
            event.stopPropagtion();
        	event.preventDefault();
            $(document).keydown(function (e) {
                if (e.keyCode == 27) {
                    context.resetEditor();
                }
            });
        },

        initializeDocumentClickHandler: function () {
            var context = this;
            $(A3Maker.holder).bind('mousedown', function (event) {
            	//event.stopPropagation();
            	//event.preventDefault();
            	if (!event.ctrlKey) {
                    context.resetEditor();
                    if (A3Maker.getSelectedPage()) {
                    	A3Maker.showPage(A3Maker.getSelectedPage());
                    }
                }else {
                }
            });
        },

        initializeAlignBtnEventHandler : function(){
            $('.aligntoolbar .align').click(function (event) {
                A3Maker.multiSelectionRect.handleAlignAction(this);
            });
        },

        resetEditor : function(){
        	var selectedPage = A3Maker.getSelectedPage();
            if (selectedPage){
            	A3Maker.changeAllComponentSelectStatus(selectedPage, false);
            	var pageNode = A3Maker.controller.$tree.tree("getNodeById", selectedPage.data.UUID);
            	A3Maker.controller.$tree.tree("selectNode", pageNode );
            	A3Maker.controller.applyToolButtonChange(selectedPage);
            	A3Maker.setSelectedComponent(null);
            }
            A3Maker.contextMenu.close();
            
        	if (!A3Maker.statusBar.alignLineShow) A3Maker.draw.clear();
            this.enableBeforeGrayPanel(false, null);
            this.closeInsertTableLayer();
            this.closeInsertShapeLayer();
            
            A3Maker.propertyWindow.closePropertyWindow();
            A3Maker.multiSelectionRect.resetSelection();
            A3Maker.codeWindow.close();
            A3Maker.project.isComponentAction = false;
        },

        initializeContextMenuEventHandler: function () {
            var context = this;
            $(A3Maker.holder).bind("contextmenu", function (event) {
                event.preventDefault();
                event.stopPropagation();
                if (event.ctrlKey) {
	                A3Maker.contextMenu.close();
	                return;
                }
                A3Maker.contextMenu.show(
                	A3Maker.contextMenu.requestActionEnums.COMPONENT, event.pageX, event.pageY);
            });
        },

        initializePreviewEventHandler: function () {
            var context = this;
            $('.btn_preview').click(function (e) {
                e.preventDefault();
                A3Maker.changeAllComponentSelectStatus(A3Maker.getSelectedPage(),false);
                A3Maker.multiSelectionRect.resetSelection();
                A3Maker.preview.startPreview();
            });
        },
        
        initializeContextMenuEventHandler2: function () {
        	var context = this;
            $(A3Maker.editorPane).bind("mosedown", function (event) {
            	if (event.ctrl){
            		return;
            	}
            	if (event.which == 3) {
            		event.stopPropagation();
                	event.preventDefault();
                	A3Maker.contextMenu.close();
            	}
            });
        },

        initializeWindowSizeChangeEventHandler: function () {
            var context = this;
            $(window).resize(function (e) {
                A3Maker.canvas.findZooomOnWindowSize();
                A3Maker.canvas.initCanvas();
                A3Maker.canvas.adjustCanvas();
                A3Maker.canvas.adjustRuler();
            });
        },

        initTree: function () {
            var context = this;
            //project root node 생성
            var data = [
               {
                    label: A3Maker.project.projectName,
                    id: A3Maker.project.projectName,
                    type: "root",
                    data: {
                        fullName: "proejct",
                        name: "proejct"
                    }
                },
            ];

            this.$tree = $('#page_sidebar');
            var rootNode = this.$tree.tree(
                {
                    onCreateLi: function (node, li) {
                        if (node.type != 'root') {
                            var nodeAlertId = ['alert', node.data.data.UUID].join('_');
                            li.find('.jqtree-title').after(
                                $('<span class = "fa fa-question-circle-o" style ="margin-left : 40px;color:#FF0000;margin-left : 5px" id ="' + nodeAlertId + '"></span>').hide()
                            );
                            
                            var iconClass = "";
                            switch (node.data.data.type) {
                                case "image": iconClass = "fa-file-image-o"; break;
                                case "box": iconClass = "fa-square-o"; break;
                                case "text": iconClass = "fa-font"; break;
                                case "order": iconClass = "fa-shopping-cart"; break;
                                case "link": iconClass = "fa-link"; break;
                                case "list": iconClass = "fa-list-alt"; break;
                                case "listrow": iconClass = "fa-list-alt"; break;
                                case "popup": iconClass = "fa-clipboard"; break;
                                case "page": iconClass = "fa-file-text"; break;
                                case "script": iconClass = "fa-code"; break;
                                case "table": iconClass = "fa-table"; break;
                                case "vline": iconClass = ""; break;
                                case "hline": iconClass = ""; break;
                            }
                            li.find('.jqtree-title').before($('<span></span>').addClass('fa').addClass(iconClass)).css('margin-left', '10px');
                            if (node.data.type == 'page') {
                                li.find('.' + iconClass).parent().addClass('component_page');
                                if (li.find('.' + iconClass).prev().length >0 ) {
                                    li.find('.' + iconClass).parent().css('padding-left', (node.getLevel() * 5 + 5) + 'px');
                                } else {
                                    li.find('.' + iconClass).parent().css('padding-left', (node.getLevel() * 5 + 25) + 'px');
                                }
                            } else {
                                if (li.find('.' + iconClass).prev().length > 0) {
                                    li.find('.' + iconClass).parent().css('padding-left', (node.getLevel() * 5 + 10) + 'px');
                                } else {
                                    li.find('.' + iconClass).parent().css('padding-left', (node.getLevel() * 5 + 35 ) + 'px');
                                }
                            }
                        }
                    },
                    dragAndDrop: true,
                    autoOpen: false,
                    keyboardSupport: false ,
                    data: data
                });
          
            this.$tree.bind('tree.click', function (event) {
            	A3Maker.contextMenu.close();

            	var node = event.node;
            	var component = event.node.data;

                var UUID = component.data.id;
                var nodeType =component.data.type; 
                var name = component.data.name;
                
                if (context.$tree.tree('isNodeSelected', node)) {
                	A3Maker.contextMenu.close();
                	var nodeX = $(node.element).offset().left;
                	var nodeY = $(node.element).offset().top;
                	var updateTextDiv = $('<div class ="updateTextDiv" style ="position:absolute"></div>');

                	var adjustWidth = $(node.element).width();
                	var adjustHeight = $(node.element).height();

                	if (context.IsNodeOpen(node.id)) {
                		adjustHeight = adjustHeight / (node.children.length + 1);
                	}

                	var updateText = $("<input></input>").attr( {
                		type: "text",
                		name: "updateText",
                		id: "updateText",
                		value: node.name,
                		}) .addClass('updateText')
                	.css({
                		border: '1px 1 #DDDDDD',
                		width: adjustWidth,
                		height: adjustHeight
                	})
                	.appendTo(updateTextDiv);
                	updateTextDiv.appendTo('body');
                	updateTextDiv.css({ left: nodeX, top: nodeY});
                	//updateText.select();
                	updateText.bind('keydown', function (e) {
                		if (e.which == 13) {
                			if ($(this).val().length == 0 || $(this).val() == '') {
                				alert("이름은 공백이 될 수 없습니다");
                				updateText.val(name);
                				$(this).focus();
                				return;
                			}

                			var pageNode = null ; 
                			if (nodeType != 'page'){
                				var parentArr = [];
                				A3Maker.findParentsRecursive(parentArr, node.data);
                				pageNode = context.$tree.tree('getNodeById',parentArr[0].UUID ); 
                			}

                			if (node.name != $(this).val()){
                				//부모 pageNode 가 없다면 본인지 페이지 , 이 경우 페이지 타이틀 중복 쳌 
                				//부모 pageNode 가 있다면 특정 페이지내의 컴포넌트로, 해당 페이지의 같은 컴포넌트의 이름 중복 조사
                				var result = context.isResiteredNodeIdOrName(pageNode, nodeType, $(this).val());
                				if (result){
                					alert("already name or id");
                					updateText.val(name);
                					$(this).focus();
                					return;
                				}
                			}
                    		node.data.data.name = $(this).val();
            				
                    		updateText.unbind('keydown');
                    		updateTextDiv.remove();

                    		context.$tree.tree('updateNode', node, $(this).val());
                			context.$tree.tree('selectNode', node);
                			A3Maker.propertyWindow.setData('name', $(this).val());
                		}
                	}).
                	bind('focusout', function (e) {
                		if ($(this).val().length == 0 || $(this).val() == '') {
                			alert("이름은 공백이 될 수 없습니다");
                			updateText.val(name); 
                			$(this).focus();
                			return;
                		}

                		var pageNode = null ; 
                		if (nodeType != 'page'){
                			var parentArr = [];
                			A3Maker.findParentsRecursive(parentArr, node.data);
                			pageNode = context.$tree.tree('getNodeById',parentArr[0].UUID ); 
                		}

                		if (node.name != $(this).val()){
                			//부모 pageNode 가 없다면 본인지 페이지 , 이 경우 페이지 타이틀 중복 쳌 
                			//부모 pageNode 가 있다면 특정 페이지내의 컴포넌트로, 해당 페이지의 같은 컴포넌트의 이름 중복 조사
                			var result = context.isResiteredNodeIdOrName(pageNode, nodeType, $(this).val());
                			if (result){
                				alert("already name or id");
                				updateText.val(name);
                				$(this).focus();
                				return;
                			}
                		}
                		node.data.data.name = $(this).val();
                		context.$tree.tree('updateNode', node, $(this).val());
                		updateText.unbind('focusout');
                		updateTextDiv.remove();
                		A3Maker.propertyWindow.setData('name', $(this).val());
                	});
                	updateText.focus();
                	return;
                }

                $('.updateText').trigger('blur');
                
                if (event.node.type && event.node.type == "root") {
                    /* can't select a root node*/
                    event.preventDefault();
                    return;
                }

                A3Maker.sidebar.sidebarType = A3Maker.sidebar.sidebarTypeEnums.LIST_VIEW;
                context.enableBeforeGrayPanel(false);
                A3Maker.changeAllComponentSelectStatus(A3Maker.getSelectedPage(),false);
                context.resetEditor();
                
                if (component.data.type == "page") {
                	context.selectPage(component, true);
                } else {
                    var parentArr = [];
                    A3Maker.findParentsRecursive(parentArr, component);
                    context.selectPage(parentArr[0], false);
                    setTimeout(function(){
                    	component.setSelectStatus(true);
                    	
                    }, 10)
                 
                }
                A3Maker.controller.applyToolButtonChange(component);
            });
            
            this.$tree.bind('tree.move', function (event) {context.handleTreeMoveEvent(event);});
            this.$tree.bind('tree.contextmenu', function (event) {
                var node = context.$tree.tree("getNodeById", event.node.data.UUID);
                context.$tree.tree('selectNode', node);
                var type = event.node.data.type;
                if (type == 'page') {
                    A3Maker.setSelectedPage(event.node.data);
                    A3Maker.setSelectedComponent(null);
                } else {
                	var parentArr = [];
                	 A3Maker.findParentsRecursive(parentArr, event.node.data);
                     A3Maker.setSelectedPage(parentArr[0]);
                     A3Maker.setSelectedComponent(event.node.data);
                }
                
                A3Maker.contextMenu.show(
                	event.node.data.type == 'page' ? 
                		A3Maker.contextMenu.requestActionEnums.PAGE : A3Maker.contextMenu.requestActionEnums.COMPONENT, 
                	event.click_event.pageX, 
                	event.click_event.pageY
                );
            });

            $('.btn-tree-expand').click(function (event) {
                if ($(this).hasClass("expand")) {
                    $(this).removeClass("expand");
                    $(this).addClass("collapse");
                    $('.fa-sort-desc').show();
                    $('.fa-sort-asc').hide();
                    var rootNode = context.$tree.tree('getTree');
                    for (var i = 0; i < rootNode.children.length; i++) {
                        var child = rootNode.children[i];
                        context.$tree.tree("openNode", child);
                    }
                } else {
                    $(this).removeClass("collapse");
                    $(this).addClass("expand");
                    $('.fa-sort-desc').hide();
                    $('.fa-sort-asc').show();
                    var rootNode = context.$tree.tree('getTree');
                    for (var i = 0; i < rootNode.children.length; i++) {
                        var child = rootNode.children[i];
                        context.$tree.tree("closeNode", child);
                    }
                }
            });
            
            $(document).on('mouseover', 'ul.jqtree-tree .component_page', function(event){
            	//$(this).css({'background-color': '#84DCC8'});
            	$(this).parent().css({
            		'background-color': '#F0F4F7', 'font-weight':'160'
            	});
            });
            
            $(document).on('mouseout', 'ul.jqtree-tree .component_page', function(event){
            	$(this).parent().css({'background-color': '#ffffff'});
            });
        },
      
        /*
     	parentPageNode 가 존재하면 해당 부모 노드에서 중복여부 체크
         */
		isResiteredNodeIdOrName : function(parentPageNode, nodeType, name) {
			var result = false;
			var tree = !parentPageNode? this.$tree.tree('getTree') : parentPageNode;
			
			tree.iterate(function(node) {
				if (node.type == nodeType) {
					if  (node.name == name || node.fullName == name){
					result = true;
					return false;
					// stop iterating
					}
				} else {
					return true;
					// continue iterating
				}
			});
			return result;
		},
		
        initailizeSnapEventHandler : function(){
            var context = this;
            this.$snap = $('#snap_select');
            this.$snap.val(this.snapValue);
            this.$snap.change(function (event) {
                context.snapValue = parseInt($(this).val());
            });
        },

        canDroppable: function (dropType, dragType) {
            var permittables = A3Maker.componentType[dropType].permittableChildComps;
            var permit = false;
            for (var i = 0; i < permittables.length ; i++) {
                if (permittables[i] == dragType) {
                    permit = true;
                    break;
                }
            }
            return permit;
        },

        canMovable: function (dropNode, dragNode) { return true;},

        handleTreeMoveEvent: function (event) {
            event.preventDefault();
            //console.log('moved_node : ', event.move_info.moved_node.data.name);
            //console.log('target_node : ', event.move_info.target_node.data.name);
            //console.log('position', event.move_info.position);
            //console.log("-------------------------------------");

            var moved_node = event.move_info.moved_node;
            var target_node = event.move_info.target_node;
            
            var moved_comp = moved_node.data;
            var target_comp = target_node.data;
            var position = event.move_info.position;
      		
            switch (position) {
                case 'inside':
                    //이동 노드가 페이지이거나  혹은 이동할 수  없는 root 노드 일경우, 최상위 레벨이므로 인덱스 변경으로 조정
                    if (target_node.type == "root" && moved_node.type == "page") {
                    	console.log("1");
                        this.moveComponentAfter(event, target_node, moved_node);
                        return;
                    }

                    //inside 라고 할지라도 해당 노드가 열려 있으면, 인덱스 변경으로 조정
                    if (this.IsNodeOpen(target_node.id)) {
                        this.moveComponentAfter(event, target_node, moved_node);
                        console.log("2");
                        return;
                    };

                    if (!this.canDroppable(target_node.type, moved_node.type)) return;
                    this.moveComponentInside(event, target_node, moved_node);
                    console.log("3");
                    break;
                    
                case 'after':
                    if (!this.canMovable(target_node, moved_node)) return;
                    this.moveComponentAfter(event, target_node, moved_node);
                    console.log("4");
                    break;
                case "before":
                	if(target_node.type == 'root') return;
                break;
            }
        },
        
        isNodeSelected: function (UUID) {
            var isSelected = false;
            var treeStats = this.$tree.tree('getState');
            $.each(treeStats.selected_node, function (index, nodeId) {
                if (UUID == nodeId)
                    isSelected = true;
                return;
            });
            return isSelected;
        },

        IsNodeOpen: function (UUID) {
            var isOpen = false;
            var treeStats = this.$tree.tree('getState');
            $.each(treeStats.open_nodes, function (index, nodeId) {
                if (UUID == nodeId)
                    isOpen = true;
                return;
            });
            return isOpen;
        },

        moveComponentInside: function (treeMoveEvent, target_node, moved_node) {
            treeMoveEvent.move_info.do_move();
            var newComponent = A3Maker.cloneComponent(target_node.data, moved_node.data,true,true);
            newComponent.setSelectStatus(true);
            newComponent.selectStatus = true;
            A3Maker.showPageFromChild(newComponent);
            A3Maker.setSelectedComponent(newComponent);
            moved_node.data.parent.removeComponent(moved_node.data);
        },

        moveComponentAfter: function (treeMoveEvent, target_node, moved_node) {
            var context = this;

            //페이지는 프로젝트 루트 및 페이지 after 로만 이동이 가능
            if (moved_node.type == "page") {
                //가장 첫번째 인덱스로 페이지 조정
                if (target_node.type == 'root') {
                    //Dom object 위치 변경
                    treeMoveEvent.move_info.do_move();
                    this.$tree.tree('selectNode', moved_node);
                    var target_page1 = "";
                    
                    A3Maker.project.pages.splice(0,0,moved_node.data);
                    $(target_page1.pageHolderSelectorStr).before($(moved_node.data.pageHolderSelectorStr));
                    A3Maker.showPage(moved_node.data);
                    return;
                }

                if (target_node.type == 'page') {
                    treeMoveEvent.move_info.do_move();
                    this.$tree.tree('selectNode', moved_node);
                    var index = -1;
                    $.each(A3Maker.project.pages, function(inx, page){
                    	if (page.UUID == target_node.data.UUID){
                    		index = inx;
                    	}
                    });
                    
                    if (index != -1){
                   		A3Maker.project.pages.splice(index,0,moved_node.data);
                    }
                    
                    $(target_node.data.pageHolderSelectorStr).after($(moved_node.data.pageHolderSelectorStr));
                    A3Maker.showPage(moved_node.data);
                    return;
                }
            }

            //드래그 컴포넌트가 page 가 아닌 일반 컴포넌트의 경우
            //when a drag component is a common component except a page component 
            if (moved_node.type != 'page') {
                if (moved_node.type == "listrow") {
                    if (target_node.type != 'list' && target_node.type != 'listrow') return;
                }

                //일반 컴포넌트는 page와 root 등과 같은 레벨에 존재할 수 없음.
                if (target_node.type == 'root') return;
                if (target_node.type == 'page') {
                    if (!this.IsNodeOpen(target_node.id)) return;
                }

                var dropComp = target_node.data;
                var dragComp = moved_node.data;

                //컨테이너 컴포넌트의 경우, 컨테이너 컴포넌의 첫번째 자식 컴포넌트 앞으로 이동
                if (dropComp.type == 'page' || dropComp.type == 'list' || dropComp.type == 'popup' || dropComp.type == 'listrow') {
                    dropComp = target_node.children[0].data;
                    $(dropComp.externalWrapperQueryStr).before($(dragComp.externalWrapperQueryStr));
                }
                else {
                    //컨테이너 컴포넌트가 아닐 경우, 해당 컴포넌트의 앞으로 이동
                    $(dropComp.externalWrapperQueryStr).after($(dragComp.externalWrapperQueryStr));
                }
                //move the source component
                treeMoveEvent.move_info.do_move();
                //show the page of the moved component 
                A3Maker.showPageFromChild(dropComp);
            }
        },
        
        enableBeforeGrayPanel: function (enable, component) {
            if (enable) {
                var grayPanel = $(A3Maker.grayPanelstr).css("background-color", "#000000").css('opacity', 0.3);
                $(component.externalWrapperQueryStr).before(grayPanel);
            } else {
                $(".gray_panel").remove();
            }
        },

        treeContextmenuClicked: function (event) {
            var node = event.node;
            var name = node.data.name;  // 노드 등록시 설정한 label property
            var id = node.data.id;
        },

        setProjectInfo: function () {
        	var project_des = A3Maker.project.projectName + 
        		'  ('+ A3Maker.project.width+ ' X '+ A3Maker.project.height+  ')';
            $('#project_name').html(project_des);
        },

        initializeToolButtonEvent: function () {
            var context = this;
            $.each(context.tool_buttons, function (i, opts) {
                var btn;
                if (opts.sel) {
                    btn = $(opts.sel);
                    if (btn.length == 0) {
                        //console.log("there is not a selctor");
                        return;
                    } else {
                        //console.log("there is a selctor")
                    }
                    if (opts.evt) {
                        //if (eggbonEditop.browser.isTouch() && opts.evt === 'click') {
                        //    opts.evt = 'mousedown';
                        //}
                        btn[opts.evt](context.toolButtonEventClosure());
                        // btn[opts.evt](opts.fn);
                    }
                }
            });
        },

        initailizeAddPageEventHandler: function () {
            var context = this;
            $('.btn_addpage').click(function (e) {
                e.preventDefault();
                A3Maker.newPageWindow.show();
            });
        },

        genPageTreeJsonData: function (page) {
            return {label: page.pageName,id: page.pageName};
        },
        
        openInsertTableLayer : function(elem){
        	$(".table_cell").removeClass("select");
        	$("#table_insert_msg").text ("");
        	$("#table_insert_msg").text ( 0 + " x " + 0);
        	var top = $(elem).offset().top;
        	var left = $(elem).offset().left;
        	$("#table_insert_layer").css({
	       	   "position" : "absolute",
	      	   "top" : (top + 3) + "px",
	      	   "left" : (left + 65 ) + "px"
        	}).show();
        },
        
        closeInsertTableLayer : function(){
        	$("#table_insert_msg").text ("");
        	$(".table_cell").removeClass("select");
        	$("#table_insert_layer").hide();
        },
        
        openInsertShapeLayer : function(elem){
        	$("#shape_insert_layer").hide();
        	var top = $(elem).offset().top;
        	var left = $(elem).offset().left;
        	$("#shape_insert_layer").css({
       	   "position" : "absolute",
      	   "top" : (top + 3) + "px",
      	   "left" : (left + 65 ) + "px"
        	}).show();
        },
        
        closeInsertShapeLayer : function(){
        	$("#shape_insert_layer").hide();
        },
        
        toolButtonEventClosure: function () {
            var context = this;
            return function (e) {
            	var selectedPage = A3Maker.getSelectedPage();
            	if (!selectedPage) {
            		alert("선택하신 페이지가 없습니다. 페이지를 먼저 선택해주세요");
            		return;
            	}
            	
            	var type = $(e.target).attr('data-comp');
                if (type == "box" ) {
                	context.openInsertShapeLayer(this);
                	return;
                }
                
                if (type =="table") {
                	context.openInsertTableLayer(this);
                	return;
                }
            	context.createComponent(type);
            };
        },
        
        createComponent : function(type,options){
            var context = this;
            var selectedPage = A3Maker.getSelectedPage();
            var selectedComponent = A3Maker.getSelectedComponent();
            var newComponent= '';
            var container;
            var menusetComponent;
            
            if (selectedPage) {
                if (type == "script" ) {
                	newComponent = selectedPage.createComponent(type, true, true,options);
                    newComponent.attach();
                    newComponent.setSelectStatus(true);
                    menusetComponent = newComponent;
                }
                else if (selectedComponent) {
                	var componentInfo= selectedComponent.isContainer();
                    if (componentInfo.isContainer) {
                        container = selectedComponent;
                    } else {
                        container = selectedComponent.parent;
                    }

                    newComponent = container.createComponent(type, true, true,options);
                    newComponent.attach();
                    newComponent.setSelectStatus(true);
                    menusetComponent = newComponent;

                    if (newComponent.data.type == "list") {
                        var listrow = newComponent.createComponent('listrow', true, true,options);
                        listrow.attach();
                        A3Maker.setSelectedComponent(listrow);
                        listrow.setSelectStatus(true);
                        menusetComponent = listrow;
                    }
                } else {
                    newComponent = selectedPage.createComponent(type, true, true,options);
                    newComponent.attach();
                    newComponent.setSelectStatus(true);
                    menusetComponent = newComponent;

                    if (newComponent.data.type == "list") {
                        var listrow = newComponent.createComponent('listrow', true, true,options);
                        listrow.attach();
                        A3Maker.setSelectedComponent(listrow);
                        listrow.setSelectStatus(true);
                        menusetComponent = listrow;
                    }
                }
             
            } else {
                alert("선택한 페이지가 없습니다. 페이지를 선택하시거나 페이지를 새로 생성하세요");
                return;
            }
            context.applyToolButtonChange(menusetComponent);
            event.stopPropagation();
            context.closeInsertTableLayer();
            context.closeInsertShapeLayer();
        },
        
        selectTreeNode : function(pageId){
        	var node  = this.$tree.tree("getNodeById", pageId);
        	this.$tree.tree('selectNode', node);
        } ,
        getPageIndex : function(page){
        	var index = 0;
        	for (var i = 0; i < A3Maker.project.pages.length; i++){
        		if (page.data.UUID === A3Maker.project.pages[i].data.UUID) {
        			index = i;
        			break;
        		}
        	}
        	return index;
        },
        
        selectPage : function(page,nodeAction, isRemainComSelect) {
        	A3Maker.contextMenu.close();
        	A3Maker.showPage(page);
        	A3Maker.controller.applyToolButtonChange(page);
        	A3Maker.changeAllComponentSelectStatus(page,false);
        	
        	A3Maker.statusBar.setPageNumberText(
        	    this.getPageIndex(page) + 1,
        	    A3Maker.project.pages.length,
        	    page.data.name
        	);
        	if (typeof A3Maker.sidebar.sidebarType === "undefined" || !A3Maker.sidebar.sidebarType ) {
        		A3Maker.sidebar.sidebarType = A3Maker.sidebar.sidebarTypeEnums.LIST_VEIW;
        	}
        	
        	if (A3Maker.sidebar.sidebarType == A3Maker.sidebar.sidebarTypeEnums.LIST_VEIW) {
        		if(!nodeAction) 
        			this.selectTreeNode(page.data.UUID);
        	}else if(A3Maker.sidebar.sidebarType == A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW){
        		$(".clone_thumb_container").removeClass("sidebar2_thumb_select");
     			$(".cloneWapper").removeClass("clone_thumb_select");
     				
     			$("#page_"+ page.data.UUID).addClass("sidebar2_thumb_select");
     			$("#page_"+ page.data.UUID+ " .cloneWapper").addClass("clone_thumb_select");
        	}
        	
        	
    		//page slide setting
    		var sliderValue = 0;
    		for (var i = 0; i < A3Maker.project.pages.length; i++){
    			if (page.data.UUID === A3Maker.project.pages[i].data.UUID) {
    				sliderValue  = i;
    				break;
    			}
    		}
    		A3Maker.statusBar.setPageSlider({
    			value : sliderValue + 1
    		});
    		//---> end page slide setting
        },
        
        getToolButtonContainer: function () {
            selectedComponent = A3Maker.getSelectedComponent();
            if (!selectedComponent) {
                return "page";
            }
            if (selectedComponent) {
                if (selectedComponent.parent.type == 'list' ||
                    selectedComponent.parent.type == 'listrow' ||
                    selectedComponent.parent.type == 'popup') {

                    return selectedComponent.parent.type;
                } else {
                    return selectedComponent.data.type;
                }
            } else {
                return "page";
            }
        },

        toolButtonClick: function (button, noHiding) {
            return true;
        },
    };
    //A3Maker.controller.applyToolButtonChange('image');
});