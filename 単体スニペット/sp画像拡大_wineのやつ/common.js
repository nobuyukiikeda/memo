/****************
IE8対策
****************/
var noFlex = $('.no-flexbox');
if(noFlex.length) {
    // console.log('ie8');
    var img = noFlex.find('img');
    img.each(function() {
        var type = $(this).attr('src').split('.');
        if(type[type.length - 1].toLowerCase() == 'svg') {
            type[type.length - 1] = 'png';
            var newImg = '';
            for (var i = 0;i < type.length;i++) {
                if(i == 0) {
                    newImg = type[i];
                } else {
                    newImg = newImg + '.' + type[i];
                }
            }
            $(this).attr('src', newImg);
        }
    });
    $('.item-btn').click(function() {
        $('.modal').addClass('modal-open');
    });
    $('.item-img').click(function() {
        return false;
    });
}


/****************
デバイスごとの挙動
****************/
$(window).on('resize',function() {
    responsive();
});

$(function() {
    responsive();
});

function responsive() {
    if(noFlex.length) {
        return;
    } else {
        if($(window).width() > 1023) {
            // pc虫眼鏡
            itemLens();
            $('#photo-zoom').remove();
        } else {
            // カート変更・テーブル組み換え
            responsiveTable()
            // spナビトグル
            spToggle();
            // sp時はクリックで画像拡大
            itemZoom();
        }
    }
}



/****************
pc時画像拡大
****************/
function itemLens() {
    // 商品画像のaタグを無効に
    $('.item-img').on('click', function() {
        return false;
    });
     // カーソルで拡大表示
    $('.js-lens-cell').on({
        'mouseenter': function() {
            // 商品画像にカーソルを合わせた時の挙動
            // ズームアップ画像の情報
            var zoomArea = $(this).parent('.item-img').parent('.item-img-wrap').find('.js-zoom-area'),
                zoomImg = zoomArea.find('img');

            // 本体画像の情報と倍率
            var img = $(this).find('img'),
                lens = $(this).find('.js-lens'),
                size = lens.width(),
                scale = 512 / size;

            // クラス付与して、ズームアップ画像を表示
            // zoomArea.addClass('active');
            zoomArea.fadeIn('fast');

            // オリジナルサイズの画像を取得してセット
            var src = $(this).find('img').attr('data-originSrc');
            zoomImg.attr('src', src);

            // 画像のサイズを調整
            zoomImg.width(img.width() * scale);

        },
        'mouseleave': function() {
            // 商品画像からカーソルを外した時の挙動
            // $(this).parent('.item-img').parent('.item-img-wrap').find('.js-zoom-area').removeClass('active');
            $(this).parent('.item-img').parent('.item-img-wrap').find('.js-zoom-area').fadeOut('fast');
        },
        'mousemove': function(e) {
            // 対象の基本情報を取得
            var item = $(this).parent('.item-img').parent('.item-img-wrap'),
                lens = $(this).find('.js-lens'),
                size = lens.width(),
                scale = 512 / size;

            // プレビューエリアの限界値を設定
            var xmax = $(this).find('img').width() - size,
                ymax = $(this).find('img').height() - size;

            // カーソルの位置を取得
            var rect = this.getBoundingClientRect(),
                mouseX = e.pageX,
                mouseY = e.pageY,
                positionX = rect.left + window.pageXOffset,
                positionY = rect.top + window.pageYOffset,
                offsetX = mouseX - positionX,
                offsetY = mouseY - positionY;

            // カーソルに合わせてルーペの位置を設定
            var left = offsetX - (size / 2),
                top = offsetY - (size / 2);
            if(left > xmax) {
                left = xmax;
            } else if(left < 0) {
                left = 0;
            }
            if(top > ymax) {
                top = ymax;
            } else if(top < 0) {
                top = 0;
            }


            lens.css({
                'top': top + 'px',
                'left': left + 'px'
            });
            item.find('.js-zoom-area img').css({
                'margin-left': -(left * scale) + 'px',
                'margin-top': -(top * scale) + 'px'
            });

            // zoomImage.style.marginLeft = -(left * scale) + 'px';
            // zoomImage.style.marginTop = -(top * scale) + 'px';

        }
    });
}


/****************
sp時画像拡大
****************/
// ズームのステータス初期値を設定
var zoomLevel = 0;
// 拡大画像のサイズの基準値を設定
var originItemHeight = 1843;
// ズームの倍率の初期値を設定
var zoomScale = 2.5;
// ズームテキストの表示フラグ
var zoomTextFlg = 0;

var touchStart = 0;

// 商品画像をディスプレイに合わせる
var windowW = $(window).width(),
    windowH = $(window).height();

function itemZoom () {
    $('#photo-zoom-img').height(windowH).width('auto');

    // ズームの倍率を調整
    if(windowH > 737) {
        zoomScale = originItemHeight / windowH;
    }

    // 拡大画面への移行
    // 画像をタッチした瞬間
    // $('.js-lens-cell').on('click', function() {
    //     touchStart = event.changedTouches[0].pageY;
    // });
    // 画像から指を離した瞬間
    $('.js-lens-cell').on('click', function() {
        // var touchEnd = event.changedTouches[0].pageY;
        // var endDiff = touchEnd - touchStart;
        // スクロール量が大きい時はタップだと判断しない
        // if( endDiff < -8 | endDiff > 8 ) {
        //     return;
        // } else {
            zoomOpen(this);
            zoomLevel = 1;
            if(zoomTextFlg == 0) {
                $('#photo-zoom-text').show();
                zoomTextFlg = 1;
            }
            // 拡大画面で元画面がスクロールしないように
            $('html, body').css({'overflow': 'hidden'});
            // 一定時間だけ操作テキスト表示
            setTimeout(function() {
                $('#photo-zoom-text').fadeOut();
            }, 3000);
            return false;
        // }
    });
}
// 拡大状態でクリックした時の処理
var photoZoomFlg = true;
$('#photo-zoom-img').on('click', function(e) {
    console.log(photoZoomFlg);
    photoZoomFlg = false;
    // if(photoZoomFlg == false) {
    //     return false;
    //     console.log(photoZoomFlg);
    
    // }
    // 対象の高さを取得
    var targetW = $('#photo-zoom-img').width();
    var targetH = $('#photo-zoom-img').height();
    console.log(zoomLevel);

    if(zoomLevel == 1) {

        // ズームしていない場合
        // クリックした絶対位置を取得
        var clickX = event.pageX;
        var clickY = event.pageY;
        // クリックした要素の位置を取得
        var clientRect = this.getBoundingClientRect();
        var positionX = clientRect.left + window.pageXOffset;
        var positionY = clientRect.top + window.pageYOffset;
        // クリックした要素内の位置を取得
        var x = clickX - positionX;
        var y = clickY - positionY;
        // 対象の半分のサイズを取得
        var diffX = (x - (targetW / 2)) * zoomScale;
        var diffY = (y - (targetH / 2)) * zoomScale;
        // ズーム端の最大値を設定
        var maxX = ((targetW * zoomScale) - windowW) / 2;
        var maxY = ((targetH * zoomScale) - windowH) / 2;

        if(diffX > maxX) {
            diffX = maxX;
        } else if(diffX < - maxX) {
            diffX = -maxX
        }

        if(diffY > maxY) {
            diffY = maxY;
        } else if(diffY < - maxY) {
            diffY = -maxY
        }

        // クリックした場所を拡大
        var transform = 'translate(' +  (- diffX) + 'px, ' + (- diffY) + 'px) scale(' + zoomScale + ', ' + zoomScale + ')';
        $('#photo-zoom-img').css({
            'transform': transform
            // 'transform': 'scale(2)'
        });
        zoomLevel = 2;
        return false;
    } else {
        // ズームしていた場合元のサイズに戻す
        $('#photo-zoom-img').css({
            'transform': 'translate(0, 0) scale(1, 1)'
        });
        zoomLevel = 1;
        return false;
    }
    // setTimeout(function() {
    //     photoZoomFlg = true;
    // }, 1000);
});

$('#photo-zoom-close').on('click', function() {
    zoomClose();
    // 元画面のスクロール操作を元に戻す
    $('html, body').css({'overflow': 'auto'});
});

function zoomOpen(t) {
    var src = $(t).find('img').attr('data-originSrc');
    $('#photo-zoom-img').attr('src', src);
    $('body').addClass('zoom-open');
}
function zoomClose() {
    $('html, body').css({'overflow': 'auto'});
    $('body').removeClass('zoom-open');
    $('#photo-zoom-img').css({
        'transform': 'translate(0, 0) scale(1, 1)'
    });
    $('#photo-zoom-img').attr('src', '');
    zoomLevel = 1;
}

/****************
spナビトグル
****************/
function spToggle() {
    $('#sp-toggle-btn').on('click', function() {
        if($('body').hasClass('menu-open')) {
            $('body').removeClass('menu-open');
            $('html, body').css('overflow', 'visible');
        } else {
            $('body').addClass('menu-open');
            $('html, body').css('overflow', 'hidden');
        }
    });

    $('#sp-menu-overlay').on('click', function() {
        $('body').removeClass('menu-open');
        $('html, body').css('overflow', 'visible');
    });
    $('.sp-menu-item a').on('click', function() {
        var src = $(this).attr('href');
        if(src.indexOf('#') === 0) {
            $('body').removeClass('menu-open');
            $('html, body').css('overflow', 'visible');
        }
    });
}

/****************
カート変更・テーブル組み換え
****************/
function responsiveTable() {
    // カートボタンを変更
    var pcSrc = $('#header-cart').attr('src');
    var spSrc = pcSrc.replace('icon_cart.jpg', 'icon_cart_sp.jpg');
    $('#header-cart').attr('src', spSrc);

    // テーブル組み換え
    if(!$('.table-sp').length) {
        var table = $('.item-data');
        table.each(function() {
            var th4 = $(this).find('.item-data-title').find('th:nth-child(4)'),
                th5 = $(this).find('.item-data-title').find('th:nth-child(5)'),
                th6 = $(this).find('.item-data-title').find('th:nth-child(6)'),
                td4 = $(this).find('.item-data-value').find('td:nth-child(4)'),
                td5 = $(this).find('.item-data-value').find('td:nth-child(5)'),
                td6 = $(this).find('.item-data-value').find('td:nth-child(6)'),
                table = '<table><tr>' + th4 + th5 + th6 + '</tr><tr>' + td4 + td5 + td6 + '</tr></table>';
            $(this).after('<table class="item-data table-sp"><tr class="item-data-title"></tr><tr class="item-data-value"></tr>');
            var target = $(this).siblings('.table-sp'),
                targetTitle = target.find('.item-data-title'),
                targetValue = target.find('.item-data-value');
            targetTitle.append(th4, th5, th6);
            targetValue.append(td4, td5, td6);
        });
    }
}





/****************
共通
****************/
// 年齢確認ポップアップ
function confirmAge(t) {
    $('body').addClass('modal-open');
    var url = $(t).attr('data-url');
    $('.modal-btn-submit').attr('href', url);
    return false;
}

function modalClose() {
    $('body').removeClass('modal-open');
    $('.modal-btn-submit').attr('href', '');
}


$('.item-btn').on('click', function() {
    confirmAge(this);
});
$('#modal-overlay, .modal-btn-cancel').on('click', function() {
    modalClose();
});
$('.modal-btn-submit').on('click', function() {
    if(!$(this).attr('data-url') == '') {
        window.location.href = $('this').attr('data-url');
    }
});


// ナビの画像を変更
$('.nav-child-item a').on('mouseover', function() {
    var src = $(this).attr('data-image'),
        t = $(this).parents('.nav-child-content').siblings('.nav-child-img').find('img');
    t.attr('src', src);
});

//ナビゲーションスクロール追従
// var $headerHeight = $('.header').outerHeight(),
//     $nav = $('.nav');

// $(window).on('scroll', headerMin);
// function headerMin(){
//     var current_pos = $(this).scrollTop();
//     if (current_pos > $headerHeight) {
//       $($nav).addClass('is-fixed');
//     } else {
//       $($nav).removeClass('is-fixed');
//     }
// }

// スムーススクロール シングルページのみスムーススクロール実装
var offsetY = 0;
if($('.single').length) {
    // ページ内リンクのみ取得
    $('a[href^="#"]').on('click', function() {
        var href = $(this).attr('href');
        var target = $(href == "#" || href == '' ? 'html' : href);
        // 移動先の値
        var targetY = target.offset().top + offsetY;
        var targetScroll = targetY < 2000 ? 2000 : targetY;
        var time = targetScroll / 5;
        // スクロールアニメーション
        $('html, body').animate({scrollTop: targetY}, time, 'swing');
        // window.history.pushState(null, null, $(this).attr('href');
        return false;
    });
    // スムーススクロールtotop
    $('#totop').on('click', function() {
        var top = $(window).scrollTop()  < 2000 ? 2000 : $(window).scrollTop();
        var time = top / 5;
        $('html,body').animate({scrollTop: $('body').offset().top}, time, 'swing');
        return false;
    });
} else {
    // スムース無しtotop
    $('#totop').on('click', function() {
        $('html,body').scrollTop(0);
        return false;
    });
}









