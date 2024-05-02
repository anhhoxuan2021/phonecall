
function group_list(){}
group_list.NAME         = "group_list";
group_list.VERSION      = "1.2";
group_list.DESCRIPTION  = "Class group_list";

group_list.prototype.constructor = group_list;
group_list.prototype = {
    init:function(){
        group_list.prototype.groups();
        //event
        $('#g-search').unbind('click').bind('click',function(){
            group_list.prototype.groups();
        })

        $('#g-reset').unbind('click').bind('click',function(){
            $('#g-name').val('');
            $('#u-name').val('');
            group_list.prototype.groups();
        })

        $('#g-list tbody').on("click",".delete",function(){
            var g_id = $(this).closest("td").find(".g_id").val();
            group_list.prototype.deleteGrp_gID(g_id,$(this));
        })

    },

    tr_content:function(item,i){
        var span_user =''
        if(item.u_name.indexOf(";")){
            var u_names =item.u_name.split(";");
            u_names.forEach(function(itm){
                var itm_temp = itm.split(",")
                span_user =(span_user=="")?itm_temp[0]:span_user+", "+itm_temp[0];
            })
        }else if(item.u_name !=""){
            var itm_temp = item.u_name.split(",")
            span_user =(span_user=="")?itm_temp[0]:span_user+", "+itm_temp[0];
        }

        var tr ='<tr>' +
            '<td>'+i+'</td>' +
            '<td class="txt-l15">'+item.g_name+'</td>' +
            '<td class="txt-l15">'+item.g_role+'</td>' +
            '<td class="txt-l15">'+span_user+'</td>' +
            '<td><input type="hidden" class="g_id" value="'+item.g_id+'">' +
            '<span class="delete f-bold p_rl10 color-alert" style="cursor: pointer">&nbsp;&nbsp;&nbsp;X&nbsp;&nbsp;&nbsp;</span>' +
            '<a href="edit_group.php?id='+item.g_id+'"><span class="edit p_rl10" style="cursor: pointer">&nbsp;&nbsp;&nbsp;<i class="fa fa-edit color_blue"></i></span>&nbsp;&nbsp;&nbsp;</a>' +

            '</td>' +
          '</tr>';

        return tr;
    },

    groups: function(){
        var g_name = $('#g-name').val();
        var member = $('#u-name').val();
        var _link =link._groups;
        var _data ={auth:_auth, limit:1,offset:0,g_name:g_name,member:member}

        var $pagination = $('#g-list-pagination');
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
                $('#g-record').text(data.response.row_cnt)
                if(totalRecords <=0){
                    $('#g-list tbody').html("");
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
                        var _data =_data ={auth:_auth,limit:limit,offset:cursor,g_name:g_name,member:member}

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
                                    tr += group_list.prototype.tr_content(item,i);
                                    i++;

                                });//end for each
                                $('#g-list tbody').html(tr);
                            }
                        });//end ajax get appointment at current page


                    } //end onPageClick
                }));
            }
        });
    },

    deleteGrp_gID:function(g_id,$me){
        var _link =link._groupsDelete_gID;
        var _data ={auth:_auth,g_id:g_id}

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data,
            //contentType: 'application/json',
            error : function (status,xhr,error) {
            },
            success: function (res) {
                //console.log(res);
                if(res.delete ==true){
                    $me.closest('tr').remove();
                    $("#modal-success .modal-title").text("Delete success");
                    $("#modal-success").modal("show")
                    setTimeout(function(){
                        $("#modal-success").modal("hide")
                    },2000)

                }else{
                    $("#modal-error #err-message").text("Can't delete the item")
                    $("#modal-error").modal("show")
                    setTimeout(function(){
                        $("#modal-error").modal("hide")
                    },2000)
                }
                //
            }
        });
    }

}
var gp = new group_list();
$(function(){
    gp.init();
});