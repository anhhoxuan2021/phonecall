function branch_add(){}
branch_add.NAME         = "branch_add";
branch_add.VERSION      = "1.2";
branch_add.DESCRIPTION  = "Class branch_add";

branch_add.prototype.constructor = branch_add;
branch_add.prototype = {
    init:function(){
        common_f.prototype.getUserByName(".container #branch-content #u_idContact")
        if(window.location.pathname.includes('edit_branch.php')){
            var b_id = getUrlParameter1('b_id');
            if(b_id==undefined){
                return;
            }else{
                branch.prototype.get_branch_bid(b_id,".container #branch-content #c_id",".container #branch-content #b_state",map,'.container')
                user.prototype.get_users_bid(b_id,"#users-list","#users-list-pagination","#user-record");
            }
        }else if(window.location.pathname.includes('branch.php')){
            common_f.prototype.get_companies_list(u_id_login,role,".container #branch-content #c_id","","");
            common_f.prototype.get_states(".container #branch-content #b_state","");
        }
        //event
        $('.container #branch-content #b_street').change(function(){
            branch.prototype.displayMap('.container',map)
        })
        $('.container #branch-content #b_state').change(function(){
            branch.prototype.displayMap('.container',map)
        })
        $('#branch-content #b_city').change(function(){
            branch.prototype.displayMap('.container',map)
        })

        $('.container #btn-add-branch').unbind('click').bind('click',function(){
            branch.prototype.add_edit_branch('.container')
        })

        $('.container #btn-update-branch').unbind('click').bind('click',function(){
            branch.prototype.add_edit_branch('.container')
        })

        $('.container #reset-branch').unbind('click').bind('click',function(){
            branch.prototype.branch_reset('.container')
        })

        $('.container #branch-content #b_email').keypress(function(){
            $('#branch-content #email-error').css({"display":"none"});
        });

    }

 }
var brch_add = new branch_add();
$(function(){
    brch_add.init();
});