
function group(){}
group.NAME         = "group";
group.VERSION      = "1.2";
group.DESCRIPTION  = "Class group";

group.prototype.constructor = group;
group.prototype = {
    init:function(){
        select2_f.prototype.searchUser("#add-group #u-selected","Search User","#add-group #list-users")
        common_f.prototype.roles("#add-group .role_id")

        var id = getUrlParameter1('id');
        if(id !="" && id !=undefined){
            group.prototype.getGrpBy_gID(id)
        }
        //event
        $('#add-group #list-users').on('click','.delete',function(){
            //console.log("is_addedit="+is_addedit);
            if(is_addedit=="true"){
                $(this).remove();
            }

        })

        $('#btn-add-grp').unbind('click').bind('click',function(){
            group.prototype.add_edit_grp();
        })

        $('#add-group #g_name').change(function(){
            if($(this).val()== "system_admin" || $(this).val()== "system_user"){
                $('#add-group #g_name-err').css({"display":""})
                setTimeout(function(){
                    $('#add-group #g_name').val("");
                    $('#add-group #g_name-err').css({"display":"none"})
                },2000)
            }
        });

        $('#reset-group').unbind('click').bind('click',function(){
            group.prototype.reset_group();
        })
    },

    add_edit_grp:function(){
        var g_id =  $('#add-group #g_id').val();
        var u_id = "";
        var u_name="";
        $("#add-group #list-users .urs-name").each(function(){
            var u_id_v =$(this).find('.u_id').val()
            var u_name_v =$(this).find('.u_name').text()
            u_id =(u_id=="")?u_id_v:u_id+","+u_id_v
            u_name = (u_name=="")?u_name_v +","+u_id_v: u_name +";" +u_name_v +","+u_id_v
        })

        var _data ={
            auth:_auth,u_id_login:u_id_login,
            g_id:g_id,
            g_name:$('#add-group #g_name').val(),
            g_role:$('#add-group .role_id').val(),
            u_name:u_name,
            u_id:u_id
        }

        var link3 = link._group_add_update;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:_data,
            //contentType: 'application/json',//use when post a form
            error : function (status,xhr,error) {
            },
            success: function (data) {
                //console.log(res);
                if(data.Save_Update==true){
                    if(g_id ==""){
                        $("#modal-success").modal("show")
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                        },2000)
                    }else{
                        $('#modal-success .modal-title').text("Update success")
                        $("#modal-success").modal("show")
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                        },2000)
                    }
                }else{
                    $("#modal-error #err-message").text(data.ERROR)
                    $("#modal-error").modal("show")

                }
            }
        });
    },

    getGrpBy_gID:function(g_id){
        var _link =link._groups;
        var _data ={auth:_auth, limit:1,offset:0,g_id:g_id}

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
                if(res.response.row_cnt >0){
                    var data = res.response.results[0];

                    var span_user =''

                    if(data.u_name.indexOf(";")){
                       var u_names =data.u_name.split(";");
                        u_names.forEach(function(itm){
                            var itm_temp = itm.split(",")

                           span_user += '<span class="urs-name delete b-round m-tr10" style="cursor: pointer">' +
                                '<input class="u_id" type="hidden" value="'+itm_temp[1]+'">' +
                                '<span class="p-trbl10"><span class="u_name">'+itm_temp[0]+'</span>&nbsp;&nbsp; <strong class="color-alert">X</strong></span>' +
                                '</span>';
                        })
                    }else if(u_names !=''){
                        var itm_temp = data.u_name.split(",")
                        span_user += '<span class="urs-name delete b-round m-tr10" style="cursor: pointer">' +
                            '<input class="u_id" type="hidden" value="'+itm_temp[1]+'">' +
                            '<span class="p-trbl10"><span class="u_name">'+itm_temp[0]+'</span>&nbsp;&nbsp; <strong class="color-alert">X</strong></span>' +
                            '</span>';
                    }

                    $("#add-group .role_id option[value='"+data.g_role+"']").attr("selected","selected");
                    $("#add-group #g_name").val(data.g_name);
                    $("#add-group #list-users").html(span_user);
                    $("#add-group #g_id").val(data.g_id);
                }
                //
            }
        });
    },

    reset_group:function(){
        $('#add-group #g_name').val("")
        $('#add-group #list-users').html("")
        $('#add-group #u-selected').html('<option value=""></option>')
        $('#add-group #u-selected').val("").trigger('change');
    }

 }
var gp = new group();
$(function(){
    gp.init();
});