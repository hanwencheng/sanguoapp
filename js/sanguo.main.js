/**
 * Created by hanwen on 08.07.14.
 */

sanguo.main = (function(){
    var main_html="";
    main_html += "    <div class=\"splash\">";
    main_html += "        <h1 class=\"splash-head\">Enter search content here<\/h1>";
    main_html += "        <p class=\"splash-subhead\">";
    main_html += "            search <a href=\"hero\">every name<\/a>, city or items, or any thing which related to heres";
    main_html += "        <\/p>";
    main_html += "        <p>";
    main_html += "            <a href=\"#\" class=\"pure-button pure-button-primary\">Get Started<\/a>";
    main_html += "        <\/p>";
    main_html += "    <\/div>";

    var configMap = {
            main_html :main_html
        },

        stateMap = {
        },

        jqueryMap = {
            $container: null
        };

    var setJqueryMap, configModule, initModule;

//    ======================DOM method===============
    setJqueryMap = function($container){
        jqueryMap = {
            $container  : $container
        };
    };

    configModule = function(input_map){
        sanguo.util.setConfigMap({
        });
        return true;
    };

    initModule = function($container){
        $container.append(configMap.main_html);    //TODO here is append instead of html
        setJqueryMap($container);

        return true;
    };

    return {
        configModule : configModule,
        initModule : initModule
    }
}());