(function () {
    if (!A3Maker.config) {
        A3Maker.config = {
            setConfig: function (customConfig) {
            	  var defaultConfig = {
            	  		width : 600,
            	  		height : 800,
            	  		runMode : "product",
            	  		autoSave : false,
            	  		autoValidate : false,
            	  		autoSaveInterval : 3000,
            	  		validationInterval : 3000,
            	  		autoSustainSession : false,
            	  		sustainSessionInterval : 4000,
            	  		componentZinde : { 'image' : 1,'order' : 2,'link' : 3,'text' : 4,'list' : 5,'popup' : 1 },
            	  		chkDuplPageName : false,  // 페이지 이름 중복 검사 플래그
            	  		chkDuplCompName : false, // 컴포넌트 이름 중복 검사 플래그
            	  		componentType : {
                      image: { typeName: "image", permittableChild: false, permittableChildComps: [] },
                      link: { typeName: "link", permittableChild: false, permittableChildComps: [] },
                      text: { typeName: "text", permittableChild: false, permittableChildComps: [] },
                      order: { typeName: "order", permittableChild: false, permittableChildComps: [] },
                      list: { typeName: "list", permittableChild: true, permittableChildComps: ['listrow'] },
                      listrow: { typeName: "listrow", permittableChild: true, permittableChildComps: ['image', 'text', 'link', 'order'] },
                      popup: { typeName: "image", permittableChild: true, permittableChildComps: ['image', 'text', 'link', 'order', 'list'] },
                      page: { typeName: "page", permittableChild: true, permittableChildComps: ['image', 'text', 'link', 'order', 'list', 'popup'] },
                      root: { typeName: "root", permittableChild: true, permittableChildComps: ['page'] }
                  },
                  SIDEBAR : {
                  	THUMBNAIL_CLONE : {SIZE : { WIDTH : 180 , HEIGHT:100}},
                  	THUMBNAIL_CONTAINER : {SIZE : { WIDTH : 200 , HEIGHT:100}}
                  }
            	  };
                
                if (customConfig) {
                    A3Maker.config= $.extend(defaultConfig, config);
                }
                else {
                    A3Maker.config = defaultConfig;
                }
                A3Maker.componentType = A3Maker.config.componentType;
            },
            
            get: function (property) {
                if (this.hasOwnProperty(property)) {
                    return this[property];
                }
                return false;
            }
        };
    }
    A3Maker.config.setConfig();
})();
