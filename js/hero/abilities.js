/**
 * Created by Hanwen on 2014/10/11.
 */

define(['require','text!hero/abilities.html'],function(require, html){
    var container = document.getElementById('hero-ability');
    var stateMap = {

    };
//    container.innerHTML = html;

    var abilities = ['rider', 'cool', 'strong', 'quiet',
        4,5,60,70,80,90,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
    console.log('abilities array is' + abilities);
//    abilities = ;

    var rowElements = 6, rowContainer;
    abilities.forEach(function(ability, index){
        if(index%rowElements === 0){
            rowContainer = document.createElement('div');
            rowContainer.id = 'ability-' + (index/rowElements + 1);
            container.appendChild(rowContainer);
        }
        var abilityContainer = document.createElement('div');
        abilityContainer.className = 'btn btn-pull';
        abilityContainer.id = index;
        rowContainer.appendChild(abilityContainer);

        var iconEl = document.createElement('div');
        var textEl = document.createElement('div');
        iconEl.className = 'icon';
        console.log('test .class function' + iconEl.class);
        textEl.className = 'btn-text';

        var iconText="";
        iconText += "                <span class=\"ability-up\">v<\/span>";
        iconText += "                <span>a<\/span>";
        iconText += "                <span class=\"ability-down\">n<\/span>";
        iconEl.innerHTML = iconText;

        var textNode = document.createTextNode(ability);
        textEl.appendChild(textNode);

        abilityContainer.appendChild(iconEl);
        abilityContainer.appendChild(textEl);
    });


});