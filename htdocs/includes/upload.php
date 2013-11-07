<?php
ini_set('display_errors', 1);
// Current directory
$root = $_SERVER['DOCUMENT_ROOT'];

// Extensions
array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["userfile"]["name"]);
$extension = end($temp);

// Allowed file extensions
$allowedExts = array("gif", "jpeg", "jpg", "png");

if (in_array($extension, $allowedExts)) {
	if ($_FILES["userfile"]["error"] > 0) {
		echo "Return Code: " . $_FILES["userfile"]["error"] . "<br>";
	} else {

		echo "Upload: " . $_FILES["userfile"]["name"] . "<br>";
		echo "Type: " . $_FILES["userfile"]["type"] . "<br>";
		echo "Size: " . ($_FILES["userfile"]["size"] / 1024) . " kB<br>";
		echo "Temp file: " . $_FILES["userfile"]["tmp_name"] . "<br>";

		if (file_exists("upload/" . $_FILES["userfile"]["name"])) {
			echo $_FILES["userfile"]["name"] . " already exists. ";
		} else {
			// move_uploaded_file($_FILES["userfile"]["tmp_name"], $root . "/images/" . $_FILES["userfile"]["name"]);
			echo "Stored in: " . $root . "/images/" . $_FILES["userfile"]["name"];
		}
	}

} else {
	echo "Sorry Mike. :)";
}
