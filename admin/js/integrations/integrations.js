
function integrations(){}
integrations.NAME         = "integrations";
integrations.VERSION      = "1.2";
integrations.DESCRIPTION  = "Class integrations";

integrations.prototype.constructor = integrations;
integrations.prototype = {
    init:function(){
        integrations.prototype.get_integrations(u_id_login,role,"#i-list","#i-list-pagination","#i-records");

        //event
        $('#i-search').unbind('click').bind('click',function(){
            integrations.prototype.get_integrations(u_id_login,role,"#i-list","#i-list-pagination","#i-records");
        })
    },

    tr_content:function(item,i){
        var i_active_ischeck = (item.i_active=="1")?'checked="checked"':'';
        //var i_active_checkbox ='<input type=checkbox class="i_active" '+i_active_ischeck+'>';
        var i_active_checkbox ='<label class="custom-checkbox">' +
            '<input type="checkbox" class="custom-control-input i_active" '+i_active_ischeck+'> '+
            '<span class="custom-label p_rl20"></span>' +
            '</label>'
        var tr ='<tr>' +
            '<td><input type="hidden" class="i_id" value="'+item.i_id+'">' +
            '<input type="hidden" class="c_id" value="'+item.c_id+'"> '+i+'' +
            '&nbsp;&nbsp;&nbsp;<span style="cursor: pointer"><a href="edit_integration.php?i_id='+item.i_id+'"><i class="fa fa-edit"></i></a></span>' +
            '</td>' +
            '<td class="txt-l15">'+item.i_name+'</td>' +
            '<td class="txt-l15">'+item.i_shortname+'</td>' +
            '<td class="txt-l15"><a href="company.php?id='+item.c_id+'">'+item.c_name +'</a></td>' +
            '<td class="txt-l15">'+item.i_website+'</td>' +
            '<td class="txt-l15">'+item.i_apiURL+'</td>' +
            '<td class="txt-l15">'+item.i_helpPhone+'</td>' +
            '<td class="txt-l15">'+item.i_helpEmail+'</td>' +
            '<td class="txt-l15">'+item.i_helpForum+'</td>' +
            '<td class="txt-l15">'+item.i_notes+'</td>' +
            '<td style="text-align: center">'+i_active_checkbox+'</td>' +
          '</tr>';

        return tr;
    },

    get_integrations: function(u_id,u_type,el,el_pagination,el_record){
        var text_search = $('#i-text_search').val();
        var _link =link._integrations;
        if(window.location.pathname.includes('profile.php')){
            _link =link._integrations_uid;
        }
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
                                    tr += integrations.prototype.tr_content(item,i);
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
var itg = new integrations();
$(function(){
    itg.init();
});