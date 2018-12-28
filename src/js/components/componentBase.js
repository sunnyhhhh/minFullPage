//定制化fullpage的页面内容

var ComponentFactory = function(config){
    var $Div = $('<div class="component base"></div>');

    //利用config参数定制化$Div里面的内容
    config.className && $Div.addClass(config.className);
    config.width && $Div.css('width', config.width);
    config.height && $Div.css('height', config.height);
    config.text && $Div.text(config.text);
    config.center && $Div.css({position: 'absolute', left: '50%', marginLeft: -config.width / 2, top:0});
    config.css && $Div.css(config.css);

    //如果在外部有定制事件
    if(config.event){
        for(var prop in config.event){
            $Div.on(prop, config.event[prop]);
        }
    }

    //注册component leave和component load事件，如果有定制的动画或者延时，则进行相应的动画操作
    $Div.on('cpLeave', function(){
        setTimeout(function(){
            config.animateOut && $Div.animate(config.animateOut);
        }, config.delay || 0);
    });

    $Div.on('cpLoad', function(){
        setTimeout(function(){
            config.animateIn && $Div.animate(config.animateIn);
        }, config.delay || 0);
    });

    //base component定制完成后返回
    return $Div;
}