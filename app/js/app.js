'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global  $, jQuery, TweenMax */
var app = {};
app.partial = {};

if($ || jQuery){
	app.$ = $.noConflict() || jQuery.noConflict();
}
(function($){
	$(function(){
		
		// 定義每個元件
		$.each(app.partial, function(name, init){
			var cont = $('[role='+name+']');
			init($, cont);
			cont.trigger('page:update');
		});
		app.imageReload.callback = function(){
			$('[role=content]').addClass('loaded');
		};
		app.imageReload.init();
	
	

		// if(!Cookies.get('over18')){
		// }

		$('header .btn1,header .btn2,[role=kv] .btn1,[role=kv] .btn2').on('click', function(){
			var to = $(this).attr('href').replace(/[#]/,'');
			// console.log($('[role='+to+']'));
			TweenMax.to('html,body',0.25,{
				scrollTop: $('[role='+to+']').offset().top
			});
		});


	});
	var vb = $('.veno:not(.age):not(.confirm)').venobox({
		overlayClose: false,
		cb_post_open  : function(obj, gallIndex, thenext, theprev){
			$('.veno-close').on('click', function(){
				vb.VBclose();
			});
		}
	
	});

	var vb18 = $('.veno.age, .veno.age').venobox({
		overlayClose: false,
		bgcolor: 'none',
		border: 0,

		cb_post_open  : function(obj, gallIndex, thenext, theprev){
			$('.vbox-inline.figlio').css('border', 0).css('overflow','visible');
			$('.veno-close').on('click', function(){
				Cookies.set('over18', 1, { expires: 7, path: '' });
				vb18.VBclose();
			});
			$('[role="landing"] .no').on('click', function(){
				vb18.VBclose();
				$('.veno.age.no').trigger('click');
			});
		},
		cb_post_close  : function(obj, gallIndex, thenext, theprev){
			// $('html.ie .main-content:not(.fullpage-wrapper),html.desktop .main-content:not(.fullpage-wrapper)').fullpage({
			// 	anchors:['', 'prize', 'cta', 'rule', 'event', 'notice7']
			// });
		},
		cb_pre_close  : function(obj, gallIndex, thenext, theprev){
			if(Cookies.get('over18')*1 === 0){
				// console.log(Cookies.get('over18'));
				return false;
			}
			TweenMax.to('html, body',0.01,{
				scrollTop: 0
			});
		}
	});
	var vbcf = $('.veno.confirm').venobox({
		overlayClose: false,
		bgcolor: 'none',
		border: 0,

		cb_post_open  : function(obj, gallIndex, thenext, theprev){
			$('.vbox-inline.figlio').css('border', 0);
			$('.veno-close').on('click', function(){
				vbcf.VBclose();
			});
		},
		cb_post_close  : function(obj, gallIndex, thenext, theprev){
			$.fn.fullpage.destroy('all');
			$('html.desktop .main-content').fullpage({
				anchors:['', 'prize', 'cta', 'rule', 'event', 'notice7']
			});
		}
	});
	$('.veno.age.landing:eq(0)').trigger('click');
	Cookies.set('over18', 0, { expires: 7, path: '' });
	$('header .btn1, header .btn2').on('click', function(){
		var toggle = document.getElementById('mobileMenuToggle');
		toggle.checked = !toggle.checked;
	});
	var vb = $('.veno-list').venobox({
		overlayClose: false,
		bgcolor: 'none',
		border: 0,
		cb_post_open  : function(obj, gallIndex, thenext, theprev){
			$('.vbox-inline.figlio').css('border', 0).css('overflow','visible');
			$('.veno-close').on('click', function(){
				vb.VBclose();
			});
		}
	
	});
}(app.$));




