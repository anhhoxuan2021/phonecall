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
$_description = 'Branch';
if(!isset($_SESSION['1wire']['web_phone'])) header("Location: login.php");
//if(count($_SESSION)==0) header("Location: login.php");
/*if($_SESSION['u_type'] =='Patient'){
    header("Location: dashboard.php");
}*/
$view ="view";
if($_SESSION['1wire']['u_type']=="user"){
    $view="";
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
                    <?php //include_once 'modal/modal_clinical.php'; ?>
                    <!-- BEGIN Page Content-->
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <ol class="breadcrumb page-breadcrumb">
                            <li class="breadcrumb-item"><a href="dashboard.php">Webphone</a></li>
                            
                            <li class="breadcrumb-item active" >Dashboard</li>
                            <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
                        </ol>
                        <div class="subheader row">
                            <h1 class="subheader-title col-8">
                                <i style="color: black" class='subheader-icon fas fa-user' aria-hidden="true"></i>Dashboard</span>
                            </h1>
                        </div>
                        
                        <div class="container" style="padding-right: 0;padding-left: 0;">
                            <div id="profile-content">
                                <input type="hidden" id="u_id" value="<?=$_SESSION['1wire']['u_id']?>">
                                <input type="hidden" id="b_id" value="<?=$_SESSION['1wire']['b_id']?>">
                                <!----------------------->
                                <div class="row m_b10">
                                    <div class="col-12">
                                        <button class="btn btn-outline-primary btn-sm" id="view">View</button>
                                        <button class="btn btn-outline-danger btn-sm" id="edit">Edit</button>
                                    </div>
                                </div>
                                <div class="row m_b10">
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="b_name">First Name</label>
                                            <input class="form-control view" readonly="true" type="text" id="u_fname" value="<?=$_SESSION['1wire']['u_fname']?>">
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="b_name">Last Name</label>
                                            <input class="form-control view" readonly="true" type="text" id="u_lname" value="<?=$_SESSION['1wire']['u_fname']?>">
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="b_name">User Name</label>
                                            <input class="form-control view" readonly="true" type="text" id="u_uname" value="<?=$_SESSION['1wire']['u_fname']?>">
                                        </div>
                                    </div>
                                </div>
                                <div class="row m_b10">
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="b_name">Phone</label>
                                            <input class="form-control view" readonly="true" type="text" id="u_phone" value="<?=$_SESSION['1wire']['u_phone']?>">
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="b_name">Extension</label>
                                            <input class="form-control view" readonly="true" type="text" id="u_extension" value="<?=$_SESSION['1wire']['u_extension']?>">
                                        </div>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-group">
                                            <label  for="b_name">Email</label>
                                            <input class="form-control view" readonly="true" type="text" id="u_email" value="<?=$_SESSION['1wire']['u_email']?>">
                                        </div>
                                    </div>
                                </div>
                                <div class="row m_b10">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label  for="b_name">Branch Name</label>
                                            <input class="form-control  <?=$view?>" readonly="true" type="text" id="b_id" value="<?=$_SESSION['1wire']['b_name']?>">
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label  for="b_name">User Wordpress Name</label>
                                            <input class="form-control  <?=$view?>" readonly="true" type="text" id="u_wpPassword" value="<?=$_SESSION['1wire']['u_wpPassword']?>">
                                        </div>
                                    </div>
                                </div>
                                <div class="row m_b10">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <label  for="b_name">User Type</label>
                                            <select class="form-control  <?=$view?>" disabled="true">
                                                <option value="user" <?= ($_SESSION['u_type']=='user')?'selected="selected"':''?>>User</option>
                                                <option value="branch_manager" <?= ($_SESSION['u_type']=='branch_manager')?'selected="selected"':''?>>Branch Manager</option>
                                                <option value="company_manager" <?= ($_SESSION['u_type']=='company_manager')?'selected="selected"':''?>>Company Manager</option>
                                                <option value="super_admin" <?= ($_SESSION['u_type']=='super_admin')?'selected="selected"':''?>>Super Admin</option>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="col-3">
                                        <div class="form-group">
                                            <label  for="b_name">Change Password</label>
                                            <button class="btn btn-danger form-control" id="u_password">Change Password</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row m_b10 col-4">
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="u_active">
                                        <label class="custom-control-label" for="u_active">Active</label>
                                    </div>
                                </div>
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


        <script type="text/javascript">
            var u_id_login='<?php echo $_SESSION['1wire']['u_id'];?>';
            var u_type_login='<?php echo $_SESSION['1wire']['u_type'];?>';

        </script>

        <script src="<?= APP_URL; ?>/js/user/user.js" type="text/javascript"></script

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
