
function select2_f(){}
select2_f.NAME         = "select2_f";
select2_f.VERSION      = "1.2";
select2_f.DESCRIPTION  = "Class select2_f";

select2_f.prototype.constructor = select2_f;
select2_f.prototype = {
     searchUser:function(elememt,text_holder,el_append){
        var link3 =link._users_search;

        $(elememt).select2({
            //dropdownParent: $(elememt),
            placeholder: text_holder,
            minimumInputLength: 1,
            language: {
                inputTooShort: function () {
                    return text_holder;
                },
            },
            ajax: {
                "async": true,
                "crossDomain": true,
                "url": link3,
                "type": "POST",
                dataType: 'json',
                delay: 300,
                data: function (params) {
                    var _data = {auth:_auth,u_name:params.term}
                    return _data;
                },
                processResults: function (data, params) {
                    if (data && data.response) {
                        data = data.response;
                    }

                    data1 = $.map(data, function (obj) {
                        return {
                            text: obj.user_name,
                            id: obj.u_id
                        };
                    });
                    //console.log(data);
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
                if (item.text) return item.text;
                else return item.id;
            }
        }).on('change', function () {
                var this_val = this.value;
                if (this.value && this.value.length > 0) {
                    var name = $(this).find(':selected').text();
                    var span_user = '<span class="urs-name delete b-round m-tr10" style="cursor: pointer">' +
                        '<input class="u_id" type="hidden" value="'+this.value+'">' +
                        '<span class="p-trbl10"><span class="u_name">'+name+'</span>&nbsp;&nbsp; <strong class="color-alert">X</strong></span>' +
                        '</span>';

                    var flag = true;
                    $(el_append + " .u_id").each(function(){
                        if($(this).val()==this_val){
                            flag = false;
                            return false;
                        }

                    })

                    if(flag) $(el_append).append(span_user);

                }
            });
    }


}
