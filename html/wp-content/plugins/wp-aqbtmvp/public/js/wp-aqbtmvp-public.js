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
		()=>
			{
				pageIO();

				function pageIO( AlreadyOnPageID = [] )
				{
					console.log('IO start: ');
					readDB(AlreadyOnPageID).then(
						(readData)=>
						{
							genTable(readData.dbRows );
							waitClick (readData.AlreadyOnPageID)
								.then(
									(AlreadyOnPageID) =>
									{
										console.log('start another: ', pageIO);
										pageIO(AlreadyOnPageID)
									}

								);
						}

					);
				}
				function readDB( AlreadyOnPageID )
				{
					console.log('start rDB function');
					return new Promise(
						( resolve )=>
						{
							$.post(
								ajaxurl,
									{
										 'action' : 'get_bugs',
										 'AlreadyOnPageID' : AlreadyOnPageID
									},
								(rows) =>
								{
									rows = JSON.parse(rows);
									let dbRows = rows;
									$.each(
										rows,
										(Key, value) => {
											AlreadyOnPageID.push(value.id);
										}
									);
									console.log('DB resolution...');
									resolve(
										{
											AlreadyOnPageID : AlreadyOnPageID,
											dbRows : dbRows
										}
										);
								});
						}
						);
				}
				function genTable ( rows )
				{
					console.log('start table');
						for( let record in rows)
						{
							console.log('rows:', rows);
							placeRecord(rows[record]);
						}
					console.log('end table');
				}
				function placeRecord( record )
				{
					console.log('bug placing start');
					console.log('Record: ',record);
					let Template = $('tr[hidden]')[0];
					let HTMLrow = document.createElement(Template.tagName);
					HTMLrow.innerHTML=Template.innerHTML;
					HTMLrow.removeAttribute('hidden');

					HTMLrow.id='newElement';

					let child;
					$('#bugList').append(HTMLrow);
					let debugPrint = '';
					$.each
					(record,
						(Key , value)=>
						{
							debugPrint = debugPrint + ' ' + 'key ' + Key + ' of value ' +value ;
							child = $('#newElement').find("td:contains("+Key+")")[1];
							$(child).text(value);
						}
					);
					console.log(debugPrint);
					$('#newElement').removeAttr('id');
					console.log('bug placing end');
				}
				function waitClick( AlreadyOnPageID )
				{
					return new Promise(
						(resolve)=>
						{
							console.log('Waiting click...');
							$('#send-bug').click(
								( ) =>
								{
									console.log('Click!');
									let Data = {};
									$('.form-control').each(
										(i) =>
										{
											Data
												[
												$($('.form-control')[i])
												.attr( 'placeholder' )
												]
												= $($('.form-control')[i]).val();
										}
									);
									Data.action ='insert_bug';
									$.post(
										ajaxurl,
										Data,
										() =>
										{
											resolve(AlreadyOnPageID);
										}
									);
								});
						}
					);

				}
			}
	)

})( jQuery );
