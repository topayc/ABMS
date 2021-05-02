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
		$fontSelect : $('#element #el_text .field_value_fontface'),
		$fontSizeSelect : $('#element #el_text .field_value_size'),
		$colorPicker : $('#element #el_text .field_value_color'),
		$textContent: $('#element #el_text .field_value_content'),
		$pageColorPicker : $('#element #el_page .field_value_backcolor'),

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
				containment : "document",
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

		updatePositionAndWidth : function(id) {
			var selectedComponent = A3Maker.getSelectedComponent();
			var x = $('#' + id + " .field_value_x").val() == '' ? 0 : parseInt($( '#' + id + " .field_value_x").val());
			var y = $('#' + id + " .field_value_y").val() == '' ? 0 : parseInt($( '#' + id + " .field_value_y").val());
			var width = $('#' + id + " .field_value_w").val() == '' ? 16 : parseInt($('#' + id + " .field_value_w").val());
			var height = $('#' + id + " .field_value_h").val() == '' ? 16 : parseInt($('#' + id + " .field_value_h").val());

			var selectedComponentX = selectedComponent.x;
			var selectedComponentY = selectedComponent.y;
			var selectedComponentWidth = selectedComponent.width;
			var selectedComponentHeight = selectedComponent.height;

			if (selectedComponent) {
				selectedComponent.setPositionAndWidth(x, y, width, height);
				if (selectedComponent.type == 'listrow')
					selectedComponent.updatePositionNextRows(0, height
							- selectedComponentHeight);
			}
		},

		initializeEventHandler : function() {
			var context = this;
			$(
					'#element .field_value_x, #element .field_value_y, #element .field_value_w, #element .field_value_h')
					.focusout(function(e) {
						context.updatePositionAndWidth($(this).parent().attr("id"));
					});

			$(
					'#element .field_value_x, #element .field_value_y, #element .field_value_w, #element .field_value_h')
					.keydown(function(e) {
						if (e.which == 13) {
							context.updatePositionAndWidth($(this).parent().attr("id"));
						}
					});

			$(
					'#element .field_value_menutitle,#element .btn_search,#element .field_value_price')
					.click(function(e) {
						A3Maker.orderWindow.show(A3Maker.project.storeCode);
					});

			this.$fixRatio.click(function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				if (selectedComponent.type != 'order'
						&& selectedComponent.type != 'image'
						&& selectedComponent.type != 'link')
					return;
				var componentX = selectedComponent.x;
				var componentY = selectedComponent.y;

				var componentWidth = selectedComponent.width;
				var componentHeight = selectedComponent.height;

				var isFixRatio = $(
						"#element #el_" + selectedComponent.type + " .field_value_owhyn")
						.is(':checked');
				//alert( "#el_" + selectedComponent.type + " .field_value_owhyn" + " : "+ $("#el_" + selectedComponent.type).length + " : " + isFixRatio);
				var width = 0;
				var height = 0;

				if (isFixRatio == true) {
					var naturalWidth = $(selectedComponent.originalElementQueryStr)
							.get(0).naturalWidth;
					var naturalHeight = $(selectedComponent.originalElementQueryStr).get(
							0).naturalHeight;
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

					selectedComponent.setPositionAndWidth(componentX, componentY, width,
							height);
				}

				A3Maker.getSelectedComponent().fixRatio = isFixRatio;
			});

			this.$name.blur(function(event) {
				context.onChangeComponentName(event, this);
			});
			this.$name.focusout(function(event) {
				context.onChangeComponentName(event, this);
			});
			this.$name.keydown(function(event) {
				if (event.which == 13)
					context.onChangeComponentName(event, this);
			});

			this.$fontSelect.change(function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				if (selectedComponent.type == "text") {
					selectedComponent.fontFamily = $(this).val();
					selectedComponent.refresh();
				}
			});

			this.$fontSizeSelect.change(function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				if (selectedComponent.type == "text") {
					selectedComponent.fontSize = $(this).val();
					selectedComponent.refresh();
				}
			});
			
		  this.$textContent.bind('input propertychange', function(){
        var selectedComponent = A3Maker.getSelectedComponent();
        selectedComponent.text = $(this).val();
        selectedComponent.originalElement.find('textarea').val($(this).val());
      });
		  
			this.$pageColorPicker.ColorPicker({
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
					if (!selectedPage) return;
					
					var color = '#' + hex;
					context.$pageColorPicker.css('backgroundColor', color);
					selectedPage.backColor  = color;
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
					context.$colorPicker.css('backgroundColor', color);
					selectedComponent.color = color;
					selectedComponent.refresh();
				}
			});

			this.$pageTypeSelect.change(function() {
				context.hideAllLInkPositionElem();
				//context.resetAllLinkPositionElem();

				var selectValue = $(this).val();
				var selectedComponent = A3Maker.getSelectedComponent();

				selectedComponent.linkType = selectValue;
				//selectedComponent.postion = '';
				console.log('## 선택된 값');
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr(
						'linktype', selectValue);
				switch (selectValue) {
				case "PageLink":
					selectedComponent.position = $( '#element .field_value_linkpage option:selected').val();
					context.setPageLinkSelect();
					context.$linkPageSelect.val(selectedComponent.position);
					context.$linkPageSelectDiv.show();
					break;
				case "Web":
					selectedComponent.position = context.$linkWebText.val();
					context.$linkWebText.show();
					break;
				case "Popup":
					selectedComponent.position = $(
							'#element .field_value_linkpopup option:selected').val();
					context.setPopupSelect();
					context.$linkPopupSelect.val(selectedComponent.position);
					context.$linkPopupSelectDiv.show();
					break;
				case "Phonenumber":
					selectedComponent.position = context.$phoneNumberText.val();
					context.$phoneNumberText.show();
					break;
				case "YouTube":
					selectedComponent.position = context.$youTubeText.val();
					context.$youTubeText.show();
					break;
				case "MallinMall":
					selectedComponent.position = context.$mallInMallText.val();
					context.$mallInMallText.show();
					break;
				case "Email":
					selectedComponent.position = context.$emailText.val();
					context.$emailText.show();
					break;
				case "Map":
					selectedComponent.position = context.$mapText.val();
					context.$mapDiv.show();
					break;
				}
			});
			this.$linkPageSelect.bind('change', function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$linkPopupSelect.bind('change', function(event) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$phoneNumberText.focusout(function(e) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$linkWebText.focusout(function(e) {
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
			});

			this.$phoneNumberText.keydown(function(e) {
				if (e.which == 13) {
					var selectedComponent = A3Maker.getSelectedComponent();
					selectedComponent.position = $(this).val();
					$(selectedComponent.externalWrapperQueryStr + ' .component-link') .attr('position', $(this).val());
				}
			});

			this.$linkWebText.keydown(function(e) {
				if (e.which == 13) {
					var selectedComponent = A3Maker.getSelectedComponent();
					selectedComponent.position = $(this).val();
					$(selectedComponent.externalWrapperQueryStr + ' .component-link') .attr('position', $(this).val());
				}
			});

			this.$youTubeText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
				console.log("position : " + selectedComponent.position);
			});

			this.$emailText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
				console.log("position : " + selectedComponent.position);
			});

			this.$mallInMallText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', $(this).val());
				console.log("position : " + selectedComponent.position);
			});

			this.$mapText.bind('focusout keydown', function(event) {
				if (event.type == 'keydown') {
					if (event.which != 13)
						return;
				}
				var selectedComponent = A3Maker.getSelectedComponent();
				selectedComponent.position = $(this).val();
				$(selectedComponent.externalWrapperQueryStr + ' .component-link').attr( 'position', selectedComponent.position);
				console.log("position : " + selectedComponent.position);
			});

			$('.field_value_linkmap_lon').bind(
					'focusout keydown',
					function(event) {
						if (event.type == 'keydown') {
							if (event.which != 13)
								return;
						}
						var selectedComponent = A3Maker.getSelectedComponent();
						selectedComponent.position = $('.field_value_linkmap_lat').val()
								+ "," + $(this).val();
						$(selectedComponent.externalWrapperQueryStr + ' .component-link') .attr('position', selectedComponent.position);
						console.log("position : " + selectedComponent.position);
					});

			
			this.$uploadFake.click(function(event) {
				context.$uploadImgSelector.trigger('click');
			});

			
			this.$uploadImgSelector.change(function(event) {
				console.log("image changed");
				$('#projectSeq').val(A3Maker.project.projectSeq); // project_seq insert
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
							A3Maker.getSelectedComponent().setData({src : uploadImgUrl});
						}else {
							A3Maker.getSelectedPage().src = uploadImgUrl;
							A3Maker.getSelectedPage().$pageHolderSelector.css('background-image', 'url(' +uploadImgUrl +')')
						}
					}

					context.$uploadImgSelector.val("");
					context.isUploading = false;
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
					if (target.src == "" || target.src.indexOf('images')  != -1 ) {
						alert("설정되어 있는 이미지가 없습니다");
						return;
					}
					if (confirm("설정된 이미지가 초기화 됩니다.") == true) {
						if (A3Maker.getSelectedPage()) {
							if (A3Maker.getSelectedComponent()) {
								A3Maker.getSelectedComponent().resetImage();
							}else {
								A3Maker.getSelectedPage().src = '';
								A3Maker.getSelectedPage().$pageHolderSelector.css('background-image', '');
							}
						}
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
					if (target.src !='' && target.src.startsWith('/')) {
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
			var selectedComponent = A3Maker.getSelectedComponent() ? A3Maker
					.getSelectedComponent() : A3Maker.getSelectedPage();

			if (selectedComponent.name != changedName) {
				var result = A3Maker.controller.isResiteredNodeIdOrName(null,
						selectedComponent.type, changedName);
				if (result) {
					alert("이미 존재하는 이름입니다.");
					$(target).val(selectedComponent.name);
					$(target).focus();
					return;
				}
			}

			//selectedComponent.displayName = changedName;
			selectedComponent.name = changedName;

			var target_node = A3Maker.controller.$tree.tree('getNodeById',
					selectedComponent.UUID);
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
			switch (item.type) {
			case "page": this.$linkPageSelect.append("<option value ='" + item.id + "'>" + item.name  + "</option>"); break;
			case "popup": this.$linkPopupSelect.append("<option value ='" + item.id + "'>" + item.name  + "</option>"); break;
			}
		},

		deleteSelectItem : function(item) {
		  switch (item.type) {
			case "page":
				this.$linkPageSelect.find('option').each(function() {
					if (this.value == item.fullName) {
						$(this).remove();
					}
				});
				break;
			case "popup":
				this.$linkPopupSelect.find('option').each(function() {
					if (this.value == item.fullName) {
						$(this).remove();
					}
				});
				break;
			}
		},

		showPropertyWindow : function(propertyType) {
			//프로퍼티 윈도우 위치 고정
			var context = this;
			this.propertyType = propertyType;
			this.propertyWindow.css('right', this.positionX);
			this.propertyWindow.css('top', this.positionY);
			
			this.propertyType = propertyType;
			for (var i = 0; i < this.propertyTypes.length; i++) {
				$('#el_' + this.propertyTypes[i]).hide();
			}

			var selectedComponent = A3Maker.getSelectedComponent();
			selectedComponent = selectedComponent ? selectedComponent : A3Maker.getSelectedPage();
			//이미지가 필요없는 컴포넌트의 경우 이미지 업로드 버튼 및 관련 폼 제거 
			if (propertyType == 'image' || propertyType == 'link' || propertyType == 'order') this.$uploadFake.show();
			$('.field_value_x, .field_value_y, .field_value_w') .removeAttr("disabled");

			switch (this.propertyType) {
			case "page":
					var color = A3Maker.getSelectedPage().backColor;
	        this.$pageColorPicker.css('background-color', color);
	        this.$pageColorPicker.ColorPickerSetColor(color);
				break;
			case "text":
			  this.$textContent.val('');
			  this.$textContent.val(selectedComponent.text);
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
        
				var color = selectedComponent.color;
				this.$fontSelect.val(selectedComponent.fontFamily);
				this.$fontSizeSelect.val(selectedComponent.fontSize);
				this.$colorPicker.css('backgroundColor', color);
				this.$colorPicker.ColorPickerSetColor(color);
				break;

			case 'link':
				this.$pageTypeSelect.val(selectedComponent.linkType);
				this.hideAllLInkPositionElem();
				this.resetAllLinkPositionElem();
				var context = this;

				if (selectedComponent.linkType == "PageLink") {
					this.setPageLinkSelect();
					this.$linkPageSelectDiv.show();
					this.$linkPageSelect.val(selectedComponent.position);
				}

				if (selectedComponent.linkType == "Web") {
					this.$linkWebText.show();
					this.$linkWebText.val(selectedComponent.position);
				}

				if (selectedComponent.linkType == "Popup") {
					this.setPopupSelect();
					this.$linkPopupSelectDiv.show();
					this.$linkPopupSelect.val(selectedComponent.position);
				}

				if (selectedComponent.linkType == "Phonenumber") {
					this.$phoneNumberText.show();
					this.$phoneNumberText.val(selectedComponent.position);
				}

				if (selectedComponent.linkType == "YouTube") {
					this.$youTubeText.show();
					this.$youTubeText.val(selectedComponent.position);
				}

				if (selectedComponent.linkType == "MallinMall") {
					this.$mallInMallText.show();
					this.$mallInMallText.val(selectedComponent.position);
				}

				if (selectedComponent.linkType == "Email") {
					this.$emailText.show();
					this.$emailText.val(selectedComponent.position);
				}

				if (selectedComponent.linkType == "Map") {
					this.$mapDiv.show();
					this.$mapText.val(selectedComponent.position);
				}
				break;
			case 'order':
				this.$orderMenu.val(!selectedComponent.menu
						|| selectedComponent.menu == 'undefined' ? ''
						: selectedComponent.menu);
				this.$orderPrice.val(!selectedComponent.price
						|| selectedComponent.menu == 'undefined' ? ''
						: selectedComponent.price);
				break;
			case 'popup':
				break;
			case 'list':
				break;
			case 'listrow':
				$('.field_value_x, .field_value_y, .field_value_w').attr("disabled",
						"disabled");
				break;
			}

			$('#el_' + propertyType).show();

			$("#element #el_" + selectedComponent.type + " .field_value_owhyn").prop(
					'checked', selectedComponent.fixRatio);
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
