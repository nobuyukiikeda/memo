export default function() {
    // 可変ヘッダー
  const $win = $(window);
  const $header = $('#header')
  const $main = $('#main');
  const $dHeight = $('#site-description').outerHeight();
  const $hHeight = $header.outerHeight();
  $win.on('scroll', function(){
    if($win.scrollTop() > $dHeight){
      $header.addClass('is-fixed');
      $main.css('margin-top', $hHeight);
    } else {
      $('#header').removeClass('is-fixed');
      $main.css('margin-top', 0);
    }
  });
}




  