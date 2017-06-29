$(function () {
 //変数セット
 var $elem = $('.switch');
 var sp = '_sp.';
 var pc = '_pc.';
 var replaceWidth = 767; //ブレイクポイント設定
 
 function imageSwitch() {
 //ウィンドウサイズ取得
 var windowWidth = parseInt($(window).width());
 //.switchに適用
 $elem.each(function () {
 var $this = $(this);
 if (windowWidth >= replaceWidth) {
 $this.attr('src', $this.attr('src').replace(sp, pc));
 } else {
 $this.attr('src', $this.attr('src').replace(pc, sp));
 }
 });
 }
 imageSwitch();
 
 //ディレイ設定(リサイズの実行タイミングを遅延させる)
 // var delayStart;
 // var delayTime = 200;
 // $(window).on('resize', function () {
 // clearTimeout(delayStart);
 // delayStart = setTimeout(function () {
 // imageSwitch();
 // }, delayTime);
 // });
});