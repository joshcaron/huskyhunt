<?php 
require 'includes/Head.php';
?>

<table class="ui table segment" id="clues">
	<thead>
		<tr>
			<th>Clue</th>
			<th>Points</th>
			<th>Address</th>
			<th>Photo</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
		</tr>
		<tr>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
		</tr>
		<tr>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
		</tr>
		<tr>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
			<td>Test</td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<th colspan="4">
				<div class="content">If you see any issues with this, call Josh at 774-232-1250	</div>
			</th>
		</tr>
	</tfoot>
</table>

<form enctype="multipart/form-data" action="/upload.php" method="post">
	<input type="file" name="userfile" accept="image/*" capture="camera">
	<input type="submit" value="Submit">
</form>

<?php
require 'includes/Foot.php';
