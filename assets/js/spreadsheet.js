/**
 * Parse the JSON response from Google
 */
function parseJSON(json) {
	console.log(json);
	var data = eval(json);
	for (var i = 0; i < data.feed.entry.length; i++) {
		var row = parseRow(data.feed.entry[i]);
		createTableEntry(row);
	};
}

/**
 * Parse an individual row from the Google spreadsheet
 */
function parseRow(data) {
	var row = parseRowContent(data.content.$t);
	row.id = data.title.$t;
	
	return row;
}

function createTableEntry(row) {
	console.log(row);
}

/**
 * Parse the contents of an individual row      
 */
function parseRowContent(content) {
	var parts = fixCommas(content.split(","));
	var row = {};
	for (var i = 0; i < parts.length; i++) {
		var pieces = parts[i].split(":");
		var key = pieces[0];
		if (key) { key = key.trim(); }
		var value = pieces[1];
		if (value) { value = value.trim(); }
		row[key] = value;
	};

	return row;
}

function fixCommas(parts) {
	var newParts = [];

	for (var i = 0; i < parts.length; i++) {
		var part = parts[i];
		part = part.trim();
		if (hasKey(part)) {
			newParts.push(part);
			continue;
		}

		newParts[newParts.length-1] += ", " + part;
	};

	return newParts;
}

function hasKey(part) {
	return part.split(":").length > 1;
}