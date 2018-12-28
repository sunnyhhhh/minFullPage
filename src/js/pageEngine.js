var pageEngine = {
    init: function(selector, colorsArray){
        this.$Wrapper = $(selector);
        this.colorsArray = colorsArray;
        this.slideFlag = false;
        return this;
    },
    addSection: function(className){
        this.$Section = $('<div class="section"></div>').addClass(className);
        this.$Section.appendTo(this.$Wrapper);
        this.slideFlag = false;
        return this;
    },
    addSlide: function(className){
        this.$Slide = $('<div class="slide"></div>').addClass(className);
        this.$Slide.appendTo(this.$Section);
        this.slideFlag = true;
        return this;
    },
    addComponent: function(config){
        //config的type参数说明要创建的组件内容是什么类型，默认类型为base
        var type = config.type || 'base';
        var component = null;
        switch(type){
            case 'base':
                component = ComponentFactory(config);
                break;
            case 'super':
                component = ComponentSuperFactory(config);
                break;
        }
        this.slideFlag ? this.$Slide.append(component) : this.$Section.append(component);
        return this;
    },
    //给每个section绑定事件，当触发该事件时，找到下面所有的component组件，并触发组件的事件
    bindEvent: function(){
        this.$Wrapper.find('.section').on({
            '_leave': function(){
                $(this).find('.component').trigger('cpLeave');
            },
            '_load': function(){
                $(this).find('.component').trigger('cpLoad');
            }
        })
    },
    load: function(){
        this.bindEvent();
        var self = this;
        this.$Wrapper.fullPagemin({
            colorsArray: self.colorsArray,
            onLeave: function(index){
                self.$Wrapper.find('.section').eq(index).trigger('_leave');
            },
            afterLoad: function(index){
                self.$Wrapper.find('.section').eq(index).trigger('_load');
            }
        });
        this.$Wrapper.find('.section').eq(0).trigger('_load');
    }
}