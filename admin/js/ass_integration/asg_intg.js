
function asg_intg(){}
asg_intg.NAME         = "asg_intg";
asg_intg.VERSION      = "1.2";
asg_intg.DESCRIPTION  = "Class asg_intg";

asg_intg.prototype.constructor = asg_intg;
asg_intg.prototype = {
    init:function(){
        common_f.prototype.getUserByName_iid("#asg-intg-content #u_id","#asg-intg-content #i_id","#asg-intg-content #iid_first","#asg-intg-content #uid_iid_first")
        common_f.prototype.getIntegrationByName("#asg-intg-content #i_id","#asg-intg-content #u_id","#asg-intg-content #iid_first","#asg-intg-content #uid_iid_first")

        if(window.location.pathname.includes('edit_assigned_integration.php')){
            var ai_id = getUrlParameter1('ai_id');
            if(ai_id==undefined){
                return;
            }else{
                common_f.prototype.get_asg_intg_aiid(ai_id,'.container')
            }
        }

        $('#btn-asg-intg').unbind('click').bind('click',function(){
            common_f.prototype.add_edit_asg_intg('.container');
        })

        $('#reset-asg-intg').unbind('click').bind('click',function(){
            //if(("#asg-intg-content #ai_active_before").val()==1)
            if(window.location.pathname.includes('edit_assigned_integration.php')){
                ai_active_edit_before =false
                click2dial_edit_before =false
                if($("#asg-intg-content #click2dial_before").val()==1) click2dial_edit_before =true

                common_f.prototype.reset_asg_intg('.container',ai_active_edit_before,click2dial_edit_before);
            }else  if(window.location.pathname.includes('assigned_integration.php')){
                ai_active_add_before =false
                click2dial_add_before =false
                if($("#asg-intg-content #click2dial_before").val()==1) click2dial_add_before =true

                common_f.prototype.reset_asg_intg('.container',ai_active_add_before,click2dial_add_before);
            }
        })

        if(ai_password_bool =="true"){
            $('.container #asg-intg-content .show-pass-ai').unbind('click').bind('click',function(){
                var checkClass = $(this).find('.fa');
                if(checkClass.hasClass('fa-eye-slash')){
                    checkClass.removeClass('fa-eye-slash')
                    checkClass.addClass('fa-eye')

                    $(this).closest('.check-show-pass').find('#ai_password').attr('type','text')
                }else{
                    checkClass.removeClass('fa-eye')
                    checkClass.addClass('fa-eye-slash')

                    $(this).closest('.check-show-pass').find('#ai_password').attr('type','password')
                }
            })
        }else{
            $('.container #asg-intg-content .disabled-pass-ai').removeClass('bg-white')
            $('.container #asg-intg-content .disabled-pass-ai').addClass('bg_disable')
        }
    }
}
var a_intg = new asg_intg();
$(function(){
    a_intg.init();
});