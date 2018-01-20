// スムーズスクロール
export default function() {
  const offsetY = -10;
  const time = 500;
  // ページ内リンクのみ取得
  $('a[href^="#"]').on('click', function() {
    let href = $(this).attr('href');
    let target = $(href == "#" || href == '' ? 'html' : href);
    // 移動先の値
    let targetY = target.offset().top + offsetY;
    // スクロールアニメーション
    $('html, body').animate({scrollTop: targetY}, time, 'swing');
    // window.history.pushState(null, null, $(this).attr('href');
    return false;
  });
}
 

