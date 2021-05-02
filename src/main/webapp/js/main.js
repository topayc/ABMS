function loadContent(codeName, reqCode) {
	updateNavigate(codeName, reqCode);
	$.ajaxSetup({ async : true });
	$('#content_container').load("/abms/content?reqCode=" + reqCode,
			function(response, status, xhr) {
				if (status != "success")
					location.href = 'login';
			});
}

function updateNavigate(text,code) {
	var contentPanel = $('.container').layout('panel','center');
	contentPanel.panel("setTitle",'<strong style ="color : #000000;font-weight:bold"><i class="fa fa-bars" aria-hidden="true"></i>&nbsp' + text + '</strong>');
}

$(document).ready(function() {
	$('#menu_tree').tree({
		animate : true,
		lines : true,
		onSelect : function(node) {
			var selectedCode = $(node.target).find('.sub_menu').attr("req_code");
			var selectedText = $(node.text).text();
			loadContent(selectedText,selectedCode );
		}
	});
	loadContent("ABMS", "intro");
});