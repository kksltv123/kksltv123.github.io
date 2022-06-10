$(document).ready(function() {
    // 네비게이션
    $('.fadeIn').mouseover(function() {
        $(this).children('.submenu_bg').stop().fadeIn(200);
        $(this).children('.submenu_bg').children('.submenu').stop().fadeIn(200);
    })
    $('.fadeIn').mouseout(function() {
        $(this).children('.submenu_bg').stop().fadeOut(200);
        $(this).children('.submenu_bg').children('.submenu').stop().fadeIn(200);
    })
    
    // 모달창
	var $all_menu = $('.btn-allmenu');
	var $modal_layer = $('.modal-layer');
	var $btnClose = $('.btnClose');
	var $modal_layer = $('.modal-layer');
	var $modal_up = $('.modal-up');

	$all_menu.on('click', function() {
		$modal_layer.fadeIn();
	})
	$btnClose.on('click', function() {
		$modal_layer.fadeOut();
	})
	$modal_layer.on('click', function() {
		$modal_layer.fadeOut();
	})
	$modal_up.on('click', function() {
		return false;
	})
})