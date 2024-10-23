$(document).ready(function () {
    // // $('.cloudzoom').CloudZoom({zoomPosition:'inside', zoomOffsetX:0});
    CloudZoom.quickStart({});

    if($('.listThumb').length){
        slickThumb($('.listThumb .wrapper'));
    }

    $(document).on('click', '.relativeProduct .infor .item.checked', function () {
    // $('.relativeProduct .infor .item.checked').click(function () {
        $(this).toggleClass('active');
        if($('.relativeProduct .infor .item.active').length) {
            var price = 0;
            $('.relativeProduct .infor .item.active').each(function () {
                price = parseInt(price) + parseInt($(this).attr('data-price'));
                $('.relativeProduct .totalRelative').html($.number(price, 0, ',', '.') + 'vnÄ‘');
            });
            $('.addSelect').attr('data-bs-original-title','');
        }else {
            $('.relativeProduct .totalRelative').html('0vnÄ‘');
            $('.addSelect').attr('data-bs-original-title','HÃ£y chá»n sáº£n pháº©m mua kÃ¨m!');
        }

    });


    $('.addSelect').click(function () {
        var t = $(this),products = [],ck = 0;

        $('.relativeProduct .infor .item').each(function () {
            if($(this).hasClass('active')){
                ck = 1;
                products.push({
                    id: $(this).attr('data-selId'),
                    quantity: 1
                });
            }

            if(ck != 1){ ck = 0; }

        });

        t.attr('ck',ck);

        if (t.attr('ck') == 1) {
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    alert('ThÃªm vÃ o giá» hÃ ng thÃ nh cÃ´ng !');
                }
            });
        }
    });

    $('.buyBtn').click(function (e) {
        var t = $(this);
        if (t.attr('ck') == 1) {
            var products = [], ps = {};
            ps['id'] = t.attr('selId');
            ps['quantity'] = $('.quantity input').val();
            products.push(ps);
            addToCart(products, 1, function (rs) {
                if (rs.status == 1) {
                    if(t.hasClass('quickBuy')){
                        window.location.href = '/cart/checkout';
                    }else{
                        window.location.href = '/cart';
                    }
                } else {
                    alert( rs.messages );
                }
            });
        }
    });

    $('.color a').click(function () {
        var t = $(this), size = $('.size a'), qty = $('.quantity input'), atc = $('.buyBtn'), attrs = {};
        if (!t.hasClass('active')) {
            $('.color a').removeClass('active');
            if (size.length > 1) {
                size.removeClass('active deactive');
                size.removeAttr('title');
                t.addClass('active');
                // $(".imgMain").attr('src', t.attr('data-src'));
                attrs[$('.color').attr('column')] = t.attr('value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('column')] = t.attr('value');
                    AppAjax.post(
                        '/product/child?psId=' + $('.add-to-cart').attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if (rs.data.available <= 0) {
                                    t.addClass('deactive').attr('title', msgOutofStock).removeAttr('qtt');
                                } else {
                                    t.attr('qty', rs.data.available).attr('selId', rs.data.id);
                                    atc.attr('title', 'Vui lÃ²ng chá»n kÃ­ch cá»¡ !');
                                }
                            } else {
                                t.addClass('deactive').attr('title', 'Sáº£n pháº©m táº¡m thá»i háº¿t hÃ ng!').removeAttr('qty');
                                // atc.html('HÃªÌt haÌ€ng');
                            }
                        },
                        'json'
                    );
                });

            } else {
                if (t.attr('qty')) {
                    t.addClass('active');
                    // $(".imgMain").attr('src', t.attr('data-src'));
                    atc.attr('selId', t.attr('selId')).attr('data-bs-original-title','').attr('ck', 1);
                    qty.val(1);
                    qty.attr('max',t.attr('qty'));
                }
            }
        }

        var src = $(this).attr('data-src');
        var ids = t.attr('data-pids').split(',');
        var ps = [];
        var storeId = $('#checkStoreId').val();
        var listImg =  $('.listThumb .wrapper');
        ps.push({id: ids, getSrcUri: true, code: 1, storeId: storeId});

        getallchildimg(ps, function (rs) {
            listImg.slick('unslick');
            listImg.empty();
            $('.cloudzoom').data('CloudZoom').destroy();
            $('.wrapper-imgMain').empty();
            $('.wrapper-imgMain').append('<a href="javascript:" class="d-block position-absolute"><img id="z" src="' + src + '" class="imgMain w-100 cloudzoom" ' +
                'data-cloudzoom="zoomImage: \'' + src + '\',easeTime: 0,easing: 0,zoomPosition: \'inside\',autoInside: true,disableOnScreenWidth:992"/></a>');

            if (rs.images != "") {
                $.each(rs.images, function (vl) {
                    src = rs.images[vl];
                    listImg.append('<div class="item cloudzoom-gallery"  data-cloudzoom="useZoom: \'.imgMain\', image: \''+ src +'\', zoomImage: \''+ src +'\'">\n' +
                        '                                    <div class="position-relative">\n' +
                        '                                    <a href="javascript:" class="d-inline-block position-absolute w-100">\n' +
                        '                                        <img class="w-100" src="'+ src +'" alt="'+rs.name+'">\n' +
                        '                                    </a>\n' +
                        '                                    </div>\n' +
                        '                                </div>');

                });
            } else {
                listImg.append('<div class="item cloudzoom-gallery"  data-cloudzoom="useZoom: \'.imgMain\', image: \''+ src +'\', zoomImage: \''+ src +'\'">\n' +
                    '                                    <div class="position-relative">\n' +
                    '                                    <a href="javascript:" class="d-inline-block position-absolute w-100">\n' +
                    '                                        <img class="w-100" src="'+ src +'" alt="product">\n' +
                    '                                    </a>\n' +
                    '                                    </div>\n' +
                    '                                </div>');
            }


            setTimeout(function () {
                slickThumb(listImg);
                CloudZoom.quickStart();
            },250);

        });

    });

    checkInv();

    // $('.image-item').click(function () {
    //     if(!$('.mainImage-product').hasClass('active')){
    //         $('.mainImage-product').addClass('active').removeClass('d-none');
    //         $('.mainVideo-product').addClass('d-none').removeClass('active');
    //     }
    // });
    //
    // $('.video-item').click(function () {
    //     if(!$('.mainVideo-product').hasClass('active')){
    //         // $('.image-item img').removeClass('cloudzoom-gallery-active');
    //         $('.mainVideo-product').addClass('active').removeClass('d-none');
    //         $('.mainImage-product').addClass('d-none').removeClass('active');
    //     }
    // });

    $('.item-hasChild').click(function (){
        var proId = $(this).attr('data-id'), t = $(this);
        $('.appendDetail').hide().empty();
        $('.modalSuggest').attr('data-id',proId);
        $.ajax({
            url: '/product/q' + proId+'?typeSuggest='+1,
            type: 'GET',
            dataType: 'text',
            success: function (rs) {
                t.parent('.imageSuggest').find('.appendDetail').html(rs).fadeIn('100');
            }
        });
    });

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

});

function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('.buyBtn'),qtt = $('.quantity input');
    if (req == 1) {
        if ($('.color').length) {
            if ($('.color a.active').length) {
                attrs[$('.color').attr('column')] = $('.color a.active').attr('value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('psid'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            // qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).attr('data-bs-original-title','').attr('ck', 1).removeClass('unsel');
                            // checkMax();

                        } else {
                            atc.attr('data-bs-original-title', msgOutofStock);
                        }
                    },
                    'json'
                );

            } else {
                $('.color a').each(function () {
                    var t = $(this);
                    attrs[$('.color').attr('column')] = t.attr('value');
                    AppAjax.post(
                        '/product/child?psId=' + atc.attr('psid'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qty', rs.data.available).attr('selId', rs.data.id);
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        }
        return false;
    }
}

function slickThumb(slide) {
    slide.slick({
        // dots: false,
        infinite: true,
        slidesToScroll: 1,
        arrows: false,
        slidesToShow: 5,
        vertical: true,
        verticalSwiping: true,
        // asNavFor: '.product-image__list',
        // centerMode: true,
        focusOnSelect: true,
        // centerPadding: '0px',
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    dots: true,
                    vertical: false,
                    verticalSwiping: false,
                    dotsClass: 'slick-dots nav position-absolute w-100 justify-content-center',
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    });
}