jQuery(document).ready(function () {
  window.hashName = window.location.hash; // remember the hash
  window.location.hash = ''; // clear the hash
  if (window.hashName[1] != undefined) {
    $('html, body').animate({ scrollTop: $(window.hashName).offset().top - 50 }, 500);
  }

  $('.header__nav .sub-menu li a').click(function () {
    let hash = $(this).attr('href').split('#').pop();
    let item = $(document).find(`#${hash}`).length;
    if (item > 0) {
      var $el = $(this),
        id = $el.attr('href').split('#').pop();
      $('html, body').animate(
        {
          scrollTop: $(`#${id}`).offset().top - 75,
        },
        1000
      );
      return false;
    }
  });

  let subtitleLenght = $('.clients .strategics__mini').text().length;
  if (subtitleLenght == 0) {
    $('.clients .strategics__mini').hide();
  }

  $('.ticker__list').each(function () {
    let partnersClients = $(this).children().length;
    if (partnersClients == 0) {
      let index = $(this).index();
      $(this).parent().prev().find('.clients__tab').eq(index).hide();
    }
  });

  $('.footer__nav-new .sub-menu li a').click(function () {
    let hash = $(this).attr('href').split('#').pop();
    let item = $(document).find(`#${hash}`).length;
    if (item > 0) {
      var $el = $(this),
        id = $el.attr('href').split('#').pop();
      $('html, body').animate(
        {
          scrollTop: $(`#${id}`).offset().top - 75,
        },
        1000
      );
      return false;
    }
  });

  $('.modal-dop__header').click(function () {
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active');
      $(this).next().slideUp(200);
    } else {
      $('.modal-dop__item').removeClass('active');
      $('.modal-dop__body').slideUp(200);
      $(this).parent().addClass('active');
      $(this).next().slideToggle(200);
    }
  });

  $('.modal-dop__listing').each(function () {
    let lengthItem = $(this).children().length;
    if (lengthItem == 1) {
      $(this).addClass('one-item');
    }
  });

  $('.single-block-section .about-us__nav li a').on('click', function () {
    var $el = $(this),
      id = $el.attr('href');
    $('html, body').animate(
      {
        scrollTop: $(id).offset().top - 75,
      },
      1000
    );
    return false;
  });

  $('.company__effectiv-texts').each(function () {
    let height = $(this).height();
    if (height >= 154) {
      $(this).next().css('display', 'flex');
    } else {
      $(this).next().css('display', 'none');
    }
  });

  $('.company__more').click(function () {
    $(this).prev().addClass('active');
    $(this).hide();
  });

  $('.example__more').click(function () {
    $(this).prev().addClass('active');
    $(this).hide();
  });

  $('.constructor__play').click(function () {
    $(this).parent().find('picture').fadeOut(200);
    $(this).fadeOut(200);
    let srcVideo = $(this).parent().find('video').attr('data-video');
    $(this).parent().find('video').attr('src', srcVideo);
    $(this).parent().find('video').trigger('play');
    $(this).parent().addClass('active');
  });

  $('.news-decision [type="submit"]').click(function () {
    let name = $(this).parent().parent().parent().parent().parent().find('.news__title').text();
    $(this).parent().parent().parent().find('.input-hidden').val(name);
  });

  $('.about-us__nav-first li').each(function (i, elem) {
    let urlTab = $(this).attr('data-post');
    let windowUrl = window.location.href.split('#')[0];
    $(elem).attr('data-number', i + 1);
    if (urlTab && new URL(urlTab, window.location.href).href == windowUrl) {
      $(this).addClass('active');
      let number = $(this).attr('data-number');
      $(this).find('a').prepend(`<span>0${number}/</span>`);
    }
  });

  $('.about-us__nav-second li').each(function (i, elem) {
    let urlTab = $(this).attr('data-post');
    let windowUrl = window.location.href.split('#')[0];
    $(elem).attr('data-number', i + 1);
    if (urlTab && new URL(urlTab, window.location.href).href == windowUrl) {
      $(this).addClass('active');
      let number = $(this).attr('data-number');
      $(this).find('a').prepend(`<span>0${number}/</span>`);
    }
  });

  $('.header__nav .menu-item-has-children').click(function () {
    if ($(window).width() <= 991) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('.sub-menu').removeClass('active');
      } else {
        $('.header__nav .menu-item-has-children').removeClass('active');
        $('.header__nav .sub-menu').removeClass('active');
        $(this).addClass('active');
        $(this).find('.sub-menu').addClass('active');
      }
    }
  });

  $('.footer .menu-item-has-children').click(function () {
    if ($(window).width() <= 991) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).find('.sub-menu').removeClass('active');
      } else {
        $('.footer .footer__name').removeClass('active');
        $('.footer .footer__nav').removeClass('active');
        $(this).addClass('active');
        $(this).find('.sub-menu').addClass('active');
      }
    }
  });

  $('.footer .footer__name').click(function () {
    if ($(window).width() <= 991) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).parent().find('.footer__nav').removeClass('active');
      } else {
        $('.footer .footer__name').removeClass('active');
        $('.footer .footer__nav').removeClass('active');
        $('.footer .menu-item-has-children').removeClass('active');
        $('.footer .sub-menu').removeClass('active');
        $(this).addClass('active');
        $(this).parent().find('.footer__nav').addClass('active');
      }
    }
  });

  $('.solution__more').click(function () {
    $(this).prev().addClass('active');
    $(this).hide();
  });

  $('.demo-follows').val('Does not want the newsletter');

  $('.action__form-btn').click(function () {
    let follow = $(this).parent().find('.demo-follows').val().length;
    if (follow == 0) {
      $('.demo-follows').val('Does not want the newsletter');
    }
  });

  $('.team__more').click(function () {
    if ($(this).prev().hasClass('active')) {
      $(this).prev().removeClass('active');
      $(this).html('Show more');
    } else {
      $(this).prev().addClass('active');
      $(this).html('Show less');
    }
  });

  $('.team__text').each(function () {
    let height = $(this).height();
    if (height > 100) {
      $(this).next().show();
      $(this).css('max-height', '100px');
    } else {
      $(this).next().hide();
    }
  });

  $('.checkbox-politic').click(function () {
    let inputCheck = $(this).find('input').is(':checked');
    console.log(inputCheck);
    if (inputCheck == true) {
      $(this).parent().parent().find('.demo-follows').val('Wants the newsletter');
    } else {
      $(this).parent().parent().find('.demo-follows').val('Does not want the newsletter');
    }
  });

  $('.watch__video').click(function () {
    srcVideo = $(this).attr('data-urlvideo');
    $(this).hide();
    $(this).prev().attr('src', srcVideo);
    $(this).prev().show();
    $(this).prev().trigger('play');
  });

  const slidesCount = $('.example__blocks').find('.example__block').length;
  const $nav = $('.nav');
  const $navInner = $nav.find('.nav-inner');

  const updateNav = slide => $navInner.width(`${((slide + 1) / slidesCount) * 100}%`);

  $nav.on('click', function (e) {
    $slick.slick('slickGoTo', ((e.offsetX / $nav.width()) * slidesCount) | 0);
  });

  const $slick = $('.example__blocks')
    .on({
      init: (e, slick) => updateNav(slick.currentSlide),
      beforeChange: (e, slick, currSlide, nextSlide) => updateNav(nextSlide),
    })
    .slick({
      slidesToShow: 3,
      infinite: true,
      prevArrow: $('.prev-arrow'),
      nextArrow: $('.next-arrow'),

      responsive: [
        {
          breakpoint: 1340,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
          },
        },
      ],
    });

  $('.strategics__blocks').slick({
    slidesToShow: 3,
    infinite: true,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: '0px',
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow'),
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1340,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });

  let slidesCount9 = $(this).find('.new-case__zadacha-slide').length;
  let $nav9 = $(this).find('.nav');
  let $navInner9 = $nav9.find('.nav-inner');

  let updateNav9 = slide => $navInner9.width(`${((slide + 1) / slidesCount9) * 100}%`);
  $nav9.on('click', function (e) {
    $slick9.slick('slickGoTo', ((e.offsetX / $nav9.width()) * slidesCount9) | 0);
  });

  let $slick9 = $(this)
    .find('.new-case__zadacha-slider')
    .on({
      init: (e, slick) => updateNav9(slick.currentSlide),
      beforeChange: (e, slick, currSlide, nextSlide) => updateNav9(nextSlide),
    })
    .slick({
      slidesToShow: 1,
    });

  $('.blog__slider').each(function () {
    let slidesCount2 = $(this).find('.blog__block').length;
    let $nav2 = $(this).find('.nav');
    let $navInner2 = $nav2.find('.nav-inner');

    let updateNav2 = slide => $navInner2.width(`${((slide + 1) / slidesCount2) * 100}%`);
    $nav2.on('click', function (e) {
      $slick2.slick('slickGoTo', ((e.offsetX / $nav2.width()) * slidesCount2) | 0);
    });

    let $slick2 = $(this)
      .find('.blog__blocks')
      .on({
        init: (e, slick) => updateNav2(slick.currentSlide),
        beforeChange: (e, slick, currSlide, nextSlide) => updateNav2(nextSlide),
      })
      .slick({
        slidesToShow: 4,
        infinite: false,
        loop: false,
        swipeToSlide: true,

        responsive: [
          {
            breakpoint: 1340,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              arrows: false,
              infinite: false,
              loop: false,
            },
          },
        ],
      });
  });

  const slidesCount3 = $('.tools__values').find('.tools__value').length;
  const $nav3 = $('.nav');
  const $navInner3 = $nav3.find('.nav-inner');

  const updateNav3 = slide => $navInner3.width(`${((slide + 1) / slidesCount3) * 100}%`);

  $nav3.on('click', function (e) {
    $slick3.slick('slickGoTo', ((e.offsetX / $nav3.width()) * slidesCount) | 0);
  });

  const $slick3 = $('.tools__values').on({
    init: (e, slick) => updateNav3(slick.currentSlide),
    beforeChange: (e, slick, currSlide, nextSlide) => updateNav3(nextSlide),
  });

  function responsive_slider(selector, size, options) {
    if ($(window).width() < size) {
      if (!$(selector).hasClass('slick-slider')) {
        $(selector).slick(options);
      }
    } else {
      if ($(selector).hasClass('slick-slider')) {
        $(selector).slick('destroy');
      }
    }
  }

  responsive_slider('.tools__values', 767, {
    slidesToShow: 1,
    arrows: false,
    infinite: false,
  });

  $(window).resize(function () {
    responsive_slider('.tools__values', 767, {
      slidesToShow: 1,
      arrows: false,
      infinite: false,
    });
  });

  const slidesCount4 = $('.tools__bottom').find('.tools__slide').length;
  const $nav4 = $('.nav2');
  const $navInner4 = $nav4.find('.nav2-inner');

  const updateNav4 = slide => $navInner4.width(`${((slide + 1) / slidesCount4) * 100}%`);

  $nav4.on('click', function (e) {
    $slick4.slick('slickGoTo', ((e.offsetX / $nav4.width()) * slidesCount) | 0);
  });

  const $slick4 = $('.tools__bottom').on({
    init: (e, slick) => updateNav4(slick.currentSlide),
    beforeChange: (e, slick, currSlide, nextSlide) => updateNav4(nextSlide),
  });

  function responsive_slider2(selector, size, options) {
    if ($(window).width() < size) {
      if (!$(selector).hasClass('slick-slider')) {
        $(selector).slick(options);
      }
    } else {
      if ($(selector).hasClass('slick-slider')) {
        $(selector).slick('destroy');
      }
    }
  }

  responsive_slider2('.tools__bottom', 767, {
    slidesToShow: 1,
    arrows: false,
    infinite: false,
  });

  $(window).resize(function () {
    responsive_slider2('.tools__bottom', 767, {
      slidesToShow: 1,
      arrows: false,
      infinite: false,
    });
  });

  function responsive_slider3(selector, size, options) {
    if ($(window).width() < size) {
      if (!$(selector).hasClass('slick-slider')) {
        $(selector).slick(options);
      }
    } else {
      if ($(selector).hasClass('slick-slider')) {
        $(selector).slick('destroy');
      }
    }
  }

  responsive_slider3('.team__blocks', 1340, {
    breakpoint: 1340,
    slidesToShow: 3,
    infinite: true,
    prevArrow: $('.prev-arrow'),
    nextArrow: $('.next-arrow'),
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  });

  $(window).resize(function () {
    responsive_slider3('.team__blocks', 1340, {
      slidesToShow: 3,
      infinite: true,
      prevArrow: $('.prev-arrow'),
      nextArrow: $('.next-arrow'),
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            arrows: false,
          },
        },
      ],
    });
  });

  var Defaults = $.fn.select2.amd.require('select2/defaults');

  $.extend(Defaults.defaults, {
    searchInputPlaceholder: '',
  });

  var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');

  var _renderSearchDropdown = SearchDropdown.prototype.render;

  SearchDropdown.prototype.render = function (decorated) {
    // invoke parent method
    var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));

    this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));

    return $rendered;
  };

  $('.demo__select').select2({
    placeholder: 'Choose',
    allowClear: false,
    width: '100%',
    minimumResultsForSearch: Infinity,
    searchInputPlaceholder: 'Search...',
  });

  $('[data-tabs-type]').on('click', function () {
    if (!$(this).hasClass('active')) {
      var index = $(this).index();
      $(this).addClass('active').siblings().removeClass('active');
      $('[data-tabs-typecontent]').hide().eq(index).fadeIn();
    }
    $('.blog__blocks').slick('setPosition');
  });

  $('.burger').click(function () {
    $('.header__mobile').toggleClass('active');
    $('.burger').toggleClass('active');
    $('body').toggleClass('fixed');
    return false;
  });

  $('.sub-menu a').click(function (e) {
    if ($(window).width() <= 991) {
      $('.header__mobile ').removeClass('active');
      $('body').removeClass('fixed');
      $('.burger').removeClass('active');
    }
  });

  function onEntry(entry) {
    entry.forEach(change => {
      if (change.isIntersecting) {
        change.target.classList.add('element-show');
      }
    });
  }
  let options = { threshold: [0.5] };
  let observer = new IntersectionObserver(onEntry, options);
  let elements = document.querySelectorAll('.element-animation');
  for (let elm of elements) {
    observer.observe(elm);
  }

  var oldScrollY = 0;
  var div = document.querySelector('.header');

  window.addEventListener('scroll', function () {
    var scrolled = window.pageYOffset || document.documentElement.scrollTop;
    var dY = scrolled - oldScrollY;

    if (dY < 0) {
      div.classList.add('fixed');
    } else {
      div.classList.remove('fixed');
    }

    oldScrollY = scrolled;
  });

  $(window).scroll(function () {
    var sc = $(window).scrollTop();
    if (sc > 350) {
      $('.header').addClass('dop');
      setTimeout(() => {
        $('.header').css('transition', '500ms');
      }, 1);
    } else {
      if (sc == 0) {
        $('.header').removeClass('dop');
        $('.header').css('transition', '0ms');
        $('#top').fadeOut();
      }
    }
  });

  window.onload = function () {
    document.body.classList.add('loaded');
  };

  setTimeout(function () {
    $('body').addClass('loaded');
  }, 3500);

  $('.steps__header').click(function () {
    if ($(window).width() <= 767) {
      if ($(this).hasClass('active')) {
        $(this).toggleClass('active');
        $(this).removeClass('active');
        $(this).next().slideUp(300);
      } else {
        $('.steps__header').removeClass('active');
        $('.steps__body').slideUp(300);
        $(this).toggleClass('active');
        $(this).next().slideToggle(300);
      }
    } else {
      return false;
    }
  });

  $('.faq__header').click(function () {
    if ($(this).hasClass('active')) {
      $(this).toggleClass('active');
      $(this).removeClass('active');
      $(this).next().slideUp(300);
    } else {
      $('.faq__header').removeClass('active');
      $('.faq__body').slideUp(300);
      $(this).toggleClass('active');
      $(this).next().slideToggle(300);
    }
  });

  var ticker = document.querySelector('.ticker'),
    list = document.querySelector('.ticker__list');

if (ticker && list) {
    var clone = list.cloneNode(true);
}

  /* ticker.append(clone); */

  $('.about-us__nav li a').on('click', function () {
    var $el = $(this),
      id = $el.attr('href');
    $('html, body').animate(
      {
        scrollTop: $(id).offset().top - 100,
      },
      1000
    );
    return false;
  });

  $('.about__btn-scroll').on('click', function () {
    var $el = $(this),
      id = $el.attr('href');
    $('html, body').animate(
      {
        scrollTop: $(id).offset().top - 75,
      },
      1000
    );
    return false;
  });

  $('.clients__tab:visible').eq(0).trigger('click');
});

$('.home-scroll').on('click', function () {
  var $el = $(this),
    id = $el.attr('href');
  $('html, body').animate(
    {
      scrollTop: $(id).offset().top - 0,
    },
    500
  );
  return false;
});
