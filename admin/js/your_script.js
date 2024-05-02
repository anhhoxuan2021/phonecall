var host, host2;

String.prototype.includes = function (string) {
    return this.indexOf(string) >= 0;
}

String.prototype.upperCaseFirst = function () {
    if(!this.split('')[0]) return '';
    return this.split('')[0].toUpperCase() + this.substring(1);
}

Storage.prototype.setItemValue = function (key, value) {
    value = encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    });
    localStorage.setItem(btoa(key), btoa(value));
}


Storage.prototype.getItemValue = function (key) {
    if (localStorage.getItem(btoa(key))) {
        return atob(localStorage.getItem(btoa(key)));
    } else {
        return null;
    }
}

if (document.location.href.includes('localhost/')) {
    //host = 'http://localhost/1wire/admin/API_WEBPHONE/';
    //host = 'https://phone.at1ts.com/admin/API_WEBPHONE/';
    host = 'https://phone.1cxpro.com/admin/API_WEBPHONE/';
    host2 = 'http://localhost/1wire/admin/public/';
    host_wp = 'https://pbx.1wire.co/ns-api/';
    // debugState = true;
} else if (document.location.href.includes('phone.1cxpro.com')) {
    //host = 'https://phone.at1ts.com/admin/API_WEBPHONE/';
   // host2 = 'https://phone.at1ts.com/admin/public/';
    //host = 'http://phone.1cxpro.com/admin/API_WEBPHONE/';
    //host2 = 'http://phone.1cxpro.com/admin/public/';
    host = 'https://phone.1cxpro.com/admin/API_WEBPHONE/';
    host2 = 'https://phone.1cxpro.com/admin/public/';
    host_wp = 'https://pbx.1wire.co/ns-api/';
}

var link = {
    /**-----------session---------------------------- */
    _saveSession: host2 + 'php/request.setSession.php',
    _clearSession: host2 + 'php/clearSession.php',
    _unsetSession: host2 + 'php/unsetSession.php',
    _setup_session: host2 + 'php/setup_session.php',
    /**-----------Login---------------------------- */
    _login:host + '_login.php',
    /**-----------User---------------------------- */
    _users_search:host + '_users_search.php',
    _users:host + '_users.php',
    _user_add_edit:host + '_user_add_edit.php',
    _user_get_uid:host + '_user_get_uid.php',
    _users_iid:host + '_users_iid.php',
    _users_bid:host + '_users_bid.php',
    _users_cid:host + '_users_cid.php',
    /**-----------Company---------------------------- */
    _companies:host + '_companies.php',
    _company_short_bids:host + '_company_short_bids.php',
    _company_add_edit:host + '_company_add_edit.php',
    _company_cid:host + '_company_cid.php',
    _branch_bids:host + '_branch_bids.php',
    _branch_bid:host + '_branch_bid.php',
    _branch_uid:host + '_branch_uid.php',
    _branches:host + '_branches.php',
    _branch_add_edit:host + '_branch_add_edit.php',
    _branches_cid:host + '_branches_cid.php',

    /**-----------ACL---------------------------- */
    _roles:host + '_roles.php',
    _group_add_update:host + '_group_add_update.php',
    _groups:host + '_groups.php',
    _groupsDelete_gID:host + '_groupsDelete_gID.php',
    _groups_role:host + '_groups_role.php',
    _acl_update:host + '_acl_update.php',
    _group_gID:host + '_group_gID.php',
    /**-----------ACL---------------------------- */
    _integrations:host + '_integrations.php',
    _integrations_uid:host + '_integrations_uid.php',
    _assigned_integrations:host + '_assigned_integrations.php',
    _assigned_integrations_iid:host + '_assigned_integrations_iid.php',
    _integration_add_edit:host + '_integration_add_edit.php',
    _integration_iid:host + '_integration_iid.php',
    _integrationByName: host + '_integrationByName.php',
    _asg_intg_add_edit: host + '_asg_intg_add_edit.php',
    _asg_intg_aiid: host +'_asg_intg_aiid.php',
    _assigned_integrations_uid: host +'_assigned_integrations_uid.php',

    /**-----------State---------------------------- */
    _states:host + '_states.php',
    /**-----------Click btn---------------------------- */
    _click_assigned:host + '_click_assigned.php',
    _click_zoho:host + '_click_zoho.php',
    _click2dial:host + '_click2dial.php',
    /**-----------web phone---------------------------- */
    /**-----------oauth2 and Integration--------------- */
    //_token_wp:host_wp + 'oauth2/token/',
    _setSession: host2 + 'php/set_session.php',
    _integration_get_UP: host + '_integration_get_UP.php',
    _assigned_Intg_update_token: host + '_assigned_Intg_update_token.php',
};
//define
    var _auth = 'd2FycmFudHlfYnJhbmRvbl9wcm9qZWN0';
    localStorage.setItemValue('auth', _auth);

var role_super_admin ="super_admin";
var role_company_manager ="company_manager";
var role_branch_manager ="branch_manager";
var role_user ="user";
var getUrlParameter1 = function getUrlParameter1(sParam) {
    var sPageURL = document.location.href.substring(document.location.href.indexOf('?') + 1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            var tmp = sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            if (tmp == '0' || tmp == '' || tmp == 'undefined') return undefined;
            else return tmp;
        }
    }
}

var noBlank =function(str){
    var myArr = str.split(" ");
    var value='';
    for(i=0; i<myArr.length;i++){
        value +=myArr[i]
    }

    return value;
}

var selectBox=function(arr,str){
    var option = "";
    for (let x in arr) {
        if(x==str){
            option +='<option value="'+x+'" selected="selected">'+arr[x]+'</option>'
        }else{
            option +='<option value="'+x+'">'+arr[x]+'</option>'
        }
    }

    return option;
}

var find_name=function(arr,str){
    var option_name = "";

    for (let x in arr) {
        if(x==str){
            option_name = arr[x];
            break;
        }
    }

    return option_name;
}

var convert_date_hour =function(dateStr){
    var d = new Date(dateStr);
    var date_t = d.toLocaleString();
    var date_arr = date_t.split(',');
    var date1_arr = date_arr[0].split('/');
    date=date1_arr[2]+"-"+("0"+date1_arr[0]).slice(-2)+"-"+("0"+date1_arr[1]).slice(-2);

    hour_t = date_arr[1].split(':');
    var am_pm_t = hour_t[2].split(' ');
    hour_t[0]= hour_t[0].trim();
    var hour = ("0"+hour_t[0]).slice(-2)+':'+("0"+hour_t[1]).slice(-2)
    if(am_pm_t[1].trim()=='PM'){
        var h= parseInt(hour_t[0]) +12;
        hour = h+':'+("0"+hour_t[1]).slice(-2)
    }

    return [date,hour]
}

var get_str_date =function(obj,str){
    let createDate=[];
    for (let x in obj) {
        if(x==str){
            createDate =convert_date_hour(obj[x]);
            break;
        }
    }

    return createDate;
}

var substring150 =function (str) {
    if (!str) return '';
    let sub_temp = str.substring(0, 151);
    let n_blank = sub_temp.lastIndexOf(" ");
    let n_dot = sub_temp.lastIndexOf(".");
    let n_comma = sub_temp.lastIndexOf(",");
     let n =(n_blank > n_dot)?n_blank:n_dot;
       n = (n > n_comma)?n:n_comma;
    let sub_temp1 = sub_temp.substring(0, n);

    return sub_temp1
}

function parseDateTime(date) {
    var tmp = decodeURIComponent(date).split(' ').join(',').split('-').join(',').split(':').join(',').split(',');
    var date2 = new Date();
    date2.setFullYear(parseInt(tmp[0]));
    date2.setMonth(parseInt(tmp[1]) - 1);
    date2.setDate(parseInt(tmp[2]));
    date2.setHours(parseInt(tmp[3]));
    date2.setMinutes(parseInt(tmp[4]));
    date2.setSeconds(parseInt(tmp[5]));

    return date2;

}
