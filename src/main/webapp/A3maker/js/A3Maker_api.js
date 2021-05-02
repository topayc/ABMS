A3Maker = A3Maker || {};

$(function () {
    A3Maker.api = {
        apiInfo: {
        		loadProjectInfo 			 : { apiCode: 10011, requestMethod: 'get'},
        		sustainSession 			 : { apiCode: 10012, requestMethod: "get"},
        		saveProject 					 : { apiCode: 10013, requestMethod: "post"},
        		loadPageTemplates	 : { apiCode: 10014, requestMethod: "get"},
        		loadClipArts 					 : { apiCode: 10015, requestMethod: "get"},
        		loadUserAssets		 	 : { apiCode: 10016, requestMethod: "get"},  
        		loadServiceAssets		 : { apiCode: 10017, requestMethod: "get"},
        		uploadImage 				 : { apiCode: 10018, requestMethod: "post"},
        		loadUserInfo					 : { apiCode: 10019, requestMethod: "get"},
        		downloadResource	 : { apiCode: 10020, requestMethod: "get"},
        },
        
        init : function(){
            this.rootUrl = "/";
            this.apiUrl = "abms/A3Maker/A3MakerApi?apiCode=";
        },

        makeApiUrl : function(apiName, data){
        	 console.log("apiName : " + apiName );
            var url = this.rootUrl + this.apiUrl + this.apiInfo[apiName].apiCode;
            console.log(url)
            return url;
        },

     A3MakerApi: function (apiName, data, callback) {
            var requestUrl = this.makeApiUrl(apiName);
						if (apiName == 'sustainSession'){
							$('.ajax_top_loading').attr('title', apiName);
							$('.ajax_top_loading').css('visibility','visible');
						}else {
	            if ($('.ajax_center_loading').length < 1) {
	            	this.$centerLoadIngProgress = $(A3Maker.ajaxCenterLoadingHTML);
	            	$('body').prepend(this.$centerLoadIngProgress);
	            }
            }
            
            if (this.apiInfo[apiName].requestMethod == 'get') {
                this.sendGetJson(requestUrl, apiName, data, callback);
            } else {
                this.sendPostJson(requestUrl, apiName, data, callback);
            }
        },

        /*get request */
        sendGetJson: function (requestUrl, apiName, data, callback) {
        		var context = this;
            $.getJSON(requestUrl, data, function (result) {
            	$('.ajax_top_loading').css('visibility','hidden');
              context.$centerLoadIngProgress.hide();
              context.$centerLoadIngProgress.remove();
              
                if (callback && typeof callback == "function") {
                	callback(result);
                } else {
                    context.handleResponse(apiName , result);
                }
            });
        },

        /*post request */
        sendPostJson: function (requestUrl, apiName, data, callback) {
        	var context = this;
            $.ajax({
                type: "POST",
                url: requestUrl,
                data: data,
                success: function (result) {
                    if (callback && typeof callback == "function") {
                    	$('.ajax_top_loading').css('visibility','hidden');
                    	context.$centerLoadIngProgress.hide();
                    	context.$centerLoadIngProgress.remove();
                      callback(result);
                    } else {
                    	$('.ajax_top_loading').css('visibility','hidden');
                    	context.$centerLoadIngProgress.hide();
                    	context.$centerLoadIngProgress.remove();
                    	context.handleResponse(apiName, result);
                    }
                },
                dataType: 'json'
            });
        },

        handleResponse : function(apiName, jsonResult){
            switch (apiName) {
                case 'loadpubInfo':break;
                case 'sustainSession':break;
                case 'savet':break;
                case 'loadPageTemplates':break;
                case 'loadClipArts':break;
                case 'loadUserAssets':break;
                case 'loadServiceAssets':break;
                case 'deleteProject':break;
                case 'uploadImage':break;
                case 'loadUserInfo':break;
            }
        }
    };
    A3Maker.api.init();
});
