/**
 * Created by hanwen on 08.07.14.
 */

sanguo.header = (function(){
    var header_html="";
    header_html += "    <div class=\"pure-menu pure-menu-open pure-menu-horizontal\" >";
    header_html += "        <a class=\"pure-menu-heading\" href=\"\">SanguoApp.com<\/a>";
    header_html += "        <ul id=\"sanguo-header-nav\" >";
    header_html +=  "            <li class=\"pure-menu-selected\"><a href=\"#\">Home<\/a><\/li>";
    header_html += "            <li><a href=\"#\">Tour<\/a><\/li>";
    header_html += "            <li class=\"header-account-button\"><a href=\"1234\">Sign Up<\/a><\/li>";
    header_html += "        <\/ul>";
    header_html += "        <ul id=\"sanguo-header-user\" >";
    header_html +=  "          <li id=\"header-user-id\"><a href=\"#\">userID<\/a><\/li>";
    header_html += "            <li id=\"header-user-logout\"><a href=\"1234\">Logout<\/a><\/li>";
    header_html += "        <\/ul>";
    header_html += "    <\/div>";
    header_html += "        <form class=\"sanguo-header-account pure-form pure-form-stacked\" method=\"post\">";
//    header_html += "        {{#if message}}";
//    header_html += "        <div class=\"alert alert-danger\">{{message}}<\/div>";
//    header_html += "        {{\/if}}";
    header_html += "            <input id=\"user\" type=\"text\" placeholder=\"Username\" name=\"email\">";
    header_html += "";
    header_html += "            <input id=\"password\" type=\"password\" name=\"password\" placeholder=\"Password\">";
    header_html += "";
    header_html += "            <label for=\"remember\" class=\"pure-checkbox\">";
    header_html += "                <input id=\"remember\" type=\"checkbox\">  Remember me";
    header_html += "            <\/label>";
    header_html += "            <div class=\"sanguo-header-account-buttons\">";
    header_html += "            <\/label>";
    header_html += "        <\/form>";

    var login_nav =  "            <li class=\"pure-menu-selected\"><a href=\"#\">Home<\/a><\/li>";
        login_nav += "            <li><a href=\"#\">Tour<\/a><\/li>";
        login_nav += "            <li class=\"header-account-button\"><a href=\"1234\">Sign Up<\/a><\/li>";

    var user_nav  =  "          <li id=\"nav-user\"><a href=\"#\">aaa<\/a><\/li>";
        user_nav += "            <li id=\"nav-logout\"><a href=\"1234\">Logout<\/a><\/li>";

    var login_html = "";
        login_html += "            <button type=\"submit\" class=\"pure-button pure-button-primary\" id=\"submit\">Log in<\/button>";
        login_html += "            <button type=\"button\" class=\"pure-button\" id=\"change\" >Sign up<\/button>";

    var signup_html = '';
        signup_html += "            <button type=\"submit\" class=\"pure-button pure-button-primary\" id=\"submit\">Sign up<\/button>";
        signup_html += "            <button type=\"button\" class=\"pure-button \" id=\"change\">Log in<\/button>";

    var configMap = {
            header_html :header_html,
            support_option:{
                login_open_time : true,
                login_close_time : true,
                set_account_anchor : true
            },

            login_open_time : 200,
            login_close_time : 100,
            set_account_anchor: null
        },

        stateMap = {
            position_type : 'close',    //TODO double seted
            open_height_px : 200,
            open_width_px : 300
        },

        jqueryMap = {
            $container: null
        };

    var setJqueryMap, configModule, initModule, setSliderPosition, onClickToggle, dialog, onButtonChange, onButtonSubmit,
        onUserLogin, onUserLogout, clearUser;
//       var allFields = $( [] ).add( name ).add( email ).add( password );

//    ======================DOM method===============
    setJqueryMap = function($container){
        jqueryMap = {
            $container  : $container,
            $navbar     : $container.find('#sanguo-header-nav'),
            $userbar    : $container.find('#sanguo-header-user'),
            $userbar_id : $container.find('#header-user-id'),
            $userbar_out: $container.find('#header-user-logout'),
            $toggle     : $container.find('.header-account-button'),
            $form       : $container.find('.sanguo-header-account'),
            $buttons    : $container.find('.sanguo-header-account-buttons')
        };
    };

//    ======================Event Handler=============
    setSliderPosition = function(position_type, callback){

        if(stateMap.position_type === position_type){
            return true;    //command successful
        }

        switch(position_type){
            case 'login' :
                dialog.hide({easing:'linear'});
                dialog.show({easing:'easeInOutBounce'});
                jqueryMap.$buttons.html(login_html);
                jqueryMap.$buttons.find('#change').click('signup',onButtonChange);
                jqueryMap.$buttons.find('#submit').click('/login', onButtonSubmit);
                break;
            case 'signup' :
                dialog.hide({easing:'linear'});
                dialog.show({easing:'easeInOutBounce'});
                jqueryMap.$buttons.html(signup_html);
                jqueryMap.$buttons.find('#change').click('login', onButtonChange);
                jqueryMap.$buttons.find('#submit').click('/signup', onButtonSubmit);
                break;
            case 'close':
                dialog.hide({easing:'linear'});
                break;
            default:
                return false;   //here return false means the animated is false in shell.js
        }

        stateMap.position_type = position_type;
//        jqueryMap.$login.slideToggle(animate_time,function(){   //TODO
//            if(callback){
//                callback(jqueryMap.$container);
//            }
//        });
        return true;
    };

    onButtonSubmit = function(event){
        event.preventDefault();
        console.log(jqueryMap.$form.serialize());
        $.post(
            event.data,
            jqueryMap.$form.serialize(),
            function(data){
                //change div d
                if(data.code){
                    jqueryMap.$form.append('<p>' + data.text + '</p>');
                }
                else{
                    console.log("receive user info is" , data);
                    onUserLogin(data);
                    configMap.set_account_anchor();
                }
            }
        );
    };

    onButtonChange = function(event){
        var set_account_anchor = configMap.set_account_anchor;
        set_account_anchor(event.data);
    };

    onClickToggle = function(event){
        event.preventDefault();
        var set_account_anchor = configMap.set_account_anchor;
        if (stateMap.position_type === 'login'||stateMap.position_type === 'signup'){
//            set_account_anchor();
            set_account_anchor('close');
        }
        else{
            set_account_anchor('login');
        }

        return false;
    };

    /**
     * Function after user login
     * @param user
     */
    onUserLogin = function(user){
        jqueryMap.$form.hide();
        jqueryMap.$navbar.hide();
        jqueryMap.$userbar.show();
        jqueryMap.$userbar.find("#header-user-id a").text(user._id);
        console.dir(user);
    };

    onUserLogout = function(){
        $.get(
            "/logout",
            function(data){
               clearUser();
            }
        );
    };

    clearUser = function(){
        jqueryMap.$userbar.hide();
        jqueryMap.$navbar.show();
        delete window.sanguoUser;
    };

    configModule = function(input_map){
        sanguo.util.setConfigMap({
            input_option   : input_map,
            support_option : configMap.support_option,
            config_option  : configMap
        });
        return true;
    };

    function initEventListener(){
        jqueryMap.$toggle.on('click',onClickToggle);
        jqueryMap.$userbar_id.on('click', function(e){e.preventDefault();console.log(e);console.log(this);});
        jqueryMap.$userbar_out.on('click', function(e){e.preventDefault();onUserLogout();});
    }

    initModule = function($container){
        $container.html(configMap.header_html);    //TODO here is append instead of html
        setJqueryMap($container);

        dialog = jqueryMap.$form;
        initEventListener();


        if(window.sanguoUser){
            onUserLogin(window.sanguoUser);
        }
        else{
            clearUser();
        }

//        stateMap.position_type = 'close';
        return true;
    };

    return {
        setSliderPosition : setSliderPosition,
        configModule : configModule,
        initModule : initModule
    }
}());