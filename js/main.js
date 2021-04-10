$(document).ready(function(){

  //main-visual slide
  const slides = $('.main_slide');
  let timer;
  let indexNum = 0;
  const indi = $('.indi');
  let inHtml = '';

  //.indi에 a태그 생성
  for(let i=0; i<3; i++){
    inHtml = inHtml + `<a href="#">${i}</a>`;
  };
  indi.html(inHtml);

  slides.hide();
  slides.eq(indexNum).fadeIn(500);

  //슬라이드 보여주는 함수
  function showSlide(slideIndex){
    slides.fadeOut(500);
    slides.eq(slideIndex).fadeIn(500);
    indexNum = slideIndex;
    indi.children('a').removeClass('on');
    indi.children('a').eq(slideIndex).addClass('on');
  };

  //5초 지나면 다음이미지 나타나게 자동으로
  function startSlide(){
    timer = setInterval(function(){
      let nextSlide = (indexNum+1) % 3;
      showSlide(nextSlide);
    },5000);
  };

  startSlide();

  //indi에 a태그 눌렀을 때 해당 슬라이드로 이동
  indi.children('a').on('click',function(e){
    e.preventDefault();
    showSlide($(this).index());
  });

  //이전 다음 버튼 눌렀을 때 슬라이드 움직이기
  $('.main_nav a').on('click',function(e){
    e.preventDefault();
    //다음 버튼
    if($(this).hasClass('next')){
      if(indexNum==2) {
        showSlide(0);
      }
      else {
        showSlide(indexNum + 1);
      }
    }
    //이전 버튼
    else{
      if(indexNum==0){
        showSlide(2);
      }
      else {
        showSlide(indexNum - 1);
      }
    }
  });

  //easeScroll
    $("html").easeScroll({
      frameRate: 60,
    animationTime: 1800,
    stepSize: 100,
    pulseAlgorithm: 1,
    pulseScale: 8,
    pulseNormalize: 1,
    accelerationDelta: 20,
    accelerationMax: 1,
    keyboardSupport: true,
    arrowScroll: 50,
    touchpadSupport: true,
    fixedBackground: true
    });

    //스크롤을 내리면 헤더가 숨겨지고, 스크롤을 올리면 헤더가 나타나도록
    let didScroll;
    let lastScrollTop = 0;
    let delta = 5; //동작구현위치
    let navbarHeight = $('header').outerHeight(); //영향받을 요소선택
    //스크롤 시에 사용자가 스크롤 했다는 것을 알림
    $(window).scroll(function(event){
      didScroll = true;
    });
    //hasScrolled()를 실행하고 didScroll 상태를 재설정
    setInterval(function(){
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);
    //동작을 구현
    function hasScrolled(){
      let st = $(this).scrollTop();
    if(Math.abs(lastScrollTop-st)<=delta)
      return; //delta보다 더 스크롤되었는지 확인
    //scroll down
    if(st>lastScrollTop && st > navbarHeight) {
      $('header').css({'top':'-80px'});
    }
    //scroll up
    else {
      if(st + $(window).height() < $(document).height()) {
        $('header').css({'top':'0'});
      }
    }
    lastScrollTop = st;
    };

    //서브메뉴
    $('.togglebar').on('click',function(){
      $('nav').addClass('on');
      $('.nav_background').fadeIn(500);
    });
    $('.btn_close').on('click',function(){
      $('nav').removeClass('on');
      $('.nav_background').fadeOut(500);
    });

    //스크롤값을 받아서 각 영역에 클래스 on
    $(window).on('scroll',function(){
      let headH = $('header').height();
      let winw = $(window).width();
      let sct = $(this).scrollTop();
      let proTop = $('.product').offset().top;
      let homeTop = $('.home_office').offset().top;
      if(sct>proTop-400) {
        $('.product').addClass('on');
      }
      if(sct>homeTop-500) {
        $('.home_office').addClass('on');
      }
      if(sct>homeTop-200) {
        $('#homeoffice_item01').addClass('on');
        $('#homeoffice_item02').addClass('on');
        $('#homeoffice_item03').addClass('on');
      }
      if(sct>homeTop+400) {
        $('#homeoffice_item04').addClass('on');
        $('#homeoffice_item05').addClass('on');
        $('#homeoffice_item06').addClass('on');
      }
      //480~767px일 때 
      if(winw >= 480 && winw < 768){
        if(sct>homeTop-200) {
          $('#homeoffice_item04').addClass('on');
        $('#homeoffice_item05').addClass('on');
        $('#homeoffice_item06').addClass('on');
        }
      }
      //~480px일 때 
      if(winw < 480){
        if(sct>homeTop-200) {
          $('#homeoffice_item04').addClass('on');
        $('#homeoffice_item05').addClass('on');
        $('#homeoffice_item06').addClass('on');
        }
      }
      //헤더에 클래스 on
      if(sct>=headH) {
        $('header').addClass('on');
      }
      else {
        $('header').removeClass('on');
      }
    });

    //footer language span 클릭하면 클래스 on
    $('.language>div>span').on('click',function(){
      $('.language').toggleClass('on');
    });
    
});