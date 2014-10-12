/**
 * Created by hanwen on 17.05.14.
 */

sanguo.shell =(function(){
    var main_html="";
    main_html += "<div class=\"sanguo-header\">";
    main_html += "<\/div>";
    main_html += "";
    main_html += "<div class=\"sanguo-main\">";
    main_html += "<\/div>";
    main_html += "";
    main_html += "<div class=\"footer is-center\">";
    main_html += "  &copy; Made by Hanwen 2014";
    main_html += "<\/div>";

    //TODO
    var configMap = {
            main_html: main_html,
            anchor_schema_map : {
                account : {login:true, signup:true, close:true},
                post : { open : true,  close : true},
//                search : true,
                start : true,
                end  : true
            }
        },
        stateMap = {
            anchor_map : {}
        },
        jqueryMap = {     };

    var setJqueryMap, initModule,
        copyAnchorMap, changeAnchorPart, clearAnchorPart, onHashChange,
        setAccountAnchor, setPostAnchor, setSearchStartAnchor, setSearchEndAnchor;

//    =====================UTILITY======
    copyAnchorMap = function(){
        return $.extend(true,  {}, stateMap.anchor_map);
    };



//    ======================DOM=========
    setJqueryMap = function($container){
        jqueryMap = {
            $container  : $container,
            $header     : $container.find('.sanguo-header'),
            $main       : $container.find('.sanguo-main')

        };

    };

//    ===============EVENT HANDLER=======

    changeAnchorPart = function(arg_map){
        var
            anchor_map_revise = copyAnchorMap(),
            bool_return = true,
            key_name, key_name_dep;

        //begin merge changes
        LOOPKEY :
            for(key_name in arg_map){
                if(arg_map.hasOwnProperty(key_name)){ //in case of conflict

                    if(key_name.indexOf('_') === 0 ){continue LOOPKEY;}  //TODO
                    anchor_map_revise[key_name] = arg_map[key_name];

                    key_name_dep = '_'+key_name;
                    if(arg_map[key_name_dep]){
                        anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                    }
                    else{
                        delete anchor_map_revise[key_name_dep];
                        delete anchor_map_revise['_s'+key_name_dep]
                    }
                }
            }

        try{
            $.uriAnchor.setAnchor(anchor_map_revise);
        }
        catch (error){
            //replace uri with existing state
            $.uriAnchor.setAnchor(stateMap.anchor_map, null, true); //true means don't save wrong state history
            bool_return = false;
        }

        return bool_return; //TODO
    };

    /**
     * A method to clear certain anchor part
     * @param {Array} arg_array the array which contain the anchor name
     */
    clearAnchorPart = function(arg_array){
        var
            anchor_map_revise = copyAnchorMap(),
            bool_return = false;
        arg_array.forEach(function(arg){
            if (anchor_map_revise.hasOwnProperty(arg)){
                console.log('clear the' + arg + 'anchor');
                delete anchor_map_revise[arg];
                if(anchor_map_revise.hasOwnProperty("_"+arg)){
                    delete anchor_map_revise["_"+arg]
                }
            }
            bool_return = true;
        });
        try{
            $.uriAnchor.setAnchor(anchor_map_revise);
        }
        catch (error){
            //replace uri with existing state
            $.uriAnchor.setAnchor(stateMap.anchor_map, null, true); //true means don't save wrong state history
            bool_return = false;
        }
    };

    onHashChange = function(){
        var
            anchor_map_previous = copyAnchorMap(),
            anchor_map_now, is_animated = true,

            _s_account_previous, _s_account_proposed, s_account_proposed,

            _s_post_previous, _s_post_proposed, s_post_proposed,

            _s_start_previous, _s_start_proposed, s_start_proposed,

            _s_end_previous, _s_end_proposed, s_end_proposed;

        try{
            anchor_map_now = $.uriAnchor.makeAnchorMap();
        }
        catch(error){
            console.log('error happened in parsing new anchor map');
            $.uriAnchor.setAnchor(anchor_map_previous, null, true);
            return false;
        }

        stateMap.anchor_map = anchor_map_now;

        //convenience vars
        _s_account_previous = anchor_map_previous._s_account;
        _s_account_proposed = anchor_map_now._s_account;
        _s_post_previous = anchor_map_previous._s_post;
        _s_post_proposed = anchor_map_now._s_post;
        _s_start_previous = anchor_map_previous._s_start;
        _s_start_proposed = anchor_map_now._s_start;
        _s_end_previous = anchor_map_previous._s_end;
        _s_end_proposed = anchor_map_now._s_end;

        //if anchor changed, magic happened here!
        if(! anchor_map_previous || _s_account_previous !== _s_account_proposed){
            s_account_proposed = anchor_map_now.account;
            console.log('now account achor is' + s_account_proposed);
            switch (s_account_proposed){
                case 'login':
                    is_animated = sanguo.header.setSliderPosition('login');
                    break;
                case 'signup':
                    is_animated = sanguo.header.setSliderPosition('signup');
                    break;
                default :
                    is_animated = sanguo.header.setSliderPosition('close');
                    console.log('account anchor is cleared');
                    //means the account anchor is cleared
                    is_animated = true;
//                    delete anchor_map_now.account;
//                    $.uriAnchor.setAnchor(anchor_map_now, null, true);
            }
        }

        if(! anchor_map_previous || _s_post_previous !== _s_post_proposed){
            s_post_proposed = anchor_map_now.post;
            switch (s_post_proposed){
                case 'open':
                    is_animated = sanguo.content.setPostPosition('open');
                    break;
                case 'close':
                    is_animated = sanguo.content.setPostPosition('close');
                    break;
                default :   //TODO
                    is_animated = true;
                    delete anchor_map_now.post;
//                    $.uriAnchor.setAnchor(anchor_map_now, null, true);
            }
        }

        if(! anchor_map_previous || _s_start_previous !== _s_start_proposed) {
            s_start_proposed = anchor_map_now.start;
            if (s_start_proposed) {
                is_animated = sanguo.model.cities.search(s_start_proposed, null);
            }
            else {
                is_animated = true;
                delete anchor_map_now.start;
//                $.uriAnchor.setAnchor(anchor_map_now, null, true);
            }
        }

        if(! anchor_map_previous || _s_end_previous !== _s_end_proposed) {
            s_end_proposed = anchor_map_now.end;
            if (s_end_proposed) {
                is_animated = sanguo.model.cities.search(null, s_end_proposed);
            }
            else {
                is_animated = true;
                delete anchor_map_now.end;
//                $.uriAnchor.setAnchor(anchor_map_now, null, true);
            }
        }

        if(!is_animated){
            debugger;
            if(anchor_map_previous){
                $.uriAnchor.setAnchor(anchor_map_previous, null, true);
                stateMap.anchor_map = anchor_map_previous;
//                $.uriAnchor.setAnchor(anchor_map_previous, null, true);
//                stateMap.anchor_map = anchor_map_previous;

            }
            // if previous not exist then turn to default page(index)
            else{
                delete anchor_map_now.account;
                delete anchor_map_now.post;
                $.uriAnchor.setAnchor(anchor_map_now, null, true);
            }
            return false;
        }
        return true;
    };

//    ===============CALLBACK===========

    setAccountAnchor = function(position_type){
        if(position_type === undefined){
            return clearAnchorPart(['account']);
        }
        else{
            return changeAnchorPart({
                account : position_type
            });
        }
    };

    setPostAnchor = function(position_type){
        return changeAnchorPart({post: position_type});
    };

    setSearchStartAnchor = function(start_city){
        if(start_city){
            return changeAnchorPart({start :  start_city})
        }
    };

    setSearchEndAnchor = function(end_city){
        if(end_city){
            return changeAnchorPart({end :  end_city})
        }
    };
//    ===================================

    initModule = function($container){
        $container.html(configMap.main_html);
        setJqueryMap($container);

        sanguo.header.configModule({
            set_account_anchor : setAccountAnchor
        });
        sanguo.header.initModule(jqueryMap.$header);

//        sanguo.main.configModule({
//            set_post_anchor : setPostAnchor,
//            set_search_start_anchor : setSearchStartAnchor,
//            set_search_end_anchor : setSearchEndAnchor
//        });

        sanguo.main.initModule(jqueryMap.$main);

        $.uriAnchor.configModule({
            schema_map : configMap.anchor_schema_map
        });

        $(window)
            .bind('hashchange', onHashChange)
            .trigger('hashchange');
    };

//    ===================================
    return{initModule : initModule};
}());