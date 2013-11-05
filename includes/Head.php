<?php
$spreadsheet = '0Ajgj_dge0NVpdEpIZWk1MWVYZVNSMjh2SjY4VHhJVGc';

?>
<!DOCTYPE html>
<head>
	<title>The Upton Sinclairs</title>
	<link rel="stylesheet" type="text/css" href="/assets/css/semantic.css">
	<script type="text/javascript" src="/assets/js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="/assets/js/jquery.tablesorter.min.js"></script>
	<script type="text/javascript" src="/assets/js/spreadsheet.js"></script>
	<script type="text/javascript" src="/assets/js/maps.js"></script>
	<script type="text/javascript" src="https://spreadsheets.google.com/feeds/list/<?php echo $spreadsheet; ?>/od6/public/basic?alt=json-in-script&callback=Google.Spreadsheet.init"></script>
	<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700|Open+Sans:300italic,400,300,700" rel="stylesheet" type="text/css">
	<link rel="stylesheet" type="text/css" href="/assets/css/main.css">
	<style type="text/css">
	@font-face {
		font-family: 'Icons';
		src: url('/assets/fonts/icons.ttf');
	}
	</style>
</head>
<body>
<div class="ui one column page grid">
	<div class="column">
		<h2 class="ui header">
			<div class="content">Husky Hunt 2013</div>
			<div class="sub header">Awesome tagline here</div>
		</h2>
