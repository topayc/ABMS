A3Maker = A3Maker || {};
$(function () {
    A3Maker.newPageWindow = {
    		$newPageContainer: '',
    		totalTemplateCnt: 0,  // 해당 카테고리의 템플릿 총 수
    		curPage: 0,  // 현재 요청 템플릿 페이지 번호
    		curCategorySeq: 0,
    		rowPage: 8,
    		totalPageCnt : -1,
    		init: function () {
    			$.ajaxSetup({
    				cache:false
    			});
    		},
    		isShown : false,

        initializeNewPageEventHandler: function () {
        	var context = this;
        	this.$newPageContainer.find('.btn-close-page,.newpage_btn_close').click(function (event) {
        		context.close(); 
        	});

        	this.$newPageContainer.find('.newpage_btn_preview').hide();

        	// insert a new blank page
        	this.$newPageContainer.find('.empty_page').click(function (event) {
        		var selectedPage = A3Maker.getSelectedPage();
        		
        		var page;
        		if (selectedPage) {
        			page = A3Maker.project.createPageInsert('after', selectedPage);
        		}else {
        			page = A3Maker.project.createPage();
        		}
        		
        		A3Maker.changeAllComponentSelectStatus(false); 
        		A3Maker.showPage(page);
        		
        		var node = A3Maker.controller.$tree.tree('getNodeById', page.data.UUID);
        		A3Maker.controller.$tree.tree('selectNode', node);
        		
        		A3Maker.controller.applyToolButtonChange(page);
        		
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
        		
        		A3Maker.statusBar.setPageNumberText(
        				sliderValue + 1,
                	    A3Maker.project.pages.length,
                	    page.data.name
                	);
        		
        		if (A3Maker.sidebar.sidebarType ===A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW ) {
        			A3Maker.sidebar.selectBar( A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW);
        		}
        		context.close();
        	});

        	// insert a new page from the selected templage
        	this.$newPageContainer.find('.newpage_btn_insert').click(function (event) {
        		var $selectedTemplate = $('.newpage_right .template li.template_selected');
        		if ($selectedTemplate.length == 0) {
        			alert('템플릿을 선택해주세요');
        			return;
        		}

        		var projectName = $selectedTemplate.attr('project_name');
        		var projectSeq = $selectedTemplate.attr('project_seq');
        		var memberSeq = $selectedTemplate.attr('member_seq');

        		if (!projectName || !memberSeq || !projectSeq) {
        			alert('wrong request : 프로젝트 정보가 잘못되었습니다');
        			return;
        		}

        		A3Maker.api.A3MakerApi('loadTemplate', { project_seq : projectSeq, member_seq : memberSeq}, function(projectResult) {
        			if (!projectResult || !projectResult.searchResult || projectResult.searchResult == '' || 
        					projectResult.resultCode != 0 || projectResult.searchResult == 'undefined') {
        				alert('[project request] wrong reqeust :  [' + projectResult.resultMsg + ']');
        				return;
        			}
        			console.log(projectResult);
        			A3Maker.addPageTmeplateToProject(projectResult);
        			context.close();
        		});
        	});

        	// this.$newPageContainer.find('.template li').click(function (event) {
        	// //아래 해당 코드는 loadTemplates 함수에서 처리해야 함
        	// context.$newPageContainer.find('.template
        	// li').removeClass('newpage_template_selected');
        	// $(this).addClass('newpage_template_selected');
        	// });

        	$(document).on('click', '.newpage_right .template li', function (event) {
        		$('.newpage_right .template li').removeClass('template_selected');
        		$('.newpage_right .template li i').hide();
        		$(this).addClass('template_selected');
        		$(this).find("i").show();
        	});

        },

        show: function () {
            var context = this;
            this.$newPageContainer = $(A3Maker.newPageWindowHTML);
            $('body').prepend(this.$newPageContainer);
            this.initializeNewPageEventHandler();
            this.$newPageContainer.show();
            this.$newPageContainer.find('.newpage_left ul').remove();
            
            this.isShown = true;
        },

        loadTemplates: function (category_code_seq, cur_page, row_page) {
            var context = this;
            var requestData = {
                category_code_seq : category_code_seq,
                curr_page: cur_page,
                curr_row: cur_page,
                row_page : row_page,
            };
            
            console.log('[loadTemplates] ' + category_code_seq + " : "+  cur_page + " : "+  row_page);

            A3Maker.api.A3MakerApi('loadTemplates', requestData, function (result) {
                var projectTemplates = result.searchResult;
                context.totalTemplateCnt = projectTemplates.total_count;
                context.generateProjectTemplateList(projectTemplates);
                context.generatePaging(category_code_seq, projectTemplates.total_count, cur_page, row_page);
            });
        },
		
		
        /* generateProjectTemplateList */
        generateProjectTemplateList : function(projectTemplates){
            var context = this;
            
            var $templateItemContainer = $('.newpage_right .template');
			$templateItemContainer.empty();
            var projectTemplateListCnt = projectTemplates.list.length;
			var renderInfo = { tWidth :  100, tHeight: 141};
					
			$.each(projectTemplates.list, function(index, project){
				var pageInfo = A3Maker.convertScreenData(JSON.parse(project.menu_json));
				var $templateItemLi =  $('<li style ="border : 1px solid #eee" class="template'+ index +'"><div class="text_bg">'+ project.prj_name +'<div class="sm_preview">Preview</div> </div><i class="template_check fa fa-check-square-o fa-2x"></i></li>');
				$templateItemLi.css('overflow' , 'hidden');
				if (pageInfo.PAGELIST  && pageInfo.PAGELIST.PAGE  && pageInfo.PAGELIST.PAGE.length &&  pageInfo.PAGELIST.PAGE.length > 0){
					renderInfo['sWidth'] =  project.width_size;
					renderInfo['sHeight'] =  project.height_size;
					
					$templateItemLi.prepend(context.genenrateThumbPageTemplate(pageInfo.PAGELIST.PAGE[0], pageInfo.HEADER, renderInfo));
					$templateItemLi.attr('project_seq',project.project_seq); 
					$templateItemLi.attr('member_seq',project.member_seq); 
					$templateItemLi.attr('project_name',project.prj_name); 
					$templateItemLi.appendTo($templateItemContainer); 
					$templateItemLi.find('.text_bg').hide();
					$templateItemLi.bind('mouseover', function(event){$(this).find('.text_bg').show();});
					$templateItemLi.bind('mouseout', function(event){$(this).find('.text_bg').hide();});
					$templateItemLi.find('.sm_preview').click(function(event){
						event.stopPropagation();
						A3Maker.preview.callExternalPreview(project.member_seq, project.project_seq);
					});
				}else {
					console.log("## wrong page info");
				}
			});
        },
        
                /* create pagination */
        generatePaging: function (category_code_seq, totalCnt, curPage, rowPage) {
			$('ul.page-set').empty();
            if (totalCnt <= rowPage) return;
            
			var context = this;
            var totalPageCnt = totalCnt % rowPage == 0 ? totalCnt / rowPage : (totalCnt / rowPage) + 1;

            // generate paging tool
            $('ul.page-set').append($('<li class="page"><span class="paging_pre_arrow"></span></li>'));
            for (var i = 1 ; i <= totalPageCnt ; i++) {
                var $pageIndex = $('<li class="page"><a href="javascript:void(0)">' + i  + '</a></li>')
                    .attr({
                        "pageIndex": i-1 ,
                        'category_code_seq': category_code_seq
                    });
                $('ul.page-set').append($pageIndex);
                if (curPage == (i-1)) $pageIndex.addClass("selected"); // 현재
																																				// 페이지
																																				// 인텍스
																																				// 강조
                $pageIndex.click(function (event) {
                    context.loadTemplates(parseInt($(this).attr('category_code_seq')), parseInt($(this).attr('pageIndex')),context.rowPage);
                });
     
            }
            $('ul.page-set').append($('<li class="page"><span class="paging_next_arrow"></span></li>'));
        },
		
		
		genenrateThumbPageTemplate : function( page, header, renderInfo){
			var context = this;
			var $page = $('<div style ="border : 0px"></div>').css({'left' : "0px",	'top' : "0px",'width' : renderInfo.tWidth+ 'px',	'height' : renderInfo.tHeight+ 'px', 'position' : 'absolute'});		
			if (page.IMAGECOMP){
				$.each(page.IMAGECOMP, function(inx, comp) {
					context.createDom($page, comp, 'image', header, renderInfo);
				}); 
			}	
			
			if (page.LINKBUTTONCOMP){
				$.each(page.IMAGECOMP, function(inx, comp) {
						context.createDom($page, comp, 'link',  header, renderInfo);
				}); 
			}
			
			if (page.TEXTCOMP){
				$.each(page.TEXTCOMP, function(inx, comp) {
					context.createDom($page, comp, 'text',  header, renderInfo);
				}); 
			}	
			
			if (page.ORDERBUTTONCOMP){
				$.each(page.ORDERBUTTONCOMP, function(inx, comp) {
					context.createDom($page, comp, 'order',  header, renderInfo);
				}); 
			}
			
			if (page.LISTCOMP) context.createListComponent($page, page.LISTCOMP , header, renderInfo);
			if (page.POPUPPAGE) context.createPopComponent($page, page.POPUPPAGE , header, renderInfo);
			return $page;
		},
		
		getComponentCss : function(component, type, renderInfo) {
			var css = {
				'left'		 :  this.convertValueBySize(renderInfo.tWidth, renderInfo.sWidth, component.xpos) + "px",
				'top' 		 :  this.convertValueBySize(renderInfo.tHeight, renderInfo.sHeight, component.ypos) + "px",
				'width' 	 :  this.convertValueBySize(renderInfo.tWidth, renderInfo.sWidth, component.width) + 'px',
				'height'   :  this.convertValueBySize(renderInfo.tHeight, renderInfo.sHeight, component.height) + 'px',
				'position' :  'absolute'
			};
			if (type == 'text'){
				css['color'] = component.color;
				css['font-family']  = component.font_family;
				css['font-size']   = component.font_size;
			}
			if (type == 'list') css['backgorund-color'] = 'rgba(255,255,255,0)';
			return css;
		},
		
		createPopComponent : function($container, popupArr, header, renderInfo){
			var context = this;
			if (popupArr || popupArr.length > 0) {
				$.each(popupArr, function(index, popup) {
					var $poupup = context.createDom($container, popup, 'popup', header, renderInfo);
						if (popup.IMAGECOMP){
							$.each(popup.IMAGECOMP, function(inx, comp) {
								context.createDom($poupup, comp, 'image', header, renderInfo);
							}); 
						}	
						
						if (popup.LINKBUTTONCOMP){
							$.each(popup.IMAGECOMP, function(inx, comp) {
								context.createDom($poupup, comp, 'link',  header, renderInfo);
							}); 
						}
						
						if (popup.TEXTCOMP){
							$.each(popup.TEXTCOMP, function(inx, comp) {
								context.createDom($poupup, comp, 'text',  header, renderInfo);
							}); 
						}	
						
						if (popup.ORDERBUTTONCOMP){
							$.each(popup.ORDERBUTTONCOMP, function(inx, comp) {
								context.createDom($poupup, comp, 'order',  header, renderInfo);
							}); 
						}
						if (popup.LISTCOMP) context.createListComponent($popup, popup.LISTCOMP , header, renderInfo);
				});
			}
		},
		
		createListComponent : function($container, listComponentArr, header, renderInfo){
				var context = this;
				if (listComponentArr && listComponentArr.length > 0) {
					$.each(listComponentArr, function(index, list) {
					var $list = context.createDom($container, list, 'list', header, renderInfo);
					
					if (list.LISTROW && list.LISTROW.length > 0) {
						$.each(list.LISTROW, function(inx, listRow) {
							
							var $listRow = context.createDom($list, listRow, 'listrow', header, renderInfo);
							if (listRow.IMAGECOMP){
								$.each(listRow.IMAGECOMP, function(inx, comp) {
									context.createDom($listRow, comp, 'image', header, renderInfo);
								}); 
							}	
							
							if (listRow.LINKBUTTONCOMP){
								$.each(listRow.IMAGECOMP, function(inx, comp) {
										context.createDom($listRow, comp, 'link',  header, renderInfo);
								}); 
							}
							
							if (listRow.TEXTCOMP){
								$.each(listRow.TEXTCOMP, function(inx, comp) {
									context.createDom($listRow, comp, 'text',  header, renderInfo);
								}); 
							}	
							
							if (listRow.ORDERBUTTONCOMP){
								$.each(listRow.ORDERBUTTONCOMP, function(inx, comp) {
									context.createDom($listRow, comp, 'order',  header, renderInfo);
								}); 
							}
						});
					}
				});
			}
		},
		
		createDom  : function($container, comp, componentType, header, renderInfo){
			if (componentType == 'image') {
				$img = $('<img style ="border:0px"/>').attr('src', A3Maker.resource.getImageResourcePathByBasePath(header.base_path, comp.src, 'image'));
				$img.css(this.getComponentCss(comp, componentType, renderInfo));
				$container.append($img);
				return $img;
			}
			
			if (componentType == 'order') {
				$order = $('<img style ="border:0px"/>').attr('src', A3Maker.resource.getImageResourcePathByBasePath(header.base_path, comp.src, 'order'));
				$order.css(this.getComponentCss(comp, componentType, renderInfo));
				$container.append($order);
				return $order;
			}
			
			if (componentType == 'link') {
				$link = $('<img style ="border:0px"/>').attr('src', A3Maker.resource.getImageResourcePathByBasePath(header.base_path, comp.src, 'link'));
				$link.css(this.getComponentCss(comp, componentType, renderInfo));
				$container.append($link);
				return $link;
			}

			if (componentType == 'text') {
				$text = $("<textarea></textarea>");
				$text.css(this.getComponentCss(comp, componentType, renderInfo));
				$text.html(comp.content_text? comp.content_text : '');
				$container.append($text);
				return $text;
			}
			
			if (componentType == "list") {
				$list = $("<div></div>").css(this.getComponentCss(comp, componentType, renderInfo));
				$container.append($list);
				return $list;
			}

			if (componentType == "listrow") {
				$listrow = $("<div></div>").css(this.getComponentCss(comp, componentType, renderInfo));
				$container.append($listrow);
				return $listrow;
			}

			if (componentType == "popup") {
				$popup = $("<div></div>").css(this.getComponentCss(comp, componentType, renderInfo));
				$container.append($popup);
				return $popup;
			}
		},
		
		convertValueBySize : function(targetSize, sourceSize, value){
			return parseInt((value * targetSize)/sourceSize);
		},

		close: function () {
			this.$newPageContainer.hide();
			this.$newPageContainer.remove();
			this.$newPageContainer  = null;
			this.totalTemplateCnt = 0;  // 해당 카테고리의 템플릿 총 수
			this.curTemplatePage = 0;  // 현재 요청 템플릿 페이지 번호
			this.curCategorySeq = -1;
			this.isShown = false;
		},

		hideTemporary: function() {
			this.$newPageContainer.hide();
		},

		showTemporary: function() {
			this.$newPageContainer.show();
		},
		
    };
    A3Maker.newPageWindow.init();
});

