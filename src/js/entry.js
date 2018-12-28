;(function(){
    $('.wrapper').fullPagemin({
        colorsArray: ['rgb(27, 188, 155)', 'rgb(75, 191, 195)', 'rgb(123, 170, 190)', 'rgb(255, 153, 0)'],
        onLeave: function(index, direction){
            console.log('leave', index, direction);
        },
        afterLoad: function(index, direction){
            console.log('load', index, direction);
        }
    })
})();