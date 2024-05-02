var idleTimer;
var refresh_jwtInterval;
var offsetTimer;


var idleSeconds =  3* 60, resetTimeSeconds = 2 * 60;

function resetTimer() {
    if(window.location.pathname.includes('wp.php') || window.location.pathname.includes('login.php')){
        return ;
    }
   if (window.idleTimer)
      clearTimeout(window.idleTimer);
    //console.log("idle start");
   window.idleTimer = setTimeout(whenUserIdle, idleSeconds * 1000);
}
/** request refresh token for each [resetTimeSeconds] (15) minutes */
function resetIntervalRefresh() {
    if(window.location.pathname.includes('wp.php') || window.location.pathname.includes('login.php')){
        return ;
    }
   // clear if interval is exist
   if (localStorage.getItemValue('access_token') && localStorage.getItemValue('access_token') != '') {
      offsetTime = resetTimeSeconds * 1000 - (new Date().getTime() - parseDateTime(localStorage.getItemValue('refresh-time')).getTime());
      if (offsetTime < 0) offsetTime = 0;
      window.offsetTimer = setTimeout(function () {
         requestTokenRefresh();
         window.refresh_jwtInterval = setInterval(function () {
            requestTokenRefresh();
         }, resetTimeSeconds * 1000);
      }, offsetTime);
   } else {
     whenUserIdle();
   }
}

function requestTokenRefresh() {
    //console.log("refresh 1")
    var grant_type ="refresh_token";
    var refresh_token =localStorage.getItemValue('refresh_token')
    var client_id =localStorage.getItemValue('client_id')
    var client_secret =localStorage.getItemValue('client_secret')
    var data = {
        grant_type:grant_type,
        refresh_token:refresh_token,
        client_id:client_id,
        client_secret:client_secret
    }



   $.ajax({
       "async": true,
       "crossDomain": true,
      url: link._token_wp,
      type: 'post',
      data: data,
      dataType: 'json',
      success: function (res) {
          //console.log(res)
          if(res.refresh_token !=undefined && res.access_token !=undefined){
              localStorage.setItemValue('refresh_token', res.refresh_token);
              localStorage.setItemValue('access_token', res.access_token)

              $.ajax({
                  async:true,
                  url: link._setSession,
                  type: 'post',
                  data: { data: { access_token: res.access_token, refresh_token: res.refresh_token } }
              })

              updateToken_for_AI();

          }else {
              whenUserIdle();
          }
      }
   });
}

function clearTaskJWT() {
   if (window.idleTimer)
      clearTimeout(window.idleTimer);
   if (window.refresh_jwtInterval) {
      clearInterval(window.refresh_jwtInterval);
   }
   if (window.offsetTimer) {
      clearTimeout(window.offsetTimer);
   }
}

function whenUserIdle() {
    console.log("idle 1");
   clearTaskJWT();
    localStorage.setItemValue('refresh_token', '');
    localStorage.setItemValue('access_token', '');

    localStorage.setItemValue('client_secret', '');
    localStorage.setItemValue('client_id', '');
    localStorage.setItemValue('i_id', '');
    localStorage.setItemValue('oauth2', '');

    $.ajax({
        url: link._unsetSession,
        type: 'post',
        success: function (res) {
            //document.location.href =  'login.php'
            //window.location.replace('login.php');
        }
    });
}

if (localStorage.getItemValue('access_token') && localStorage.getItemValue('access_token') != '') {
   $(document.body).bind('mousemove wheel keydown click', function (e) {
      resetTimer();
   }); //space separated events list that we want to monitor
   if (!localStorage.getItemValue('refresh-time')) {
      localStorage.setItemValue('refresh-time', getDateTime(new Date()));
   }

   resetTimer(); // Start the timer when the page loads
   resetIntervalRefresh();
}

function updateToken_for_AI() {
    //console.log("refresh 1")
    var refresh_token =localStorage.getItemValue('refresh_token')
    var access_token =localStorage.getItemValue('access_token')
    var i_id =localStorage.getItemValue('i_id')
    var _data = {
        i_id:i_id,
        auth:_auth,
        ai_accessToken:access_token,
        ai_refreshToken:refresh_token
    }

    var link3 = link._assigned_Intg_update_token;
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
            console.log(res);

        }
    });

}


