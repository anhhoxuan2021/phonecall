
function branches(){}
branches.NAME         = "branches";
branches.VERSION      = "1.2";
branches.DESCRIPTION  = "Class branches";

branches.prototype.constructor = branches;
branches.prototype = {
    init:function(){
        if(window.location.pathname.includes('branches_list.php') ||
            window.location.pathname.includes('dashboard_admin.php') ||
            window.location.pathname.includes('branch.php')){
            branches.prototype.get_branches(u_id_login,role,"#b-list","#b-list-pagination","#b-record");
            //event
            $('#b-search').unbind('click').bind('click',function(){
                branches.prototype.get_branches(u_id_login,role,"#b-list","#b-list-pagination","#b-record");
            })
            $('#b-reset').unbind('click').bind('click',function(){
                $('#b-text_search').val('');
                branches.prototype.get_branches(u_id_login,role,"#b-list","#b-list-pagination","#b-record");
            })
        }
    },

    tr_content:function(item,i){
        if(item.u_phone ==null) item.u_phone ='';
        if(item.u_extension ==null) item.u_extension ='';

        var href1 = '<span style="cursor: pointer"><a href="edit_branch.php?b_id='+item.b_id+'"><i class="fa fa-edit"></i></a></span>';
        if(window.location.pathname.includes('edit_company.php')){
            href1 ='<span class="open-branch" style="cursor: pointer"><i class="fa fa-edit a_color"></i></span>';
        }

        if(item.c_name ==null) item.c_name ="";
        var tr ='<tr>' +
            '<td><input type="hidden" class="u_id" value="'+item.u_id+'"> ' +
            '<input type="hidden" class="b_id" value="'+item.b_id+'">'+i+'' +
            '&nbsp;&nbsp;&nbsp;' +href1+
            '</td>' +
            '<td class="txt-l15">'+item.b_name+'</td>' +
            '<td class="txt-l15">'+item.b_phone+'</td>' +
            '<td class="txt-l15">'+item.b_extension+'</td>' +
            '<td class="txt-l15">'+item.b_street+'</td>' +
            '<td class="txt-l15">'+item.b_city+'</td>' +
            '<td class="txt-l15">'+item.b_zip+'</td>' +
            '<td class="txt-l15">'+item.b_email+'</td>' +
            '<td class="txt-l15">'+item.c_name+'</td>' +
            '<td class="txt-l15">'+item.b_active+'</td>' +
            '</tr>';

        return tr;
    },

    get_branches: function(u_id,u_type,el,el_pagination,el_record){
        var text_search = $('#b-text_search').val();
        var _link =link._branches;
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
                                    tr += branches.prototype.tr_content(item,i);
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
    get_branches_cid: function(c_id,el,el_pagination,el_record){
        var text_search = $('#b-text_search').val();
        var _link =link._branches_cid;
        var _data ={auth:_auth,c_id:c_id,limit:1,offset:0,text_search:text_search}

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
                                    tr += branches.prototype.tr_content(item,i);
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
var brchs = new branches();
$(function(){
    brchs.init();
});