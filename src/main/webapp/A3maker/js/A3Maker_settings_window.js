A3Maker = A3Maker || {};
$(function () {
	
    A3Maker.settings= {
        open : function(){
        	$('#element_config').css({
				left : '50%',
				top : '50%',
				marginLeft :'-265px',
				marginTop : '-290px'
			});
			
			$('#element_config').addClass('show');
			$('#element_config').fadeIn(100);
			
			$('#element_config #project_table #projct_seq').text(A3Maker.project.projectSeq);
			$('#element_config #project_table #projct_name').text(A3Maker.project.projectName);
			$('#element_config #project_table #projct_resolve').text(A3Maker.project.width + " x " + A3Maker.project.height);
			$('#element_config #project_table #projct_page_count').text(A3Maker.project.pages.length);
			$('#element_config #project_table #project_author').text(A3Maker.project.writer);
			$('#element_config #project_table #project_author_desc').text(A3Maker.project.writerDesc);
			$('#element_config #project_table #project_desc').text(A3Maker.project.projectDesc);
			$('#element_config #project_table #regist_date').text(A3Maker.project.createTime);
			
        },
        close : function(){
        	$('#element_config').removeClass('show');
			$('#element_config').fadeOut(100);
        }
    };	
    A3Maker.draw.init();
});

