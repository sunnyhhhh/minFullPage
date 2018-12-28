;(function(){
    $.fn.extend({
        fullPagemin: function(config){
            var self = this;
            new FullPage(config, self);
        }
    });

    function FullPage(config, self){
        this.config = config;
        this.colorsArray = config.colorsArray;
        this.pageWidth = $(window).outerWidth();
        this.pageHeight = $(window).outerHeight();
        this.$Wrapper = self;
        this.commonStyle = {
            width: '100%',
            height: '100%'
        };
        this.$Section = self.find('.section');
        this.curIndex = 0;
        this.lock = true;

        //给组件初始化样式
        this.initStyle();
    }

    FullPage.prototype.initStyle = function(){
        var self = this;
        $('html').add('body').css({
            position: 'relative',
            overflow: 'hidden',
            margin: 0
        }).add(self.$Wrapper)
            .add(self.$Section)
                .css(self.commonStyle);
        
        //wrapper带着竖直方向的section一起上下移动
        self.$Wrapper.css({position: 'absolute', left: 0, top: 0})
            .find('.section').each(function(index, ele){
                $(ele).css({backgroundColor: self.colorsArray[index], position:'relative'})
                    .find('.slide').css({float: 'left', position: 'relative', width: self.pageWidth,
                        height: self.pageHeight})
                            .wrapAll('<div class="slideWrapper"></div>');
            });
        
        //slideWrapper带着水平方向的slide一起左右移动
        self.$Section.find('.slideWrapper').each(function(index, ele){
            $(ele).css({position: 'absolute', width: $(ele).find('.slide').length * self.pageWidth,
                        height: self.pageHeight})
        });

        //self.$SlideWrapper = self.$Section.find('.slideWrapper');

        //开始移动控制
        self.controlMove();
    }

    FullPage.prototype.controlMove = function(){
        var self = this;
        this.$Section.eq(0).addClass('activeSection')
                            .end().find('.slideWrapper')
                                .css({left: 0, top: 0})
                                    .each(function(index, ele){
                                        $(ele).find('.slide').eq(0).addClass('innerActive');
                                    });
        //绑定事件
        $(document).on('keydown', function(e){
            //如果是上下移动
            if(e.keyCode == 38 || e.keyCode == 40){
                if(self.lock){
                    self.lock = false;
                    var curTop = self.$Wrapper.offset().top;
                    var direction = '';
                    if(e.keyCode == 38 && self.curIndex != 0){
                        direction = 'top';
                        curTop += self.pageHeight;
                        self.curIndex--;
                        self.config.onLeave(self.curIndex, direction);
                    }else if(e.keyCode == 40 && self.curIndex != self.$Section.length - 1){
                        direction = 'bottom';
                        curTop -= self.pageHeight;
                        self.curIndex++;
                        self.config.onLeave(self.curIndex, direction);
                    }

                    //开始向上或者向下移动，并在移动完成后触发相应的回调函数
                    self.$Wrapper.animate({
                        top: curTop
                    }, 200, 'swing', function(){
                        self.lock = true;
                        self.$Section.eq(self.curIndex).addClass('activeSection');
                        if(direction == 'top'){
                            self.$Section.eq(self.curIndex + 1).removeClass('activeSection');
                        }else if(direction == 'bottom'){
                            self.$Section.eq(self.curIndex - 1).removeClass('activeSection');
                        }
                        self.config.afterLoad(self.curIndex, direction);
                    });
                }
            }

            //如果是左右移动
            if(e.keyCode == 37 || e.keyCode == 39){
                if(self.lock){
                    self.lock = false;
                    var $SlideWrapper = $('.activeSection').find('.slideWrapper');
                    var curDom = $SlideWrapper.find('.innerActive');
                    var curLeft = $SlideWrapper.offset().left;
                    var direction = '';

                    //向左移动
                    if(e.keyCode == 37 && curDom.index() != 0){
                        curLeft += self.pageWidth;
                        direction = 'left';
                    }else if(e.keyCode == 39 && curDom.index() !=  $SlideWrapper.find('.slide').length - 1){
                        curLeft -= self.pageWidth;
                        direction = 'right';
                    }

                    //开始向左或者向右移动，并在移动完成后触发相应的回调函数
                    $SlideWrapper.animate({
                        left: curLeft
                    }, 200, 'swing', function(){
                        self.lock = true;
                        direction != '' ? curDom.removeClass('innerActive') : '';
                        if(direction == 'left'){
                            curDom.prev().addClass('innerActive');
                        }else if(direction == 'right'){
                            curDom.next().addClass('innerActive');
                        }
                    });
                }
            }
        })
    }
})();