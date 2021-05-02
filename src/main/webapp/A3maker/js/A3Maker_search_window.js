A3Maker = A3Maker || {};
$(function () {
	
    A3Maker.searchWindow= {
    	
    	init: function(){},
    	
        search : function(word){
        	if (typeof this.$searchWindow === "undefined" || !this.$searchWindow) {
        		this.$searchWindow = $(A3Maker.searchWindowHTML);
        		this.initializeEventHandler();
        		this.$searchWindow.prependTo($('body'));
            	this.$searchWindow.show();
        	}

        	word = word ? word : "";
        	this.$searchWindow.find("#search_word").val(word);
        	this.$searchWindow.find("#resultText").val("");
 
        	if (word) {
        		var results = this.searchContext(word);
        		this.updateSearchResult(results)
        	}
        },
        
        initializeEventHandler : function(){
        	var context = this;
        	this.$searchWindow.find("#search_window_btn_close").click(function(){
        		context.close();
        	});
        	this.$searchWindow.find("#search_window_btn_search").click(function(){
        		var searchWord = context.$searchWindow.find("#search_word").val();
        		if (searchWord === "" ||  searchWord.length < 1) {
        			alert("검색할 단어를 입력해주세요");
        			return;
        		}
        		var results = context.searchContext(searchWord);
        		context.updateSearchResult(results)
        	});
        },
        
        updateSearchResult : function(){
        	
        },
        
        searchContext : function(){
        
        },
        
        close : function(){
        	if (typeof this.$searchWindow !== 'undefined' && this.$searchWindow)  {
        		this.$searchWindow.remove();
        		this.$searchWindow = null;
        	}
        },
    };
    A3Maker.searchWindow.init();
});

