$(function(){
  let visualBtn = ".v-page-btn";
  let visualWrap = ".visual-wrap";
  let activeNum = 0;
  let visualLeftPos = 0;
  // console.log(visualLeftPos);
  // 2번 버튼을 클릭하면 visualWrap의 left좌표가 -100%
  $(visualBtn).click(function(){
    activeNum = $(this).parent().index();
    visualLeftPos = -(activeNum * 100) + "%";
    // console.log(activeNum, visualLeftPos);
    $(visualWrap).css("left", visualLeftPos);
  });
});