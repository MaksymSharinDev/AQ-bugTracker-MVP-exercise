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
<script>
    var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";
</script>



<div class="container">
        <!-- Stack the columns on mobile by making one full-width and the other half-width -->
        <div class="row">
            <div class="col-12 col-md-8">
                <input class="form-control form-control-lg" type="text" placeholder="title">
            </div>
            <div class="col-6 col-md-4">
                <input class="form-control form-control-lg" type="text" placeholder="date">
            </div>
        </div>
    <div style="height: 5px;"></div>
        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <div class="row">
            <div class="col-6 col-md-4">
                <input class="form-control form-control-lg" type="text" placeholder="device">
            </div>
            <div class="col-6 col-md-4">
                <input class="form-control form-control-lg" type="text" placeholder="replicability">
            </div>
            <div class="col-6 col-md-4">
                <input class="form-control form-control-lg" type="text" placeholder="severity">
            </div>
        </div>
    <div style="height: 5px;"></div>
        <!-- Columns are always 50% wide, on mobile and desktop -->
        <div class="row">
            <div class="col-6">
                <input class="form-control form-control-lg" type="text" placeholder="expected result">
            </div>
            <div class="col-6">
                <input class="form-control form-control-lg" type="text" placeholder="actual result">
            </div>
        </div>

        <div style="height: 10px;"></div>

    <div class="row">
        <div class="col-8">
            <button id='send-bug' type="button" class="btn btn-secondary btn-lg btn-block">Send Bug</button>
        </div>
        <div class="col-4">
            <button id='ask-delete-bug' type="button" class="btn btn-secondary btn-lg btn-danger btn-block">Delete Bugs</button>
        </div>
    </div>

    </div>
<div style="height: 20px;"></div>
<div class="container">
        <!--- table table-striped table-dark --->

    <table  class="table">
            <thead>
            <tr>
                <th scope="col">Bugs</th>
            </tr>
            </thead>
            <tbody id='bugList' class="overflow-auto">
                <tr hidden scope="row">
                        <td>
                            <table class="table-dark ">
                                <tr>
                                    <td class="tg-lboi">id</td>
                                    <td class="tg-0pky" colspan="3">title</td>
                                    <td class="tg-0pky" colspan="2">date</td>
                                </tr>
                                <tr>
                                    <td class="tg-0lax" colspan="2">device</td>
                                    <td class="tg-0lax" colspan="2">replicability</td>
                                    <td class="tg-0lax" colspan="2">severity</td>
                                </tr>
                                <tr>
                                    <td class="tg-0lax" colspan="3">expected_result</td>
                                    <td class="tg-0lax" colspan="3">actual_result</td>
                                </tr>
                            </table>
                        </td>

                </tr>

            <tbody>
    </table>


    </div>

