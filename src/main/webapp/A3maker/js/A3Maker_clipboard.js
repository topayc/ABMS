A3Maker = A3Maker || {};
$(function () {
    A3Maker.clipBoard = {
        init: function () {this.clipData = null;},
        reset : function(){this.init();},
        
        set: function (data) {this.clipData = data;},
        get: function () {
            var data = this.clipData;
            this.clipData = null;
            return data;
        },
    };
    A3Maker.clipBoard.init();
});

