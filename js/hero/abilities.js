/**
 * Created by Hanwen on 2014/10/11.
 */

define(['require','text!hero/abilities.html'],function(require, html){
    var container = document.getElementById('hero-ability');
    var stateMap = {

    };

    container.innerHTML = html;
    var abilities = [];
    abilities = ['rider', 'cool', 'strong', 'quiet'];

    abilities.forEach(function(ability){
        console.log('good');
    });
});