export default function() {
	// 金額正規化関数
	function toPrice(p){
	  p = Number(p);
	  p = p.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	  return p;
	}
}