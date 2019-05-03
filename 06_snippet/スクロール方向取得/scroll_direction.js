export default function() {
  let start_pos = 0;
  $(window).on('scroll', function(e){
	let current_pos = $(this).scrollTop();
	if (current_pos > start_pos) {
	  console.log('down');
  } else {
	  console.log('up');
  }
  start_pos = current_pos;
});
}

