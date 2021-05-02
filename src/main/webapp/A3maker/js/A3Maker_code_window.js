A3Maker = A3Maker || {};
$(function () {
    A3Maker.codeWindow= {
    	init: function () {
    		this.editor = CodeMirror.fromTextArea(document.getElementById("code_editor"), {
    		    lineNumbers: true,
    		    styleActiveLine: true,
    		    matchBrackets: true
    		  });
    		this.editor.setOption("theme", "ambiance");
    		this.editor.setOption('scrollbarStyle', 'overlay');
    		this.initializeEventHandler();
    	},
    	
    	initializeEventHandler : function(){
    		var context = this;
    		$('#code_container #code_window_lose_btn').click(function(){
    			context.close();
    		});
    		$('#code_container #code_window_ok_btn').click(function(){
    			context.component.data.script = context.editor.getValue();
    			context.close();
    		});
    	},
    	
        open : function(title, component){
        	if (component.data.type !== 'script') throw 'wrong code component';
        	this.title = title;
        	this.component = component;

        	this.editor.clearHistory();
        	this.setTitle(title);
        	this.editor.setValue(this.component.data.script);
        	
        	$('#code_container').show();
        	//$('#code_editor').dialog();
        	//$('.ui-dialog-titlebar').hide();
        	
        	$('#code_container').css({
    			'font-size':'12px',
    			position: 'absolute',
    			left: '50%',
    			'z-index':9999,
    			top: '50%',
    			'margin-left': '-300px',
    			'margin-top': '-250px',
    			'font-family': 'Malgum Gothic',
    			'box-shadow': 'rgb(100, 100, 100) 3px 3px 3px'
    		});
        	
        	this.editor.setSize(600, 500);
    		$('#code_container').show();
    		$('#code_container').draggable();
        },
        
        setCode : function(code){
        	$('#code_container #code_editor').text(code);
        	
        },
        setTitle : function(title){
        	$('#code_container #code_title').text(title);
        	
        },
    	reset : function(){},

        	
        close : function(){
        	this.title = "";
        	this.setCode('');
        	this.editor.setValue("");
        	this.editor.clearHistory();
        	$('#code_container').hide();
        }
    };
    A3Maker.codeWindow.init();
});

