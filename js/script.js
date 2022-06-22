$(document).ready(function() {
    // 게이지, 웹 글자이동 효과 함수
    function gageCharge() {
        $('#ps_gage').stop().animate({ width : "80%" }, 1000);
        $('#ai_gage').stop().animate({ width : "60%" }, 1000);
        $('#hc_gage').stop().animate({ width : "90%" }, 1000);
        $('#jq_gage').stop().animate({ width : "70%" }, 1000);
    }
    function gageDischarge() {
        setTimeout(function() {
            $('#ps_gage').stop().css({ width : "0" });
            $('#ai_gage').stop().css({ width : "0" });
            $('#hc_gage').stop().css({ width : "0" });
            $('#jq_gage').stop().css({ width : "0" });
        }, 300)
    }
    function webMoveEffect() {
        if (pageIndex == 2) {
            $('#web_info_bulk').stop().animate({ opacity : "100%", left : "55%" }, 1000).css({display : 'block'});
        } else {
            setTimeout(function() {
                $('#web_info_bulk').stop().css({ opacity : "0", left : "80%", display : 'none' })
            }, 300)
        }
        if (pageIndex == 3) {
            $('#web_info_hany').stop().animate({ opacity : "100%", left : "55%" }, 1000).css({'display' : 'block'});
        } else {
            setTimeout(function() {
                $('#web_info_hany').stop().css({ opacity : "0", left : "80%", display : 'none' });
            }, 300)
        }
        if (pageIndex == 4) {
            $('#web_info_suncheon').stop().animate({ opacity : "100%", left : "55%" }, 1000).css({'display' : 'block'});
        } else {
            setTimeout(function() {
                $('#web_info_suncheon').stop().css({ opacity : "0", left : "80%", display : 'none' });
            }, 300)
        }
    }

    // 스크롤효과 초기화
    var $resetWheel = function(event){
        event.preventDefault();
    }
    window.addEventListener("wheel", $resetWheel, { passive: false })

    var $window = $(window);
    var $html = $("html, body");
    var pageIndex = 0;
    var lastPageIndex = $(".wrap").length - 1;

    // 새로고침 했을때 맨위로
    $html.animate({ scrollTop: 0 });

    var $wheelFunction = function(event) {
        // 스크롤링 중 효과 반환
        if ($html.is(":animated")) return;

        // 스크롤 내렸을 때
        if (event.originalEvent.deltaY > 0) {
            if (pageIndex == lastPageIndex) return;
            // 네비게이션 배경 추가
            $('header').addClass('active');
            pageIndex++;

            if (pageIndex == 1) {
                gageCharge();
            } else {
                gageDischarge();
            }
            webMoveEffect();
        } // 스크롤 올렸을 때
        else if (event.originalEvent.deltaY < 0) {
            if (pageIndex == 0) return; 
            
            pageIndex--;
            
            if (pageIndex == 1) {
                gageCharge();
            } else {
                gageDischarge()
            }
            webMoveEffect();
        }
        // 내비게이션 배경 제거
        if (pageIndex == 0) {
            $('header').removeClass('active');
        }  

        var posTop = pageIndex * $window.height();
        $html.animate({ scrollTop: posTop });

        // console.log("pageIndex = " + pageIndex);
        // console.log("posTop = " + posTop);
    }

    // 원페이지 스크롤
    $window.on("wheel", $wheelFunction);

    // 내비게이션
    $('#nav_home').click(function() {
        $html.animate({ scrollTop : 0 * $window.height() });
        pageIndex = 0;
        $('header').removeClass('active');
    })
    $('#nav_about').click(function() {
        $html.animate({ scrollTop : 1 * $window.height() });
        pageIndex = 1;
        $('header').addClass('active');
        gageCharge();
    })
    $('#nav_web').click(function() {
        $html.animate({ scrollTop : 2 * $window.height() });
        pageIndex = 2;
        $('header').addClass('active');
        webMoveEffect()
    })
    $('#nav_design').click(function() {
        $html.animate({ scrollTop : 5 * $window.height() });
        pageIndex = 5;
        $('header').addClass('active');
    })

    // 이미지 버튼
    $('#next_button').click(function() {
        $('#img_list_top > ul').animate({'margin-left' : '-100%' });
        $('#img_list_bottom > ul').animate({'margin-left' : '-100%' });
        $('#first_circle').animate({ 'width' : '10px', 'height' : '10px' });
        $('#second_circle').animate({ 'width' : '20px', 'height' : '20px' });
    })
    $('#prev_button').click(function() {
        $('#img_list_top > ul').animate({'margin-left' : '0' });
        $('#img_list_bottom > ul').animate({'margin-left' : '0' });
        $('#first_circle').animate({ 'width' : '20px', 'height' : '20px' });
        $('#second_circle').animate({ 'width' : '10px', 'height' : '10px' });
    })

    // 이미지 갤러리
    var photoIndex_top = 0;
    var photoIndex_bottom = 0;
    var $overlay_top = $('#overlay_top');
    var $overlay_bottom = $('#overlay_bottom');
    var $photoList_top = $('#img_list_top > ul > li > a');
    var $photoList_bottom = $('#img_list_bottom > ul > li > a');
    var $photo_top = $('#photo_top');
    var $photo_bottom = $('#photo_bottom');
    
    // top 이미지
    $photoList_top.on('click', function(event) {
        event.preventDefault();

        photoIndex_top = $photoList_top.index(this);
        $photo_top.attr("src", $(this).attr("href"));
        $overlay_top.fadeIn(function() {
            $photo_top.fadeIn();
        })
        
        $("#close_top").on("click", function() {
            $photo_top.fadeOut(function() {
                $overlay_top.fadeOut();
            })
        })
    
    })
    $("#next_top").on("click", function() {
        photoIndex_top++;
        photoIndex_top %= $photoList_top.length;
        
        $photo_top.fadeOut(function() {
            $photo_top.attr("src", $photoList_top.eq(photoIndex_top).attr("href")).fadeIn();
        })
    })

    $("#prev_top").on("click", function() {
        photoIndex_top--;
        
        if(photoIndex_top < 0) photoIndex_top = $photoList_top.length - 1;
        
        $photo_top.fadeOut(function() {
            $photo_top.attr("src", $photoList_top.eq(photoIndex_top).attr("href")).fadeIn();
        })
    })

    // bottom 이미지
    $photoList_bottom.on('click', function(event) {
        event.preventDefault();

        photoIndex_bottom = $photoList_bottom.index(this);
        $photo_bottom.attr("src", $(this).attr("href"));
        $overlay_bottom.fadeIn(function() {
            $photo_bottom.fadeIn();
        })
        
        $("#close_bottom").on("click", function() {
            $photo_bottom.fadeOut(function() {
                $overlay_bottom.fadeOut();
            })
        })
    
    })
    $("#next_bottom").on("click", function() {
        photoIndex_bottom++;
        photoIndex_bottom %= $photoList_bottom.length;
        
        $photo_bottom.fadeOut(function() {
            $photo_bottom.attr("src", $photoList_bottom.eq(photoIndex_bottom).attr("href")).fadeIn();
        })
    })

    $("#prev_bottom").on("click", function() {
        photoIndex_bottom--;
        
        if(photoIndex_bottom < 0) photoIndex_bottom = $photoList_bottom.length - 1;
        
        $photo_bottom.fadeOut(function() {
            $photo_bottom.attr("src", $photoList_bottom.eq(photoIndex_bottom).attr("href")).fadeIn();
        })
    })

   // detail 버튼
   var $detailBtn = $('.detail_btn');
   var $detail_bg = $('.detail_bg');
   var $dtail = $('.detail');

   const graphic = [
    "images/bulk_detail.png",
    "images/hany_detail.png",
    "images/sunchoen_detail.png",
    ]

    $detailBtn.click(function() {
        var i = $detailBtn.index(this);
        $dtail.find("img").attr("src", graphic[i])
        $detail_bg.slideDown(300);
        $dtail.slideDown(300);
        $dtail.scrollTop(0);
        $window.off("wheel", $wheelFunction);
        $dtail.on('wheel',function(e){
           var wheel = e.originalEvent.wheelDelta;

           if ($dtail.is(":animated")) return;

           //스크롤값을 가져온다.
           if(wheel>0){
           //스크롤 올릴때
           $dtail.animate({ scrollTop: '-=' + 600 + 'px' });
           } else {
           //스크롤 내릴때
           $dtail.animate({ scrollTop: '+=' + 600 + 'px' });
           }
       });
   })
    
    $dtail.click(function() {
        return false;
    })

    $detail_bg.click(function() {
        $detail_bg.slideUp(300);
        $dtail.slideUp(300);
        $dtail.scrollTop(0);
        $window.on("wheel", $wheelFunction);
    })
})