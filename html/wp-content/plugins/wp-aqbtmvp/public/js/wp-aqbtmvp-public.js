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

			var bugListNode = $('#bugList')[0];
			var recordHTML = $('#bugList').children()[0];
			var formSelector = 'form';
			var createBugRecordHTML  =
				function (
					dataArray = [
						{ name: "title", value: "[ none ] - default" },
						{ name: "date", value: "2000-01-01" },
						{ name: "replicability", value: "replicability" },
						/*
						{ name: "platform[]", value: "Desktop" },
						{ name: "platform[]", value: "Website" },
						{ name: "platform[]", value: "App" },
						*/
						{ name: "severity", value: "Medium" },
						{ name: "expected_result", value: "default" },
						{ name: "actual_result", value: "default" }
					],
					template = recordHTML.cloneNode(true),
					noClickZonesSelector = '[class^="col"]:not( div:has(.btn) ):has(div)',
					sendBtnSelector = '[type="submit" ][value="Send"]',
					editBtnSelector = '[type="button" ][value="Edit"]',
					deleteBtnSelector = '[type="button" ][value="Delete"]',
				) {
				/*
				FUNCTION INFO
					CONTEXT
					-per ogni indice è presente un oggetto con due attributi name ed value
					-il value va posizionato nei elementi con lo stesso name
					-ma si sono dei casi dovename = nome[] dunque vanno gestiti tramite una procedura per i multiselect
					-sostituire gli elementi di input con elementi adatti al visualizzazione dei dati
					DONE
					- aspettarsi in input un array di oggetti
					-deve venir aggiunta una proprietà style per impedire l'input nelle zone interessate
					TODO
					-procedura per i multiselect
						( un if (check against pattern ){ procedura; return //per interrompere il ciclo} )
				*/
				dataArray.forEach(
					function ( current, i) {
						$(template).find('[name=' + current.name + ']').attr('value' , current.value )
					}
				);

				$(template).find(sendBtnSelector).parent().attr('hidden',true);
				$(template).find(editBtnSelector).parent().attr('hidden',false);
				$(template).find(deleteBtnSelector).parent().attr('hidden',false);

				/*
				console.log(
					'$(template).find(sendBtnSelector)',
					$(template).find(sendBtnSelector)
				);
				console.log(
					'$(template).find(editBtnSelector)',
					$(template).find(editBtnSelector)
				);
				console.log(
					'$(template).find(deleteBtnSelector)',
					$(template).find(deleteBtnSelector)
				);
				 */

					$(template).find(formSelector)
						.find(noClickZonesSelector)
						.attr('style',
							'pointer-events: none'
						);
				bugListNode.appendChild(template);

				//BUTTON EVENTS
				let sendBtn = $(template).find(sendBtnSelector);
				let editBtn = $(template).find(editBtnSelector);

				sendBtn.on('click',
					function (e) {
						$(sendBtn).attr('disabled',true);
						$(sendBtn).attr('hidden',true);

						$(sendBtn).next().attr('hidden',false);
						$(document).trigger('crudOps', ['updateBug'] );
						//on response ready
						$(document).on('responseReady' ,
							function (e,msg) {
								//riabilita il send
								$(sendBtn).attr('disabled',false);
								$(sendBtn).attr('hidden',false);
								//nasconde il loading
								$(sendBtn).next().attr('hidden',true);

								$(sendBtn).parent().attr('hidden',true);
								$(editBtn).parent().attr('hidden',false);

								console.log(msg);
							});

					}
				);
				editBtn.on('click',
					function (e) {
						$(template).find('form')
							.find(noClickZonesSelector)
							.attr('style',
								'pointer-events: auto'
							);
						$(editBtn).parent().attr('hidden',true);
						$(sendBtn).parent().attr('hidden',false);
					}
				);


			};


			var formSubmitInterceptor =
				function() {
					$(formSelector).data('forms',{});
					$(formSelector).submit(
						function (e) {
							e.preventDefault();

							/*#DEBUG
							//let obj =  $(form).data('forms');
							//obj[ (new Date()).getTime() ] = $(form).serializeArray();
							*/
							$(formSelector).data('forms', $(formSelector).serializeArray() );
							console.log('form intercepted: ',$(formSelector).data('forms') );


						}
					);
				};

			//FORM crudOps EVENT
			var formAjaxCRUDcalls =
				function()
				{$(document).off().on('crudOps',
						function (action) {
							let requestData = $(formSelector).data('forms');
							requestData['action'] = action ;
							//DEBUG
							console.log(requestData);
							let timer = window.setTimeout(
								function() {
									$(document).trigger('responseReady',['event chain works!']);
									clearTimeout(timer);
								}
								, 3000);

							//DEBUG
						});
				};

			createBugRecordHTML();
			formSubmitInterceptor();
			formAjaxCRUDcalls();
		})
})( jQuery );