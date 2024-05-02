<?php
session_start();
require_once 'init.php';
$_title = 'Welcome';
$_active_nav = 'Dashboard';
$_head = '	<!-- Optional: page related CSS-->

	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-brands.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-solid.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css1/web_phone.css">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />

';
$_description = 'User';
if(!isset($_SESSION['1wire']['web_phone'])) {
    $logout_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'].'/login.php';
    header("Location:".$logout_url);
}

$acl_info = $_SESSION['1wire']['acl']['user'];
$is_add_edit ="Edit";
require_once APP_PATH.'/php/check_permission.php';
$acl_permission = $checkPermission($acl_info,$is_add_edit);
$btn_permission = $checkPermission($_SESSION['1wire']['acl']['permission'],$is_add_edit);

if($btn_permission['user']['view']!=""){
    echo "<div style='color: red; font-size: 25px; text-align: center; margin-top: 50px; width: 100%'>NO PERMISSION</div>";
    echo "<div style='font-size: 18px; text-align: center; margin-top: 15px; width: 100%'><a href=\"javascript:history.go(-1)\">GO BACK</a></div>";
    die();
}

$zoho_checked = "";
$ai_active_before =0;
if($_SESSION['1wire']["zoho_setup"]){
    $zoho_checked = "";
    $ai_active_before =0;
}
$click2dial_checked = "";
$click2dial_before =0;
if($_SESSION['1wire']["click2dial_setup"]){
    $click2dial_checked ='checked="checked"';
    $click2dial_before =1;
}
?>
<!DOCTYPE html>
<!-- 
Template Name:: SmartAdmin PHP 7 Responsive WebApp - Template built with Bootstrap 4 and PHP 7
Version: 4.5.3
Author: Jovanni Lo
Website: https://smartadmin.lodev09.com
Purchase: https://wrapbootstrap.com/theme/smartadmin-php-7-responsive-webapp-WB05M9585
License: You must have a valid license purchased only from wrapbootstrap.com (link above) in order to legally use this theme for your project.
-->

<html lang="en">
    <?php include_once APP_PATH.'/includes/head.php'; ?>
    <body class="mod-bg-1 mod-nav-link ">
        <?php include_once APP_PATH.'/includes/theme.php'; ?>
        <!-- BEGIN Page Wrapper -->
        <div class="page-wrapper">
            <div class="page-inner">
                <?php include_once APP_PATH.'/includes/nav.php'; ?>
                <div class="page-content-wrapper">
                    <?php include_once APP_PATH.'/includes/header.php'; ?>
                    <?php include_once 'modal/modal_assigned_integration_edit.php'; ?>
                    <?php include_once 'modal/modal_assigned_integration_add.php'; ?>

                    <?php include_once 'modal/modal_success.php'; ?>

                    <!-- BEGIN Page Content-->
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <ol class="breadcrumb page-breadcrumb">
                            <li class="breadcrumb-item"><a href="profile.php">Webphone</a></li>
                            
                            <li class="breadcrumb-item active user_title" >Edit User</li>
                            <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
                        </ol>
                        <div class="subheader row">
                            <h1 class="subheader-title col-md-8 col-sm-12">
                                <i style="color: black" class='subheader-icon fas fa-user ' aria-hidden="true"></i><span class="user_title">Edit User</span>
                            </h1>
                            <div class="col-md-4 col-sm-12">
                                <div class="float-lg-right"><a href="user.php"><button class="btn btn-success"><strong>Add User</strong></button></a></div>
                            </div>
                        </div>
                        
                        <div class="container" style="padding-right: 0;padding-left: 0;">
                            <?php require_once APP_PATH.'/php/body_user.php'; ?>
                            <?php
                            if($btn_permission['user']['is_add_edit']==""){ ?>
                                <div class="row m-t20">
                                    <div class="col-md-2 col-sm-12">
                                        <button class="btn btn-danger form-control" id="btn-add-user">Update User</button>
                                    </div>
                                </div>
                            <?php }
                            ?>

                            <!--user report--> <!--
                            <div class="row m-t20 m_b20 b-b-c111-s">
                                <div class="col-md-12 col-sm-12">
                                </div>
                            </div> -->
                            <?php //require_once APP_PATH.'/php/list_users.php'; ?>
                            <!--ass integration report-->
                            <div class="row m-t20 m_b20 b-b-c111-s">
                                <div class="col-md-12 col-sm-12">
                                </div>
                            </div>
                            <div class="row">
                                <div class="f-bold col-md-6 col-sm-12 under-line f-size16">Assigned Integration List</div>
                                <div class="col-md-6 col-sm-12">
                                    <div class="float-lg-right"><button class="btn btn-success" id="btn-open-new-assg"><strong>Add Assinged Integration</strong></button></div>
                                </div>
                            </div>

                            <?php require_once APP_PATH.'/php/list_assigned_integration.php'; ?>
                            <!--end panel-->
                        </div>

                    </main>
                    <!-- END Page Content -->
                    <?php include_once APP_PATH.'/includes/footer.php'; ?>
                </div>
            </div>
        </div>
        <!-- END Page Wrapper -->
        <?php include_once APP_PATH.'/includes/extra.php'; ?>

        <?php include_once APP_PATH.'/includes/js.php'; ?>
        <?php include_once APP_PATH.'/php/initial_parameters.php'; ?>
        <script type="text/javascript">
            var u_password_bool ='<?=$_SESSION['1wire']['acl']['user']['u_password']['edit'];?>';
            var u_wpPassword_bool ='<?=$_SESSION['1wire']['acl']['user']['u_wpPassword']['edit'];?>';
            var ai_password_bool_edit ='<?=$_SESSION['1wire']['acl']['assigned_integration']['ai_password']['edit'];?>';
            var ai_password_bool_add ='<?=$_SESSION['1wire']['acl']['assigned_integration']['ai_password']['add'];?>';

            var click2dial_setup ='<?=$_SESSION['1wire']["click2dial_setup"]?>';
            var zoho_setup ='<?=$_SESSION['1wire']["zoho_setup"]?>';


            var click2dial_before = '<?=$_SESSION['1wire']["click2dial_setup"]?>';
            var click2dial_add_before=false
            if(click2dial_before =='1'){
                click2dial_add_before =true
            }

            var ai_active_add_before =false

            var click2dial_edit_before=false
            if(click2dial_before =='1'){
                click2dial_edit_before =true
            }

            var ai_active_edit_before =false


        </script>
        <script src="<?= APP_URL; ?>/js/user/add_user.js" type="text/javascript"></script>
        <!--
        <script src="<?= APP_URL; ?>/js/user/user.js" type="text/javascript"></script>
        -->
        <script src="<?= APP_URL; ?>/js/common_f.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/ass_integration/ass_integrations.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/modal/modal_asg_intg.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/click_btn/click_btn.js" type="text/javascript"></script>

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"></script>
        <script src="<?= APP_URL; ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js"></script>

        <script>
            $(document).ready(function(){
                $('#u_phone').inputmask('999.999.9999');
            });
        </script>
        <!--
        <script type="text/javascript">
            var comm_f = new common_f();
            $(function(){
                comm_f.init();
            })
        </script>
    -->

    </body>
</html>
