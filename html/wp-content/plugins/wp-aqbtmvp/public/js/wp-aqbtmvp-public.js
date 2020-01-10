(function( $ ) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */
	$( document ).ready(
		function () {
			$('#send-bug').click(
				function ( )
				{

					let Data = {};

					$('.form-control').each(
						(i) =>
						{
							//console.log( $ ( $('.form-control')[i] ).attr( 'placeholder'));
							Data
								[
								$($('.form-control')[i])
								.attr( 'placeholder')
								]
								= $($('.form-control')[i]).val();

						}
					);
					Data.action='insert_bug';
					$.post(
						ajaxurl,
						Data,
						() =>
						{
							updateClientData();
						}
					);

				}
			);
			function updateClientData()
			{
				let Data = {};
				Data.action='get_bugs';
				$.post(
					ajaxurl,
					Data,
					(Data) =>
					{
						Data = JSON.parse(Data);
						console.log(Data);
						genTable(Data);
					}
				);

				function genTable(Data)
				{
					let Template = $('tr[hidden]')[0];
					let HTMLrow = document.createElement(Template.tagName);
					HTMLrow.innerHTML=Template.innerHTML;
					HTMLrow.removeAttribute('hidden');
					HTMLrow.id='newElement';
					let x;
					$('#bugList').append(HTMLrow);
					$.each
					(Data,
						(Key , value)=>
						{

							x= $('#newElement').find("td:contains("+Key+")")[1];
							$(x).text(value);
						}
					);
					$('#newElement').removeAttr('id');
				}
			}
		}
	);

})( jQuery );
