
function dashboard_admin(){}
dashboard_admin.NAME         = "dashboard_admin";
dashboard_admin.VERSION      = "1.2";
dashboard_admin.DESCRIPTION  = "Class dashboard_admin";

dashboard_admin.prototype.constructor = dashboard_admin;
dashboard_admin.prototype = {
    init:function(){
        dashboard_admin.prototype.get_companies(u_id_login,role);
        //event
        $('#c-search').unbind('click').bind('click',function(){
            dashboard_admin.prototype.get_companies(u_id_login,role);
        })


        $('#c-reset').unbind('click').bind('click',function(){
            $('#c-name').val('');
            dashboard_admin.prototype.get_companies(u_id_login,role);
        })

        $('#c-list').on('click','.branch-view',function(){
            var branches = $(this).find('.branch-hide').val()
            $('#branch-body').focus()
            $('#branch-body').css('outline',0)

            dashboard_admin.prototype.branch_bids(branches)
            //console.log(branches)

        })
/*
        $('#user-search').unbind('click').bind('click',function(){
            //admin.get_users_list();
        })

        $('#user-reset').unbind('click').bind('click',function(){
            $('#user-search-type').find("option[value='']").attr("selected", "selected");
            $('#user-date-to').val('')
            $('#user-date-from').val('')
            //admin.get_users_list();
        })

        $('#inv-search').unbind('click').bind('click',function(){
           // admin.get_invs_list();
        })

        $('#inv-reset').unbind('click').bind('click',function(){
            $('#inv-search-type').find("option[value='']").attr("selected", "selected");
            $('#inv-date-to').val('')
            $('#inv-date-from').val('')
           // admin.get_invs_list()
        })

        $('#payment-search').unbind('click').bind('click',function(){
           // admin.get_payment_list();
        })

        $('#payment-reset').unbind('click').bind('click',function(){
            $('#payment-search-type').find("option[value='']").attr("selected", "selected");
            $('#payment-date-to').val('')
            $('#payment-date-from').val('')
            admin.get_payment_list()
        })
*/
    },

    tr_content:function(item,i){
        var branch ='';
        var branch_body='';
        var b_ids=''
        item.branch.forEach(function(itm){
            branch += '<li>'+itm.b_name+'</li>'
            b_ids = (b_ids=='')?itm.b_id:b_ids+','+itm.b_id
            /*brand_body +='<tr>' +
                '<td>'+j+'<input type="hidden" class="b_id" value="'+itm.b_id+'"></td>' +
                '<td>'+itm.b_name+'</td>' +
                '<td>'+itm.b_email+'</td>' +
                '<td>'+itm.b_phone+'</td>' +
                '<td>'+itm.b_extension+'</td>' +
                '<td>'+itm.b_street+'</td>' +
                '<td>'+itm.b_state+'</td>' +
                '<td>'+itm.b_zip+'</td>' +
                '<td>'+itm.u_idContact+'</td>' +
                '</tr>'*/
        })
        var tr ='<tr>' +
            '<td><input type="hidden" class="c_id" value="'+item.c_id+'"> '+i+'</td>' +
            '<td class="txt-l15"><a href="company.php?id='+item.c_id+'">'+item.c_name +'</a></td>' +
            '<td class="txt-l15">'+item.c_phone+'</td>' +
            '<td class="txt-l15">'+item.c_website+'</td>' +
            '<td class="txt-l15">'+item.c_notes+'</td>' +

            '<td class="branch-view" style="cursor: pointer; text-align: left">' +
                '<ul>'+branch+'</ul>' +
                '<input type="hidden" class="branch-hide" value="'+b_ids+'">' +
            '</td>' +
            '<td>'+item.c_active+'</td>' +
          '</tr>';

        return tr;
    },

    get_companies: function(u_id,u_type){
        var text_search = $('#c-name').val();
        var _link =link._companies;
        var _data ={auth:_auth, limit:1,offset:0,u_id:u_id,u_type:u_type,text_search:text_search}

        var $pagination = $('#c-list-pagination');
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
                $('#c-record').text(data.response.row_cnt)
                if(totalRecords==0){
                    $('#c-list tbody').html("");
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
                        var _data  ={auth:_auth,limit:limit,offset:cursor,u_id:u_id,u_type:u_type,text_search:text_search}

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
                                    tr += dashboard_admin.prototype.tr_content(item,i);
                                    i++;

                                });//end for each
                                $('#c-list tbody').html(tr);
                            }
                        });//end ajax get appointment at current page


                    } //end onPageClick
                }));
            }
        });
    },

    branch_bids:function(b_ids){
        var _data ={auth:_auth,b_ids:b_ids,auth:_auth}

        var link3 = link._branch_bids;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:_data,
            //contentType: 'application/json',
            error : function (status,xhr,error) {
            },
            success: function (res) {
                //console.log(res);
                var i=0;
                var tr=''
                res.response.results.forEach(function(item){
                    i++
                     tr +='<tr class="filter">' +
                        '<td><input type="hidden" class="b_id" value="'+item.b_id+'"> '+i+'</td>' +
                        '<td class="txt-l15"><a href="branch.php?id='+item.b_id+'">'+item.b_name +'</a></td>' +
                        '<td class="txt-l15">'+item.b_phone+'</td>' +
                        '<td class="txt-l15">'+item.b_extension+'</td>' +
                        '<td class="txt-l15">'+item.b_street+'</td>' +
                        '<td class="txt-l15">'+item.b_city+'</td>' +
                        '<td class="txt-l15">'+item.b_zip+'</td>' +
                        '<td class="txt-l15">'+item.b_email+'</td>' +
                        '<td class="txt-l15">'+item.u_fname + item.u_lname+'</td>' +
                        '</tr>';
                })

                $('#branch-body #b-list tbody').html(tr)
                $('#branch-body #b-record').html(i)
                $('#branch-body').css({"display":""})
            }
        });}

}
var admin = new dashboard_admin();
$(function(){
    admin.init();
});