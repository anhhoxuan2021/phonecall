
function acl(){}
acl.NAME         = "acl";
acl.VERSION      = "1.2";
acl.DESCRIPTION  = "Class acl";

acl.prototype.constructor = acl;
acl.prototype = {
    init:function(){
        common_f.prototype.roles("#acl-view .role_id")
        //event
        $("#acl-view .role_id").change(function(){
            acl.prototype.getGrp_role($(this).val())
        })

        $("#acl-view #btn-search").unbind("click").bind("click",function(){
            acl.prototype.getGrp_role($("#acl-view .role_id").val())
        })

        $("#acl-view #g_id").change(function(){

            acl.prototype.getACL_gID($(this).val())
        })

        $('#acl-view #body-acl').on('click','.btnapdateacl',function(){
            //console.log("test");
            acl.prototype.update_acl()
        })

        $('#body-acl').on('click','.view-all',function(){
            if($(this).is(":checked")){
                $(this).closest('table').find('tbody .view').prop("checked",true);
            }else{
                $(this).closest('table').find('tbody .view').prop("checked",false);
            }

        })

        $('#body-acl').on('click','.view',function(){
            var that = $(this)
            if(that.is(":checked")){
                var view_all = true;
                that.closest('table').find('tbody .view').each(function(){
                    if(!$(this).is(":checked")){
                        view_all = false;
                        return false;
                    }
                })
                that.closest('table').find('.view-all').prop("checked",view_all)
            }else{
                that.closest('table').find('.view-all').prop("checked",false)
            }

        })

        $('#body-acl').on('click','.add-all',function(){
            if($(this).is(":checked")){
                $(this).closest('table').find('tbody .add').prop("checked",true);
            }else{
                $(this).closest('table').find('tbody .add').prop("checked",false);
            }

        })

        $('#body-acl').on('click','.add',function(){
            var that = $(this)
            if(that.is(":checked")){
                var add_all = true;
                that.closest('table').find('tbody .add').each(function(){
                    if(!$(this).is(":checked")){
                        add_all = false;
                        return false;
                    }
                })
                that.closest('table').find('.add-all').prop("checked",add_all)
            }else{
                that.closest('table').find('.add-all').prop("checked",false)
            }

        })

        $('#body-acl').on('click','.edit-all',function(){
            if($(this).is(":checked")){
                $(this).closest('table').find('tbody .edit').prop("checked",true);
            }else{
                $(this).closest('table').find('tbody .edit').prop("checked",false);
            }
        })

        $('#body-acl').on('click','.edit',function(){
            var that = $(this)
            if(that.is(":checked")){
                var edit_all = true;
                that.closest('table').find('tbody .edit').each(function(){
                    if(!$(this).is(":checked")){
                        edit_all = false;
                        return false;
                    }
                })
                that.closest('table').find('.edit-all').prop("checked",edit_all)
            }else{
                that.closest('table').find('.edit-all').prop("checked",false)
            }

        })

    },

    getGrp_role:function(role){
        var _link =link._groups_role;
        var _data ={auth:_auth,g_role:role,g_name:$("#acl-view #g_name").val(),all:0}

        if(role =="") return;

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
                var data =res.response;
                $("#acl-view #g_id").html('<option value=""></option>')
                if(data.length >0){
                    var grps="";
                    data.forEach(function(item){
                        grps +='<option value= "'+item.g_id+'">'+item.g_name+'</option>'
                    })
                    $("#acl-view #g_id").append(grps)
                }
                //
            }
        });
    },

    getACL_gID:function(g_id){
        $('#acl-view #ul-acl').html("")
        $('#acl-view #body-acl').html("")

        var _link =link._group_gID;
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
                //console.log(res.response);
                    var data = res.response;
                   // console.log(data.acl);
                    for (let key in data) {
                        //console.log("key="+key+"----");
                        //console.log(data+"----");
                        acl.prototype.processACLFields(key,data[key]);
                    }
                //btn check all
                $("#acl-view table.table-acl").each(function(){
                    var this_table = $(this);
                    var view_all = true;
                    var add_all = true;
                    var edit_all = true;
                    this_table.find('.view').each(function(){
                        if(!$(this).is(":checked")){
                            view_all = false;
                            return false;
                        }
                    })

                    this_table.find('.add').each(function(){
                        if(!$(this).is(":checked")){
                            add_all = false;
                            return false;
                        }
                    })

                    this_table.find('.edit').each(function(){
                        if(!$(this).is(":checked")){
                            edit_all = false;
                            return false;
                        }
                    })

                    this_table.find('.view-all').prop("checked",view_all)
                    this_table.find('.add-all').prop("checked",add_all)
                    this_table.find('.edit-all').prop("checked",edit_all)
                })
            }
        });
    },

    processACLFields:function(key,obj){
        var btn='';
        //console.log("is_addedit="+is_addedit);
        if(is_addedit =='true'){
            btn='<button class="btn btn-danger btnapdateacl f-r w100px">Update</button> '
        }
        var li='';
        var div ='';
        var tr="";
        var tbody="";
        var tab='';
        var active ="";
        switch(key){
            case "permission":
                active = "active";
                for(let k_field in obj){
                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];
                    //console.log("view="+view+";add="+add+";edit="+edit)
                    tr +='<tr class="tr_acl">' +
                        '<td >Form '+k_field+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }

                break;
            case "assigned_integration":
                for(let k_field in obj){
                    var k_field_t = k_field.split("_")
                    //console.log("k_field="+k_field+";");
                    //console.log("k_field_t="+k_field_t+";");
                    var key_name = k_field;
                    if(k_field_t[0] =="i"){
                        key_name = "Integration"
                    }else if(k_field_t[0] =="u"){
                        key_name = "User"
                    }else{
                        if(k_field_t[1] !=undefined){
                            key_name = "Assigned Integration "+ k_field_t[1]
                        }else{
                            key_name = "Assigned Integration "+ k_field_t[0]
                        }

                    }

                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];

                    tr +='<tr class="tr_acl">' +
                        '<td >'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;
            case "branch":
                for(let k_field in obj){
                    var k_field_t = k_field.split("_")
                    var key_name = k_field;
                    if(k_field_t[0] =="c"){
                        key_name = "Company"
                    }else{
                        key_name = "Branch "+ k_field_t[1]
                    }

                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];

                    tr +='<tr class="tr_acl">' +
                        '<td >'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;
            case "company":
                for(let k_field in obj){
                    var k_field_t = k_field.split("_")
                    //var key_name = k_field;

                    var key_name = "Company "+ k_field_t[1]

                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];

                    tr +='<tr class="tr_acl">' +
                        '<td >'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;
            case "integrations":
                for(let k_field in obj){
                    var k_field_t = k_field.split("_")
                    var key_name = k_field;
                    if(k_field_t[0] =="c"){
                        key_name = "Company"
                    }else{
                        key_name = "Integration "+ k_field_t[1]
                    }

                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];

                    tr +='<tr class="tr_acl">' +
                        '<td >'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;
            case "user":
                for(let k_field in obj){
                    var k_field_t = k_field.split("_")
                    var key_name = k_field;
                    if(k_field_t[0] =="b"){
                        key_name = "Branch"
                    }else{
                        key_name = "User "+ k_field_t[1]
                    }

                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];

                    tr +='<tr class="tr_acl">' +
                        '<td >'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;

            case "groups":
                for(let k_field in obj){
                    var k_field_t = k_field.split("_")
                    var key_name = k_field;
                    if(k_field_t[0] =="g"){
                        key_name = "Group " + k_field_t[1]
                    }else if(k_field_t[0] =="u"){
                        key_name = "Add or Edit User"
                    }

                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];
                    if(k_field != 'u_name' && k_field != 'acl'){
                        tr +='<tr class="tr_acl">' +
                            '<td >'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                            acl.prototype.td_acl(view,add,edit)+
                            '</tr>';
                    }

                }
                break;

            default:
                for(let k_field in obj){
                    var key_name = k_field;

                    var view = obj[k_field]["view"];
                    var add = obj[k_field]["add"];
                    var edit = obj[k_field]["edit"];

                    tr +='<tr class="tr_acl">' +
                        '<td >'+key_name+'<input class="key" type="hidden" value="'+k_field+'"></td>'+
                        acl.prototype.td_acl(view,add,edit)+
                        '</tr>';
                }
                break;

        }

        li +='<li class="nav-item ">'+
            '<a class="nav-link f_uppercase '+active+'" data-toggle="tab" href="#'+key+'" role="tab">'+key+'</a>'+
            '</li>'

        tab ='<div class="tab-pane fade show acl '+active+'" id="'+key+'" role="tabpanel">' +
                '<div class="table-responsive-lg col-12">' +
                    '<table class="table table-bordered m-0 t-normal-l table-acl '+key+'">' +
                        '<thead>'+
                            '<tr>'+
                                '<th style="max-width: 300px; vertical-align: middle;font-size: 15px!important" rowspan="2">Filed Name</th>'+
                                '<th style="font-size: 15px!important">Permission</th>'+
                            '</tr>'+
                            '<tr>'+
                                '<th>' +
                                    '<div class="row col-12">'+
                                        '<div class="custom-control custom-control-inline">' +
                                            '<label class="custom-checkbox">' +
                                                '<input type="checkbox" class="custom-control-input view-all"> ' +
                                                '<span class="custom-label p_rl20">All&nbsp;&nbsp;&nbsp;&nbsp;</span>' +
                                            '</label>' +
                                        '</div>'+
                                        '<div class="custom-control custom-control-inline">' +
                                        '<label class="custom-checkbox">' +
                                        '<input type="checkbox" class="custom-control-input add-all"> ' +
                                        '<span class="custom-label p_rl20">All&nbsp;&nbsp;&nbsp;</span>' +
                                        '</label>' +
                                        '</div>'+
                                        '<div class="custom-control custom-control-inline">' +
                                        '<label class="custom-checkbox">' +
                                        '<input type="checkbox" class="custom-control-input edit-all"> ' +
                                        '<span class="custom-label p_rl20">All</span>' +
                                        '</label>' +
                                        '</div>'+
                                    '</div>' +
                                '</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+
                            tr +
                        '</tbody>' +
                    '</table>' +
                '</div>' +
                '<div class="col-12 mt10pb30">' +
                    btn +
                '</div>' +
            '</div>'

        $('#acl-view #ul-acl').append(li)
        $('#acl-view #body-acl').append(tab)

    },

    td_acl:function(view,add,edit){
        //console.log("add="+add)
        var view_v =(view)?'checked="checked"':'';
        var add_v =(add)?'checked="checked"':'';
        var edit_v =(edit)?'checked="checked"':'';

        var add_div ='<div class="custom-control custom-control-inline">' +
                '<label class="custom-checkbox">' +
                '<input type="checkbox" class="custom-control-input add" '+add_v+'> ' +
                '<span class="custom-label p_rl20">Add</span>' +
                '</label>' +
            '</div>'
        if(add ==undefined){
            var add_div =  '<div class="custom-control custom-control-inline">' +
                '<label class="custom-checkbox">' +

                '<span class="custom-label p_rl20">Add</span>' +
                '</label>' +
            '</div>'
        }
        var td =
            '<td class="v-key">' +
                '<div class="row col-12">'+
                    '<div class="custom-control custom-control-inline">' +
                        '<label class="custom-checkbox">' +
                            '<input type="checkbox" class="custom-control-input view" '+view_v+'> ' +
                            '<span class="custom-label p_rl20">View</span>' +
                        '</label>' +
                    '</div>'+
                        add_div+
                    '<div class="custom-control custom-control-inline">' +
                        '<label class="custom-checkbox">' +
                            '<input type="checkbox" class="custom-control-input edit" '+edit_v+'> ' +
                            '<span class="custom-label p_rl20">Edit</span>' +
                        '</label>' +
                    '</div>'+
                '</div>' +
                '</td>';
        return td;
    },

    update_acl:function(){
        var acl = {};
        var acl_form ={};
        $("#acl-view table.table-acl").each(function(){
            acl_form ={}
            var key = $(this).closest('.tab-pane').attr("id")
            var $me = $(this)
            $me.find('tbody tr').each(function(){
                var key_field = $(this).find('.key').val();
                var view =$(this).find('.view').is(":checked");
                var add =$(this).find('.add').is(":checked");
                var edit =$(this).find('.edit').is(":checked");
                if(key_field !='ACL'){
                    acl_form[key_field] = {view:view,add:add,edit:edit}
                }else{
                    acl_form[key_field] = {view:view,edit:edit}
                }

                //console.log(key_field +",")
            })

            acl[key] =acl_form;
            //console.log("--------------------------------")

        })

        //console.log(acl)
        var _link =link._acl_update;
        var _data ={auth:_auth, acl:acl,g_id:$('#acl-view #g_id').val() ,u_id:u_id_login}

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
                if(res.Update ==true){
                    $("#modal-success").modal("show")
                    setTimeout(function(){
                        $("#modal-success").modal("hide")
                    },2000)

                }else{
                    $("#modal-error #err-message").text(res.ERROR)
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
var acl1 = new acl();
$(function(){
    acl1.init();
});