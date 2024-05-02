
function phone(){}
phone.NAME         = "phone";
phone.VERSION      = "1.2";
phone.DESCRIPTION  = "Class phone";

phone.prototype.constructor = phone;
phone.prototype = {
    init:function(){
        //console.log("test");
        phone.prototype.get_ui_config();
    },

    get_ui_config: function(){
        var link1 =host_wp;
        //var swagger_token = localStorage.getItemValue('swagger_token');
        var data ={
            format:"json",
            action:"read",
            object:"uiconfig",
            domain:"1Wire",
            config_name:"WS_SERVERS",
            user:"9071"
        }

        $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link1,
            "method": "post",
            data:data,
            dataType: 'json',
            //contentType: 'application/json',
            "headers": {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer fd07d4d67744efed3bc39a572a1e5755"
            },

            error : function (status,xhr,error) {
            },
            success: function (res) {
                //console.log(res);

            }
        });
        //////////////
    }


}

var phn = new phone();
$(function(){
    phn.init();
});