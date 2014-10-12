/**
 * Created by hanwen on 17.08.14.
 */

require.config({
    baseUrl:'../js',
    //except this paths
    paths:{
        lib: './support',
        text: './support/text'
    },
    bundles:{
        'pirmary':[]
    }

});

//load global support library
require( ["lib/jquery-2.1.1",
           "lib/Chart",
           "hero/init"], function($, Chart, init){
    console.log('load complete');
});

//require(["helper/util"], function(util) {
//    //This function is called when scripts/helper/util.js is loaded.
//    //If util.js calls define(), then this function is not fired until
//    //util's dependencies have loaded, and the util argument will hold
//    //the module value for "helper/util".
//});

