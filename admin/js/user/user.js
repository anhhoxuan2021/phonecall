function user(){}
user.NAME         = "user";
user.VERSION      = "1.2";
user.DESCRIPTION  = "Class user";

user.prototype.constructor = user;
user.prototype = {
    init:function(){
        if(window.location.pathname.includes('users_list.php') || window.location.pathname.includes('dashboard_admin.php') ||
            window.location.pathname.includes('user.php')){
            user.prototype.get_users(u_id_login,role,"#users-list","#users-list-pagination","#user-record");

            //event
            $('#user-search').unbind('click').bind('click',function(){
                user.prototype.get_users(u_id_login,role,"#users-list","#users-list-pagination","#user-record");
            })
            $('#user-reset').unbind('click').bind('click',function(){
                $('#user-text_search').val('');
                user.prototype.get_users(u_id_login,role,"#users-list","#users-list-pagination","#user-record");
            })
        }else if(window.location.pathname.includes('edit_branch.php')){
            $('#user-search').unbind('click').bind('click',function(){
                var b_id = getUrlParameter1('b_id');
                if(b_id !=undefined){
                    user.prototype.get_users_bid(b_id,"#users-list","#users-list-pagination","#user-record");
                }

            })
            $('#user-reset').unbind('click').bind('click',function(){
                $('#user-text_search').val('');
                var b_id = getUrlParameter1('b_id');
                if(b_id !=undefined){
                    user.prototype.get_users_bid(b_id,"#users-list","#users-list-pagination","#user-record");
                }
            })
        }else if(window.location.pathname.includes('edit_company.php')){
            $('#user-search').unbind('click').bind('click',function(){
                var c_id = getUrlParameter1('c_id');
                if(c_id !=undefined){
                    user.prototype.get_users_cid(c_id,"#users-list","#users-list-pagination","#user-record");
                }

            })
            $('#user-reset').unbind('click').bind('click',function(){
                $('#user-text_search').val('');
                var c_id = getUrlParameter1('c_id');
                if(c_id !=undefined){
                    user.prototype.get_users_cid(c_id,"#users-list","#users-list-pagination","#user-record");
                }
            })

        }


        $('table#users-list').on('click','.delete',function(){
            var u_id = $(this).closest('tr').find('.u_id').val();
            //user.prototype.user_edit(u_id)
        })
    },

    tr_content:function(item,i){
        if(item.u_phone ==null) item.u_phone ='';
        if(item.u_extension ==null) item.u_extension ='';
        var b_name = ''
        var b_id = ''
        if(item.b_id.length >0){
            b_id = item.b_id[0].b_id
            b_name = item.b_id[0].b_name
        }
        var tr ='<tr>' +
            '<td><input type="hidden" class="u_id" value="'+item.u_id+'"> '+i+' ' +
                '&nbsp;&nbsp;&nbsp;<span style="cursor: pointer"><a href="edit_user.php?u_id='+item.u_id+'"><i class="fa fa-edit"></i></a></span>' +
            '</td>' +
            '<td class="txt-l15">'+item.u_fname+' '+item.u_lname+'</td>' +
            '<td class="txt-l15">'+item.u_phone+'</td>' +
            '<td class="txt-l15">'+item.u_extension+'</td>' +
            '<td class="txt-l15">'+item.u_email+'</td>' +
            '<td class="txt-l15">'+item.u_notes+'</td>' +
            '<td class="txt-l15"><a href="branch.php?id='+b_id+'">'+b_name +'</a></td>' +
            '<td class="txt-l15">'+item.u_dateAdded+'</td>' +
            '<td class="txt-l15">'+item.u_active+'</td>' +
            //'<td class="txt-l15"><span style="cursor: pointer" class="edit"><a href="user.php?u_id='+item.u_id+'"><i class="fa fa-edit"></i></a></span>&nbsp;&nbsp;&nbsp;' +
              //  '<span style="cursor: pointer" class="delete"><i class="fa fa-trash"></i></span></td>' +
            '</tr>';

        return tr;
    },

    get_users: function(u_id,u_type,el,el_pagination,el_record){
        var text_search = $('#user-text_search').val();
        var _link =link._users;
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
                                    tr += user.prototype.tr_content(item,i);
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

    get_users_bid: function(b_id,el,el_pagination,el_record){
        var text_search = $('#user-text_search').val();
        var _link =link._users_bid;
        var _data ={auth:_auth,b_id:b_id, limit:1,offset:0,text_search:text_search}

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
                        _data = {auth:_auth,b_id:b_id,limit:limit,offset:cursor,text_search:text_search}

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
                                    tr += user.prototype.tr_content(item,i);
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

    get_users_cid: function(c_id,el,el_pagination,el_record){
        var text_search = $('#user-text_search').val();
        var _link =link._users_cid;
        var _data ={auth:_auth,c_id:c_id, limit:1,offset:0,text_search:text_search}

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
                        _data = {auth:_auth,c_id:c_id,limit:limit,offset:cursor,text_search:text_search}

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
                                    tr += user.prototype.tr_content(item,i);
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
var usr = new user();
$(function(){
    usr.init();
});