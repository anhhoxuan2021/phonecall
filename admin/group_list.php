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
$_description = 'Group List';

if(!isset($_SESSION['1wire']['web_phone'])) {
    $logout_url = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on' ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'].'/login.php';
    header("Location:".$logout_url);
}

if($_SESSION['1wire']['role'] !=ROLE_SUPER_ADMIN){
    header("Location: dashboard.php");
}

//print_r($_SESSION["acl"]["permission"]);
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
                    <?php include_once 'modal/modal_success.php'; ?>
                    <!-- the #js-page-content id is needed for some plugins to initialize -->
                    <main id="js-page-content" role="main" class="page-content">
                        <ol class="breadcrumb page-breadcrumb">
                            <li class="breadcrumb-item"><a href="home.php">Web Phone</a></li>
                            
                            <li class="breadcrumb-item active">Group List</li>
                            <li class="position-absolute pos-top pos-right d-none d-sm-block"><span class="js-get-date"></span></li>
                        </ol>
                        <div class="subheader row">
                            <h1 class="subheader-title col-8">
                                <i style="color: black" class='subheader-icon fas fa-calendar-check'></i> Group List
                            </h1>
                        </div>
                        
                        <div class="container" style="padding-right: 0;padding-left: 0;">
                            <div id="group-list">
                                <div class="m_b10">
                                    <div class="row f-bold col-12 under-line f-size16">Group List</div>
                                    <div class="row m-t5">
                                        <div class="col-md-2 col-sm-4">
                                            <!--<label for="g-name">&nbsp</label>-->
                                            <input class="form-control" id="g-name" type="text" placeholder="Group Name">
                                        </div>
                                        <div class="col-md-2 col-sm-4 m-t-10">
                                            <!--<label for="u-name">&nbsp</label>-->
                                            <input class="form-control" id="u-name" type="text" placeholder="Member Name">
                                        </div>
                                        <div class="col-md-2 col-sm-4 m-t-10">
                                            <!--<label  for="c-search">&nbsp</label>-->
                                            <button class="btn btn-success form-control" id="g-search">Search</button>
                                        </div>
                                        <div class="col-md-2 col-sm-4 m-t-10">
                                            <!--<label  for="c-reset">&nbsp</label>-->
                                            <button class="btn btn-success form-control" id="g-reset">Reset</button>
                                        </div>
                                    </div>

                                    <div class="row m-t5">
                                        <div class="table-responsive-lg col-12">
                                            <table class="table table-bordered m-0 t-normal" id="g-list">
                                                <thead>
                                                <tr>
                                                    <th style="min-width: 30px"></th>
                                                    <th class="w-m120">Group Name</th>
                                                    <th class="w-m100">Role</th>
                                                    <th class="w-m120">Member</th>
                                                    <th class="w-m100">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                                <tfoot>
                                                <tr>
                                                    <td colspan="9" class="bg-light-gray">Total: <span class="f-bold" id="g-record"></span> Groups</td>
                                                </tr>
                                                </tfoot>
                                            </table>
                                        </div>

                                        <div class="col-12 m-t20">
                                            <ul id="g-list-pagination" class="pagination-sm"></ul>
                                        </div>
                                    </div>
                                </div>
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
        <script type="text/javascript">
            var u_id_login='<?php echo $_SESSION['1wire']['u_id'];?>';
            var role='<?php echo $_SESSION['1wire']['role'];?>';

        </script>

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js"></script>
        <script src="<?= APP_URL; ?>/js/jquery.twbsPagination.js" type="text/javascript"></script>
        <script src="<?= APP_URL; ?>/js/group/group_list.js" type="text/javascript"></script>


    </body>
</html>
