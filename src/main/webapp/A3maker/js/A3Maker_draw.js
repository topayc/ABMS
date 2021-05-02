A3Maker = A3Maker || {};
$(function () {
	
    A3Maker.draw= {
    		papers : [],
    		lines : [],
    		init: function () {
      	
        	
        },
        reset : function(){this.init()},
        	
        drawLine : function(x1, y1, x2, y2 , container){
        	/*
         	setTimeout(function(){
        	 	var pageContainer = A3Maker.getSelectedPage().$pageHolderSelector;
          	this.width = 	pageContainer.width();
        		this.height= 	pageContainer.height();
        		
          	var w =  y1 == y2 ? this.width : 0.5; 
          	var h  =  x1 == x2 ? this.height : 0.5; 
          	
          	var line = $("<div>").css({
          		position : 'absolute',
          		left : x1 + "px",
          		top : y1 + "px",
          		width : w + "px",
          		height : h + "px",
          		backgroundColor : "#ff0000",
          		zIndex : "999999"
          	});
          	$(pageContainer).prepend(line);
          	line.addClass("align_component_line").show();
        		
        	},10);
         	*/
        	var pageContainer = A3Maker.getSelectedPage().$pageHolderSelector;
        	this.width = 	pageContainer.width();
      		this.height= 	pageContainer.height();
      		
        	var w =  y1 == y2 ? this.width : 0.5; 
        	var h  =  x1 == x2 ? this.height : 0.5; 
        	
        	var line = $("<div>").css({
        		position : 'absolute',
        		left : x1 + "px",
        		top : y1 + "px",
        		width : w + "px",
        		height : h + "px",
        		backgroundColor : "#ff0000",
        		zIndex : "999999"
        	});
        	$(pageContainer).prepend(line);
        	line.addClass("align_component_line").show();
      	},
      	
        drawLines : function(gridLines){
        	if (!A3Maker.statusBar.alignLineShow) A3Maker.draw.clear();
        	if (gridLines.length < 1 ) return;
        	for(var i =0; i< gridLines.length; i++){
        		this.drawLine(gridLines[i][0],gridLines[i][1],gridLines[i][2],gridLines[i][3]);
        	}
        	this.lines.length = 0;
      	},
      	
        drawSvgLine : function(x1, y1, x2, y2 , container){
        	var container = container ? container : A3Maker.holder;
        	this.width = 	$(container).width();
      		this.height= 	$(container).height();
      		
      		var w =  y1 == y2 ? this.width : 0.5; 
        	var h  =  x1 == x2 ? this.height : 0.5; 
        	
        	var paper = Raphael( document.getElementById("page-container"), x1, x2, w, h);
        	this.papers.push(paper);
        	
        	var pathStr = "M" + x1 + " " + y1 + " L" + x2 + " " + y2;
        	paper.path(pathStr).toFront().attr(
	        		{
	        			stroke : "#ff7777",
	        			"stroke-width" : 1,
	        			"stroke-dasharray" : "-"
	        		}
	        	);
        	$("svg").css({
        		zIndex : 999999
        	});
        	},
        	
        	clear : function(){
        		$(".align_component_line").remove();
        	}
    };
    A3Maker.draw.init();
});

