$(document).ready(function() {
    // 내비게이션
    $('.fadeIn').mouseover(function() {
        $('.submenu-bg').stop().fadeIn(200);
        $(this).children('.submenu-wrap').stop().fadeIn(200);
    })
    $('.fadeIn').mouseout(function() {
        $('.submenu-bg').stop().fadeOut(200);
        $(this).children('.submenu-wrap').stop().fadeOut(200);
    })

    // 슬라이드
	var width = 730 // 슬라이드 한 개의 폭
	var animationSpeed = 200; // 화면전환 속도
	var pause = 10000; // 화면전환 후 일시 정지 속도

	var currentSlide = 2; // 초기 슬라이드 
	var interval;
	var dotNum;
	var dMinusC;

	// Caching DOM elements
	var $slideUl = $('.slides');
	var $slides = $('.slide');
	var $dots = $('.slider-nav-dot');

	function initSlider(){
		$slideUl.css('margin-left',-width + 'px' );
	}


	function startSlider(action, dotNum) {
        if(action == 'dot') {
			dMinusC = dotNum-currentSlide;
			currentSlide = dotNum;

			for(var i=0; i < $dots.length; i++){ $dots[i].style.background = "#ffffff"; }
			$dots[currentSlide-2].style.background = "#546bbb";

			$slideUl.animate({ 'margin-left': '-=' + (dMinusC * width + 'px') }, animationSpeed);

		} else {
			interval = setInterval(function() {
				$slideUl.stop().animate({ 'margin-left' : '-=' + width + 'px'  }, animationSpeed, function() {
					if (++currentSlide == $slides.length) { // $slides.length == 5
						currentSlide = 2;
						$slideUl.css('margin-left', -width + 'px' );
					}

					for(var i = 0; i < $dots.length; i++) { $dots[i].style.background = "#ffffff"; }
					$dots[currentSlide-2].style.background = "#546bbb";
				});	
			}, pause);
		}

	}

	function pauseSlider() {
		clearInterval(interval);
	}
	function dotSelected(){
		dotNum = $(this).attr('id');
		dotNum = parseInt(dotNum.substring(7))+1;
		startSlider('dot', dotNum);
	}


	$slideUl
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);

	$dots
		.on('click', dotSelected)
		.on('mouseenter', pauseSlider)
		.on('mouseleave', startSlider);		

	
	initSlider();
	startSlider();


	var currentList = 0;

	// 탭 메뉴
	$('#tabmenu > li > a').click(function(e) {
		e.preventDefault()
		$(this).parent().addClass('active').siblings().removeClass('active');
	})
	$('#policy_tabmenu > li > a').click(function(e) {
		e.preventDefault()
		$(this).parent().addClass('policy_active').siblings().removeClass('policy_active');
	})

	// 배너 슬라이드
	$('.next').click(function() {
        $('#banner-list').animate({'margin-left' : '-1100px' });
    })
    $('.prev').click(function() {
        $('#banner-list').animate({'margin-left' : '0' });
    })

	// 자주찾는 서비스 슬라이드
	$('#favourite_next').click(function() {
		$('#favourite-list').animate({'margin-left' : '-=' + 130 + 'px'},function() {
			currentList++;
			if(currentList == 5) {
				$('#favourite-list').animate({'margin-left' : 0 + 'px'})
				currentList = 0;
			}
		})
	})
	$('#favourite_prev').click(function() {
		currentList--;
		if(currentList < 0) {
			currentList = 0;
		}else {
			$('#favourite-list').animate({'margin-left' : '+=' + 130 + 'px'})
		}
	})


	// 여행 슬라이드
	var tr_width = 729 // 슬라이드 한 개의 폭
	var tr_animationSpeed = 200; // 화면전환 속도
	var tr_pause = 10000; // 화면전환 후 일시 정지 속도
	var pos = 0;

	var tr_currentSlide = 2; // 초기 슬라이드 
	var tr_interval;

	// Caching DOM elements
	var $tr_slideUl = $('#travel-slides');
	var $tr_sliderNavPrv = $('#travel-left');
	var $tr_sliderNavNxt = $('#travel-right');
	var $tr_slideStop = $('#travel-stop');
	var $tr_slidestart = $('#travel-start');

	function tr_initSlider(){
		$tr_slideUl.css('margin-left',-tr_width + 'px' );
	}


	function tr_startSlider(action) {

		if(action == 'prv'){
			--pos;
			if(pos == 0)
				pos = 3;
			countSlides()
			$tr_slideUl.animate({ 'margin-left': '+=' + tr_width + 'px' }, tr_animationSpeed, function() {
				if (--tr_currentSlide == 1) {
					tr_currentSlide = 4;
					$tr_slideUl.css('margin-left', -(3) * tr_width + 'px');
				}

			});
		} else if(action == 'nxt') {
			++pos;
			if(pos > 3) 
				pos = 1;
			countSlides()
			$tr_slideUl.animate({ 'margin-left': '-=' + tr_width + 'px' }, tr_animationSpeed, function() {
				if (++tr_currentSlide == 5) {
					tr_currentSlide = 2;
					$tr_slideUl.css('margin-left', - tr_width + 'px' );
				}
			});
		} else {
			++pos;
			countSlides()
			tr_interval = setInterval(function() {
				++pos;
				if(pos > 3) 
					pos = 1;
				countSlides()
				$tr_slideUl.stop().animate({ 'margin-left' : '-=' + tr_width + 'px'  }, tr_animationSpeed, function() {
					if (++tr_currentSlide == 5) { // $tr_slides.length == 5
						tr_currentSlide = 2;
						$tr_slideUl.css('margin-left', -tr_width + 'px' );
					}
				});	
			}, tr_pause);
		}

	}


	function tr_pauseSlider() {
		clearInterval(tr_interval);
	}

	function tr_prvSlide(){
		tr_startSlider('prv');
	}

	function tr_nxtSlide(){
		tr_startSlider('nxt');
	}

	function countSlides(){
		$('#travel-page').html(pos + ' / ' + 3);
	}


	$tr_slideStop 
		.on('click', tr_pauseSlider);

	$tr_slidestart
		.on('click', tr_startSlider);
	$tr_sliderNavPrv
		.on('click',tr_prvSlide)

	$tr_sliderNavNxt
		.on('click',tr_nxtSlide)

	
	tr_initSlider();
	tr_startSlider();
	countSlides()
})