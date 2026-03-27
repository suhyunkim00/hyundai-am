$(function () {
  // 변수
  const body = $("body");
  const gotoTop = $(".gototop");
  const hd = "#hd-header";
  let scTop = $(window).scrollTop();


  // 푸터 복제
  // let ftSection = "<section class='section fp-auto-height' id='main-ft'></section>";
  let ftSection = "<section class=\"section fp-auto-height\" id=\"main-ft\"></section>";
  let ftElement = $(".footer-container").clone();

  let fullPageCreated = false;

  normalFunction();
  fullPageResize();
  $(window).resize(function () {
    normalFunction();
    fullPageResize();
  });

  function createFullPage() {
    if (!fullPageCreated) {
      $("#hd-main").append(ftSection);
      $("#main-ft").append(ftElement);
      $("#hd-main").fullpage({
        // 풀페이지 옵션 추가
        licenseKey: null,
        menu: "#fp-nav-hor",
        anchors: ["Main","Product","Sustainability","News","Career", "Info"],
        afterLoad: function(origin, destination, direction){
          let loadedSection = this;
          console.log(destination.index);
          $("#pf-gnb-hor > a").removeClass("active");
          $("#pf-gnb-hor").fadeIn(500);
          if(destination.index == 0) {
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(0).addClass("active");
          } else if(destination.index == 1) {
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(1).addClass("active");
          } else if(destination.index == 2) {
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(2).addClass("active");
          } else if(destination.index == 3) {
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(3).addClass("active");
          } else if(destination.index == 4) {
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(4).addClass("active");
          } else if(destination.index == 5) {
            $("#pf-gnb-hor").fadeOut(500);
          }
        }
      });
      fullPageCreated = true;
    }
  }

  function fullPageResize() {
    if(!body.hasClass("mo")) {
      createFullPage();
      $(".gototop").click(function() {
        $.fn.fullpage.moveTo(1);
      });
    } else {
      $(".gototop").click(function() {
        $("html, body").stop().animate({
          scrollTop: 0
        }, 600, "linear");
      });
      if(fullPageCreated) {
        $.fn.fullpage.destroy("all"); // 풀페이지 날리기
        $("#pf-gnb-hor").fadeOut(500);
        $("#main-ft").remove();
        fullPageCreated = false;
      }
    }
  }

  // 모바일에서만 실행되어야함
  function normalFunction() {
    if(body.hasClass("mo")) {
      // 각 섹션별 헤더디자인 구현(다크모드)
      // 1. each()문법으로 완성
      let sections = []; // 각 섹션별 (.wh) 위치를 담을 배열
      const updateSectionsPos = () => {
        sections = [];
        $(".main-section.wh").each(function () {
          sections.push({
            top: $(this).offset().top,
            bottom: $(this).offset().top + $(this).height()
          });
        });
        // console.log(sections);
      }
      updateSectionsPos();
      $(window).on("resize", updateSectionsPos);
      $(window).on("scroll", () => {
        scTop = $(window).scrollTop();
        let isDark = false; //배경이 어두운 영역이 맞는지 확인
        for(const section of sections) {
          if(scTop >= section.top && scTop < section.bottom) {
            isDark = true;
            break;
          }
        };
        if(isDark) { // == true
          $(hd).addClass("dark-mode");
        } else {
          $(hd).removeClass("dark-mode");
        }
      });
    }
  }

}); //전체 제이쿼리