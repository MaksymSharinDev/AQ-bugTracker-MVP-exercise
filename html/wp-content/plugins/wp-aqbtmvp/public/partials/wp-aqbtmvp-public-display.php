<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://github.com/MaksymSharinDev
 * @since      1.0.0
 *
 * @package    Wp_Aqbtmvp
 * @subpackage Wp_Aqbtmvp/public/partials
 */
?>
<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<!--
    UI Structure:
        input fields:

--->


    <table  class="table">
        <thead>
        <tr>
            <th scope="col">Bugs</th>
        </tr>
        </thead>
        <tbody id='bugList' class="overflow-auto">
        <tr>
            <td>
                <div class="container" >
                    <form action="#" method="post" name="bugForm" >
                        <script>
                            (function( $ ) {
                                'use strict';
                                $('form').data('forms',{});
                                $('form').submit(
                                    function (e) {
                                        e.preventDefault();
                                        let form = this;
                                        let obj =  $(form).data('forms');
                                        obj[ (new Date()).getTime() ] = $(form).serializeArray();
                                        $(form).data('forms', obj);
                                        console.log( $(form).data('forms') );

                                    }
                                );
                            })( jQuery );
                        </script>
                        <div class="row p-2">
                            <div class="card col-12 col-md-2 justify-content-lg-center">
                                <div class="card-img " ></div>
                            </div>
                            <div class="col-12 col-md-7 ">
                                <div class="row">
                                    <div class="col-12 col-md-8 p-1">
                                        <input class="form-control form-control-lg"
                                               type="text"
                                               name="title"
                                               title="[ bug_location ] - problem short desc"
                                               pattern="\[ [A-Za-z0-9]* \] - [A-Za-z]+"
                                               maxlength="48"
                                               required
                                               placeholder="[ bug_location ] - problem short desc"
                                        >
                                    </div>
                                    <div class="col-6 col-md-4 p-1">
                                        <input class="form-control form-control-lg"
                                               type="date"
                                               name="date"
                                               required
                                               value="<?php echo date('Y-m-d', time() ); ?>"
                                        >
                                    </div>
                                </div>
                                <div class="row">
                                    <script>
                                        (function( $ ) {
                                            'use strict';
                                            $( document ).ready(
                                                function () {
                                                    //keep selected the entry on multiple instead select one
                                                    $('option').mousedown(function(e) {
                                                        e.preventDefault();
                                                        var originalScrollTop = $(this).parent().scrollTop();
                                                        console.log(originalScrollTop);
                                                        $(this).prop('selected', $(this).prop('selected') ? false : true);
                                                        var self = this;
                                                        $(this).parent().focus();
                                                        setTimeout(function() {
                                                            $(self).parent().scrollTop(originalScrollTop);
                                                        }, 0);

                                                        return false;
                                                    });
                                                }
                                            )
                                        })( jQuery );
                                    </script>
                                    <div class="col-6 col-md-4 p-2">

                                        <div class="custom-file ">
                                            <input type="file" class="custom-file-input" id="customFile">
                                            <label class="custom-file-label " for="customFile">Choose file</label>
                                        </div>
                                        <div class="form-control-lg card p-2">
                                            <div class="custom-control custom-checkbox">
                                                <input class="custom-control-input"
                                                       type="checkbox"
                                                       id="replicabilityCheckbox"
                                                       class="custom-control-input"
                                                       name="replicability"
                                                       value="replicability"
                                                >
                                                <label class="custom-control-label " for="replicabilityCheckbox">replicability</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-6 col-md-4 p-1">
                                        <select class="custom-select custom-select-lg"
                                                name="platform[]"
                                                size="3"
                                                id="platforms"
                                                multiple="multiple"
                                        >
                                            <option>Desktop</option>
                                            <option>Website</option>
                                            <option>App</option>
                                        </select>
                                    </div>
                                    <div class="col-6 col-md-4 p-1">
                                        <select class="custom-select custom-select-lg"
                                                name="severity"
                                                size="3"
                                                id="severities"
                                        >
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row ">
                                    <div class="col-6 p-1">
                                        <input class="form-control form-control-lg"
                                               type="text"
                                               name="expected_result"
                                               placeholder="expected result"
                                        >
                                    </div>
                                    <div class="col-6 p-1">
                                        <input class="form-control form-control-lg"
                                               type="text"
                                               name="actual_result"
                                               placeholder="actual result">
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-2 card justify-content-lg-center ">
                                <div class="row p-2" hidden>
                                    <input type="submit" class="btn btn-info btn-lg btn-block " value="Edit">
                                </div>
                                <div class="row p-2" >
                                    <input type="submit" class="btn btn-primary btn-lg btn-block " value="Send">
                                </div>
                                <div class="row p-2" hidden>
                                    <input type="submit" class="btn btn-danger btn-lg btn-block " value="Delete">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </td>
        </tr>

        <tbody>

    </table>





