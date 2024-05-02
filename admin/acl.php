<?php
session_start();
require_once 'init.php';
$_title = 'Welcome';
$_active_nav = 'ACL';
$_head = '	<!-- Optional: page related CSS-->

	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-brands.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-solid.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css1/web_phone.css">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />

';
$_description = 'ACL';
if(!isset($_SESSION['1wire']['web_phone'])) {
    $logout_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'].'/login.php';
    header("Location:".$logout_url);
}
if($_SESSION['1wire']['role'] !=ROLE_SUPER_ADMIN) header("Location: profile.php");
$is_add_edit ="Edit";
require_once APP_PATH.'/php/check_permission.php';
$btn_permission = $checkPermission($_SESSION['1wire']['acl']['permission'],$is_add_edit);
//print_r($_SESSION['1wire']['acl']['permission']);
if($btn_permission['ACL']['view']!=""){
    echo "<div style='color: red; font-size: 25px; text-align: center; margin-top: 50px; width: 100%'>NO PERMISSION</div>";
    echo "<div style='font-size: 18px; text-align: center; margin-top: 15px; width: 100%'><a href=\"javascript:history.go(-1)\">GO BACK</a></div>";
    die();
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
                    <?php include_once 'modal/modal_success.php'; ?>
                    <!-- BEGIN Page Content-->
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <ol class="breadcrumb page-breadcrumb">
                            <li class="breadcrumb-item"><a href="dashboard.php">Webphone</a></li>
                            
                            <li class="breadcrumb-item active" ><span id="add-edit-breadcrumb">ACL </span></li>
                            <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
                        </ol>
                        <div class="subheader row">
                            <h1 class="subheader-title col-8">
                                <i style="color: black" class='subheader-icon fas fa-calendar-check'></i>ACL
                            </h1>
                        </div>
                        
                        <div class="container" style="padding-right: 0;padding-left: 0;">
                            <div id="acl-view">
                                <!----------------------->
                                <div class="row m_b10">
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="role_id">Role</label>
                                            <select class="form-control view role_id">
                                                <option value=""></option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="g_name">Group Name </label>
                                            <input class="form-control" type="text" value="" id="g_name" placeholder="Enter Group Name">
                                        </div>
                                    </div>
                                    <div class="col-">
                                        <div class="form-group">
                                            <label  for="g_name">&nbsp; </label>
                                            <button class="btn btn-default form-control" id="btn-search"><i class="fa fa-search"></i>&nbsp;&nbsp;Search</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="row m_b10">
                                    <div class="col-8">
                                        <div class="form-group">
                                            <label  for="g_id">Groups </label>
                                            <select class="form-control view" id="g_id">

                                            </select>
                                        </div>

                                    </div>
                                </div>

                                <!--tab-->
                                <div class="panel-content m-t20">
                                    <ul class="nav nav-tabs" id="ul-acl" role="tablist">

                                    </ul>
                                    <div class="tab-content border border-top-0 p-3" id="body-acl">

                                    </div>
                                </div>
                                <!--endtab-->
                            </div>

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
            var is_addedit='<?php echo $_SESSION['1wire']['acl']['permission']['ACL']['edit'];?>';

        </script>
        <script src="<?= APP_URL; ?>/js/select2.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/common_f.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/group/acl.js" type="text/javascript"></script>

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"></script>
        <script src="<?= APP_URL; ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>

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
