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
				//ottieni dati recenti
				//poi aspetta eventuE6 ali click
				//al click ottieni dati ( magari dicendo quali deve escludere dalla richiesta);
				//piazza i dati ottenuti
				pageIO();

				function pageIO( AlreadyOnPageID = [] ){
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



				function readDB(AlreadyOnPageID)
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
					/*
					$().each(
						rows,
						(index , value)=>
						{
							console('inside each');
							placeRecord(value);
						});*/
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

				function waitClick(AlreadyOnPageID) {
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
				/*
				let bugPageObj;
				bugPageObj = bugPage();
				bugPageObj.updateClientData(bugPageObj).then(
					(THIS) =>
					{
						bugPageObj.genTable(THIS);
					}
				);
				class bugPage{

					dbRows = {};
					Data = {};
					dataContainer = {};
					AlreadyOnPageIDs = [];


					Constructor(cssClassSelector = '.form-control' ,
								AttrName = 'placeholder',
								dataPull = { wpAction : 'get_bugs' },
								dataPush = { wpAction : 'insert_bug' }
					)
					{

						this.dataContainer.cssClassSelector = cssClassSelector; //'.form-control';
						this.dataContainer.AttrName = AttrName; //'placeholder';
						this.dataContainer.dataPull = dataPull;
						this.dataContainer.dataPush = dataPush;

						//this.forEach( (index , value) => { value.bind(this)})
					}

					updateClientData ( THIS )
					{
						//TODO
						//dobbiamo implementare un meccanismo
						//che coinvolga AlreadyOnPageIDs per
						//indicare al backend quali righe escludere
						//dall'invio al frontend, cosi evitiamo cicli di elaborazione
						//al codice client-side
						this.Data.action = THIS.dataContainer.dataPull.wpAction;
						return new Promise(
							( resolve )=>
							{
								$.post(
									ajaxurl,
									THIS.Data,
									(rows) =>
									{
										rows = JSON.parse(rows);
										THIS.dbRows = rows;
										$.each(
											rows,
											(Key , value) =>
											{
												THIS.AlreadyOnPageIDs.push(value.id);
											}
										);
										resolve(()=> { return this });
									}
								);
							}
						);
					}


					waitClick ()
					{

					}

					/*
                            idIsNew( idValue )
                            {
                                $.each(
                                    this.AlreadyOnPageIDs,
                                    (key , value) =>
                                    {
                                        if( idValue == value)
                                        {
                                            console.log("idValue: ",idValue);
                                            console.log("value: ",value);
                                            return false;
                                        }
                                    }
                                );
                                return true;
                            }

                            newBug(
                                wpActionName = 'insert_bug' ,
                                clickElementId = '#send-bug'
                            )
                            {
                                $(clickElementId).click(
                                    function ( )
                                    {
                                        this.Data.action = wpActionName;
                                        $.post(
                                            ajaxurl,
                                            Data,
                                            () =>
                                            {
                                                //return promise
                                            }
                                        );

                                    }
                                );
                            }

                            getInputData(dataNode,dataName)
                            {
                                $(dataNode).each(
                                    (i) =>
                                    {
                                        this.Data
                                            [
                                            $($(dataNode)[i])
                                                .attr( dataName )
                                            ]
                                            = $($(dataNode)[i]).val();
                                        console.log(  )
                                    }
                                );
                            }


				} */
			}
	)

})( jQuery );
