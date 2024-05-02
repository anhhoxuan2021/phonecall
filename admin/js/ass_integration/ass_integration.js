
function ass_integration(){}
ass_integration.NAME         = "ass_integration";
ass_integration.VERSION      = "1.2";
ass_integration.DESCRIPTION  = "Class ass_integration";

ass_integration.prototype.constructor = ass_integration;
ass_integration.prototype = {
    init:function(){
        ass_integration.prototype.get_assigned_integrations(u_id_login,role,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
        //event
        $('#assgn-i-search').unbind('click').bind('click',function(){
            ass_integration.prototype.get_assigned_integrations(u_id_login,role,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
        })
        $('#assgn-i-reset').unbind('click').bind('click',function(){
            $('#assign-i-text_search').val('');
            ass_integration.prototype.get_assigned_integrations(u_id_login,role,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
        })
    },

    tr_content:function(item,i){

        var tr ='<tr>' +
            '<td><input type="hidden" class="ai_id" value="'+item.ai_id+'"> '+i+'</td>' +
            '<td class="txt-l15">'+item.ai_username+'</td>' +
            '<td class="txt-l15">'+item.u_fname+' '+ item.u_lname+' </td>' +
            '<td class="txt-l15"><a href="integration.php?id='+item.i_id+'">'+item.i_name +'</a></td>' +
            '<td class="txt-l15">'+item.ai_notes+'</td>' +
            '<td class="txt-l15">'+item.ai_dateAssigned+'</td>' +
            '<td class="txt-l15">'+item.ai_active+'</td>' +
          '</tr>';

        return tr;
    },

    get_assigned_integrations: function(u_id,u_type,el,el_pagination,el_record){
        var text_search = $('#assign-i-text_search').val();
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
                                    tr += ass_integration.prototype.tr_content(item,i);
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
var ass_itg = new ass_integration();
$(function(){
    ass_itg.init();
});