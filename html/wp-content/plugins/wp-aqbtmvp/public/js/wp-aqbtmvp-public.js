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
					template = recordHTML.cloneNode(true)
				) {
				/*
				questa funzione dovrà aspettarsi in input un array di oggetti
				per ogni indice è presente un oggetto con due attributi name ed value
				il value va posizionato nei elementi con lo stesso name
				ma si sono dei casi dove
				name = nome[] dunque vanno gestiti tramite una procedura per i multiselect
				( un if (check against pattern ){ procedura; return //per interrompere il ciclo} )

				deve venir aggiunta una proprietà style per impedire l'input

				*/
				console.log(template);
				dataArray.forEach(
					function ( current, i) {
						$(template).find('[name=' + current.name + ']').attr('value' , current.value )
					}
				);
				console.log(
					$(template).find('[type="submit" ]')
				);
				$(template).find('[type="submit" ][value="Send"]').parent().attr('hidden','');
				$(template).find('[type="submit" ][value="Edit"]').parent().removeAttr('hidden');
				$(template).find('[type="submit" ][value="Delete"]').parent().removeAttr('hidden');
				bugListNode.appendChild(template);
			};

			createBugRecordHTML();

		})
})( jQuery );