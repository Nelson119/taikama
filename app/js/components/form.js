'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/
app.partial.form = function($, container){
	container.on('page:update' , function(page, menu){
		container.addClass('loaded');
	});
	$('form', container).on('submit', function(e){
		$.post($('form', container).attr('action'), $('form', container).serialize(), function (r) {
			if (!r.success) {
				alert(r.message);
				// $("#loading").fadeOut();
			} else {
				$('.veno.confirm').trigger('click');
			}
			$('input[type=text]').val('');
			grecaptcha.reset();
		}, "json");
		e.preventDefault();
		e.stopPropagation();
		return false;
	});
	$('.g-recaptcha img', container).on('click', function(e){
		
		if (!checkEmpty() || !checkFormat()) {
			e.preventDefault();
			e.stopPropagation();
			return false;
		}
		
	});
	//檢查格式
	function checkFormat() {
		var message = '';
		$('input[data-validate],textarea[data-validate]').each(function (index, element) {
			// new RegExp('ab+c', 'i');
			var regexp = new RegExp($(element).data('validate'), 'i');
			var value = $(element).val();
			if (!regexp.test(value)) {
				message = fields[element.name] + '的格式不正確，請重新輸入';
				return false;
			}
		});
		if (message !== '') {
			alert(message);
			message = '';
			return false;
		} else {
			return true;
		}
	}
	
	//檢查未填的欄位
	function checkEmpty() {
		var flag = true;
		var obj = '', message = '';
		$('input[required]:not([type=radio]):not([type=checkbox]),select[required],textarea[required]').each(function (index, element) {
			if ($(element).val() === '') {
				if (element.tagName.toLowerCase() === 'select') {
					message = '請選擇' + fields[element.name];
				} else {
					message = '請填寫' + fields[element.name];
				}
				obj = element.name;
				flag = false;
				return false;
			}
		});
		if (flag) {
			$('[type=radio][required],[type=checkbox][required]').each(function (index, element) {
				var group = $(element).attr('name');
				if ($('[name=' + group + ']:checked').length === 0) {
					message = '請勾選' + fields[group];
					obj = group;
				}
			});
		}
		if (message !== '') {
			alert(message);
			$("[name=" + obj + "]").focus();
			message = '';
			return false;
		} else {
			return true;
		}
	}
	window.YourOnSubmitFn = function(){
		$('form', container).trigger('submit');
	};
};
var fields = {
	'uInvoiceNumber': '發票號碼',
	'uName': '真實姓名',
	'uPhone': '手機號碼',
	'uEmail': '電子信箱',
	'uAddress': '收件地址',
	'read': '已詳細閱讀注意事項',
	'term': '資料有任何錯誤，將視為棄權',
};
