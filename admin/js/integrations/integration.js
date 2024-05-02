
function integration(){
    this.i_active_before = false;
}
integration.NAME         = "integration";
integration.VERSION      = "1.2";
integration.DESCRIPTION  = "Class integration";

integration.prototype.constructor = integration;
integration.prototype = {
    init:function(){
        if(window.location.pathname.includes('edit_integration.php')){
            var i_id = getUrlParameter1('i_id');
            if(i_id==undefined){
                return;
            }else{
                integration.prototype.get_integration_iid(i_id,"#integration-content #c_id")

                $('#assign-i-text_search').val('');
                ass_integrations.prototype.get_assigned_integrations_by_iid(i_id,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
            }
        }else if(window.location.pathname.includes('integration.php')){
            integration.prototype.i_active_before = false
            common_f.prototype.get_companies_list(u_id_login,role,"#integration-content #c_id","","");
        }

        $('#btn-add-integration').unbind('click').bind('click',function(){
            integration.prototype.add_edit_integration();
        })

        $('#reset-integration').unbind('click').bind('click',function(){
            integration.prototype.reset_integration();
        })

        $('#integration-content #i_helpEmail').keypress(function(){
            $('#integration-content #i_helpEmail-error').css({"display":"none"});
        });

        if(i_password_bool =="true"){
            $('#integration-content #show-i-pass').unbind('click').bind('click',function(){
                var checkClass = $(this).find('.fa');
                if(checkClass.hasClass('fa-eye-slash')){
                    checkClass.removeClass('fa-eye-slash')
                    checkClass.addClass('fa-eye')

                    $(this).closest('.check-show-pass').find('#i_password').attr('type','text')
                }else{
                    checkClass.removeClass('fa-eye')
                    checkClass.addClass('fa-eye-slash')

                    $(this).closest('.check-show-pass').find('#i_password').attr('type','password')
                }
            })
        }
    },

    add_edit_integration:function(){
        //console.log(integration.prototype.i_active_before);
        var i_helpEmail = $('#integration-content #i_helpEmail').val();
        if(i_helpEmail !=''){
            if(!common_f.prototype.validate_email(i_helpEmail)){
                $('#integration-content #i_helpEmail-error').css({"display":""});
                $('#integration-content #i_helpEmail').focus();
                return;
            }
        }

        var c_id = $('#integration-content #c_id').val();
        if(c_id==""){
            $('#integration-content #c_id-error').css({"display":""});
            $('#integration-content #c_id').focus();
            return;
        }

        var _link =link._integration_add_edit;

        /*var i_id = $('#integration-content #i_id').val();
        var i_name = $('#integration-content #i_name').val();
        var i_shortname = $('#integration-content #i_shortname').val();
        var i_website = $('#integration-content #i_website').val();
        var i_apiURL = $('#integration-content #i_apiURL').val();
        var i_phone_domain = $('#integration-content #i_phone_domain').val();
        var i_token = $('#integration-content #i_token').val();
        var i_secret = $('#integration-content #i_secret').val();
        var i_helpPhone = $('#integration-content #i_helpPhone').val();

        var i_helpForum = $('#integration-content #i_helpForum').val();
        var i_apiVersion = $('#integration-content #i_apiVersion').val();
        var i_icon = $('#integration-content #i_icon').val();
        var i_implementDate = $('#integration-content #i_implementDate').val();
        var c_id = $('#integration-content #c_id').val();
        var i_uname = $('#integration-content #i_uname').val();
        var i_password = $('#integration-content #i_password').val();
        var i_notes = $('#integration-content #i_notes').val();
        var i_active = $('#integration-content #i_active').is(":checked");

        var _data ={auth:_auth,u_id_login:u_id_login,
            i_id:i_id,
            i_name:i_name,
            i_shortname:i_shortname,
            i_website:i_website,
            i_apiURL:i_apiURL,
            i_phone_domain:i_phone_domain,
            i_token:i_token,
            i_secret:i_secret,
            i_helpPhone:i_helpPhone,
            i_helpEmail:i_helpEmail,
            i_helpForum:i_helpForum,
            i_apiVersion:i_apiVersion,
            i_icon:i_icon,
            i_implementDate:i_implementDate,
            c_id:c_id,
            i_uname:i_uname,
            i_password:i_password,
            i_notes:i_notes,
            i_active:i_active
        }*/

        var data_post = {}
        $('#integration-content .a_e').each(function(){
            var value = $(this).val()
            var key = $(this).attr('id')
            if(key =="i_active"){
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
                    //integrations.prototype.get_integrations(u_id_login,role,"#i-list","#i-list-pagination","#i-records");
                    if(data_post['i_id'] ==""){
                        if(data_post['i_active'] !=integration.prototype.i_active_before){
                            //integration.prototype.i_active_before = data_post['i_active']
                            if(!data_post['i_active']){
                                //click_btn.prototype.click_zoho(data_post['i_active'],data_post['c_id'],data.i_id,data_post['i_shortname']);
                               // click_btn.prototype.click_iactive(data_post['i_active'],data_post['c_id'],data.i_id,data_post['i_shortname']);
                            }

                        }
                        $("#modal-success").modal("show")
                        //$("#integration-content #i_id").val(data.i_id);
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                            //$(".user_title").text("Edit User")
                            //$("#add-user #btn-add-user").text("Update User");
                        },2000)
                    }else{
                        if(data_post['i_active'] !=integration.prototype.i_active_before){
                            integration.prototype.i_active_before = data_post['i_active']
                            if(!data_post['i_active']){
                                click_btn.prototype.click_zoho(data_post['i_active'],data_post['c_id'],data_post['i_id'],data_post['i_shortname']);

                            }
                        }
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

    get_integrationBy_iid:function(i_id){
        var _data ={auth:_auth,i_id:i_id}

        var link3 = link._integration_iid;
       return $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:_data
        });
    },

    get_integration_iid:function(i_id,el_comp){
        $.when(common_f.prototype.companies_list(u_id_login,role,""),
                integration.prototype.get_integrationBy_iid(i_id)
            ).done(function(companie_info,integation_info){
                if(companie_info[0].response.results !=undefined){
                    var option ='<option value=""></option>';
                    companie_info[0].response.results.forEach(function(item){
                        option +='<option value="'+item.c_id+'">'+item.c_name+'</option> '
                    })

                    $(el_comp).html(option);
                }
                if(integation_info[0].response.length>0){
                    var data =integation_info[0].response[0];
                    $('#integration-content #i_id').val(data.i_id);
                    $('#integration-content #i_name').val(data.i_name);
                    $('#integration-content #i_shortname').val(data.i_shortname);
                    $('#integration-content #i_website').val(data.i_website);
                    $('#integration-content #i_apiURL').val(data.i_apiURL);
                    $('#integration-content #i_phone_domain').val(data.i_phone_domain);
                    $('#integration-content #i_token').val(data.i_token);
                    $('#integration-content #i_secret').val(data.i_secret);
                    $('#integration-content #i_helpPhone').val(data.i_helpPhone);
                    $('#integration-content #i_helpEmail').val(data.i_helpEmail);
                    $('#integration-content #i_helpForum').val(data.i_helpForum);
                    $('#integration-content #i_apiVersion').val(data.i_apiVersion);
                    $('#integration-content #i_icon').val(data.i_icon);
                    $('#integration-content #i_implementDate').val(data.i_implementDate);
                    $('#integration-content #c_id').val(data.c_id);
                    $('#integration-content #i_uname').val(data.i_uname);
                    $('#integration-content #i_password').val(data.i_password);
                    $('#integration-content #i_notes').val(data.i_notes);
                    $('#integration-content #i_redirectURL').val(data.i_redirectURL);

                    if(data.i_active ==1){
                        integration.prototype.i_active_before = true
                        $('#integration-content #i_active').attr("checked",true)
                    }else{
                        integration.prototype.i_active_before = false
                        $('#integration-content #i_active').attr("checked",false)
                    }

                }
            })
    },

    reset_integration:function(){
        $('#integration-content #i_id').val('');
        $('#integration-content #i_name').val('');
        $('#integration-content #i_website').val('');
        $('#integration-content #i_apiURL').val('');
        $('#integration-content #i_phone_domain').val('');
        $('#integration-content #i_token').val('');
        $('#integration-content #i_secret').val('');
        $('#integration-content #i_helpPhone').val('');
        $('#integration-content #i_helpEmail').val('');
        $('#integration-content #i_helpForum').val('');
        $('#integration-content #i_apiVersion').val('');
        $('#integration-content #i_icon').val('');
        $('#integration-content #i_implementDate').val('');
        $('#integration-content #c_id').val('');
        $('#integration-content #i_uname').val('');
        $('#integration-content #i_password').val('');
        $('#integration-content #i_notes').val('');
        $('#integration-content #i_redirectURL').val('');
        $('#integration-content #i_active').prop("checked",false)
        $('#integration-content #c_id-error').css({"display":"none"})
        integration.prototype.i_active_before = false
    }

}
var intg = new integration();
$(function(){
    intg.init();
});