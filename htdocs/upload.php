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

		$fileName = urlencode($_FILES["userfile"]["name"]);
		echo "Upload: " . $fileName . "<br>";
		echo "Type: " . $_FILES["userfile"]["type"] . "<br>";
		echo "Size: " . ($_FILES["userfile"]["size"] / 1024) . " kB<br>";
		echo "Temp file: " . $_FILES["userfile"]["tmp_name"] . "<br>";

		if (file_exists("upload/" . $fileName)) {
			echo $fileName . " already exists. ";
		} else {
			move_uploaded_file($_FILES["userfile"]["tmp_name"], $root . "/uploads/" . $fileName);
			echo "Stored in: " . $root . "/uploads/" . $fileName;
		}
	}

} else {
	echo "Sorry Mike. :)";
}
