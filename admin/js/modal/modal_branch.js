function modal_branch(){}
modal_branch.NAME         = "modal_branch";
modal_branch.VERSION      = "1.2";
modal_branch.DESCRIPTION  = "Class modal_branch";

modal_branch.prototype.constructor = modal_branch;
modal_branch.prototype = {
    init:function(){
        common_f.prototype.getUserByName_modal("#edit-branch-modal #branch-content #u_idContact","#edit-branch-modal .modal-body")

        //event
        $('#edit-branch-modal #branch-content #b_street').change(function(){
            branch.prototype.displayMap('#edit-branch-modal',map_branch_edit)
        })
        $('#edit-branch-modal #branch-content #b_state').change(function(){
            branch.prototype.displayMap('#edit-branch-modal',map_branch_edit)
        })
        $('#edit-branch-modal #branch-content #b_city').change(function(){
            branch.prototype.displayMap('#edit-branch-modal',map_branch_edit)
        })

        $('#edit-branch-modal #btn-update-branch').unbind('click').bind('click',function(){
            branch.prototype.add_edit_branch('#edit-branch-modal')
        })

        $('#edit-branch-modal #reset-branch').unbind('click').bind('click',function(){
            branch.prototype.branch_reset('#edit-branch-modal')
        })

        $('#edit-branch-modal #branch-content #b_email').keypress(function(){
            $('#branch-content #email-error').css({"display":"none"});
        });

        $('.container-company #b-list').on('click','.open-branch',function(){
            branch.prototype.branch_reset("#edit-branch-modal")
            var b_id = $(this).closest('td').find('.b_id').val();
             branch.prototype.get_branch_bid(b_id,"#edit-branch-modal #branch-content #c_id","#edit-branch-modal #branch-content #b_state",map_branch_edit,"#edit-branch-modal")
            $('#edit-branch-modal').modal('show')
        })

    },

 }
var md_branch = new modal_branch();
$(function(){
    md_branch.init();
});