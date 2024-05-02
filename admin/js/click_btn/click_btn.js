
function click_btn(){}
click_btn.NAME         = "click_btn";
click_btn.VERSION      = "1.2";
click_btn.DESCRIPTION  = "Class click_btn";

click_btn.prototype.constructor = click_btn;
click_btn.prototype = {
    init:function(){
        if(window.location.pathname.includes('edit_integration.php') ||
            window.location.pathname.includes('edit_user.php')){
            //console.log("test1");
            $('#assign-i-list').on('click','.ai_active',function(){
                var this_active = $(this).is(":checked");
                var click2dial_active = $(this).closest('tr').find('.click2dial').is(":checked");
                var ai_id = $(this).closest('tr').find('.ai_id').val();
                var u_id = $(this).closest('tr').find('.u_id').val();
                var i_id = $(this).closest('tr').find('.i_id').val();
                var i_shortname = $(this).closest('tr').find('.i_shortname').val();
                common_f.prototype.update_asg_intg(ai_id,i_id,u_id,this_active,click2dial_active)
                //click_btn.prototype.click_zoho(this_active,u_id,ai_id,i_id,i_shortname);
            })

            $('#assign-i-list').on('click','.click2dial',function(){
                var this_active = $(this).is(":checked");
                var ai_id = $(this).closest('tr').find('.ai_id').val();
                var ai_active = $(this).closest('tr').find('.ai_active').is(":checked");
                var u_id = $(this).closest('tr').find('.u_id').val();
                var i_id = $(this).closest('tr').find('.i_id').val();
                common_f.prototype.update_asg_intg(ai_id,i_id,u_id,ai_active,this_active)
                if(!this_active){
                    var i_shortname = $(this).closest('tr').find('.i_shortname').val();
                    click_btn.prototype.click_click2dial(this_active,u_id,ai_id,i_id,i_shortname);
                }

            })


        }else if(window.location.pathname.includes('integrations_list.php')){
            //console.log("test3");
            $('#i-list').on('click','.i_active',function(){
                var this_active = $(this).is(":checked");
                var c_id = $(this).closest('tr').find('.c_id').val();
                var i_id = $(this).closest('tr').find('.i_id').val();
                var i_shortname = $(this).closest('tr').find('td:eq(2)').text();
                var i_helpEmail = $(this).closest('tr').find('td:eq(7)').text();
                common_f.prototype.update_integration(this_active,i_id,i_helpEmail);
                if(!this_active){
                    //click_btn.prototype.click_iactive(this_active,c_id,i_id,i_shortname);
                    click_btn.prototype.click_zoho(this_active,c_id,i_id,i_shortname);
                }

            })
        }else if(window.location.pathname.includes('assigned_integration_list.php')){
            //console.log("test4");
            $('#assign-i-list').on('click','.ai_active',function(){
                var this_active = $(this).is(":checked");
                var ai_id = $(this).closest('tr').find('.ai_id').val();
                var u_id = $(this).closest('tr').find('.u_id').val();
                var i_id = $(this).closest('tr').find('.i_id').val();
                var i_shortname = $(this).closest('tr').find('.i_shortname').val();

                var click2dial_active = $(this).closest('tr').find('.click2dial').is(":checked");
                common_f.prototype.update_asg_intg(ai_id,i_id,u_id,this_active,click2dial_active)
                //click_btn.prototype.click_zoho(this_active,u_id,ai_id,i_id,i_shortname);

            })

            $('#assign-i-list').on('click','.click2dial',function(){
                var this_active = $(this).is(":checked");
                var ai_active = $(this).closest('tr').find('.ai_active').is(":checked");
                var u_id = $(this).closest('tr').find('.u_id').val();
                var ai_id = $(this).closest('tr').find('.ai_id').val();
                var i_id = $(this).closest('tr').find('.i_id').val();

                common_f.prototype.update_asg_intg(ai_id,i_id,u_id,ai_active,this_active)

                if(!this_active){
                    var i_shortname = $(this).closest('tr').find('.i_shortname').val();
                    click_btn.prototype.click_click2dial(this_active,u_id,ai_id,i_id,i_shortname);
                }

            })
        }else if( window.location.pathname.includes('assigned_integration.php')){
            $('#assign-i-list').on('click','.ai_active',function(){
                var this_active = $(this).is(":checked");
                var ai_id = $(this).closest('tr').find('.ai_id').val();
                var u_id = $(this).closest('tr').find('.u_id').val();
                var i_id = $(this).closest('tr').find('.i_id').val();
                var i_shortname = $(this).closest('tr').find('.i_shortname').val();

                var click2dial_active = $(this).closest('tr').find('.click2dial').is(":checked");
                common_f.prototype.update_asg_intg(ai_id,i_id,u_id,this_active,click2dial_active)
                //click_btn.prototype.click_zoho(this_active,u_id,ai_id,i_id,i_shortname);
            })

            $('#assign-i-list').on('click','.click2dial',function(){
                var this_active = $(this).is(":checked");
                var ai_active = $(this).closest('tr').find('.ai_active').is(":checked");
                var u_id = $(this).closest('tr').find('.u_id').val();
                var ai_id = $(this).closest('tr').find('.ai_id').val();
                var i_id = $(this).closest('tr').find('.i_id').val();

                common_f.prototype.update_asg_intg(ai_id,i_id,u_id,ai_active,this_active)
                if(!this_active){
                    var i_shortname = $(this).closest('tr').find('.i_shortname').val();
                    click_btn.prototype.click_click2dial(this_active,u_id,ai_id,i_id,i_shortname);
                }

            })

        }
    },

    click_click2dial:function(click2dial,u_id,ai_id,i_id,i_shortname){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url":link._click2dial ,
            "method": 'POST',
            dataType: 'json',
            data: { click2dial: click2dial,u_id:u_id,ai_id:ai_id,i_id:i_id,i_shortname:i_shortname},
            success: function (res) {
            }
        });
    },

    click_zoho_bk:function(ai_active,u_id,ai_id,i_id,i_shortname){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url":link._click_zoho ,
            "method": 'POST',
            dataType: 'json',
            data: { ai_active: ai_active,u_id:u_id,ai_id:ai_id,i_id:i_id,i_shortname:i_shortname},
            success: function (res) {
            }
        });
    },

    click_zoho:function(i_active,c_id,i_id,i_shortname){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url":link._click_zoho ,
            "method": 'POST',
            dataType: 'json',
            data: { i_active: i_active,c_id:c_id,i_id:i_id,i_shortname:i_shortname,u_id_login:u_id_login},
            success: function (res) {
            }
        });
    },

    setup_session:function(click2dial_setup,zoho_setup){
        $.ajax({
            "async": true,
            "crossDomain": true,
            "url":link._setup_session ,
            "method": 'POST',
            dataType: 'json',
            data: { click2dial_setup: click2dial_setup,zoho_setup:zoho_setup},
            success: function (res) {
            }
        });
    }
 }
var cl_btn = new click_btn();
$(function(){
    cl_btn.init();
});