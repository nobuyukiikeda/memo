/********
フォームのフローティングプレースホルダー
*********/
export default function() {
	const formFocus = function(_self) {
		const parentItem = $(_self).parent().parent('.form__item');
		if(!parentItem.hasClass('is-set')) {
			parentItem.addClass('is-set');
		}
	}
	const formBlur = function(_self) {
		const parentItem = $(_self).parent().parent('.form__item');
		if($(_self).val() == '') {
			parentItem.removeClass('is-set');
		}
	}
	$('.form__item input, .form__item textarea').on('focus', function() {
		formFocus(this);
	});
	$('.form__item input, .form__item textarea').on('blur', function() {
		formBlur(this);
	});
}