/*---- load ADDRESS - Checkout page ----*/
$(function () {

    Address.load('#customerCityId', '#customerDistrictId');
    CustomerShipFee.load('#customerCityId','#customerDistrictId','#ship_fee', '#showTotalMoney', '#couponCode','vnÄ‘');
    CheckCouponCode.load('#customerCityId','#customerDistrictId', '#couponCode','#getCoupon','#moneyCoupon','#ship_fee', '#showTotalMoney','vnÄ‘');


    $('input[name="bkVpoint"]').keyup(function () {
        var t = $(this), num_only = /^\d+$/,
            max = parseInt(t.attr('data-max'));
        if (!t.val().match(num_only)) {
            t.val(0);
        }
        if (t.val() > max) {
            t.val(max);
        }
    });

    /*-----------chosse payment menthod ----------*/
    $('.payment-Method button').each(function () {
        if($(this).hasClass('active')){

            if ($(this).hasClass('baokim')) {
                $('#baokimPmMethodId').val('Baokim');
                $('input[name="paymentMethod"]').val($(this).attr('data-value'));
            }
            if ($(this).hasClass('cod')) {
                $('#baokimPmMethodId').val('cod');
                $('input[name="paymentMethod"]').val($(this).attr('data-value'));
            }
            if ($(this).hasClass('online')) {
                $('#baokimPmMethodId').val($(this).attr('data-value'));
                $('input[name="paymentMethod"]').val($(this).attr('data-value'));
            }

        }
    });

    $('.payment-Method button').click(function () {

        if ($(this).hasClass('baokim')) {
            $('#baokimPmMethodId').val('Baokim');
            $('input[name="paymentMethod"]').val($(this).attr('data-value'));
        }
        if ($(this).hasClass('cod')) {
            $('#baokimPmMethodId').val('cod');
            $('input[name="paymentMethod"]').val($(this).attr('data-value'));
        }

        if ($(this).hasClass('online')) {
            $('#baokimPmMethodId').val($(this).attr('data-value'));
            $('input[name="paymentMethod"]').val($(this).attr('data-value'));
        }
    });


    $('.listBank>span').click(function () {
        $('#baokimPmMethodId').val($(this).attr('baokimPmId'));
        $('.listBank>span').removeClass('active');
        $(this).addClass('active');
    });

    $('.listBank .bankItem').click(function () {
        $('input[name="baokimBankPaymentMethodId"]').val($(this).attr('data-baokimPmId'));
        $('input[name="bankName"]').val($(this).attr('title'));
        $('.listBank .bankItem').removeClass('active');
        $(this).addClass('active');
        $(this).parent('.listBank').find('.notice').html(msgSelected + ': <b>' + $(this).attr('title') + '</b>');
    });

});



/*----- Accept & Order ----*/
$(function () {
    var isSubmited = false;
    $("#formCheckOut").validationEngine({
        scroll: false,
        onValidationComplete: function (form, status) {
            if (status && !isSubmited) {
                isSubmited = true;
                if (!$('#baokimPmMethodId').val()) {
                    alert(msgTransfers);
                    isSubmited = false;
                    return;
                }
                // $.fancybox({
                //     content: $("#progressbar"),
                //     closeBtn: false,
                //     padding: 0,
                //     scrolling: false,
                //     modal: true,
                // });

                AppAjax.post(
                    '/order/save?format=json', $('#formCheckOut').serialize(),
                    function (rs) {
                        if (rs.code) {
                            if (rs.redirect) {
                                window.location.href = rs.redirect;
                            }
                        } else {
                            $.fancybox.close();
                            isSubmited = false;
                            alert(rs.messages.join('\n'));
                        }
                    },
                    'json'
                );
            }
        }
    });
});