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
				var AlreadyOnPageID = [];
				pageIO();

				function pageIO(  )
				{
					console.log('IO start: ');
					readDBdata().then(
						(readData)=>
						{
							genTable(readData.dbRows );
							Promise.race([
									insertBugWaitClick (  ) ,

									deleteBugWaitClick(  )
									.then(
										(obj)=>
										{
											deleteDBdata(obj.idToDelete )
											.then(
												(idToDelete)=>
												{
													removeRecord(obj.nodeToDelete).then(
														() => {return new Promise(resolve => resolve())}
													);
												}
											)
											.catch(
												(Exc) => {
													console.log(Exc);
													removeRecord(obj.nodeToDelete);
													return new Promise(
														resolve => resolve()
													);
												}
											);
										}
									)
							])
							.then(
							() =>
							{
								console.log('start another: ', pageIO);
								$("body").find("*").each(function() {
									$(this).off("click");
								});
								pageIO();
							});
						}

					);

				}
				function readDBdata(  )
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
				function insertBugWaitClick(  )
				{
					return new Promise(
						(resolve)=>
						{
							console.log('Waiting click...');
							$('#send-bug').click(
								() =>
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
											$('#send-bug').off('click');
											resolve();
										}
									);
								});


						}
					);

				}
				function deleteBugWaitClick(  )
				{
					return new Promise(
						(resolve)=>
						{
							//
							$('#delete-bug').click(
							() =>
							{
								$('#delete-bug').off('click');

								console.log( 'Delete start' );

								//console.log( $('#bugList') );
								$('.table-dark').click(
									( e )=>
									{
										$('.table-dark').off('click');
										let clicksTable = e.currentTarget;
										let idToDelete = clicksTable.children[0].children[0].children[0].innerHTML;
										console.log(idToDelete);
										$('#delete-bug').click(
											( )=>
											{
												$('#delete-bug').off('click');

												console.log( 'Delete End' );
												console.log( 'node to pass ', clicksTable );
												resolve({
													'idToDelete' : idToDelete,
													'nodeToDelete' : clicksTable}
													);

											});
									});
								//aspetta un'altro click su un record
								//ottenuto quel click ritorna l'id
							});
						});
				}
				function deleteDBdata(idToDelete)
				{
					return new Promise(
						(resolve,reject)=>
						{
							//fai una richiesta al backend
							let Data = {};
							Data.action = 'delete_bug' ;
							Data.id = idToDelete;
							$.post(
								ajaxurl,
								Data,
								( response ) =>
								{
									let nrows = JSON.parse(response).nrows;
									console.log('nrows is not false: ',  );
									if (typeof nrows == 'number'
										&& nrows > 0
									)
									{
										resolve(idToDelete , );
									}
									else
									{
										console.log('record to delete not present in the DB');
										reject( );
									}
								}
							);

						});
					//ottieni la conferma che dal backEnd che è stato eliminato il record
				}
				function removeRecord(node)
				{
					//rimuovi il nodo con quel id dal frontend
					console.log('start frontend record delete');
					console.log('node value :',node);
					return new Promise(resolve =>
					{
						$(node).remove();
						console.log('end frontend record delete');
						resolve();
					})
				}
			}

	)

})( jQuery );
