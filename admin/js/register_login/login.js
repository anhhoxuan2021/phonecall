
function login(){}
login.NAME         = "login";
login.VERSION      = "1.2";
login.DESCRIPTION  = "Class login";

login.prototype.constructor = login;
login.prototype = {
    init: function(){
        $('.login-modal-show').unbind('click').bind('click',function(){
            $('#login-modal').modal('show')
        })

        $("#login-btn").unbind('click').bind('click',function(e){
            login.prototype.login(e);
        });
        //reset
        localStorage.setItemValue('refresh_token', '');
        localStorage.setItemValue('access_token', '');

        localStorage.setItemValue('client_secret', '');
        localStorage.setItemValue('client_id', '');
        localStorage.setItemValue('i_id', '');
        localStorage.setItemValue('oauth2', '');

    },
    login:function(event){
        //verify empty input
        // Fetch form to apply custom Bootstrap validation
        var form = $("#js-login")

        if (form[0].checkValidity() === false)
        {
            event.preventDefault()
            event.stopPropagation()
        }

        form.addClass('was-validated');
        var u_email = $("#js-login #u_email").val();
        var u_password = $("#js-login #u_password").val();

        //verify form empty
        if(u_email.length==0 || u_password.length==0){
            return
        }

        var i_shortname = $('#system').val();

        var _data ={u_email:u_email,u_password:u_password,auth:_auth,i_shortname:i_shortname}
        console.log(link)
        var link3 = link._login;
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
                if(res.ERROR !=''){
                    $('#err-message').text(res.ERROR);
                    $('#modal-error').modal('show');
                    return;
                }
                if(res.integration_ass.length <1){
                    var assg = {};
                    assg['ai_id'] ='';
                    assg['i_id'] ='';
                    assg['i_shortname'] ='';
                    assg['ai_active'] ='';
                    assg['click2dial'] ='';
                    assg['i_website'] ='';
                    assg['ai_apiURL'] ='';
                    res.integration_ass[0] =assg;
                }
                if(res.response.length>0){
                    login.prototype.saveSession(res.response[0],res.integration_ass[0],res.acl,res.role,i_shortname);
                }
            }
        });

    },

    saveSession: function (user,integration_ass,acl,role,i_shortname) {
        return $.ajax({
            url: link._saveSession,
            type: 'post',
            data: { user: user,acl:acl,role:role,integration_ass:integration_ass},
            success: function (res) {
                /*if(role =='super_admin' || role =='company_manager'){
                    _path = host2 + 'dashboard_admin.php'
                }else if(role =='branch_manager'){
                    _path = host2 + 'branch.php'
                }*/
                if(res==1){
                    if(i_shortname =='zoho'){
                        var _path = 'home.php?user=' + user.u_email
                        document.location.href = 'https://crm.zoho.com?i_website='+integration_ass.i_website;
                    }else if(i_shortname=='phone'){
                        var _path = 'phone/index.php?user=' + user.u_email
                        document.location.href = '/admin/public/profile.php';
                    }
                    //var _path = 'home.php'
                    //document.location.href = '/admin/public/profile.php';
                    var left_local = screen.width -100;
                    var top_local = screen.height -100;
                    //window.close();
                     myWindow = window.open(_path, "1Wire Phone", "toolbar=yes,scrollbars=yes,width=400,height=900, left=" + left_local + ", top=" + top_local);
                    
                }
            }
        });
    },

}

