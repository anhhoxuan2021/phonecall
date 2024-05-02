
function add_user(){}
add_user.NAME         = "add_user";
add_user.VERSION      = "1.2";
add_user.DESCRIPTION  = "Class add_user";

add_user.prototype.constructor = add_user;
add_user.prototype = {
    init:function(){
        if(window.location.pathname.includes('edit_user.php')){
            $('.hide-assign').css({'display':'none'})

            common_f.prototype.get_branches(u_id_login,role,"#add-user #b_id","","");

            var u_id = getUrlParameter1('u_id');
            if(u_id==undefined){
                return;
            }else{
                add_user.prototype.user_edit(u_id)
            }
        }else if(window.location.pathname.includes('user.php')){
            common_f.prototype.get_branches(u_id_login,role,"#add-user #b_id","","");
        }else if(window.location.pathname.includes('profile.php')){
            common_f.prototype.get_branches(u_id_login,role,"#add-user #b_id","",b_id_login);
            if(u_id_login==undefined){
                return;
            }else{
                add_user.prototype.user_edit(u_id_login)
            }
        }

        $('#btn-add-user').unbind('click').bind('click',function(){
            add_user.prototype.add_edit_user();
        })

        $('#reset-user').unbind('click').bind('click',function(){
            add_user.prototype.reset_user_fields();
        })

        $('#add-user #u_email').keypress(function(){
            $('#add-user #email-error').css({"display":"none"});
        });

        if(u_password_bool =="true"){
            $('#add-user #show-pass').unbind('click').bind('click',function(){
                var checkClass = $(this).find('.fa');
                if(checkClass.hasClass('fa-eye-slash')){
                    checkClass.removeClass('fa-eye-slash')
                    checkClass.addClass('fa-eye')

                    $(this).closest('.check-show-pass').find('#u_password').attr('type','text')
                }else{
                    checkClass.removeClass('fa-eye')
                    checkClass.addClass('fa-eye-slash')

                    $(this).closest('.check-show-pass').find('#u_password').attr('type','password')
                }
            })
        }else{
            $('#add-user .disabled-pass-user').removeClass('bg-white')
            $('#add-user .disabled-pass-user').addClass('bg_disable')
        }

        if(u_wpPassword_bool =="true"){
            $('#add-user #show-pass-uwp').unbind('click').bind('click',function(){
                var checkClass = $(this).find('.fa');
                if(checkClass.hasClass('fa-eye-slash')){
                    checkClass.removeClass('fa-eye-slash')
                    checkClass.addClass('fa-eye')

                    $(this).closest('.check-show-pass').find('#u_wpPassword').attr('type','text')
                }else{
                    checkClass.removeClass('fa-eye')
                    checkClass.addClass('fa-eye-slash')

                    $(this).closest('.check-show-pass').find('#u_wpPassword').attr('type','password')
                }
            })
        }else{
            $('#add-user .disabled-pass-wpuser').removeClass('bg-white')
            $('#add-user .disabled-pass-wpuser').addClass('bg_disable')
        }

    },

    add_edit_user:function(){
        var u_email = $('#add-user #u_email').val();
        if(u_email !=''){
            if(!common_f.prototype.validate_email(u_email)){
                $('#add-user #email-error').css({"display":""});
                $('#add-user #u_email').focus();
                return;
            }
        }

        var b_id = $('#add-user #b_id').val();
        if(b_id == ''){
            $('#add-user #b_id-error').css({"display":""});
            $('#add-user #b_id').focus();
            return;
        }

        var _link =link._user_add_edit;
        /*
        var u_id= $('#add-user #u_id').val();
        var u_fname= $('#add-user #u_fname').val();
        var u_fname= $('#add-user #u_fname').val();
        var u_lname = $('#add-user #u_lname').val();
        var u_extension = $('#add-user #u_extension').val();
        var u_token  = $('#add-user #u_token').val();
        var u_phone = $('#add-user #u_phone').val();

        var b_id = $('#add-user #b_id').val();
        var u_notes  = $('#add-user #u_notes').val();
        var u_uname  = $('#add-user #u_uname').val();
        var u_password = $('#add-user #u_password').val();
        //var u_dateAdded = $('#add-user #u_dateAdded')
        var u_active = $('#add-user #u_active').is(":checked")
        var u_wpUser = $('#add-user #u_wpUser').val();
        var u_wpPassword = $('#add-user #u_wpPassword').val();
        var u_did = $('#add-user #u_did').val();

        var _data ={auth:_auth,
            u_id_login:u_id_login,
            u_id:u_id,
            u_fname:u_fname,u_lname:u_lname, u_extension:u_extension,
            u_token:u_token,u_phone:u_phone,u_email:u_email,
            b_id:b_id,u_notes:u_notes,u_uname:u_uname,
            u_password:u_password,u_active:u_active,u_wpUser:u_wpUser,
            u_wpPassword:u_wpPassword,u_did:u_did
        } */

        var data_post = {}
        $('#add-user .a_e').each(function(){
            var value = $(this).val()
            var key = $(this).attr('id')
            if(key =="u_active"){
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
                    if(data_post['u_id'] ==""){
                        user.prototype.get_users(u_id_login,role,"#users-list","#users-list-pagination","#user-record");

                        $('#modal-success .modal-title').text("Save success")
                        $("#modal-success").modal("show")
                        //$("#add-user #u_id").val(data.u_id);
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

    user_edit:function(u_id){
        var _link =link._user_get_uid;
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:{auth:_auth,u_id:u_id},
            error : function (status,xhr,error) {
            },
            success: function (data){
                if(data.length>0){
                    $('#add-user #u_id').val(data[0].u_id);
                    $('#add-user #u_fname').val(data[0].u_fname);
                    $('#add-user #u_fname').val(data[0].u_fname);
                    $('#add-user #u_lname').val(data[0].u_lname);
                    $('#add-user #u_extension').val(data[0].u_extension);
                    $('#add-user #u_token').val(data[0].u_token);
                    $('#add-user #u_phone').val(data[0].u_phone);
                    $('#add-user #u_email').val(data[0].u_email);
                    $('#add-user #b_id').val(data[0].b_id);
                    $('#add-user #u_notes').val(data[0].u_notes);
                    $('#add-user #u_uname').val(data[0].u_uname);
                    $('#add-user #u_password').val(data[0].u_password);
                    if(data[0].u_active==1){
                        $('#add-user #u_active').attr("checked",true)
                    }else{
                        $('#add-user #u_active').attr("checked",false)
                    }

                    $('#add-user #u_wpUser').val(data[0].u_wpUser);
                    $('#add-user #u_wpPassword').val(data[0].u_wpPassword);
                    $('#add-user #u_did').val(data[0].u_did);
                }
            }

        })
    },

    reset_user_fields:function(){
        $('#add-user #u_id').val('');
        $('#add-user #u_fname').val('');
        $('#add-user #u_fname').val('');
        $('#add-user #u_lname').val('');
        $('#add-user #u_extension').val('');
        $('#add-user #u_token').val('');
        $('#add-user #u_phone').val('');
        $('#add-user #u_email').val('');
        $('#add-user #b_id').val('');
        $('#add-user #u_notes').val('');
        $('#add-user #u_uname').val('');
        $('#add-user #u_password').val('');
        $('#add-user #u_active').prop("checked",false)

        $('#add-user #u_wpUser').val('');
        $('#add-user #u_wpPassword').val('');
        $('#add-user #u_did').val('');
    }
 }
var add_usr = new add_user();
$(function(){
    add_usr.init();
});