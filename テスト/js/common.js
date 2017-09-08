var token = '1677079382324572|7zJxMZ8tnJla2_X3ni6nUS9fdiU';
var url = 'https://s-chop.me/';


$(function(){
    $.ajax({
        url: 'https://graph.facebook.com/v2.7/?id=' + url + '&access_token=' + token,
        dataType:'jsonp',
        cache: false
    }).done(function(data){
        // var cnt = data.share.share_count;
        var urlId   = data.id;
        var count = 0;
        console.log(data);
        $('table.like_list').append('<tr><td>' + urlId +'</td><td>'+ count +'</td></tr>');
    });
});

// var share = "https://graph.facebook.com/?id=https://s-chop.me/&access_token=" + access_token;
// console.log(share);

// function test(){
//   return $.ajax({
//     type: 'GET',
//     url: share
//   })
// }

// test().done(function(result){
//   console.log(result);
// }).fail(function(result){
//   console.log("eeee");
// });