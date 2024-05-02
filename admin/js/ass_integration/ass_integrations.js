
function ass_integrations(){}
ass_integrations.NAME         = "ass_integrations";
ass_integrations.VERSION      = "1.2";
ass_integrations.DESCRIPTION  = "Class ass_integrations";

ass_integrations.prototype.constructor = ass_integrations;
ass_integrations.prototype = {
    init:function(){
        if(window.location.pathname.includes('profile.php') || window.location.pathname.includes('edit_user.php')){
            if(window.location.pathname.includes('profile.php')){
               var u_id =u_id_login;
            }else{
                var u_id = getUrlParameter1('u_id');
                if(u_id==undefined){
                    return;
                }
            }
            ass_integrations.prototype.get_assigned_integrations_by_uid(u_id,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
            //event
            $('#assgn-i-search').unbind('click').bind('click',function(){
                ass_integrations.prototype.get_assigned_integrations_by_uid(u_id,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
            })
            $('#assgn-i-reset').unbind('click').bind('click',function(){
                $('#assign-i-text_search').val('');
                ass_integrations.prototype.get_assigned_integrations_by_uid(u_id,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
            })
        }else if(window.location.pathname.includes('assigned_integration_list.php') || window.location.pathname.includes('assigned_integration.php')){
            ass_integrations.prototype.get_assigned_integrations(u_id_login,role,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
            //event
            $('#assgn-i-search').unbind('click').bind('click',function(){
                ass_integrations.prototype.get_assigned_integrations(u_id_login,role,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
            })
            $('#assgn-i-reset').unbind('click').bind('click',function(){
                $('#assign-i-text_search').val('');
                ass_integrations.prototype.get_assigned_integrations(u_id_login,role,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
            })
        }

    },

    tr_content:function(item,i){
        var href1 ='<span style="cursor: pointer"><a href="edit_assigned_integration.php?ai_id='+item.ai_id+'"><i class="fa fa-edit"></i></a></span>';

        if(window.location.pathname.includes('profile.php') || window.location.pathname.includes('edit_user.php') ||
            window.location.pathname.includes('edit_integration.php')){
            href1  ='<span class="open-assng-integeration" style="cursor: pointer"><i class="fa fa-edit"></i></span>'
        }

        var ai_ischeck = (item.ai_active=="1")?'checked="checked"':'';
        //var ai_active_checkbox ='<input type=checkbox class="ai_active" '+ai_ischeck+'>';

        var ai_active_checkbox ='<label class="custom-checkbox">' +
            '<input type="checkbox" class="custom-control-input ai_active" '+ai_ischeck+'> '+
            '<span class="custom-label p_rl20"></span>' +
            '</label>'

        var click2dial_ischeck = (item.click2dial=="1")?'checked="checked"':'';
        //var click2dial_checkbox ='<input type=checkbox class="click2dial" '+click2dial_ischeck+'>';
        var click2dial_checkbox ='<label class="custom-checkbox">' +
            '<input type="checkbox" class="custom-control-input click2dial" '+click2dial_ischeck+'> '+
            '<span class="custom-label p_rl20"></span>' +
            '</label>'
        var tr ='<tr>' +
            '<td><input type="hidden" class="ai_id" value="'+item.ai_id+'">' +
                '<input type="hidden" class="i_id" value="'+item.i_id+'">' +
                '<input type="hidden" class="i_shortname" value="'+item.i_shortname+'">' +
                '<input type="hidden" class="u_id" value="'+item.u_id+'">'+i+'' +
            '&nbsp;&nbsp;&nbsp;' +href1 +
            '</td>' +
            '<td class="txt-l15">'+item.ai_username+'</td>' +
            '<td class="txt-l15">'+item.u_fname+' '+ item.u_lname+' </td>' +
            '<td class="txt-l15"><a href="integration.php?id='+item.i_id+'">'+item.i_name +'</a></td>' +
            '<td class="txt-l15">'+item.ai_notes+'</td>' +
            '<td class="txt-l15">'+item.ai_dateAssigned+'</td>' +
            '<td style="text-align: center">'+ai_active_checkbox+'</td>' +
            '<td style="text-align: center">'+click2dial_checkbox+'</td>' +
          '</tr>';

        return tr;
    },

    get_assigned_integrations: function(u_id,u_type,el,el_pagination,el_record){
        var text_search = $('#assign-i-text_search').val();
        //console.log(text_search);
        var _link =link._assigned_integrations;
        var _data ={auth:_auth,u_id:u_id,u_type:u_type, limit:1,offset:0,text_search:text_search}

        var $pagination = $(el_pagination);
        var defaultOpts = {
            totalPages: 20
        };
        $pagination.twbsPagination(defaultOpts);
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data,
            error : function (status,xhr,error) {
            },
            success: function (data) {
                //console.log(data)
                var totalRecords = parseInt(data.response.row_cnt);
                $(el_record).text(data.response.row_cnt)
                if(totalRecords==0){
                    $(el+' tbody').html("");
                    return ;
                }

                var remaining = 0
                if(totalRecords%10 >0) remaining=1;

                var totalPages = remaining + (totalRecords -totalRecords%10)/10;

                var currentPage = $pagination.twbsPagination('getCurrentPage');
                $pagination.twbsPagination('destroy');
                $pagination.twbsPagination($.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: totalPages,
                    visiblePages: 10,
                    onPageClick:function (event, page) {
                        //fetch content and render here
                        var cursor = (page-1)*10
                        var limit = 10;
                         _data = {auth:_auth,u_id:u_id,u_type:u_type, limit:limit,offset:cursor,text_search:text_search}

                        var tr='';
                        $.ajax({
                            "async": true,
                            "crossDomain": true,
                            "url": _link,
                            "method": "POST",
                            dataType: 'json',
                            data:_data,
                            error : function (status,xhr,error) {
                            },
                            success: function (res) {
                                var data=res.response.results;
                                var i=1;
                                data.forEach(function (item) {
                                    tr += ass_integrations.prototype.tr_content(item,i);
                                    i++;

                                });//end for each
                                $(el+' tbody').html(tr);
                            }
                        });//end ajax get appointment at current page


                    } //end onPageClick
                }));
            }
        });
    },

    get_assigned_integrations_by_uid: function(u_id,el,el_pagination,el_record){
        var text_search = $('#assign-i-text_search').val();
        //console.log(text_search);
        var _link =link._assigned_integrations_uid;
        var _data ={auth:_auth,u_id:u_id, limit:1,offset:0,text_search:text_search}

        var $pagination = $(el_pagination);
        var defaultOpts = {
            totalPages: 20
        };
        $pagination.twbsPagination(defaultOpts);
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data,
            error : function (status,xhr,error) {
            },
            success: function (data) {
                //console.log(data)
                var totalRecords = parseInt(data.response.row_cnt);
                $(el_record).text(data.response.row_cnt)
                if(totalRecords==0){
                    $(el+' tbody').html("");
                    return ;
                }

                var remaining = 0
                if(totalRecords%10 >0) remaining=1;

                var totalPages = remaining + (totalRecords -totalRecords%10)/10;

                var currentPage = $pagination.twbsPagination('getCurrentPage');
                $pagination.twbsPagination('destroy');
                $pagination.twbsPagination($.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: totalPages,
                    visiblePages: 10,
                    onPageClick:function (event, page) {
                        //fetch content and render here
                        var cursor = (page-1)*10
                        var limit = 10;
                        _data = {auth:_auth,u_id:u_id,limit:limit,offset:cursor,text_search:text_search}

                        var tr='';
                        $.ajax({
                            "async": true,
                            "crossDomain": true,
                            "url": _link,
                            "method": "POST",
                            dataType: 'json',
                            data:_data,
                            error : function (status,xhr,error) {
                            },
                            success: function (res) {
                                var data=res.response.results;
                                var i=1;
                                data.forEach(function (item) {
                                    tr += ass_integrations.prototype.tr_content(item,i);
                                    i++;

                                });//end for each
                                $(el+' tbody').html(tr);
                            }
                        });//end ajax get appointment at current page


                    } //end onPageClick
                }));
            }
        });
    },

    get_assigned_integrations_by_iid: function(i_id,el,el_pagination,el_record){
        var text_search = $('#assign-i-text_search').val();
        //console.log(text_search);
        var _link =link._assigned_integrations_iid;
        var _data ={auth:_auth,i_id:i_id, limit:1,offset:0,text_search:text_search}

        var $pagination = $(el_pagination);
        var defaultOpts = {
            totalPages: 20
        };
        $pagination.twbsPagination(defaultOpts);
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data,
            error : function (status,xhr,error) {
            },
            success: function (data) {
                //console.log(data)
                var totalRecords = parseInt(data.response.row_cnt);
                $(el_record).text(data.response.row_cnt)
                if(totalRecords==0){
                    $(el+' tbody').html("");
                    return ;
                }

                var remaining = 0
                if(totalRecords%10 >0) remaining=1;

                var totalPages = remaining + (totalRecords -totalRecords%10)/10;

                var currentPage = $pagination.twbsPagination('getCurrentPage');
                $pagination.twbsPagination('destroy');
                $pagination.twbsPagination($.extend({}, defaultOpts, {
                    startPage: currentPage,
                    totalPages: totalPages,
                    visiblePages: 10,
                    onPageClick:function (event, page) {
                        //fetch content and render here
                        var cursor = (page-1)*10
                        var limit = 10;
                        _data = {auth:_auth,i_id:i_id,limit:limit,offset:cursor,text_search:text_search}

                        var tr='';
                        $.ajax({
                            "async": true,
                            "crossDomain": true,
                            "url": _link,
                            "method": "POST",
                            dataType: 'json',
                            data:_data,
                            error : function (status,xhr,error) {
                            },
                            success: function (res) {
                                var data=res.response.results;
                                var i=1;
                                data.forEach(function (item) {
                                    tr += ass_integrations.prototype.tr_content(item,i);
                                    i++;

                                });//end for each
                                $(el+' tbody').html(tr);
                            }
                        });//end ajax get appointment at current page


                    } //end onPageClick
                }));
            }
        });
    },

}
var ass_itg = new ass_integrations();
$(function(){
    ass_itg.init();
});