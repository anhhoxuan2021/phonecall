function branch(){}
branch.NAME         = "branch";
branch.VERSION      = "1.2";
branch.DESCRIPTION  = "Class branch";

branch.prototype.constructor = branch;
branch.prototype = {
    displayMap:function(el,map_item){
        var geocoder = new google.maps.Geocoder();
        var b_street = $(el +' #branch-content #b_street').val();
        var b_city = $(el +' #branch-content #b_city').val();
        var b_state = $(el +' #branch-content #b_state').val();

        var address = b_street +', '+ b_city +', '+b_state+', US';

        geocoder.geocode( { 'address': address}, function(results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var lat = results[0].geometry.location.lat();
                var lng = results[0].geometry.location.lng();

                $(el +' #branch-content #lat').val(lat)
                $(el +' #branch-content #long').val(lng)
                //map
                map_item.setCenter({
                    lat: lat,
                    lng: lng
                });
                var infowindow = new google.maps.InfoWindow();
                var marker,

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(lat, lng),
                        map: map_item
                    });
                google.maps.event.addListener(marker, 'click', (function (marker) {
                    return function () {
                        infowindow.setContent(positions[i].content);
                        infowindow.open(map_item, marker);
                    }
                }) (marker));
                /////////////

            }
        });
    },

    get_branchBy_bid:function(b_id){
        var _data ={auth:_auth,b_id:b_id}
        var link3 = link._branch_bid;

        return $.ajax({
            "async": true,
            "crossDomain": true,
            "url": link3,
            "method": "POST",
            dataType: 'json',
            data:_data
        });
    },

    get_branch_bid:function(b_id,el_comp,el_state,item_map,el){
        $.when(common_f.prototype.companies_list(u_id_login,role,""),
               common_f.prototype.states(),
                branch.prototype.get_branchBy_bid(b_id)
            ).done(function(companie_info,state_info,branch_info){
                /*console.log(companie_info[0].response.results)
                console.log(state_info[0].response)
                console.log(branch_info[0].response)*/
                if(companie_info[0].response.results !=undefined){
                    var option ='<option value=""></option>';
                    companie_info[0].response.results.forEach(function(item){
                        option +='<option value="'+item.c_id+'">'+item.c_name+'</option> '
                    })

                    $(el_comp).html(option);
                }

                if(state_info[0].response !=undefined){
                    var option ='<option value=""></option>';
                    state_info[0].response.forEach(function(item){
                        option +='<option value="'+item.state+'">'+item.state+'</option> '
                    })

                    $(el_state).html(option);
                }

                if(branch_info[0].response.length>0){
                    var data =branch_info[0].response[0];
                    $(el +' #branch-content #b_id').val(data.b_id);
                    $(el +' #branch-content #b_name').val(data.b_name)
                    $(el +' #branch-content #c_id').val(data.c_id)
                    $(el +' #branch-content #b_street').val(data.b_street)
                    $(el +' #branch-content #b_city').val(data.b_city)
                    $(el +' #branch-content #b_state').val(data.b_state)
                    $(el +' #branch-content #b_zip').val(data.b_zip)
                    $(el +' #branch-content #b_phone').val(data.b_phone)
                    $(el +' #branch-content #b_extension').val(data.b_extension)
                    $(el +' #branch-content #b_email').val(data.b_email)
                    $(el +' #branch-content #b_suite').val(data.b_suite)

                    $(el +' #branch-content #u_idContact').html('<option value="'+data.u_id+'">'+data.u_fname +' '+data.u_lname+'</option>')
                    $(el +' #branch-content #u_idContact').val(data.u_id).trigger('change');

                    $(el +' #branch-content #b_notes').val(data.b_notes)
                    if(data.b_active ==1){
                        $(el +' #branch-content #b_active').prop("checked",true)
                    }else{
                        $(el +' #branch-content #b_active').prop("checked",false)
                    }
                    //map
                    var lat=0;
                    var lng=0;
                    if(data.b_mapInfo !=''){
                        var temp_b_mapInfo = data.b_mapInfo.split(',');
                        lat = parseFloat(temp_b_mapInfo[0]);
                        lng = parseFloat(temp_b_mapInfo[1]);

                        $(el +' #branch-content #lat').val(lat);
                        $(el +' #branch-content #long').val(lng);
                    }
                    //map
                    item_map.setCenter({
                        lat: lat,
                        lng: lng
                    });
                    var infowindow = new google.maps.InfoWindow();
                    var marker,

                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(lat, lng),
                            map: item_map
                        });
                    google.maps.event.addListener(marker, 'click', (function (marker) {
                        return function () {
                            infowindow.setContent(positions[i].content);
                            infowindow.open(item_map, marker);
                        }
                    }) (marker));
                    /////////////
                    }
        })
    },

    add_edit_branch:function(el){
        var b_email = $(el +' #branch-content #b_email').val();
        if(b_email !=''){
            if(!common_f.prototype.validate_email(b_email)){
                $(el +' #branch-content #email-error').css({"display":""});
                $(el +' #branch-content #b_email').focus();
                return;
            }
        }

        var c_id = $(el +' #branch-content #c_id').val();

        if(c_id=="" || c_id==undefined){
            $(el +' #branch-content #c_id-error').css({"display":""});
            $(el +' #branch-content #c_id').focus();
            return;
        }

        var _link =link._branch_add_edit;
       /* var b_id = $('#branch-content #b_id').val();
        var b_name = $('#branch-content #b_name').val();
        var c_id = $('#branch-content #c_id').val();
        var b_street = $('#branch-content #b_street').val();
        var b_city = $('#branch-content #b_city').val();
        var b_state = $('#branch-content #b_state').val();
        var b_zip = $('#branch-content #b_zip').val();
        var b_suite = $('#branch-content #b_suite').val();
        var b_phone = $('#branch-content #b_phone').val();
        var b_extension = $('#branch-content #b_extension').val();

        var u_idContact = $('#branch-content #u_idContact').val();

        var b_notes = $('#branch-content #b_notes').val();
        var b_active = $('#branch-content #b_active').is(":checked");

        var _data ={auth:_auth,u_id_login:u_id_login,
            b_id:b_id,
            b_name:b_name,
            c_id:c_id,
            b_street:b_street,
            b_city:b_city,
            b_state:b_state,
            b_zip:b_zip,
            b_suite:b_suite,
            b_phone:b_phone,
            b_extension:b_extension,
            b_mapInfo:b_mapInfo,
            u_idContact:u_idContact,
            b_email:b_email,
            b_notes:b_notes,
            b_active:b_active
        }*/

        var data_post = {}
        var lat  = $(el +' #branch-content #lat').val();
        var long  = $(el +' #branch-content #long').val();
        var b_mapInfo = lat +','+ long;
        data_post['b_mapInfo'] =b_mapInfo;

        $(el +' #branch-content .a_e').each(function(){
            var key = $(this).attr('id')

            if(key !="lat" && key !="long" && key !="b_active"){
                var value = $(this).val()
                data_post[key] =value;
            }

            if(key =="b_active"){
                var value = $(this).is(":checked")
                data_post[key] =value;
            }

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
                    if(data_post['b_id'] ==""){
                        branches.prototype.get_branches(u_id_login,role,"#b-list","#b-list-pagination","#b-record");
                        $("#modal-success").modal("show")
                        //$("#branch-content #b_id").val(data.b_id);
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                            //$(".user_title").text("Edit User")
                            //$("#add-user #btn-add-user").text("Update User");
                        },2000)
                    }else{
                        if(window.location.pathname.includes('edit_company.php')){
                            $("#edit-branch-modal").modal("hide")
                            var c_id = getUrlParameter1('c_id');
                            if(c_id!=undefined){
                                branches.prototype.get_branches_cid(c_id,"#b-list","#b-list-pagination","#b-record");
                            }
                        }
                        $('#modal-success .modal-title').text("Update success")
                        $("#modal-success").modal("show")
                        setTimeout(function(){
                            $("#modal-success").modal("hide")
                        },2000)
                    }
                }else{
                    $("#modal-error #err-message").text(data.ERROR)
                    $("#modal-error").modal("show")

                }
            }

        })
    },

   branch_reset:function(el){
       $(el +' #branch-content #b_id').val();
       $(el +' #branch-content #b_name').val();
       $(el +' #branch-content #c_id').val();
       $(el +' #branch-content #b_street').val();
       $(el +' #branch-content #b_city').val();
       $(el +' #branch-content #b_state').val();
       $(el +' #branch-content #b_zip').val();
       $(el +' #branch-content #b_suite').val();
       $(el +' #branch-content #b_phone').val();
       $(el +' #branch-content #b_extension').val();
       $(el +' #branch-content #lat').val();
       $(el +' #branch-content #long').val();
       $(el +' #branch-content #u_idContact').val();
       $(el +' #branch-content #b_email').val();
       $(el +' #branch-content #b_notes').val();
       $(el +' #branch-content #b_active').prop("checked",false);
   }

 }
