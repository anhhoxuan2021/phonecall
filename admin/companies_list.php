<?php
session_start();
require_once 'init.php';
$_title = 'Welcome';
$_active_nav = 'dashboard_admin';
$_head = '	<!-- Optional: page related CSS-->

	<link id="appbundle" rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/app.bundle.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-brands.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-solid.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css1/web_phone.css">

';
$_description = 'List Companies';
/*$domain_temp = explode('/',$_SERVER['REQUEST_URI']);
$domain_temp =$domain_temp[1];
print_r($_SERVER['HTTP_HOST']."---------".$domain_temp.'------');
*/
//print_r($_SESSION['1wire']['u_type']);
//die();
if(!isset($_SESSION['1wire']['web_phone'])) {
    $logout_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'].'/login.php';
    header("Location:".$logout_url);
}
if($_SESSION['1wire']['role'] ==ROLE_USER){
    //header("Location: dashboard.php");
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
                    <!-- BEGIN Page Content -->
                    <?php //include_once 'modal/modal_success.php'; ?>
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <ol class="breadcrumb page-breadcrumb">
                            <li class="breadcrumb-item"><a href="home.php">Web Phone</a></li>

                            <li class="breadcrumb-item active">List Companies</li>
                            <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
                        </ol>
                        <div class="subheader row">
                            <h1 class="subheader-title col-8">
                                <i style="color: black" class='subheader-icon fas fa-calendar-check'></i> List Companies
                            </h1>
                        </div>

                        <div class="container" style="padding-right: 0;padding-left: 0;">
                            <!--Company-->
                            <?php
                            require_once(APP_PATH.'/php/list_companies.php');

                            ?>
                            <div id="list_branches_hide" style="display: none">
                             <?php require_once APP_PATH.'/php/list_branches.php'; ?>
                            </div>
                            <!--end-->
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

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"></script>
        <script src="<?= APP_URL; ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/company/companies.js" type="text/javascript"></script>
    </body>
</html>
