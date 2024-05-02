
function modal_asg_intg(){}
modal_asg_intg.NAME         = "asg_intg";
modal_asg_intg.VERSION      = "1.2";
modal_asg_intg.DESCRIPTION  = "Class modal_asg_intg";

modal_asg_intg.prototype.constructor = modal_asg_intg;
modal_asg_intg.prototype = {
    init:function(){
        //event
        $('#assign-i-list').on('click','.open-assng-integeration',function(){
            ai_active_edit_before =false
            click2dial_edit_before =false
            if($("#edit-assg-intg-modal #asg-intg-content #click2dial_before").val()==1) click2dial_edit_before =true

            common_f.prototype.reset_asg_intg('#edit-assg-intg-modal',ai_active_edit_before,click2dial_edit_before);
            common_f.prototype.getUserByName_modal_iid("#edit-assg-intg-modal #asg-intg-content #u_id","#edit-assg-intg-modal .modal-body","#edit-assg-intg-modal #asg-intg-content #i_id","#edit-assg-intg-modal #asg-intg-content #iid_first","#edit-assg-intg-modal #asg-intg-content #uid_iid_first")
            common_f.prototype.getIntegrationByName_modal_iid("#edit-assg-intg-modal #asg-intg-content #i_id","#edit-assg-intg-modal .modal-body","#edit-assg-intg-modal #asg-intg-content #u_id","#edit-assg-intg-modal #asg-intg-content #iid_first","#edit-assg-intg-modal #asg-intg-content #uid_iid_first")

            $('#add-assg-intg-modal').modal('hide')

            var ai_id = $(this).closest('td').find('.ai_id').val()
            common_f.prototype.get_asg_intg_aiid(ai_id,'#edit-assg-intg-modal')
            $('#edit-assg-intg-modal').modal('show')
        })

        $('#btn-open-new-assg').unbind('click').bind('click',function(){
            common_f.prototype.getUserByName_modal_iid('#add-assg-intg-modal #asg-intg-content #u_id','#add-assg-intg-modal .modal-body','#add-assg-intg-modal #asg-intg-content #i_id',"#add-assg-intg-modal #asg-intg-content #iid_first","#add-assg-intg-modal #asg-intg-content #uid_iid_first")
            common_f.prototype.getIntegrationByName_modal_iid('#add-assg-intg-modal #asg-intg-content #i_id','#add-assg-intg-modal .modal-body','#add-assg-intg-modal #asg-intg-content #u_id',"#add-assg-intg-modal #asg-intg-content #iid_first","#add-assg-intg-modal #asg-intg-content #uid_iid_first")

            $('#edit-assg-intg-modal').modal('hide')
            ai_active_add_before =false
            click2dial_add_before =false
            common_f.prototype.reset_asg_intg('#add-assg-intg-modal',ai_active_add_before,click2dial_add_before);

            $('#add-assg-intg-modal').modal('show')
        })

        $('#edit-assg-intg-modal #edit-btn-asg-intg').unbind('click').bind('click',function(){
            common_f.prototype.add_edit_asg_intg('#edit-assg-intg-modal');
        })

        $('#add-assg-intg-modal #add-btn-asg-intg').unbind('click').bind('click',function(){
            common_f.prototype.add_edit_asg_intg('#add-assg-intg-modal');
        })

        if(ai_password_bool_edit =="true"){
            $('#edit-assg-intg-modal #asg-intg-content .show-pass-ai').unbind('click').bind('click',function(){
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
            $('#edit-assg-intg-modal #asg-intg-content .disabled-pass-ai').removeClass('bg-white')
            $('#edit-assg-intg-modal #asg-intg-content .disabled-pass-ai').addClass('bg_disable')
        }

        if(ai_password_bool_add =="true"){
            $('#add-assg-intg-modal #asg-intg-content .show-pass-ai').unbind('click').bind('click',function(){
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
            $('#add-assg-intg-modal #asg-intg-content .disabled-pass-ai').removeClass('bg-white')
            $('#add-assg-intg-modal #asg-intg-content .disabled-pass-ai').addClass('bg_disable')
        }
    }

}
var m_a_intg = new modal_asg_intg();
$(function(){
    m_a_intg.init();
});