<?php 
require 'includes/Head.php';
?>
<input type="text" id="search" placeholder="Type to search" class="ui input">
<table class="ui table segment tablesorter" id="clues">
	<thead>
		<tr>
			<th>ID<i class="sort ascending icon"></i><i class="sort descending icon"></i><i class="sort icon"></i></th>
			<th>Clue<i class="sort ascending icon"></i><i class="sort descending icon"></i><i class="sort icon"></i></th>
			<th>Points<i class="sort ascending icon"></i><i class="sort descending icon"></i><i class="sort icon"></i></th>
			<th>Address<i class="sort ascending icon"></i><i class="sort descending icon"></i><i class="sort icon"></i></th>
			<th>Photo<i class="sort ascending icon"></i><i class="sort descending icon"></i><i class="sort icon"></i></th>
		</tr>
	</thead>
	<tbody>
	</tbody>
	<tfoot>
		<tr>
			<th colspan="5">
				<div class="content">If you see any issues with this, call Josh at 774-232-1250	</div>
			</th>
		</tr>
	</tfoot>
</table>

<form enctype="multipart/form-data" action="/upload.php" method="post">
	<input type="file" name="userfile" accept="image/*" capture="camera">
	<input type="submit" value="Submit">
</form>
<script type="text/javascript" src="/assets/js/index.js"></script>
<?php
require 'includes/Foot.php';
