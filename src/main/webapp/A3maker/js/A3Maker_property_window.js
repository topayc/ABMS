A3Maker = A3Maker || {};
$(function() {
	A3Maker.propertyWindow = {
		isShown : false,
		propertyWindow : $('#element'),
		propertyType : "",
		propertyTypes : [ 'page', 'image', 'text', 'link', 'order', 'popup', 'list', 'listrow' ],
		name : '',
		isPositionFixed : true,
		positionX : 20,
		positionY : 100,
		propertyWindowWidth : 0,

		//jquey selector object
		$name : $('#element .field_value_name'),
		$x : $('#element .field_value_x'),
		$y : $('#element .field_value_y'),
		$width : $('#element .field_value_w'),
		$height : $('#element .field_value_h'),
		$fixRatio : $('#element .field_value_owhyn'),
		$fixed: $('#element .field_value_fixed'),
		$fontSelect : $('#element .field_value_fontface'),
		$fontSizeSelect : $('#element .field_value_size'),
		$colorPicker : $('#element .field_value_color'),
		$textContent: $('#element .field_value_content'),
		$backColorPicker : $('#element .field_value_backcolor'),

		//link 
		$pageTypeSelect : $('#element .field_value_linktype'),

		$linkPageSelectDiv : $('#element .linkPageSelectDiv'),
		$linkPopupSelectDiv : $('#element .linkPopupSelectDiv'),

		$linkPageSelect : $('#element .field_value_linkpage'),
		$linkPopupSelect : $('#element .field_value_linkpopup'),
		$linkWebText : $('#element .field_value_linkweb'),
		$phoneNumberText : $(".field_value_linkphonenumber"),

		$youTubeText : $(".field_value_linkyoutube"),
		$mallInMallText : $(".field_value_linkmallinmall"),
		$emailText : $(".field_value_linkEmail"),
		$mapDiv : $(".link_map"),
		$mapText : $('.field_value_linkmap'),

		//order
		$orderMenu : $('#element .field_value_menutitle'),
		$orderPrice : $('#element .field_value_price'),
		$orderChangeBtn : $('#element .btn_search'),

		/* upload*/
		$uploadFake : $('div[name="uploadFake"]'),
		$uploadImgSelector : $('#attach'),
		$uploadImageFrm : $('.upload_image_frm'),

		initControl : function() {
			var context = this;
			this.$uploadFake.css('cursor', 'pointer');
			this.propertyWindowWidth = this.propertyWindow.width();
			this.propertyWindow.draggable({
				containment : "#vertical_table",
				start : function() {
					context.isPositionFixed = true;
				},
				drag : function() {
					context.isPositionFixed = true;
				},
				stop : function() {
					if (context.isPositionFixed) {
						var offset = $(this).position();
						context.positionX = offset.left;
						context.positionY = offset.top;
					}
				}
			});
			this.initializeEventHandler();
		},
		
		setData : function(property, value) {
			switch (property) {
			case "name":
				this.$name.val(value);
				break;
			}
		},
		
		hideAllLInkPositionElem : function() {
			this.$linkPageSelectDiv.hide();
			this.$linkPopupSelectDiv.hide();
			this.$linkWebText.hide();
			this.$phoneNumberText.hide();
			this.$youTubeText.hide();
			this.$mallInMallText.hide();
			this.$emailText.hide();
			this.$mapDiv.hide();
		},

		resetAllLinkPositionElem : function() {
			this.$linkPageSelect.val('');
			this.$linkPopupSelect.val('');
			this.$linkWebText.val('');
			this.$phoneNumberText.val('');
			this.$youTubeText.val('');
			this.$mallInMallText.val('');
			this.$emailText.val('');
			this.$mapText.val('');
		},
		
	  updateRadius: function (radius) {		
	    var selectedComponent = A3Maker.getSelectedComponent();
	    if (selectedComponent) {
		    if(selectedComponent.selectStatus){
			    selectedComponent.data.radius = radius;
			    selectedComponent.setRadius(radius);    
		    }
	    }
	  },
    
	   updateBorder: function (border) {		
		    var selectedComponent = A3Maker.getSelectedComponent();
		    if (selectedComponent) {
			    if(selectedComponent.selectStatus){
				    selectedComponent.data.border = border;
				    selectedComponent.setBorder(border);    
			    }
		    }
	    },

		updatePositionAndWidth : function(id) {
			var selectedComponent = A3Maker.getSelectedComponent();
			var x = $(".field_value_x").val() == '' ? 0 : parseInt($(".field_value_x").val());
			var y = $(".field_value_y").val() == '' ? 0 : parseInt($(".field_value_y").val());
			var width = $(".field_value_w").val() == '' ? 16 : parseInt($(".field_value_w").val());
			var height = $(".field_value_h").val() == '' ? 16 : parseInt($(".field_value_h").val());

			var selectedComponentX = selectedComponent.data.left;
			var selectedComponentY = selectedComponent.data.top;
			var selectedComponentWidth = selectedComponent.data.width;
			var selectedComponentHeight = selectedComponent.data.height;

			if (selectedComponent) {
				selectedComponent.setPositionAndWidth(x, y, width, height);
				if (selectedComponent.data.type == 'listrow')
					selectedComponent.updatePositionNextRows(0, height - selectedComponentHeight);
			}
		},

		initializeEventHandler : function() {
			var context = this;
			$( '#element .field_value_x, #element .field_value_y, #element .field_value_w, #element .field_value_h')
					.focusout(function(e) {
						context.updatePositionAndWidth($(this).parent().attr("id"));
					});

			$( '#element .field_value_x, #element .field_value_y, #element .field_value_w, #element .field_value_h')
					.keydown(function(e) {
						if (e.which == 13) {
							context.updatePositionAndWidth($(this).parent().attr("id"));
						}
					});

			$( '#element .field_value_menutitle,#element .btn_search,#element .field_value_price')
					.click(function(e) {
						A3Maker.orderWindow.show(A3Maker.project.storeCode);
					});

			this.$fixRatio.click(function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				if (selectedComponent.data.type != 'order' && selectedComponent.data.type != 'image' && selectedComponent.data.type != 'link') return;
				var componentX = selectedComponent.data.left;
				var componentY = selectedComponent.data.top;

				var componentWidth = selectedComponent.data.width;
				var componentHeight = selectedComponent.data.height;

				var isFixRatio = $( "#element .prop_" + selectedComponent.data.type + " .field_value_owhyn") .is(':checked');
				var width = 0;
				var height = 0;

				if (isFixRatio == true) {
					var naturalWidth = $(selectedComponent.originalElementQueryStr) .get(0).naturalWidth;
					var naturalHeight = $(selectedComponent.originalElementQueryStr).get( 0).naturalHeight;
					if (componentWidth > componentHeight) {
						width = parseInt(componentWidth);
						height = parseInt((naturalHeight * componentWidth) / naturalWidth);
					} else if (componentWidth < componentHeight) {
						width = parseInt((naturalWidth * componentHeight) / naturalHeight);
						height = parseInt(componentHeight);
					} else {
						width = parseInt(componentWidth);
						height = parseInt((naturalHeight * componentWidth) / naturalWidth);
					}
					selectedComponent.setPositionAndWidth(componentX, componentY, width, height);
				}
				A3Maker.getSelectedComponent().data.fixRatio = isFixRatio;
			});

			this.$name.focusout(function(event) {
				context.onChangeComponentName(event, this);
			});
			/*
			this.$name.focusout(function(event) {
				context.onChangeComponentName(event, this);
			});
			this.$name.keydown(function(event) {
				if (event.which == 13)
					$(this).blur();
			});
			*/
			this.$fontSelect.change(function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				if (selectedComponent.data.type == "text") {
					selectedComponent.data['font-family'] = $(this).val();
					selectedComponent.refresh();
				}
			});

			this.$fontSizeSelect.change(function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				if (selectedComponent.data.type == "text") {
					selectedComponent.data['font-size'] = $(this).val();
					selectedComponent.refresh();
				}
			});
			
		 this.$textContent.bind('input propertychange', function(){
	        var selectedComponent = A3Maker.getSelectedComponent();
	        selectedComponent.data.text = $(this).val();
	        selectedComponent.originalElement.find('textarea').val($(this).val());
	      });
		  
			this.$backColorPicker.ColorPicker({
				onShow : function(colpkr) {
					$(colpkr).fadeIn(500);
					return false;
				},
				onHide : function(colpkr) {
					$(colpkr).fadeOut(500);
					return false;
				},
				onChange : function(hsb, hex, rgb) {
					var selectedPage  = A3Maker.getSelectedPage();
					
					var color = '#' + hex;
					context.$backColorPicker.css('backgroundColor', color);
					selectedPage.data['background-color']  = color;
					selectedPage.refresh();
				}
			});
			
			this.$colorPicker.ColorPicker({
				onShow : function(colpkr) {
					$(colpkr).fadeIn(500);
					return false;
				},
				onHide : function(colpkr) {
					$(colpkr).fadeOut(500);
					return false;
				},
				onChange : function(hsb, hex, rgb) {
					var selectedComponent = A3Maker.getSelectedComponent();
					var color = '#' + hex;
					context.$colorPicker.css('background-color', color);
					selectedComponent.data.color = color;
					selectedComponent.refresh();
				}
			});
			
	   	 var radiusHandle = $( "#radius_handle" );
	       $( "#radius_slider" ).slider({
	         create: function() {
	        	 radiusHandle.text( $( this ).slider( "value" ) );
	         },
	         slide: function( event, ui ) {
	        	 radiusHandle.text( ui.value );
	           context.updateRadius(parseInt(ui.value));
	         },
	         min: 0,
	         max: 50
	       });
	       
	       var borderHandle = $( "#border_handle" );
	       $( "#border_slider" ).slider({
	         create: function() {
	        	 borderHandle.text( $( this ).slider( "value" ) );
	         },
	         slide: function( event, ui ) {
	        	 borderHandle.text( ui.value );
	           context.updateBorder(parseInt(ui.value));
	         },
	         min: 0,
	         max: 50
	       });

			this.$pageTypeSelect.change(function() {
				context.hideAllLInkPositionElem();
				//context.resetAllLinkPositionElem();

				var selectValue = $(this).val();
				var selectedComponent = A3Maker.getSelectedComponent();

				selectedComponent.data.linkType = selectValue;
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'linktype', selectValue);
				switch (selectValue) {
				case "PageLink":
					selectedComponent.data.position = $( '#element .field_value_linkpage option:selected').val();
					context.setPageLinkSelect();
					context.$linkPageSelect.val(selectedComponent.position);
					context.$linkPageSelectDiv.show();
					break;
				case "Web":
					selectedComponent.data.position = context.$linkWebText.val();
					context.$linkWebText.show();
					break;
				case "Popup":
					selectedComponent.data.position = $( '#element .field_value_linkpopup option:selected').val();
					context.setPopupSelect();
					context.$linkPopupSelect.val(selectedComponent.position);
					context.$linkPopupSelectDiv.show();
					break;
				case "Phonenumber":
					selectedComponent.data.position = context.$phoneNumberText.val();
					context.$phoneNumberText.show();
					break;
				case "YouTube":
					selectedComponent.data.position = context.$youTubeText.val();
					context.$youTubeText.show();
					break;
				case "MallinMall":
					selectedComponent.data.position = context.$mallInMallText.val();
					context.$mallInMallText.show();
					break;
				case "Email":
					selectedComponent.data.position = context.$emailText.val();
					context.$emailText.show();
					break;
				case "Map":
					selectedComponent.data.position = context.$mapText.val();
					context.$mapDiv.show();
					break;
				}
			});
			this.$linkPageSelect.bind('change', function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$linkPopupSelect.bind('change', function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$phoneNumberText.focusout(function(e) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$linkWebText.focusout(function(e) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$phoneNumberText.keydown(function(e) {
				if (e.which == 13) {
					var selectedComponent = A3Maker.getSelectedComponent();
					selectedComponent.data.position = $(this).val();
					$(selectedComponent.externalWrapperQueryStr + ' .component-link') .attr('position', $(this).val());
				}
			});

			this.$linkWebText.keydown(function(e) {
				if (e.which == 13) {
					var selectedComponent = A3Maker.getSelectedComponent();
					selectedComponent.data.position = $(this).val();
					$(selectedComponent.externalWrapperQueryStr + ' .component-link') .attr('position', $(this).val());
				}
			});

			this.$youTubeText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
				console.log("position : " + selectedComponent.data.position);
			});

			this.$emailText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
				console.log("position : " + selectedComponent.data.position);
			});

			this.$mallInMallText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
				console.log("position : " + selectedComponent.data.position);
			});

			this.$mapText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.data.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', selectedComponent.data.position);
			});

			$('.field_value_linkmap_lon').bind(
					'focusout keydown',
					function(event) {
						if (event.type == 'keydown') {
							if (event.which != 13)
								return;
						}
						var selectedComponent = A3Maker.getSelectedComponent();
						selectedComponent.data.position = $('.field_value_linkmap_lat').val()
								+ "," + $(this).val();
						$(selectedComponent.externalWrapperQueryStr + ' .component-link') .attr('position', selectedComponent.position);
						console.log("position : " + selectedComponent.data.position);
					});

			
			this.$uploadFake.click(function(event) {
				context.$uploadImgSelector.trigger('click');
			});

			
			this.$uploadImgSelector.change(function(event) {
				console.log("image changed");
				$('#abmsProjectNo').val(A3Maker.project.projectSeq); // project_seq insert
				context.$uploadImageFrm.submit();
			});

			this.$uploadImageFrm.ajaxForm({
				beforeSubmit : function(data, frm, opt) {
					if ($('.ajax_center_loading').length < 1) {
						context.$centerLoadIngProgress = $(A3Maker.ajaxCenterLoadingHTML);
						$('body').prepend(context.$centerLoadIngProgress);
					}
					context.isUploading = true;
					return true;
				},

				success : function(responseText, statusText) {
					context.$centerLoadIngProgress.hide();
					context.$centerLoadIngProgress.remove();
					console.log(responseText)
					var res = responseText;
					if (res.resultCode != 100) {
						setTimeout(function(){alert(res.messageText);}, 30)
						return;
					}
					var uploadImgUrl = res.data;
					console.log("업로드 이미지 경로");
					console.log(uploadImgUrl);
					if (A3Maker.getSelectedPage()) {
						if (A3Maker.getSelectedComponent()) {
							A3Maker.getSelectedComponent().setData({'background-image' : uploadImgUrl});
						}else {
							A3Maker.getSelectedPage().data['background-image'] = uploadImgUrl;
							A3Maker.getSelectedPage().$pageHolderSelector.css('background-image', 'url(' +uploadImgUrl +')')
						}
					}

					context.$uploadImgSelector.val("");
					context.isUploading = false;
					A3Maker.sidebar.updateSideThumbnailView();
				},

				error : function(xhr, options, error) {
					context.$centerLoadIngProgress.hide();
					context.$centerLoadIngProgress.remove();
					context.isUploading = false;
					var errorMessage = '업로드 에러  : ' + error;
					alert(errorMessage);
				}
			});
			
			$('.extra-action').click(function() {
				var action = $(this).data('action');
				switch (action) {
				case "reset image":
					var target = A3Maker.getSelectedComponent() ? A3Maker.getSelectedComponent() : A3Maker.getSelectedPage();
					console.log("reset Image " +  target.src);
					if (target.data['background-image'] == "" || target.data['background-image'].indexOf('images')  != -1 ) {
						alert("설정되어 있는 이미지가 없습니다");
						return;
					}
					if (confirm("설정된 이미지가 초기화 됩니다.") == true) {
						if (A3Maker.getSelectedPage()) {
							if (A3Maker.getSelectedComponent()) {
								A3Maker.getSelectedComponent().resetImage();
							}else {
								A3Maker.getSelectedPage().data['background-image'] = '';
								A3Maker.getSelectedPage().$pageHolderSelector.css('background-image', '');
							}
						}
						A3Maker.sidebar.updateSidebarThumbNail();
					}
					break;
				case "clipart":
					A3Maker.clipArt.show();
					break;
				case "upload_image":
					context.$uploadImgSelector.trigger('click');
					break;
				case "download_image":
					var target = A3Maker.getSelectedComponent() ? A3Maker.getSelectedComponent() : A3Maker.getSelectedPage();
					if (target.data['background-image'] !='' && target.data['background-image'].startsWith('/')) {
						if (confirm("이미지를 다운로드 하시겠습니까")){
							console.log("다운로드 파일 : " + target.src);
							if ($("#ifrm").length > 0) $("#ifrm").remove();
			        var url = '/abms/A3Maker/downloadResource?projectSeq=' + A3Maker.project.projectSeq +"&fileName="+ target.src;
			        var html = "<iframe style ='width:0px;height:0px' id='ifrm' src='"+url+"'>";
			        $("body").append(html);
						}
					}else {
						alert("다운로드할 이미지가 없습니다");
					}
					break;
				}
			});
		},

		onChangeComponentName : function(event, target) {
			if ($(target).val().length < 1 || $(target).val() == '') {
				alert("콤퍼넌트 이름은 공백이 될 수 없습니다");
				$(target).focus();
				return;
			}
			var changedName = $(target).val();
			var selectedComponent = A3Maker.getSelectedComponent() ? A3Maker .getSelectedComponent() : A3Maker.getSelectedPage();
			if (selectedComponent.data.name != changedName) {
				var result = A3Maker.controller.isResiteredNodeIdOrName(null, selectedComponent.data.type, changedName);
				if (result) {
					alert("이미 존재하는 이름입니다.");
					$(target).val(selectedComponent.name);
					$(target).focus();
					return;
				}
			}

			//selectedComponent.data.displayName = changedName;
			selectedComponent.data.name = changedName;

			var target_node = A3Maker.controller.$tree.tree('getNodeById', selectedComponent.data.UUID);
			A3Maker.controller.$tree.tree('updateNode', target_node, changedName);

		},

		setPageLinkSelect : function() {
			var context = this;
			this.$linkPageSelect.find("option").each(function() {
				if (this.value) {
					$(this).remove();
				}
			});

			$.each(A3Maker.project.pages, function(index, page) {
				context.appendSelectItem(page);
			});
		},

		setPopupSelect : function() {
			var context = this;
			this.$linkPopupSelect.find("option").each(function() {
				if (this.value != "") {
					$(this).remove();
				}
			});

			var selectedPage = A3Maker.getSelectedPage();
			var popups = selectedPage.findComponents('popup');
			$.each(popups, function(index, popup) {
				context.appendSelectItem(popup);
			});
		},

		setPosition : function(x, y, w, h) {
			this.$x.val(x);
			this.$y.val(y);
			this.$width.val(w);
			this.$height.val(h);
		},

		setInitInfo : function(options) {
			this.extract(options);
			this.$name.val(this.name);
			this.$fixRatio.attr('checked', this.fixRatio);
			this.setPosition(this.x, this.y, this.width, this.height);
		},

		movePropertyWindow : function(x, y) {
			//this.positionX = x;
			//this.positionY = y;
			//this.propertyWindow.css('right', this.positionX);
			//this.propertyWindow.css('top', this.positionY);
		},

		setPropertyWindowPos : function(right, top) {
			this.positionX = right;
			this.positionY = top;
			this.propertyWindow.css('right', this.positionX);
			this.propertyWindow.css('top', this.positionY);
		},

		appendSelectItem : function(item) {
			switch (item.data.type) {
			case "page": this.$linkPageSelect.append("<option value ='" + item.data.id + "'>" + item.data.name  + "</option>"); break;
			case "popup": this.$linkPopupSelect.append("<option value ='" + item.data.id + "'>" + item.data.name  + "</option>"); break;
			}
		},

		deleteSelectItem : function(item) {
		  switch (item.data.type) {
			case "page":
				this.$linkPageSelect.find('option').each(function() {
					if (this.value == item.data.fullName) {
						$(this).remove();
					}
				});
				break;
			case "popup":
				this.$linkPopupSelect.find('option').each(function() {
					if (this.value == item.data.fullName) {
						$(this).remove();
					}
				});
				break;
			}
		},
		
		resetPropertyWindow : function(propertyType){
			var selectedComponent = A3Maker.getSelectedComponent();
			selectedComponent = selectedComponent ? selectedComponent : A3Maker.getSelectedPage();
			//이미지가 필요없는 컴포넌트의 경우 이미지 업로드 버튼 및 관련 폼 제거 
			if (propertyType == 'image' || propertyType == 'link' || propertyType == 'order') this.$uploadFake.show();
			$('.field_value_x, .field_value_y, .field_value_w') .removeAttr("disabled");
			
			//Radius Slider set
			if (typeof selectedComponent.data.radius !== "undefined" && selectedComponent.data.radius) {
				$( "#radius_slider" ).slider({value : selectedComponent.data.radius});
				$( "#radius_handle" ).text(selectedComponent.data.radius)
			}else {
				$( "#radius_slider" ).slider({value : 0})
				$( "#custom_handle" ).text(0)
			}
			
			//Border Slider set
			if (typeof selectedComponent.data.border !== "undefined" && selectedComponent.data.border) {
				$( "#border_slider" ).slider({value : selectedComponent.data.border});
				$( "#border_handle" ).text(selectedComponent.border)
			}else {
				$( "#border_slider" ).slider({value : 0})
				$( "#border_handle" ).text(0)
			}
			
			this.$textContent.val('');
			this.$backColorPicker.css('background-color', "f000");
			this.$colorPicker.css('backgroundColor', "#000");
		},
		
		setPropertyWindowTitle : function(title) {
			$("#element .el_title .text").text(title);
		},
		
		showPropertyWindow : function(propertyType) {
			this.resetPropertyWindow(propertyType);

			//프로퍼티 윈도우 위치 고정
			var context = this;
			this.propertyType = propertyType;
			this.propertyWindow.css('right', this.positionX);
			this.propertyWindow.css('top', this.positionY);
			
			this.propertyType = propertyType;
			this.setPropertyWindowTitle(propertyType);
			
			var selectedComponent = A3Maker.getSelectedComponent();
			selectedComponent = selectedComponent ? selectedComponent : A3Maker.getSelectedPage();
			
			switch (this.propertyType) {
			case "page":
				var color = A3Maker.getSelectedPage()['background-color'] ?  A3Maker.getSelectedPage()['background-color'] : "#ffffff"
		        this.$backColorPicker.css('background-color', color);
		        this.$backColorPicker.ColorPickerSetColor(color);
				break;
			case "text":
			  this.$textContent.val('');
			  this.$textContent.val(selectedComponent.data.text);
			  var $textarea = selectedComponent.originalElement.find('textarea');
			  if($textarea.is('[disabled=disabled]')){
				  this.$textContent.attr('disabled', 'disabled');
			  }
			  else {
				  this.$textContent.removeAttr('disabled');
			  }
			  $textarea.unbind('input propertychange');
			  $textarea.bind('input propertychange', function(){
	          context.$textContent.val($(this).val());
			  });
	        
			  var color = selectedComponent.data['color'];
			  this.$fontSelect.val(selectedComponent.data['font-family']);
			  this.$fontSizeSelect.val(selectedComponent.data['font-size']);
			  this.$colorPicker.css('backgroundColor', color);
			  this.$colorPicker.ColorPickerSetColor(color);
			  break;

			case 'link':
				this.$pageTypeSelect.val(selectedComponent.data.linkType);
				this.hideAllLInkPositionElem();
				this.resetAllLinkPositionElem();
				var context = this;

				if (selectedComponent.data.linkType == "PageLink") {
					this.setPageLinkSelect();
					this.$linkPageSelectDiv.show();
					this.$linkPageSelect.val(selectedComponent.data.position);
				}

				if (selectedComponent.data.linkType == "Web") {
					this.$linkWebText.show();
					this.$linkWebText.val(selectedComponent.data.position);
				}

				if (selectedComponent.data.linkType == "Popup") {
					this.setPopupSelect();
					this.$linkPopupSelectDiv.show();
					this.$linkPopupSelect.val(selectedComponent.data.position);
				}

				if (selectedComponent.data.linkType == "Phonenumber") {
					this.$phoneNumberText.show();
					this.$phoneNumberText.val(selectedComponent.data.position);
				}

				if (selectedComponent.data.linkType == "YouTube") {
					this.$youTubeText.show();
					this.$youTubeText.val(selectedComponent.data.position);
				}

				if (selectedComponent.data.linkType == "MallinMall") {
					this.$mallInMallText.show();
					this.$mallInMallText.val(selectedComponent.data.position);
				}

				if (selectedComponent.data.linkType == "Email") {
					this.$emailText.show();
					this.$emailText.val(selectedComponent.data.position);
				}

				if (selectedComponent.data.linkType == "Map") {
					this.$mapDiv.show();
					this.$mapText.val(selectedComponent.data.position);
				}
				break;
			case 'order':
				this.$orderMenu.val(!selectedComponent.data.menu
						|| selectedComponent.data.menu == 'undefined' ? ''
						: selectedComponent.data.menu);
				this.$orderPrice.val(!selectedComponent.data.price
						|| selectedComponent.data.menu == 'undefined' ? ''
						: selectedComponent.data.price);
				break;
			case 'popup':
				break;
			case 'list':
				break;
			case 'listrow':
				$('.field_value_x, .field_value_y, .field_value_w').attr("disabled", "disabled");
				break;
			}
			
			if (typeof selectedComponent.data.fixRatio !== "undefined" && selectedComponent.data.fixRatio) {
				$("#element .field_value_owhyn").prop( 'checked', selectedComponent.data.fixRatio);
			}
			$("#element tr.prop_elem").hide();
			$("#element tr.prop_" + propertyType).show();
			this.propertyWindow.show();
			this.isShown = true;
			
		},

		extract : function(options) {
			var context = this;
			$.each(options, function(key, value) {
				context.setProperty(key, value);
			});
		},

		setProperty : function(key, value) {
			this[key] = value;
		},

		closePropertyWindow : function(propertyType, x, y) {
			if (this.isShown) {
				this.propertyWindow.hide();
				this.isShown = false;
			}
		}
	};
	A3Maker.propertyWindow.initControl();
});
