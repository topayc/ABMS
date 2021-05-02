A3Maker = A3Maker || {};
$(function () {
	
    A3Maker.statusBar= {
    	papers : [],
    	thumbnailIndex : 0,
    	curPageIndex :  1,
    	slideThumnails : [],
    	alignLineShow : false,
    	init: function () {
    		this.initializePageBoxHandler();
    		this.initializeStatusbarHandler();
    		this.setPageSlider({value : 0});
    		this.setPageNumberText(0,0,'');
        },
        
        setPageNumberText2: function(cur, total,name ){
        	$( "#zoom_handle").text(cur);
        	$("#statusbarArea #statusbarLeftArea #curPageNumber").val(cur);
        	$("#statusbarArea #statusbarLeftArea #totalPageNumber").text(A3Maker.project.pages.length);
        	$("#statusbarArea #statusbarLeftArea #curPageName").text(name);
        },
        
        setPageNumberText: function(cur, total,name ){
        	var selectedPage = A3Maker.getSelectedPage();
        	if (cur) $( "#zoom_handle").text(cur);
        	if (cur) $("#statusbarArea #statusbarLeftArea #curPageNumber").val(cur);
        	if (name) {
        		$("#statusbarArea #statusbarLeftArea #curPageName").text(name);
        	}else {
        		$("#statusbarArea #statusbarLeftArea #curPageName").text("");
        	}
        	$("#statusbarArea #statusbarLeftArea #totalPageNumber").text(A3Maker.project.pages.length);
        },
        
        getGridMarkerSize : function(){
        	var size = parseInt($("#scaleMarkSize option:selected").val());
        	return size;
        },
        setPageSlider : function(customOption){
        	var zoomHandle = $( "#zoom_handle" );
        	var option = {
        		min : 1,
        		max : A3Maker.project.pages.length,
        		value : 1
        	};
        	
        	option = typeof customOption === "undefined" ? option: $.extend(option, customOption);
        	$( "#zoom_slider" ).slider(option);
        	//this.setPageNumberText(option.value );
        },
        
        showCrossGridLine : function(){
        	var page = A3Maker.getSelectedPage();
        	if (!page) return;
        },
        
        initializePageBoxHandler : function(){
        	var context = this;
        	$('#statusbarArea #statusbarLeftArea #curPageNumber').keypress(function(e) {
        		if (e.which == 13) {
        			context.slideThumnails = A3Maker.sidebar.cloneThumbnailAllPage( false, 200, 100 );
        			var pageInx = parseInt($(this).val());
        			if (pageInx < 1 || pageInx > A3Maker.project.pages.length) {
        				$(this).val(context.curPageIndex);
        				return;
        			}
        			var page = context.slideThumnails[pageInx-1];
	            	page  = A3Maker.project.componentMap[page.attr('id').split('_')[1]];
	            	context.curPageIndex = pageInx;
        			A3Maker.controller.selectPage(page);
        		}
        	});
        },
        
        initializeStatusbarHandler : function(){
        	var context = this;
        	var $elems;
        	var zoomHandle = $( "#zoom_handle" );
        	var thumbnailCss = {
    				position: 'fixed',
    				left: '370px',
    				padding: '1px',
    				//border : "1px solid #34a7c1"
    				bottom: '50px',
    		};
        	
        	$( "#zoom_slider").slider({
        		start : function(){
        			context.slideThumnails = A3Maker.sidebar.cloneThumbnailAllPage(
        				false,
        				200,
        				100
        			);
        			
        			$elems = context.slideThumnails[context.thumbnailIndex];
        			$elems.css(thumbnailCss); 
        			$("body").append($elems);
        			
	            },
	            stop : function( event, ui){
	            	var value = parseInt(ui.value);
	            	var page = context.slideThumnails[value-1];
	            	context.curPageIndex = value;
	            	
	            	page  = A3Maker.project.componentMap[page.attr('id').split('_')[1]];
	            	A3Maker.controller.selectPage(page);
	            	
	            	if ($elems) $elems.remove(); 
	            	context.slideThumnails.length = 0;
	            },
        		create: function() {
        			zoomHandle.text($( this ).slider( "value" ));
	            },
	            slide: function( event, ui ) {
	            	if ($elems) $elems.remove(); 
	            	var value = parseInt(ui.value);
	            	var page = context.slideThumnails[value-1];
	            	page  = A3Maker.project.componentMap[page.attr('id').split('_')[1]];
        			
	            	$elems = context.slideThumnails[value-1];
        			$elems.css(thumbnailCss); 
        			$("body").append($elems);
        			context.setPageNumberText(value,A3Maker.project.pages.length,page.data.name )
        			zoomHandle.text( ui.value );
	            	context.thumbnailIndex = value-1;
	            },
	            min: 1,
            });
        	
        	/* 눈금선 이벤트 핸들러*/
        	$("#scaleMarkMode").click(function(e){
        		A3Maker.contextMenu.toggleGridLine();
        	});

        	$("#alignLineState").click(function(e){
        		context.alignLineShow = !context.alignLineShow;;
        	});
        	
        	$("#scaleMarkSize").change(function(){
        		A3Maker.contextMenu.showGridLine();
        	});
        	/* 슬라이드 보기 이벤트 핸들러*/
        	$('#slideShow').click(function (e) {
                e.preventDefault();
                A3Maker.changeAllComponentSelectStatus(A3Maker.getSelectedPage(),false);
                A3Maker.multiSelectionRect.resetSelection();
                A3Maker.preview.startPreview();
            });
        	
        	$("#bottomSearchBtn").click(function(){
        		var searchWord = $("#bottomSearchbox").val();
        		A3Maker.searchWindow.search(searchWord);
        	});
        	$("#bottomSearchbox").keypress(function(e){
        		if (e.which == 13) {
        			$("#bottomSearchBtn").trigger('click');
        		}
        	});
        	
        },
        reset : function(){this.init()},
    };
});

