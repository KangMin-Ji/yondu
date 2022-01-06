$(function () {
  //scroll function
  $(window).scroll(function () {
    let curr = $(window).scrollTop();
    total = $('body').outerHeight() - $(window).height();
    $('.curr_guage .guage_count').html(parseInt(curr / total * 100) + "%");

    if (curr > 0) {
      $('.curr_guage').addClass('on');
    } else {
      $('.curr_guage').removeClass('on');
    }
    let repeat = 30;
    let degree = parseInt((curr) / total * 360) * repeat;
    let _deg = degree + 'deg';

    $('.curr_guage img').css('transform', 'rotate(' + _deg + ')');
  });

  $('header .curr_guage, footer .scroll_top').click(function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0,
    });
  });

  $('#section_1').click(function () {
    offset = $('.section_1').offset();
    $('html').animate({
      scrollTop: offset.top
    });
  });
  $('#section_2').click(function () {
    offset = $('.section_2').offset();
    $('html').animate({
      scrollTop: offset.top
    });
  });
  $('#section_4').click(function () {
    offset = $('.section_4').offset();
    $('html').animate({
      scrollTop: offset.top
    });
  });
  $('#section_5').click(function () {
    offset = $('.section_5').offset();
    $('html').animate({
      scrollTop: offset.top
    });
  });

  $('.motion01').each(function (index, item) {
    let triggerEl = $(this).data('trigger');
    let yVal = $(this).data('y') ? $(this).data('y') : 30;
    gsap.to(item, {
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 80%",
        end: "bottom top",
        scrub: 1,
      },
      y: yVal,
    });
  });
  
  $('.motion02').each(function (index, item) {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom top",
      },
      y: 30,
      opacity: 0,
    });
  });


  t1 = gsap.timeline({
    paused: true
  });
  t1.from('header .menu_wrap .menu a', {
    yPercent: 60,
    stagger: 0.1,
    duration: 0.4,
    opacity: 0,
    delay: 0.4,
  });
  
  let count = false;
  $('header .menu_btn').click(function (e) {
    e.preventDefault();
    if (count === false) {
      $('header .menu_wrap').stop().animate({
        top: 0,
      });
      $('header .btn_wrap .second').addClass('none');
      $('header .btn_wrap .first, header .btn_wrap .bottom_line').addClass('rotate');
      t1.play();
      count = true;
    } else if (count === true) {
      t1.reverse();
      $('header .menu_wrap').stop().delay(800).animate({
        top: '-100vh',
      });
      $('header .btn_wrap .second').removeClass('none');
      $('header .btn_wrap .first, header .btn_wrap .bottom_line').removeClass('rotate');
      count = false;
    }
  });


  //main_vis motion
  function txtWave() {
      txtSplit = $('.subSwiper .swiper-slide-active .split');
      txt = new SplitType(txtSplit, {
        types: 'words, chars',
        absolute: true,
      });
      gsap.from(txt.chars, {
        opacity: 0,
        xPercent: -10,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2"
      });

  }
  //guage bar
  function guage() {

    $('.main_vis .swiper-pagination .guage_bar .bar').css({
      width: 0
    }).stop().animate({
      width: '100%'
    }, 4000, function () {
      mainSwiper.slideNext();
    });
  }

  //swiper
  const subSwiper = new Swiper('.subSwiper', {
    slidesPerView: 1,
    loop: true,
    effect: 'fade',
  });
  const mainSwiper = new Swiper('.mainSwiper', {
    slidesPerView: 1,
    loop: true,
    speed: 1000,
    on: {
      init: function () {
        guage();
      }
    },
    pagination: {
      el: ".main-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".main-button-next",
      prevEl: ".main-button-prev",
    },
  });

  mainSwiper.controller.control = subSwiper;
  subSwiper.controller.control = mainSwiper;

  mainSwiper.on('slideNextTransitionStart', function () {
    txtWave();
    guage();
  });

  mainSwiper.on('slidePrevTransitionStart', function () {
    txtWave();
    guage();
  });
  subSwiper.on('slideNextTransitionStart', function () {
    txtWave();
  });

  subSwiper.on('slidePrevTransitionStart', function () {
    txtWave();
  });

  const secondSwiper = new Swiper('.secondSwiper', {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: ".second-button-next",
      prevEl: ".second-button-prev",
    },
    pagination: {
      el: ".section_4 .swiper-pagination .second-pagination",
    },
    breakpoints: {

      768: {
        slidesPerView: 1.5,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        // speed: 1000,
      },
    },
  });



  //section_5 tab
  $('.section_5 .keyword .dept01').click(function (e) {
    e.preventDefault();
    subWrap = $(this).siblings('.sub_wrap');
    h = subWrap.children('ul').outerHeight();

    if ($(this).hasClass('on')) {
      subWrap.stop().animate({
        height: 0
      }, 500);
      $('.section_5 .keyword .dept01').removeClass('on');
      $('.section_5 .keyword .sub_wrap').stop().animate({
        height: 0
      }, 500);
    } else {
      $('.section_5 .keyword .dept01').removeClass('on');
      $('.section_5 .keyword .sub_wrap').stop().animate({
        height: 0
      }, 500);
      $(this).addClass('on');
      subWrap.stop().animate({
        height: h
      }, 500);
    }
  });







}); //end