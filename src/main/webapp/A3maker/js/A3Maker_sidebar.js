A3Maker = A3Maker || {};
$(function () {
    A3Maker.sidebar= {
        sidebarTypeEnums : {LIST_VEIW : "LIST_VEIW", THUMBNAIL_VIEW : "THUMBNAIL_VIEW"},
        init: function () {
        	this.sidebarType = A3Maker.sidebar.sidebarTypeEnums.LIST_VIEW;
    		this.initSidebarScoll();
    		this.initializeAddPageEventHandler();
    		this.initializeSidebarOpenHideEventHandler();
    		this.initializeSearchEventHandler();
    		this.initializeListViewEventHandler();
    		this.initializeThumbNailViewEventHandler();
    		//this.selectBar(A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW)
    		$("#thumbnailMenu .listview"). trigger("click");
        },
        
        initSidebarScoll : function(){
        	$(".tree-menus").mCustomScrollbar({
				theme:"minimal"
			});
        },
        
        selectBar : function(type){
        	var target;
        	switch(type){
        	case A3Maker.sidebar.sidebarTypeEnums.LIST_VEIW : 
        		target = "#thumbnailMenu .listview";
        	case A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW : 
        		target = "#thumbnailMenu .thumbnail_view";	
        	} 
        	$(target).trigger("click");
        },
        
        updateSideThumbnailView : function(component){
        	if (A3Maker.sidebar.sidebarType !== A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW) return;
        	var sideBar2 = $("#page_sidebar_2");

        	if (!component) {
        		sideBar2.empty();
        		var pageThumbnails = this.cloneThumbnailAllPage(true);
        		for (var i = 0; i < pageThumbnails.length; i++){
        			sideBar2.append(pageThumbnails[i]);
        		}
        	}else {
        		
        	}
        },
        
        initializeCustomScrollbarHandler : function(){
        	$(".tree-menus").mCustomScrollbar({
    			theme:"minimal"
    		});
        },
        
        initializeAddPageEventHandler : function(){
        	$("#addpage").click(function(e){
        		e.preventDefault();
        		A3Maker.newPageWindow.show();
        	});
        },
        
        initializeSearchEventHandler : function(){
        	$('#searchBtn').click(function(e){
        		$("#search_container").show();
        		$("#search_filter").focus();
        	});
        	
        	$('#search_close').click(function(e){
        		$("#search_container").hide();
        	});
        	
        },
        initializeSidebarOpenHideEventHandler : function(){
        	var context = this;
        	var $sideAct = $('#side_act');
        	var $sideActText = $sideAct.find("#side_meneu_state"); 
        	var $contentContainer = $('.content_container');
        	var contentContainerLeft = $contentContainer.css("left");
        	
            $sideAct.click(function(e){
            	$sideAct.toggleClass("side_menu_open");
            	if($sideAct.hasClass('side_menu_open')){	
            		$contentContainer.stop(true).animate({left: '283px'}, 70);
            		$sideActText.text('CLOSE');
            	}else{
            		$contentContainer.stop(true).animate({left: '0px'}, 70);
            		$sideActText.text('OPEN');
            	};
            });
            $sideAct.trigger("click");
        },
        
        initializeListViewEventHandler : function(){
        	var context = this;
        	$("#thumbnailMenu .listview").click(function(e){
        		e.preventDefault();
        		context.sidebarType = A3Maker.sidebar.sidebarTypeEnums.LIST_VIEW;
        		$("#thumbnailMenu .thumbnail_view").removeClass("thumbnail_view_active");
        		$(this).addClass("listview_active");
         	 
        		$("#page_sidebar_2").hide();
        		$('#page_sidebar').show();
        	});
        },
        
        cloneThumbnailPage : function(){
        	
        },
        
        /* 모든 페이지에 대한 섬네일을 생성하며 생성된 섬네일 돔 리스트를 반환*/
        cloneThumbnailAllPage : function(createEvent, containerWidth, containerHeight){
        	var pageThumbnails = [];
        	var containerWidth = containerWidth ? containerWidth : A3Maker.config.SIDEBAR.THUMBNAIL_CLONE.SIZE.WIDTH;
        	var containerHeight = containerHeight? containerHeight : A3Maker.config.SIDEBAR.THUMBNAIL_CLONE.SIZE.HEIGHT;
        	
            $(".editor-page").each(function(index){
	        	  var thumbContainer = 
	        		  $("<div class ='clone_thumb_container' >") 
	         		  .height(A3Maker.config.SIDEBAR.THUMBNAIL_CLONE.SIZE.HEIGHT)
	         		  .width(A3Maker.config.SIDEBAR.THUMBNAIL_CLONE.SIZE.WIDHT)
	         		  .css({ "padding":"10px", })
	         		  .attr("id" , "page_"+ $(this).attr("id"));
	         		 
	        	  	  if (createEvent) {
		        	  	  var numDiv = $("<div>").css({
		        	  		  "width" : "5%",
		         	 	   	  "height" : "100%",
		         			  "float" : "left",
		         		      "font-weight" : "bold",
		         		      "font-color" : "#666666",
		         		      "font-size" : "9pt" }
		         		 );
		        	  	 numDiv.html(index+ 1);
		         		 thumbContainer.append(numDiv) 
	        	  	 }
	         		
	         		 
	         		 var cloneWrpper = $("<div class ='cloneWapper side_clone_page_thumbnail'>");
	         		 cloneWrpper.css("border" , "1px solid #bbb");
	         		 cloneWrpper.css("position", "relative");
	         		 cloneWrpper.css("display", "block");
	         		 cloneWrpper.css("float", "left");
	         		 cloneWrpper.css("width",  containerWidth);
	         		 cloneWrpper.css("height", containerHeight);
	         		 cloneWrpper.css("background-color", "#fff");
	         		 cloneWrpper.css("margin-bottom", "10px");
	         		 cloneWrpper.addClass("thumb_page_" + (index+1));
	         		 cloneWrpper.data("thumb_page", index+ 1);
	         		 
	         		 var clonePage = $(this).clone();
	         		 clonePage.removeClass();
	         		 clonePage.find(".eggbon_com").each(function(index){
	         			 var compId = $(this).attr("id");
	         			 $(this).attr("id", "thumb_"+ $(this).attr("id"));
	         		 });
	         
	         		 clonePage.find(".moveActionTrigger").removeClass();
	         		 clonePage.find(".internalWrapper").removeClass();
	         		 clonePage.find(".component").removeClass();
	         		 clonePage.find(".grip").remove();
	         		 clonePage.find(".component_border").remove();
	         		 clonePage.width(A3Maker.project.width).height(A3Maker.project.height);
	         		 
	         		 clonePage.css("display","block");
	         		 clonePage.find("div.cross_grid_line").remove();
	         		 clonePage.find('*').css('cursor','default');
	         		 clonePage.css('cursor','pointer');
	         		 cloneWrpper.append(clonePage); 
	
	         		 var origin = "0% 0%";
	         		 var zoomX = containerWidth / A3Maker.project.width;
	         		 var zoomY = containerHeight / A3Maker.project.height;
	         		 clonePage.css(
	         		 {
	                    '-moz-transform-origin': origin,
	                    'transform-origin': origin,
	                    '-ms-transform-origin': origin,
	                    '-webkit-transform-origin': origin,
	                 });
	         		 clonePage.css({ transform: 'scale(' + (zoomX) + ',' + (zoomY)+ ' )' });
	         		 
	         		 thumbContainer.append(cloneWrpper);
	         		 thumbContainer.find(".align_component_line").remove();
	         		 thumbContainer.hover(	
	         				 function(e){ },
	         				 function(e){ }
	         		 );
	         		if (createEvent) {
	         			thumbContainer.contextmenu(function(e){
		         			event.preventDefault();
		         			$(this).trigger('click');
		        		 	A3Maker.setSelectedComponent(null);
		        		 	A3Maker.contextMenu.close();
		        		 	A3Maker.contextMenu.show(
		        		 	    A3Maker.contextMenu.requestActionEnums.PAGE ,
		        		 		e.pageX, 
		        		 		e.pageY
		        		 	);
		         		});
	         			thumbContainer.click(function(e){
		         			/*
		         			$(".clone_thumb_container").removeClass("sidebar2_thumb_select");
		         			$(".cloneWapper").removeClass("clone_thumb_select");
		         			 
		         			$(this).addClass("sidebar2_thumb_select");
		         			cloneWrpper.addClass('clone_thumb_select');
		         			 */
		         			var page  = A3Maker.project.componentMap[$(this).attr('id').split('_')[1]];
		         			A3Maker.controller.selectPage(page);
		         		 });
	         		} 
	         		pageThumbnails.push(thumbContainer)
	         	 });
            return pageThumbnails;
        },
        
        initializeThumbNailViewEventHandler : function(){
          	var context = this;
        	$("#thumbnailMenu .thumbnail_view").click(function(e){
        		context.sidebarType = A3Maker.sidebar.sidebarTypeEnums.THUMBNAIL_VIEW;
        		e.preventDefault();
         	 
        		$("#thumbnailMenu .listview").removeClass("listview_active");
        		$(this).addClass("thumbnail_view_active");
         	 
        		$("#page_sidebar").hide();
        		//페이지 복사
        		var pages = $(".editor-page").clone();
        		var sideBar2 = $("#page_sidebar_2");
        		sideBar2.empty();
         	 
        		var pageThumbnails = context.cloneThumbnailAllPage(true);
        		for (var i = 0; i < pageThumbnails.length; i++){
        			sideBar2.append(pageThumbnails[i]);
        		}
	         	sideBar2.show();
	         	var selectedPage = A3Maker.getSelectedPage();
	         	if (!selectedPage) selectedPage = A3Maker.project.pages[0];
	            
	       		$("#page_" + selectedPage.data.UUID).click();
          });
        },
    };
});
