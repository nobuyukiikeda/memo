// スマホでバグあり
export default function() {
	document.addEventListener("DOMContentLoaded", function(){
		document.querySelector('input[name="target"]').onchange=changeEvent;
	},false);

	function changeEvent(event){
		var inputPrice = $('#input-price').val();
		inputPrice = inputPrice.replace(/[０-９]/g, function(s){
			return String.fromCharCode(s.charCodeAt(0) - 65248);
		});
		inputPrice = inputPrice.replace(/[^\d]/g, "");
		inputPrice = inputPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
		$("#input-price").val(inputPrice);
		if( inputPrice == "" ){
			$("#output-price").text("0");
		} else {
			$("#output-price").text(inputPrice);
		}
	}
}