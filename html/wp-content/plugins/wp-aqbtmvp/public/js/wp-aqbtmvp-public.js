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
			console.log($('#send-bug'));
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
					/*
					WE NEED TO ADD THIS CODE SOMEWHERE:

					<?php
					if(!empty($_POST ))
					{
						$data = array();
						foreach( $_POST as $key => $value)
						{
							$data[$key]=$value;
						}
						wp_send_json(json_encode($data));
					}
					 */
					url='';
					$.post(
						url,
						Data,
						(returnData) =>
						{
							console.log('success');
							console.log(returnData);
						}
					);

				}
			)
		}
	);

})( jQuery );
