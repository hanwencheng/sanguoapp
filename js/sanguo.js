/**
 * Created by hanwen on 23.05.14.
 *
 * start to init the different Modules.
 *
 */

var sanguo = (function(){
    'use strict';
    var initModule = function($zugzug){
//        sanguo.data.initModule();
//        sanguo.model.initModule();
        sanguo.shell.initModule($zugzug);
    };

    return { initModule : initModule};
}());