A3Maker = A3Maker || {};
$(function () {
    A3Maker.projectWindow = {
       $newProjectContainer : '',
        init: function () {},

        show: function () {
            this.$newProjectContainer = $(A3Maker.newProjectWindowHTML);
            $('body').prepend(this.$newProjectContainer);
            this.initializeProjectWindowEventHandler();
            this.$newProjectContainer.show();
         
        },

        initializeProjectWindowEventHandler : function(){
            var context = this;
            this.$newProjectContainer.find('#btn_close_new_project , .btn_npcancel').click(function (event) {
                context.close();
            });

            this.$newProjectContainer.find('.btn_npcreate').click(function (event) {
                alert("프로젝트 생성");
            });
        },

        close: function () {
            this.$newProjectContainer.hide();
            this.$newProjectContainer.remove();
        }
    };
    A3Maker.projectWindow.init();
});

