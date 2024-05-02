<?php
session_start();
require_once 'init.php';
$_title = 'Welcome';
$_active_nav = 'Branch';
$_head = '	<!-- Optional: page related CSS-->

	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-brands.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css/fa-solid.css">
	<link rel="stylesheet" media="screen, print" href="'.ASSETS_URL.'/css1/web_phone.css">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/css/select2.min.css" rel="stylesheet" />

';
$_description = 'Branch';
if(!isset($_SESSION['1wire']['web_phone'])) {
    $logout_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'].'/login.php';
    header("Location:".$logout_url);
}
$acl_info = $_SESSION['1wire']['acl']['branch'];
$is_add_edit ="Edit";
require_once APP_PATH.'/php/check_permission.php';
$acl_branch_permission = $checkPermission($acl_info,$is_add_edit);
$btn_permission = $checkPermission($_SESSION['1wire']['acl']['permission'],$is_add_edit);

if($btn_permission['branch']['view']!=""){
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
                            
                            <li class="breadcrumb-item active" >Edit Branch <span id="appt-name"></span></li>
                            <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
                        </ol>
                        <div class="subheader row">
                            <h1 class="subheader-title col-md-8 col-sm-12">
                                <i style="color: black" class='subheader-icon fas fa-calendar-check'></i>Edit Branch><span id="b-name-text"></span>
                            </h1>
                            <div class="col-md-4 col-sm-12">
                                <div class="float-lg-right"><a href="branches_list.php"><button class="btn btn-success"><strong>List Branches</strong></button></a></div>
                            </div>
                        </div>
                        
                        <div class="container" style="padding-right: 0;padding-left: 0;">
                            <?php require_once APP_PATH.'/php/body_branch.php'; ?>

                            <div class="row" id="map" style="width:100%;height:400px; margin-top: 20px">

                            </div>
                            <?php
                            if($btn_permission['branch']['is_add_edit']==""){ ?>
                                <div class="row m-t20">
                                    <div class="col-md-2 col-sm-12">
                                        <button class="btn btn-danger form-control" id="btn-update-branch" >Update Branch</button>
                                    </div>
                                </div>
                            <?php }
                            ?>
                            <!--Branch report-->
                            <!--<div class="row m-t20 m_b20 b-b-c111-s">
                                <div class="col-md-12 col-sm-12">
                                </div>
                            </div> -->
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

        <script src="<?= APP_URL; ?>/js/branch/branch.js" type="text/javascript"></script>

        <!--
        <script src="<?= APP_URL; ?>/js/branch/branches.js" type="text/javascript"></script>
        -->
        <script src="<?= APP_URL; ?>/js/common_f.js" type="text/javascript"></script>


        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"></script>
        <script src="<?= APP_URL; ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>

        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqqFUPT6qHW2hvTEfwLw6IaXs253qrlmU&callback=myMap"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.inputmask/3.3.4/jquery.inputmask.bundle.min.js"></script>

        <script>
            $(document).ready(function(){
                $('#b_phone').inputmask('999-999-9999');
            });
        </script>
        <script>
            var map;
            function myMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    panControl: true,
                    zoomControl: true,
                    mapTypeControl: true,
                    scaleControl: true,
                    streetViewControl: true,
                    overviewMapControl: true,
                    rotateControl: true,
                    // you might set a center here or wait untill you have got some markers fetched via ajax, you can then use the first/last or some other marker respecetive it's position(lat,long) to set as "starting point"
                    //center: {lat: 10.1078316, lng: 106.3404925 }
                    //mapTypeId: google.maps.MapTypeId.ROADMAP
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });
            }
        </script>
        <script src="<?= APP_URL; ?>/js/branch/branchadd.js" type="text/javascript"></script>
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
