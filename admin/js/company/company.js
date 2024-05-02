function company(){}
company.NAME         = "company";
company.VERSION      = "1.2";
company.DESCRIPTION  = "Class company";

company.prototype.constructor = company;
company.prototype = {
    init:function(){
        if(window.location.pathname.includes('edit_company.php')){
            var c_id = getUrlParameter1('c_id');
            if(c_id==undefined){
                return;
            }else{
                company.prototype.get_company_cid(c_id)
                branches.prototype.get_branches_cid(c_id,"#b-list","#b-list-pagination","#b-record");
                user.prototype.get_users_cid(c_id,"#users-list","#users-list-pagination","#user-record");
            }
        }

        $('#btn-company').unbind('click').bind('click',function(){
            company.prototype.add_edit_company();
        })

        $('#reset-Company').unbind('click').bind('click',function(){
            company.prototype.reset_company();
        })

        $('#b-search').unbind('click').bind('click',function(){
            branches.prototype.get_branches_cid(c_id,"#b-list","#b-list-pagination","#b-record");
        })
        $('#b-reset').unbind('click').bind('click',function(){
            $('#b-text_search').val('');
            branches.prototype.get_branches_cid(c_id,"#b-list","#b-list-pagination","#b-record");
        })

    },

    add_edit_company:function(){
        var _link =link._company_add_edit;
        /*var c_id = $('#company-content #c_id').val();
        var c_name = $('#company-content #c_name').val();
        var c_phone = $('#company-content #c_phone').val();
        var c_website = $('#company-content #c_website').val();
        var c_notes = $('#company-content #c_notes').val();
        var c_domain = $('#company-content #c_domain').val();
        var c_active = $('#company-content #c_active').is(":checked");

        var _data ={auth:_auth,u_id_login:u_id_login,
            c_id:c_id,
            c_name:c_name,
            c_phone:c_phone,
            c_website:c_website,
            c_notes:c_notes,
            c_domain:c_domain,
            c_active:c_active
        }*/

        var data_post = {}
        $('#company-content .a_e').each(function(){
            var value = $(this).val()
            var key = $(this).attr('id')
            if(key =="c_active"){
                var value = $(this).is(":checked")
            }

            data_post[key] =value;
        })

        //console.log(data_post);
        var _data ={
            auth:_auth,
            u_id_login:u_id_login,
            data_post:data_post
        }

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data,
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.Save_Update==true){
                    if(data_post['c_id'] ==""){
                        companies.prototype.get_companies(u_id_login,role);
                        $("#modal-success").modal("show")
                        //$("#company-content #c_id").val(data.c_id);
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                            //$(".user_title").text("Edit User")
                            //$("#add-user #btn-add-user").text("Update User");
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

        })
    },

    get_company_cid:function(c_id){
        var _data ={auth:_auth,c_id:c_id}

        var link3 = link._company_cid;
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
                if(res.response.length>0){
                    var data =res.response[0];
                    $('#company-content #c_id').val(data.c_id);
                    $('#company-content #c_name').val(data.c_name);
                    $('#company-content #c_phone').val(data.c_phone);
                    $('#company-content #c_website').val(data.c_website);
                    $('#company-content #c_notes').val(data.c_notes);
                    $('#company-content #c_domain').val(data.c_domain);

                    if(data.c_active ==1){
                        $('#company-content #c_active').attr("checked",true)
                    }else{
                        $('#company-content #c_active').attr("checked",false)
                    }

                }
            }
        });
    },

    reset_company:function(){
        $('#company-content #c_id').val();
        $('#company-content #c_name').val();
        $('#company-content #c_phone').val();
        $('#company-content #c_website').val();
        $('#company-content #c_notes').val();
        $('#company-content #c_domain').val();
        $('#company-content #c_active').prop("checked",false)
    }
}
var comp1 = new company();
$(function(){
    comp1.init();
});