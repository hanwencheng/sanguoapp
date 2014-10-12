/**
 * Created by hanwen on 18.08.14.
 */

define(['require','text!hero/chart.html'],function(require){

    var initChart;

    var jqueryMap = {

    };

    var addHover = function(container, tooltip){
        $(container).hover(function(){
            var position = $(container).offset();
            tooltip.style.left = position.left -30 + 'px';
            tooltip.style.top  = position.top  -30 + 'px';
            $(tooltip).fadeIn(500);

        },function(){
            $(tooltip).fadeOut('fast');
        });
    };

    initChart = function(){

        require(['text!hero/chart.html'], function(html){

            $('#hero-chart').html(html);
            console.log(html);

            //because it is asynchronous, so should group these text together in require function;
            var ctx = document.getElementById("radarChart").getContext("2d");
            var data = {
                labels:["武力","统率","智力","政治","体力"],  //TODO
                datasets: [
                    {
                        label: 'zhaoyun',
                        data:[19,20,10,20,20]
                    }
                ]
//                    (function(){
//                    var array=[];
//                    for(key in ability){
//                        if(ability.hasOwnProperty(key)){
//                            array.push(ability[key]);
//                        }
//                    }
//                    return array;
//                })()
            };
            var myNewChart = new Chart(ctx).Radar(data);
            console.log(data);

            var abilityContainer = document.getElementById('hero-abilities');
            var abilities = abilityContainer.querySelectorAll('.hero-ability');
            var values = abilityContainer.querySelectorAll('.hero-ability-value');
            var comments = abilityContainer.querySelectorAll('.hero-ability-comment');
            console.log('abilities:', abilities , 'comments:', comments);
            for(var i =0; i< abilities.length;i++){
                addHover(abilities[i], comments[i]);
                values[i].textContent = 100;    //TODO set the value
            }

        });


    };


    return {
        initChart : initChart
    };
});