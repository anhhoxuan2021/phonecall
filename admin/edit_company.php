<?php
session_start();
require_once 'init.php';
$_title = 'Welcome';
$_active_nav = 'Company';
$_head = '	<!-- Optional: page related CSS-->

	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-brands.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-solid.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css1/web_phone.css">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />

';
$_description = 'Company';
//if(count($_SESSION)==0) header("Location: login.php");
if(!isset($_SESSION['1wire']['web_phone'])) {
    $logout_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'].'/login.php';
    header("Location:".$logout_url);
}
$acl_info = $_SESSION['1wire']['acl']['company'];
$is_add_edit ="Edit";
require_once APP_PATH.'/php/check_permission.php';
$acl_permission = $checkPermission($acl_info,$is_add_edit);
$btn_permission = $checkPermission($_SESSION['1wire']['acl']['permission'],$is_add_edit);

if($btn_permission['company']['view']!=""){
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
                    <?php include_once 'modal/modal_branch_edit.php'; ?>
                    <!-- BEGIN Page Content-->
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <ol class="breadcrumb page-breadcrumb">
                            <li class="breadcrumb-item"><a href="dashboard.php">Webphone</a></li>
                            
                            <li class="breadcrumb-item active" >Edit Company <span id="appt-name"></span></li>
                            <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
                        </ol>
                        <div class="subheader row">
                            <h1 class="subheader-title col-md-8 col-sm-12">
                                <i style="color: black" class='subheader-icon fas fa-calendar-check'></i>Edit Company<span id="b-name-text"></span>
                            </h1>
                            <div class="col-md-4 col-sm-12">
                                <!--
                                <div id="reset-Company" class="float-lg-right">&nbsp;&nbsp;&nbsp;<button class="btn btn-success"><strong>Reset</strong></button></div>
                                -->
                                <div class="float-lg-right colsm12"><a href="company.php"><button class="btn btn-success"><strong>Add Company</strong></button></a></div>
                            </div>
                        </div>
                        
                        <div class="container container-company" style="padding-right: 0;padding-left: 0;">
                            <?php require_once APP_PATH.'/php/body_company.php'; ?>
                            <?php
                            if($btn_permission['company']['is_add_edit']==""){ ?>
                                <div class="row m-t20">
                                    <div class="col-md-3 col-sm-12">
                                        <button class="btn btn-danger form-control" id="btn-company" >Update Company</button>
                                    </div>
                                </div>
                            <?php }
                            ?>
                            <!--company report-->
                            <!--
                            <div class="row m-t20 m_b20 b-b-c111-s">
                                <div class="col-md-12 col-sm-12">
                                </div>
                            </div> -->
                            <?php //require_once APP_PATH.'/php/list_companies.php'; ?>

                            <!--Branch report-->
                            <div class="row m-t20 m_b20 b-b-c111-s">
                                <div class="col-md-12 col-sm-12">
                                </div>
                            </div>
                            <?php require_once APP_PATH.'/php/list_branches.php'; ?>
                            <?php require_once APP_PATH.'/php/list_users.php'; ?>
                            <!--end container-->
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
        <!--
        <script src="<?= APP_URL; ?>/js/company/companies.js" type="text/javascript"></script>
        -->
        <script src="<?= APP_URL; ?>/js/company/company.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/branch/branches.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/common_f.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/branch/branch.js" type="text/javascript"></script>


        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"></script>
        <script src="<?= APP_URL; ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js"></script>

        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqqFUPT6qHW2hvTEfwLw6IaXs253qrlmU&callback=myMap"></script>

        <script>
            $(document).ready(function(){
                $('#c_phone').inputmask('999-999-9999');
            });

            var map_branch_edit;
            function myMap() {
                map_branch_edit = new google.maps.Map(document.getElementById('modal-edit-map'), {
                    zoom: 15,
                    panControl: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    overviewMapControl: true,
                    rotateControl: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
            }

        </script>
        <script src="<?= APP_URL; ?>/js/modal/modal_branch.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/user/user.js" type="text/javascript"></script>
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
