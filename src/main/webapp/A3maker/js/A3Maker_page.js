A3Maker = A3Maker || {};
A3Maker.class = {
    //functions added to a sub class
    subClassAddfuncs: {
        get: function (property) {
            if (this.hasOwnProperty(property)) {
                return this[property];
            } else {
                return fasle;
            }
        },
        get: function (property, value) {
            if (this.hasOwnProperty(property)) {
                this[property] = value;
                return true;
            }
            return false;
        }
    },

    extend: function (childProto, parentFunc, addFunc, parentProto) {
        if (parentProto != null) {
            childProto.parentClass = parentProto;  // 부모 클래스의 함수를 호출하기휜 parentclass 설정 
        }
        if (parentFunc != null) {
            for (var property in parentFunc) {
                childProto[property] = parentFunc[property];
            }
        }
        if (addFunc != null) {
            for (var property in addFunc) {
                childProto[property] = addFunc[property];
            }
        }
    }
};

A3Maker.Page = function (data) {
    this.data = data;
	if (this.data) {
    	if (typeof this.data.childs !== 'undefined') delete this.data.childs;
    }
    this.childs = new Array();

    this.isComponentAction = false;
    this.selectedComponent = null;
    this.type = this.data['type'] =  "page";
    this.selectedStatus = true;
    
    this.preparePageSettings();
    this.selectionRect = "";
    A3Maker.project.componentMap[this.data.id] = this;
};

A3Maker.Page.prototype.preparePageSettings = function () {
    var context = this;
    this.$pageHolderSelector = $('<div style ="background-size:100% 100%;left:0px; top:0px;width:100%;height:100%" id ='+ this.data.UUID + ' class ="editor-page page ' + this.data.name + '"><div class="cross_grid_line" style="display:none;width:100%;height:100%"></div></div>"');
    if(this.data['background-color']){
  		this.$pageHolderSelector.css('background-color',this.data['background-color']);
  	}
    if (typeof this.data['background-image'] !== 'undefined' && this.data['background-image'] !='') {
    	this.$pageHolderSelector.css('background-image', 'url(' +this.data['background-image'] +')');
    }
    this.$pageHolderSelector.css({ 'position': 'absolute', 'overflow': 'visible' });
    //this.$pageHolderSelector.addClass('cross_grid_line');
    this.$pageHolderSelector.addClass('page-border');
    this.$pageHolderSelector.addClass(this.data.name);
    this.$pageHolderSelector.appendTo($(A3Maker.holder));
    this.pageHolderSelectorStr = "#" + this.data.id;
    
    A3Maker.setSelectedPage(this);
};

A3Maker.Page.prototype.findComponents = function (type) {
    var arr = [];
    $.each(this.childs, function (index, child) {
        if (child.data.type == type)
            arr.push(child);
    });
    return arr;
};

A3Maker.Page.prototype.extract = function (options) {
    var context = this;
    $.each(options, function (key, value) {
        context.setProperty(key, value);
    });
};

//getter
A3Maker.Page.prototype.getProperty = function(key) {
	if (this.hasOwnProperty(key)) {
		return this.data[key];
	} else {
		return false;
	}
};

A3Maker.Page.prototype.refresh = function() {
	console.log("page refresh");
	console.log(this.backColor);
	this.$pageHolderSelector.css('background-color',this.data['background-color']);
};

A3Maker.Page.prototype.setProperty = function(key, value) {
	this.data[key] = value;
};

A3Maker.Page.prototype.show = function () {this.$pageHolderSelector.show();
};

A3Maker.Page.prototype.hide = function () {
    this.$pageHolderSelector.hide();
};

A3Maker.Page.prototype.destroy = function () {
    this.$pageHolderSelector.remove();
};

A3Maker.Page.prototype.setPageDisplayPos= function (x, y) {
	console.log(x +' : '+y);
    this.$pageHolderSelector.css({'position' : 'absolute', 'display':'block', 'left' : x + 'px', 'top' : y + 'px'});
};

A3Maker.Page.prototype.changeAllComponentSelectStatusRecursive = function (source, status) {
    console.log("recursive ");
    var context = this;
    if (source.childs && source.childs.length > 0) {
        $.each(source.childs, function (index, child) {
            if (child.data.type == "list" || child.data.type == 'listrow' || child.data.type == "popup") {
                context.changeAllComponentSelectStatusRecursive(child, status);
            } else {
                if (status) {
                    child.showBorderTool();
                    child.showGripTool();
                    child.selectStatus = true;
                } else {
                    child.hideBorderTool();
                    child.hideGripTool();
                    child.selectStatus = false;
                }
            }
        });
    }
};

A3Maker.Page.prototype.changeAllComponentSelectStatus = function (status) {
    var context = this;
    if (this.childs.length > 0) {
        $.each(this.childs, function (index, child) {
            if (child.data.type == "list") {
                context.EnableComponentBorderAndGrip(child, status);
                $.each(child.childs, function (index, listRow) {
                    $.each(listRow.child, function (k, listRowChild) {
                        context.EnableComponentBorderAndGrip(listRowChild, status);
                    });
                    context.EnableComponentBorderAndGrip(listRow, status);
                });
            }
            else if (child.data.type == "popup") {
                context.EnableComponentBorderAndGrip(child, status);
                $.each(child.childs, function (index, popupChild) {
                    if (popupChild.data.type == "list") {
                        $.each(popupChild.childs, function (index, listRow) {
                            $.each(listRow.childs, function (index, finalChild) {
                                context.EnableComponentBorderAndGrip(finalChild, status);
                            });

                        });
                    } else {
                        context.EnableComponentBorderAndGrip(popupChild, status);
                    }
                });

            } else {
                context.EnableComponentBorderAndGrip(child, status);
            }
        });
    }
};

A3Maker.Page.prototype.EnableComponentBorderAndGrip = function (component, status) {
    if (status) {
        component.showBorderTool();
        component.showGripTool();
        component.selectStatus = true;
    } else {
        component.hideBorderTool();
        component.hideGripTool();
        component.selectStatus = false;
    }
};

//특정 좌표가 컴포넌트에 해당되는지 조사 
A3Maker.Page.prototype.isIncludePosition = function (x, y) {
    var isInclude = false;
    for (var i = 0; i < this.childs.length ; i++) {
        var com = this.childs[i];
        if (x >= com.data.left && y >= com.data.top && x <= com.data.left + com.data.width && 
        		y <= com.data.top + com.data.height) {
            isInclude = true;
        }
    }
    return isInclude;
};

A3Maker.Page.prototype.clearAll = function () {

    for (var i = 0; this.childs.length; i++) {
        this.childs[i].selectStatus = false;
        this.childs[i].detach();
    }
    A3Maker.setSelectedComponent(null);
    this.childs.length = 0;
    A3Maker.controller.setComCount("#page1", this.childs.length);
};

A3Maker.Page.prototype.setSelectedComponent = function (component) {
    this.selectedComponent = component;
};

A3Maker.Page.prototype.addComponent = function (component) {
    this.childs.push(component);
    this.curChildInx++;
    A3Maker.controller.setComCount("#page1", this.childs.length);
};

A3Maker.Page.prototype.addComponentToTree = function (component) {
    var parentNode = A3Maker.controller.$tree.tree("getNodeById", this.data.UUID);
    A3Maker.controller.$tree.tree(
        'appendNode',
        {
            label: component.data.name,
            id: component.data.UUID,
            type : component.data.type,
            data: component
        },
        parentNode
    );
    A3Maker.controller.$tree.tree('openNode', parentNode);
};

A3Maker.Page.prototype.removeComponent = function (component) {
    var index = -1;
    $.each(this.childs, function (inx, child) {
        if (child.data['UUID'] == component.data['UUID']) {
            index = inx;
            return;
        }
    });

    if (index != -1) {
        this.childs.splice(index, 1);
    }
    this.removeCompoentToTree(component);
    //A3Maker.controller.setComCount("#page1", this.childs.length);

    component.selectStatus = false;
    component.detach();
};

A3Maker.Page.prototype.removeCompoentToTree = function (component) {
    var node = A3Maker.controller.$tree.tree("getNodeById", component.data.UUID);
    A3Maker.controller.$tree.tree('removeNode', node);
};

A3Maker.Page.prototype.adjustComponentSize = function (zoom) {
    for (var i = 0; i < this.childs.length ; i++) {
        var component = this.childs[i];
        var ox = component.data.left;
        var oy = component.data.top;
        var owidth = component.data.width;
        var oheight = component.data.height;

        var tx = parseInt(ox * (zoom / 100)) - component.cornerActionTriggerRadius;
        var ty = parseInt(oy * (zoom / 100)) - component.cornerActionTriggerRadius;

        var twidth = parseInt(owidth * (zoom / 100));
        var theight = parseInt(oheight * (zoom / 100));
        $(component.externalWrapperQueryStr).css('left', tx + "px");
        $(component.externalWrapperQueryStr).css('top', ty + "px");
        $(component.originalElement).css('width', twidth + "px");
        $(component.originalElement).css('height', theight + "px");
        component.adjustWrapper();
        component.adjustResizingBorder();
    }
};
/*
param 
   componentType : 생성할 컴포넌트
   listAdd : 컴포넌트를 내부 관리할 지 여부 
*/
A3Maker.Page.prototype.createComponent = function (componentType, childAdd, treeAdd, options) {
	
    A3Maker.contextMenu.close();
    var com = A3Maker.Component.build(this, componentType, options);
    if (childAdd == true) {
       this.addComponent(com);
    }
    if (treeAdd) {
        this.addComponentToTree(com);
    }
    A3Maker.controller.setComCount("#page1", this.childs.length);
    return com;
};

//페이지에 등록된 컴포턴트 타입별로 순차적인 인덱스를 생성
A3Maker.Page.prototype.createComponentNo = function (type) {
    var index = 0;
    var matchChilds = $.map(this.childs, function (comp) {
        if (comp.data.type == type) {
            return comp.data.no;
        } 
    });

    if (Array.isArray(matchChilds)) {
        if (matchChilds.length == 0) {
            index = 1;
        } else {
        	matchChilds.sort(function(a,b){return a< b ? -1 : a> b? 1 : 0;  });
          index = matchChilds[matchChilds.length - 1]  + 1;
        }
        return index;
    }
};

//페이지에 등록된 컴포턴트 타입별로 순차적인 인덱스를 생성
A3Maker.Page.prototype.genComponentNo = function (type) {
    var index = 0;
    var matchChilds = $.map(this.childs, function (comp) {
        if (comp.data.type == type) {
            return comp;
        }
    });

    if (Array.isArray(matchChilds)) {
        if (matchChilds.length == 0) {
            index = 1;
        } else {
            index = matchChilds[matchChilds.length - 1].no;
        }
        return index;
    }
};
