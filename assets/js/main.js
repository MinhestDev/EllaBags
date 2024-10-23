$(document).ready(function () {

    if($('.popUp-language').length){
        $('.popUp-language').show();
    }

    $('.closePopup').click(function () {
        $('.popUp-language').hide();
    });

    $(".popUp-language").click(function (e) {
        // Äá»‘i tÆ°á»£ng container
        var container = $(".popUp-language .content");
        // Náº¿u click bÃªn ngoÃ i Ä‘á»‘i tÆ°á»£ng container thÃ¬ áº©n nÃ³ Ä‘i
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $('.popUp-language').hide();
        }
    });

    $('.open-search').click(function () {
        if($(window).width()<992){
            $(this).next().slideToggle();
        }else{
            $(this).next().fadeIn();
            $(this).next().addClass('active');
        }
    });

    $(document).click(function (e)
    {
        // Äá»‘i tÆ°á»£ng container
        var container = $(".formSearch form,.open-search");
        // Náº¿u click bÃªn ngoÃ i Ä‘á»‘i tÆ°á»£ng container thÃ¬ áº©n nÃ³ Ä‘i
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('header .formSearch').fadeOut(200);
            $('header .formSearch').removeClass('active');
        }
    });

    $('.product-item .listColor a').click(function () {
        if(!$(this).hasClass('active')){
            $(this).parents().children().removeClass('active');
            $(this).addClass('active');
            $(this).parents('.product-item').find('img').attr('src',$(this).attr('data-image'));
        }
    });

    $('.question-item>p').click(function () {
        if ($(this).parent().hasClass('active')) {
            $(this).parent().removeClass('active');
            $(this).next().slideUp('fast');
        } else {
            $('.question-item').removeClass('active');
            $('.answer').slideUp('fast');
            $(this).parent().addClass('active');
            $(this).next().slideDown('fast')
        }
    });

    // ---------------- Ä‘Äƒng kÃ½ nháº­n tin --------------
    $('.btn_dk').click(function (e) {
        var input = $(this).parent().find('input');
        AppAjax.post('/newsletter/subscribe', {'mail': input.val()},
            function (rs) {
                if (rs.code) {
                    alert(rs.message);
                    input.val('');
                }else{
                    alert(rs.message);
                }

            }
        );
    });

    //  ---------- Contact ---------------

    $('.formContact button').click(function(){
        var name = $(this).parents('.formContact').find('input[name="name"]'),
            content = $(this).parents('.formContact').find('textarea[name="content"]'),
            email = $(this).parents('.formContact').find('input[name="email"]'),
            mobile = $(this).parents('.formContact').find('input[name="mobile"]');
        AppAjax.post(
            '/contact/contacts',
            {
                'content' : content.val(),
                'name' : name.val(),
                'email' : email.val(),
                'mobile' : mobile.val(),
            },
            function(rs){
                if (rs.code == 1) {
                    alert(rs.message);
                    $('.formContact input,.formContact textarea').val('');
                }
                else {
                    alert(rs.message);
                }
            }
        );
    });


    $('.jobPage .head a').click(function (e) {
        let ys = $('.form-job').offset().top - 10;
        $('html,body').animate({scrollTop: ys},{duration: 100});
    });


    if($(window).width() < 576) {
        if ($('.bannerMain.mobile').length) {
            $('.bannerMain.mobile').slick({
                lazyLoad: 'progressive',
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                dotsClass: 'slick-dots nav w-100 justify-content-center position-absolute',
                // infinite: false,
            });
        }
    }else {
        if ($('.bannerMain.desktop').length) {
            $('.bannerMain.desktop').slick({
                lazyLoad: 'progressive',
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                dotsClass: 'slick-dots nav position-absolute',
                // infinite: false,
            });
        }
    }

    $('.openMenu').click(function () {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).next().hide();
        }else{
            $(this).addClass('active');
            $(this).next().show();
        }

    });

    if($(window).width() < 992) {
        $('.openChildMenu').click(function (e) {
            e.preventDefault();

            if($(this).parent().hasClass('active')){
                $(this).parent().removeClass('active');
                $(this).next().slideUp('fast');
            }else {
                $(this).parent().parent().children().removeClass('active');
                $(this).parent().parent().children().children('ul').slideUp('fast');
                $(this).parent().addClass('active');
                $(this).next().slideDown();
            }
        });
    }

    $(document).on('change', '.updateQty', function () {
        var max = parseInt($(this).attr('max')),
            psId = $(this).attr('data-id'),
            qty = parseInt($(this).val());
        if(qty>0){
            if(qty>max){
                alert('báº¡n chá»‰ cÃ³ thá»ƒ mua tá»‘i Ä‘a '+max+' sáº£n pháº©m');
                qty=max;
                $(this).val(max);
            }
            if($('.cartPage').length) {
                jsPostQty(psId, qty);
            }
        }else {
            alert('báº¡n chá»‰ cÃ³ thá»ƒ mua tá»‘i thiá»ƒu 1 sáº£n pháº©m');
            qty=1;
            $(this).val(1);
            if($('.cartPage').length) {
                jsPostQty(psId, qty);
            }
        }
    });

    $('.removeItem').click(function(){
        var psId = $(this).attr('data-id');
        if(psId > 0){
            removeCart(psId);
        }
    });

    $(document).on('click', '.minus', function () {
        var val = $(this).parent().find('.updateQty').val()*1,
            psId = $(this).parent().find('.updateQty').attr('data-id');
        // var psId = $(this).parent().find('.updateQty').data('id');
        if(val > 1){
            val = val - 1;
            $(this).parent().find('.updateQty').val(val);
            if($('.cartPage').length) {
                jsPostQty(psId, val);
            }
        }
        else {
            $(this).parent().find('.updateQty').val(1);
            alert('BaÌ£n chiÌ‰ coÌ thÃªÌ‰ mua tÃ´Ìi thiá»ƒu 1 saÌ‰n phÃ¢Ì‰m');
        }
    });

    $(document).on('click', '.plus', function () {
        var max = $(this).parent().find('.updateQty').attr('max')*1;
        var val = $(this).parent().find('.updateQty').val()*1,
            psId = $(this).parent().find('.updateQty').attr('data-id');
        // var psId = $(this).parent().find('.updateQty').data('id');
        if(val < max){
            val = val + 1;
            $(this).parent().find('.updateQty').val(val);
            if($('.cartPage').length) {
                jsPostQty(psId, val);
            }
        }
        else {
            $(this).parent().find('.updateQty').val(max);
            alert('BaÌ£n chiÌ‰ coÌ thÃªÌ‰ mua tÃ´Ìi Ä‘a '+max+' saÌ‰n phÃ¢Ì‰m');
        }
    });

    if($(window).width() > 1100) {
        $('.product-item').hover(function () {
            var height = $(this).outerHeight();
            $(this).css({'min-height': height});
            $(this).find('.wrapper').css('position', 'absolute');
            $(this).find('.hoverOff').css('display', 'none');
            $(this).find('.hoverOn').css('display', 'block');
        }, function () {
            $(this).css({'min-height': 'auto'});
            $(this).find('.wrapper').css('position', 'initial');
            $(this).find('.hoverOff').css('display', 'block');
            $(this).find('.hoverOn').css('display', 'none');
        });
    }

    if($(window).width() < 768) {
        var heightHd = $('header').outerHeight();
        if($('.product-page').length){
            heightHd = heightHd + $('.product-page>div>.head').outerHeight() + $('.product-page .left .head').outerHeight();
        }

        $('.pagePd').css('padding-top', heightHd);

        if($('.product-page').length){
            $('.product-page>div>.head').css('top', $('header').outerHeight());
            $('.product-page .left').css('top', $('header').outerHeight() + $('.product-page>div>.head').outerHeight());

            var heightFilter = $('header').outerHeight() + $('.product-page>div>.head').outerHeight() + $('.product-page .left .head').outerHeight();
            $('.product-page .left .head~div').css('height', $(window).height() - heightFilter);
        }

        $('.product-page .left .title').click(function () {
            if(!$(this).hasClass('active')){
                $('.product-page .left').css('z-index',2);
                $(this).addClass('active');
                $('.filter-bar').show();
            }else {
                $('.product-page .left').css('z-index',1);
                $(this).removeClass('active');
                $('.filter-bar').hide();
            }
        });
    }

    $('.quickView').click(function(e) {
        e.preventDefault();
        var t = $(this);
        quickView(t.attr('data-id'));
    });

    var isSubmited1 = false;
    $("#signInForm").validationEngine({
        scroll: false, binded: false, showOneMessage: true,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited1) {
                isSubmited1 = true;
                AppAjax.post(
                    '/user/ajaxsignin',
                    {
                        'username' : $('#signInForm input[name="username"]').val(),
                        'password' : $('#signInForm input[name="password"]').val()
                    },
                    function(rs){
                        if (rs.code == 1) {
                            location.reload();
                        } else {
                            isSubmited1 = false;
                            // alert(rs.message);
                            alert('Sai tÃªn Ä‘Äƒng nháº­p hoáº·c máº­t kháº©u !');
                        }
                    }
                );
            }
        }
    });

    var isSubmited = false;
    $("#registerForm").validationEngine({
        scroll: false, binded: false, showOneMessage: true,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
                AppAjax.post(
                    '/user/ajaxsignup',
                    {
                        'fullName': $('#registerForm input[name="fullName"]').val(),
                        'email': $('#registerForm input[name="email"]').val(),
                        'password': $('#registerForm input[name="password"]').val(),
                        'mobile': $('#registerForm input[name="mobile"]').val(),
                        // 'birthday': $('.moreInput input[name="birthday"]').val(),
                        // 'address': $('.moreInput input[name="address"]').val(),
                    },
                    function(rs){
                        if (rs.code == 1) {
                            alert('ÄÄƒng kÃ½ thÃ nh cÃ´ng !');
                            $('.nextModal').trigger('click');
                        } else {
                            isSubmited = false;
                            alert(rs.message);
                        }
                    }
                );
            }
        }
    });

    $('.collection-orther-slider').slick({
        lazyLoad: 'progressive',
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="slick-prev d-block p-0 position-absolute border-0">' +
            '<svg width="17" height="47" viewBox="0 0 17 47" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M16 0.999998L2 23.5L16 46" stroke="#161816" stroke-width="2"/>\n' +
            '</svg>\n' +
            '</button>',
        nextArrow: '<button type="button" class="slick-next d-block p-0 position-absolute border-0">' +
            '<svg width="17" height="47" viewBox="0 0 17 47" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M1 46L15 23.5L1 1" stroke="#161816" stroke-width="2"/>\n' +
            '</svg>\n' +
            '</button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                },
            }
        ]
        // arrows: false,
        // dots: true,
        // dotsClass: 'slick-dots nav w-100 justify-content-center position-absolute',
        // infinite: false,
    });

});

function jsPostQty(psId,quantity) {
    var products = [{
        'id':psId,
        'quantity':quantity
    }];
    addToCart(products, 2, function (rs) {
        location.reload();
    });
}

function removeCart(prodId) {
    var check = confirm('Báº¡n muá»‘n xÃ³a sáº£n pháº©m ra khá»i giá» hÃ ng ?');
    if(check) {
        $.post(
            '/cart/remove',
            {
                'psId' : prodId
            },
            function(psId){
                window.location.reload();
            }
        );
    }
}

function quickView(id){
    $.post('/product/q' + id,
        function (rs) {
            var content = rs;
            var myModal = document.getElementById('modalQuickView');
            var myModal1 = new bootstrap.Modal(myModal, {});
            $('#modalQuickView').find('.modal-body').html(content);
            myModal1.show();
            myModal.addEventListener('shown.bs.modal', function () {
                $.getScript('/tp/T0368/js/quickview.js');
            }, {  once : true});
        }
    );
}