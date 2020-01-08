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
			<input class="form-control form-control-lg" type="text" placeholder="Bug Title">
		</div>
		<div class="col-6 col-md-4">
			<input class="form-control form-control-lg" type="text" placeholder="date">
		</div>
	</div>

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

    <button id='send-bug' type="button" class="btn btn-secondary btn-lg btn-block">Send Bug</button>
</div>

<div style="height: 30px;"></div>

<div class="container">
    <!--- table table-striped table-dark --->

    <table class="table table-hover">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
        </tr>
        </tbody>
    </table>

</div>
