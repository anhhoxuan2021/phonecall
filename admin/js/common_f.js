
function common_f(){}
common_f.NAME         = "common_f";
common_f.VERSION      = "1.2";
common_f.DESCRIPTION  = "Class common_f";

common_f.prototype.constructor = common_f;
common_f.prototype = {
    roles:function(el){
        var _data ={auth:_auth}

        var link3 = link._roles;
        //console.log(link3)
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
            success: function (res) {
                //console.log(res);
                var option='';
                if(res.response.length>0){
                    res.response.forEach(function(item){
                        option +='<option value="'+item.r_value+'">'+item.r_name+'</option> ';
                    })
                }

                $(el).append(option)
            }
        });
    },

    get_branches:function(u_id,u_type,el,text_search,b_id){
        var _link =link._branches;
        var _data ={auth:_auth,u_id:u_id,u_type:u_type, limit:"",offset:0,text_search:text_search}

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
                if(data.response.results !=undefined){
                    var option ='<option value=""></option>';
                    data.response.results.forEach(function(item){
                        option +='<option value="'+item.b_id+'">'+item.b_name+' - '+item.c_name+'</option> '
                    })

                    $(el).html(option);
                    if(b_id !='' && b_id !=undefined){
                        //console.log("b_id="+b_id)
                        $(el).val(b_id)
                    }
                }
            }

        })
    },

    get_companies_list:function(u_id,u_type,el,text_search,c_id){
        var _link =link._companies;
        var _data ={auth:_auth,u_id:u_id,u_type:u_type, limit:"",offset:0,text_search:text_search}

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
                if(data.response.results !=undefined){
                    var option ='<option value=""></option>';
                    data.response.results.forEach(function(item){
                        option +='<option value="'+item.c_id+'">'+item.c_name+'</option> '
                    })

                    $(el).html(option);
                    if(c_id !='' && c_id !=undefined){
                        //console.log("b_id="+b_id)
                        $(el).val(c_id)
                    }
                }
            }

        })
    },

    companies_list:function(u_id,u_type,text_search){
        var _link =link._companies;
        var _data ={auth:_auth,u_id:u_id,u_type:u_type, limit:"",offset:0,text_search:text_search}

        return $.ajax({
            "async": true,
            "crossDomain": true,
            "url": _link,
            "method": "POST",
            dataType: 'json',
            data:_data
        });
    },

    states:function(){
        var _link =link._states;
        var _data ={auth:_auth}
        return $.ajax({
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                data:_data
            })
    },

    get_states:function(el,state){
        var _link =link._states;
        var _data ={auth:_auth}
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
                if(data.response !=undefined){
                    var option ='<option value=""></option>';
                    data.response.forEach(function(item){
                        option +='<option value="'+item.state+'">'+item.state+'</option> '
                    })

                    $(el).html(option);
                    if(state !='' && state !=undefined){
                        //console.log("b_id="+b_id)
                        $(el).val(state)
                    }
                }
            }

        })
    },

    getUserByName:function(elememt){
           var _link =link._users_search;

        $(elememt).select2({
            placeholder: "Search User",
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return "Search User";
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                delay:300,
                data: function (params) {

                    var _data ={auth:_auth,u_name:params.term};
                    return _data;
                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }

                    data1 = $.map(data, function (obj) {
                        //console.log(obj)
                        return {
                            text: obj.user_name,
                            id: obj.u_id
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (item) {

                return '<div class="padding-5">' +
                    '<div class="col-12">' + item.text + '</div>' +
                    '</div>';
            },
            templateSelection: function (item, container) {
                //$('#lab-location option').attr('address', item.address);
                if (item.text) return item.text;
                else return item.id;
            }
        })
    },
    getUserByName_modal:function(element,modal_id){
        var _link =link._users_search;

        $(element).select2({
            dropdownParent: $(modal_id),
            placeholder: "Search User",
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return "Search User";
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                delay:300,
                data: function (params) {

                    var _data ={auth:_auth,u_name:params.term};
                    return _data;
                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }

                    data1 = $.map(data, function (obj) {
                        //console.log(obj)
                        return {
                            text: obj.user_name,
                            id: obj.u_id
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (item) {

                return '<div class="padding-5">' +
                    '<div class="col-12">' + item.text + '</div>' +
                    '</div>';
            },
            templateSelection: function (item, container) {
                //$('#lab-location option').attr('address', item.address);
                if (item.text) return item.text;
                else return item.id;
            }
        })
    },

    getUserByName_iid:function(elememt,e_iid,e_iid_first,e_uid_iid_first){
        var _link =link._users_iid;

        $(elememt).select2({
            placeholder: "Search User",
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return "Search User";
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                delay:300,
                data: function (params) {
                    var i_id = $(e_iid).val();
                    if(i_id ==null || i_id==undefined || i_id ==''){
                        $(e_iid_first).css({"display":""});
                        $(e_uid_iid_first).css({"display":""});
                    }else{
                        var _data ={auth:_auth,u_name:params.term,i_id:i_id};
                        $(e_iid_first).css({"display":"none"});
                        $(e_uid_iid_first).css({"display":"none"});
                        return _data;
                    }

                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }
                    data1 = $.map(data, function (obj) {
                        //console.log(obj)
                        return {
                            text: obj.user_name,
                            id: obj.u_id
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (item) {

                return '<div class="padding-5">' +
                    '<div class="col-12">' + item.text + '</div>' +
                    '</div>';
            },
            templateSelection: function (item, container) {
                //$('#lab-location option').attr('address', item.address);

                if (item.text){
                    return item.text;
                }
                else{
                    return item.id;
                }
            }
        })
    },
    getUserByName_modal_iid:function(element,modal_id,e_iid,e_iid_first,e_uid_iid_first){
        var _link =link._users_iid;

        $(element).select2({
            dropdownParent: $(modal_id),
            placeholder: "Search User",
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return "Search User";
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                delay:300,
                data: function (params) {
                    var i_id = $(e_iid).val();
                    if(i_id ==null || i_id==undefined || i_id ==''){
                        $(e_iid_first).css({"display":""});
                        $(e_uid_iid_first).css({"display":""});
                    }else{
                        $(e_iid_first).css({"display":"none"});
                        $(e_uid_iid_first).css({"display":"none"});
                        var _data ={auth:_auth,u_name:params.term,i_id:i_id};
                        return _data;
                    }

                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }

                    data1 = $.map(data, function (obj) {
                        //console.log(obj)
                        return {
                            text: obj.user_name,
                            id: obj.u_id
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (item) {

                return '<div class="padding-5">' +
                    '<div class="col-12">' + item.text + '</div>' +
                    '</div>';
            },
            templateSelection: function (item, container) {
                //$('#lab-location option').attr('address', item.address);
                if (item.text) return item.text;
                else return item.id;
            }
        })
    },

    getIntegrationByName_modal_iid:function(elememt,modal_id,e_uid,e_iid_first,e_uid_iid_first){
        var _link =link._integrationByName;

        $(elememt).select2({
            dropdownParent: $(modal_id),
            placeholder: "Search Integration",
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return "Search Integration";
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                delay:300,
                data: function (params) {

                    var _data ={auth:_auth,i_name:params.term};
                    return _data;
                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }

                    data1 = $.map(data, function (obj) {
                        //console.log(obj)
                        return {
                            text: obj.i_name,
                            id: obj.i_id,
                            i_shortname:obj.i_shortname
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (item) {

                return '<div class="padding-5">' +
                    '<div class="col-12">' + item.text + '</div>' +
                    '</div>';
            },
            templateSelection: function (item, container) {
                $(elememt +' option').attr('i_shortname', item.i_shortname);
                if (item.text) return item.text;
                else return item.id;
            }
        }).change(function(){
                $(e_uid).html('<option value=""></option>')
                $(e_uid).val("").trigger('change');

                $(e_iid_first).css({"display":"none"})
                $(e_uid_iid_first).css({"display":"none"})
            })
    },

    getIntegrationByName:function(elememt,e_uid,e_iid_first,e_uid_iid_first){
        var _link =link._integrationByName;

        $(elememt).select2({
            placeholder: "Search Integration",
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return "Search Integration";
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                delay:300,
                data: function (params) {

                    var _data ={auth:_auth,i_name:params.term};
                    return _data;
                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }

                    data1 = $.map(data, function (obj) {
                        //console.log(obj)
                        return {
                            text: obj.i_name,
                            id: obj.i_id,
                            i_shortname:obj.i_shortname
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (item) {

                return '<div class="padding-5">' +
                    '<div class="col-12">' + item.text + '</div>' +
                    '</div>';
            },
            templateSelection: function (item, container) {
                $(elememt +' option').attr('i_shortname', item.i_shortname);
                if (item.text) return item.text;
                else return item.id;
            }
        }).change(function(){
                $(e_uid).html('<option value=""></option>')
                $(e_uid).val("").trigger('change');
                $(e_iid_first).css({"display":"none"})
                $(e_uid_iid_first).css({"display":"none"})
            })
    },

    getIntegrationByName_modal:function(elememt,modal_id){
        var _link =link._integrationByName;

        $(elememt).select2({
            dropdownParent: $(modal_id),
            placeholder: "Search Integration",
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return "Search Integration";
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": _link,
                "method": "POST",
                dataType: 'json',
                delay:300,
                data: function (params) {

                    var _data ={auth:_auth,i_name:params.term};
                    return _data;
                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }

                    data1 = $.map(data, function (obj) {
                        //console.log(obj)
                        return {
                            text: obj.i_name,
                            id: obj.i_id,
                            i_shortname:obj.i_shortname
                        };
                    });
                    //console.log(data1);
                    return { results: data1 }

                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; },
            templateResult: function (item) {

                return '<div class="padding-5">' +
                    '<div class="col-12">' + item.text + '</div>' +
                    '</div>';
            },
            templateSelection: function (item, container) {
                $(elememt +' option').attr('i_shortname', item.i_shortname);
                if (item.text) return item.text;
                else return item.id;
            }
        })
    },


    validate_email:function(email){
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(email);
    },

    add_edit_asg_intg:function(modal_id){
        var i_id = $(modal_id +' #asg-intg-content #i_id').val();
        if(i_id=="" || i_id==null || i_id==undefined ){
            $(modal_id +' #asg-intg-content #i_id-error').css({"display":""});
            $(modal_id +' #asg-intg-content #i_id').focus();
            return;
        }

        var u_id = $(modal_id +' #asg-intg-content #u_id').val();
        //console.log(modal_id +' #asg-intg-content #u_id');
        if(u_id=="" || u_id==null || u_id==undefined){
            $(modal_id +' #asg-intg-content #u_id-error').css({"display":""});
            $(modal_id +' #asg-intg-content #u_id').focus();
            return;
        }

        var _link =link._asg_intg_add_edit;

        var data_post = {}
        var i_shortname ='';
        $(modal_id +' #asg-intg-content .a_e').each(function(){
            var value = $(this).val()
            var key = $(this).attr('id')
            if(key =="ai_active"){
                var value = $(this).is(":checked")
            }

            if(key =="click2dial"){
                var value = $(this).is(":checked")
            }

            if(key =="i_id"){
                i_shortname = $(this).find("option:selected").attr('i_shortname')
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
                    if(window.location.pathname.includes('profile.php') || window.location.pathname.includes('edit_user.php')){
                        if(window.location.pathname.includes('profile.php')){
                            var u_id =u_id_login;
                        }else{
                            var u_id = getUrlParameter1('u_id');
                            if(u_id==undefined){
                                return;
                            }
                        }

                        ass_integrations.prototype.get_assigned_integrations_by_uid(u_id,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
                    }else if(window.location.pathname.includes('edit_integration.php')){
                        ass_integrations.prototype.get_assigned_integrations_by_iid(data_post['i_id'],"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
                    }else if(window.location.pathname.includes('assigned_integration.php')){
                        if(!window.location.pathname.includes('edit_assigned_integration.php')){
                            ass_integrations.prototype.get_assigned_integrations(u_id_login,role,"#assign-i-list","#assgn-i-list-pagination","#assign-i-record");
                        }

                    }
                    //

                    if(data_post['ai_id'] ==""){
                        if(click2dial_add_before !=data_post['click2dial']){
                            //click2dial_add_before = data_post['click2dial'];
                            if(!data_post['click2dial']){
                                click_btn.prototype.click_click2dial(data_post['click2dial'],data_post['u_id'],data.ai_id,data_post['i_id'],i_shortname);
                            }
                        }

                        if(ai_active_add_before !=data_post['ai_active']){
                            //ai_active_add_before = data_post['ai_active']
                            //click_btn.prototype.click_zoho(data_post['ai_active'],data_post['u_id'],data.ai_id,data_post['i_id'],i_shortname);
                        }

                        $('#modal-success .modal-title').text("Save success")
                        $("#modal-success").modal("show")
                        //$("#company-content #c_id").val(data.c_id);
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                            $(modal_id).modal("hide")
                            //$(".user_title").text("Edit User")
                            //$("#add-user #btn-add-user").text("Update User");
                        },2000)
                    }else{
                        if(click2dial_edit_before !=data_post['click2dial']){
                            click2dial_edit_before = data_post['click2dial']
                            if(!data_post['click2dial']){
                                click_btn.prototype.click_click2dial(data_post['click2dial'],data_post['u_id'],data_post['ai_id'],data_post['i_id'],i_shortname);
                            }
                        }

                        if(ai_active_edit_before !=data_post['ai_active']){
                            //ai_active_edit_before = data_post['ai_active']
                            //click_btn.prototype.click_zoho(data_post['ai_active'],data_post['u_id'],data_post['ai_id'],data_post['i_id'],i_shortname);
                        }
                        $('#modal-success .modal-title').text("Update success")
                        $("#modal-success").modal("show")
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                            $(modal_id).modal("hide")
                        },2000)
                    }
                }else{
                    $("#modal-error #err-message").text(data.ERROR)
                    $("#modal-error").modal("show")

                }
            }

        })
    },

    update_asg_intg:function(ai_id,i_id,u_id,ai_active,click2dial){

        var _link =link._asg_intg_add_edit;
        var data_post = {}
        data_post['ai_active']=ai_active
        data_post['click2dial']=click2dial
        data_post['i_id']=i_id
        data_post['u_id']=u_id
        data_post['ai_id']=ai_id
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
            }

        })
    },

    get_asg_intg_aiid:function(ai_id,modal_id){
        var _data ={auth:_auth,ai_id:ai_id}

        var link3 = link._asg_intg_aiid;
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
                    $(modal_id +' #asg-intg-content #ai_id').val(data.ai_id);

                    $(modal_id +' #asg-intg-content #i_id').html('<option value="'+data.i_id+'" i_shortname="'+data.i_shortname+'">'+data.i_name +'</option>')
                    $(modal_id +' #asg-intg-content #i_id').val(data.i_id).trigger('change');

                    $(modal_id +' #asg-intg-content #u_id').html('<option value="'+data.u_id+'">'+data.u_fname+' '+data.u_lname+'</option>')
                    $(modal_id +' #asg-intg-content #u_id').val(data.u_id).trigger('change');

                    $(modal_id +' #asg-intg-content #ai_username').val(data.ai_username);
                    $(modal_id +' #asg-intg-content #ai_password').val(data.ai_password);
                    $(modal_id +' #asg-intg-content #ai_accessToken').val(data.ai_accessToken);
                    $(modal_id +' #asg-intg-content #ai_refreshToken').val(data.ai_refreshToken);

                    $(modal_id +' #asg-intg-content #ai_apiURL').val(data.ai_apiURL);
                    $(modal_id +' #asg-intg-content #ai_notes').val(data.ai_notes);
                    $(modal_id +' #asg-intg-content #ai_system_uID').val(data.ai_system_uID);
                    $(modal_id +' #asg-intg-content #ai_tokenURL').val(data.ai_tokenURL);

                    if(data.ai_dateAssigned !='' && data.ai_dateAssigned !=undefined){
                        var d = new Date(data.ai_dateAssigned);
                        var date_t = d.toLocaleString();
                        var date_arr = date_t.split(',');
                        var date1_arr = date_arr[0].split('/');
                        var ai_date=date1_arr[2]+"-"+("0"+date1_arr[0]).slice(-2)+"-"+("0"+date1_arr[1]).slice(-2);

                        $(modal_id +' #asg-intg-content #ai_dateAssigned').val(ai_date);
                    }

                    if(data.ai_tempTokenUpdate !='' && data.ai_tempTokenUpdate !=undefined){
                        var d = new Date(data.ai_tempTokenUpdate);
                        var date_t = d.toLocaleString();
                        var date_arr = date_t.split(',');
                        var date1_arr = date_arr[0].split('/');
                        var ai_date=date1_arr[2]+"-"+("0"+date1_arr[0]).slice(-2)+"-"+("0"+date1_arr[1]).slice(-2);

                        $(modal_id +' #asg-intg-content #ai_tempTokenUpdate').val(ai_date);
                    }

                    ai_active_edit_before =false
                    if(data.ai_active ==1){
                        $(modal_id +' #asg-intg-content #ai_active').prop("checked",true)
                        ai_active_edit_before =true
                    }else{
                        $(modal_id +' #asg-intg-content #ai_active').prop("checked",false)
                    }
                    click2dial_edit_before=false
                    if(data.click2dial ==1){
                        $(modal_id +' #asg-intg-content #click2dial').prop("checked",true)
                        click2dial_edit_before=true
                    }else{
                        $(modal_id +' #asg-intg-content #click2dial').prop("checked",false)
                    }

                }
            }
        });
    },

    update_integration:function(i_active,i_id,i_helpEmail){
        var data_post = {}
        data_post['i_id'] =i_id;
        data_post['i_active'] =i_active;
        data_post['i_helpEmail'] =i_helpEmail;
        //console.log(data_post);
        var _data ={
            auth:_auth,
            u_id_login:u_id_login,
            data_post:data_post
        }
        var _link =link._integration_add_edit;
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

            }

        })
    },

    reset_asg_intg:function(id,ai_active_before,click2dial_before){
        $(id +' #asg-intg-content #ai_id').val("");
        $(id +' #asg-intg-content #i_id').val("");
        $(id +' #asg-intg-content #u_id').val("");

        $(id +' #asg-intg-content #i_id').html('<option value=""></option>')
        $(id +' #asg-intg-content #i_id').val("").trigger('change');

        $(id +' #asg-intg-content #u_id').html('<option value=""></option>')
        $(id +' #asg-intg-content #u_id').val("").trigger('change');

        $(id +' #asg-intg-content #ai_username').val("");
        $(id +' #asg-intg-content #ai_password').val("");
        $(id +' #asg-intg-content #ai_accessToken').val("");
        $(id +' #asg-intg-content #ai_refreshToken').val("");
        $(id +' #asg-intg-content #ai_tempTokenUpdate').val("");
        $(id +' #asg-intg-content #ai_notes').val("");
        $(id +' #asg-intg-content #ai_dateAssigned').val("");
        $(id +' #asg-intg-content #ai_system_uID').val("");
        $(id +' #asg-intg-content #ai_tokenURL').val("");
        $(id +' #asg-intg-content #ai_active').prop("checked",false)
        $(id +' #asg-intg-content #click2dial').prop("checked",false)
        if(ai_active_before) $(id +' #asg-intg-content #ai_active').prop("checked",true)
        if(click2dial_before) $(id +' #asg-intg-content #click2dial').prop("checked",true)
        $(id +' #asg-intg-content #i_id-error').css({"display":"none"})
        $(id +' #asg-intg-content #u_id-error').css({"display":"none"});

    }
}
