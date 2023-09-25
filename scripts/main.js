'use strict'
//анимация wow
new WOW({
    animateClass: 'animate__animated',
    // для мобильных надо писать???
    // mobile: true
}).init();


$(document).ready(function () {

    //открыть закрыть бургер

    const menu = $('.header__burger_close');

    $('#burger').click(function () {
        menu.show();
    })

    $('#close-burger').click(() => {
        menu.hide()
    })

     //привыборе секции прокрутка вниз, меню исчезает

    $('.header__burger_close-item').click(() =>{
       menu.hide();
    })

    //листайте вниз стрелка

    let arrow = document.getElementById('main__arrow');

    arrow.addEventListener('click', function () {
        document.getElementById('project').scrollIntoView()
    })


    //добавить три дома
    let houses = $('#project__arrow');
    houses.click(() => {
        $('.hide').css('display', 'grid');
        houses.hide()
    })

    //скрыть три дома
    let hideImages = $('#hide-images');
    hideImages.click(() => {
        $('.hide').css('display', 'none');
        houses.show();
    })

    //описание домика
    //  скрипт вып-ся на экране меньше 1000

    $(window).resize(function () {
        if ($(window).width() < 1000) {
            let frame = $('#technology__info-frame');
            let circle1 = $('#circle1');
            let circle2 = $('#circle2');
            let circle3 = $('#circle3');
            let circle4 = $('#circle4');
            let circle5 = $('#circle5');
            let text1 = $('#text1');
            let text2 = $('#text2');
            let text3 = $('#text3');
            let text4 = $('#text4');
            let text5 = $('#text5');

            circle1.click(() => {
                frame.show().html(text1);
            })
            circle2.click(() => {
                frame.show().html(text2);
            })
            circle3.click(() => {
                frame.show().html(text3);
            })
            circle4.click(() => {
                frame.show().html(text4);
            })
            circle5.click(() => {
                frame.show().html(text5);
            })
        }
    })

    //слайдер
    $('.slider').slick({
        slidesToScroll: 1,
        prevArrow: '.arrow-prev',
        nextArrow: '.arrow-next',
        dots: true,
        infinite: true,
        variableWidth: true,
        arrows: true,
        dotsClass: 'slick-dots',
        centerMode: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });


    //записаться на экскурсию
    const popup = $('.map__popup');

    $('#registration').click(() => {
        popup.show();
    });
    $('#cancel').click(() => {
        popup.hide();
    })


    // фото выводится на экран
    $('.popup-open-image').magnificPopup({
        type: 'image'
    });

    // маска для ввода телефона

    $('#phone1').inputmask({"mask": "+7 (999) 999-99-99"});
    $('#phone2').inputmask({"mask": "+7 (999) 999-99-99"});

    //валидация формы секции консультации

    $('#submit1').click(function () {

        let hasError = false;

        let name1 = $('#name1');
        let phone1 = $('#phone1');
        let submit1 = $('#submit1')
        let contact1 = $('#contact1'); // свяжемся c вами
        let agree1 = $('#agree1');//  нажимая кнопку
        let errorCheckCons = $('.consultation__error-check');// подтвердите красным
        let error1 = $('.error_text1');// введите имя телефон красные
        let check1 = $('input[type=checkbox]');// квадратик
        let square1 = $('input[type=checkbox]:not(:checked) + span')// белый квадратик и галка
        let title1 = $('#title-consult');
        let sp1 = $('.consultation__span'); // рамка квадратика красная - белая


        error1.hide();

        name1.css('border', ' 1px solid #ffffff');
        phone1.css('border', ' 1px solid #ffffff');
        square1.css('border', ' 1px solid #ffffff');
        sp1.css('border', ' 1px solid #ffffff');
        errorCheckCons.hide();
        error1.css('color', 'red')


        if (!name1.val()) {
            name1.next().show();
            name1.css('border', '1px solid red');
            hasError = true;
        }

        if (!phone1.val()) {
            phone1.next().show();
            phone1.css('border', '1px solid red');
            hasError = true;
        }
        if (!check1.is(':checked')) {
            errorCheckCons.show();
            sp1.css('border', ' 1px solid red')
            hasError = true;
        }
        // для подтверждения согласия до нажатия желтой кнопки
        // исчезает красная ошибка
        square1.click(function () {
                if (!check1.is(':checked')) {
                    sp1.css('border', ' 1px solid #ffffff')
                    errorCheckCons.hide();
                }
            }
        )
        if (!hasError) {
            // ajax запрос
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {name: name1.val(), phone: phone1.val(), check: check1.checked}
            })
                .done(function (msg) {

                    if (msg.success) {
                        title1.hide();
                        phone1.hide();
                        name1.hide();
                        check1.hide();
                        agree1.hide();
                        errorCheckCons.hide();
                        submit1.hide();
                        square1.hide();
                        sp1.hide();
                        contact1.show();

                     // спасибо, свяжемся - медленно исчезает
                        //форма появляется плавно, но экран сдвигается .... ?????
                        contact1.fadeOut(5000, function () {
                            contact1.hide();

                            setTimeout(function () {
                                title1.fadeIn(1000,function () {
                                   title1.show();
                                });
                                name1.fadeIn(1000,function () {
                                    name1.show();
                                })
                                phone1.fadeIn(1000,function () {
                                    phone1.show();
                                })

                                check1.fadeIn(1000,function () {
                                    check1.show();
                                })
                                agree1.fadeIn(1000,function () {
                                    agree1.show();
                                })
                                //agree1.show();
                                submit1.fadeIn(2000,function () {
                                    submit1.show();
                                })
                                square1.fadeIn(1000,function () {
                                    square1.show();
                                })
                                sp1.fadeIn(1000,function () {
                                    sp1.show();
                                })

                                $("#form1")[0].reset();

                            }, 1000)
                        })
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Неправильное имя пользователя',
                            text: 'Возникла ошибка при оформлении заказа',
                            confirmButtonColor: '#f1bf5a',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        })
                        //alert('Возникла ошибка при оформлении заказа');

                        //сбросить содержимое формы
                        $("#form1")[0].reset();

                    }
                });
        }
    })
});
// валидации формы окна popup
$('#submit2').click(function () {

    let hasError = false;

    let name2 = $('#name2');
    let phone2 = $('#phone2');
    let submit2 = $('#submit2')
    let contact2 = $('#contact2'); // свяжемся c вами
    let agree2 = $('#agree2');//  нажимая кнопку
    let errorCheck2 = $('.error-check');// подтвердите красным
    let error2 = $('.error_text1');// введите имя телефон красные
    let check2 = $('input[type=checkbox]');// квадратик
    let square2 = $('input[type=checkbox]:not(:checked) + span')// белый квадратик и галка
    let title2 = $('#title2');
    let popup = $('#popup');
    let sp2 = $('.popup__span'); // рамка квадратика красная - белая


    error2.hide();

    name2.css('border', ' 1px solid #ffffff');
    phone2.css('border', ' 1px solid #ffffff');
    square2.css('border', ' 1px solid #ffffff');
    sp2.css('border', ' 1px solid #ffffff');
    errorCheck2.hide();
    phone2.inputmask({"mask": "+7 (999) 999-99-99"});
    error2.css('color', 'red')


    if (!name2.val()) {
        name2.next().show();
        name2.css('border', '1px solid red');
        hasError = true;
    }

    if (!phone2.val()) {
        phone2.next().show();
        phone2.css('border', '1px solid red');
        hasError = true;
    }
    if (!check2.is(':checked')) {
        errorCheck2.show();
        sp2.css('border', '1px solid red');
        hasError = true;
    }
    // для подтверждения согласия до нажатия желтой кнопки
    // исчезает красная ошибка
    square2.click(function () {
            if (!check2.is(':checked')) {
                sp2.css('border', ' 1px solid #ffffff')
                errorCheck2.hide();
            }
        }
    )

    if (!hasError) {
        // ajax запрос
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {name: name2.val(), phone: phone2.val(), check: check2.checked}
        })
            .done(function (msg) {

                if (msg.success) {
                    title2.hide();
                    phone2.hide();
                    name2.hide();
                    check2.hide();
                    agree2.hide();
                    errorCheck2.hide();
                    submit2.hide();
                    square2.hide();
                    sp2.hide();
                    contact2.show();

                } else {
                    popup.hide();
                    Swal.fire({
                        icon: 'warning',
                        title: 'Неправильное имя пользователя',
                        text: 'Возникла ошибка при оформлении заказа',
                        confirmButtonColor: '#f1bf5a',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    })
                    //alert('Возникла ошибка при оформлении заказа');

                    //сбросить содержимое формы
                    $("#form2")[0].reset();

                }
            });
    }
})
























