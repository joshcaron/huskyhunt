var Google = Google || {};
/**
 * Functions for working with Google spreadsheets
 * @type {Object}
 */
Google.Spreadsheet = {

	tableName: "#clues",

	/**
	 * The data that has been loaded from the Google Spreadsheet
	 * @type {Array}
	 */
	data: [],

	init: function(json) {
		this.parseJSON(json);

		return this;
	},

	/**
	 * Has data been loaded from the spreadsheet?
	 * @return {Boolean}
	 */
	isDataLoaded: function() {
		return this.data.length > 0;
	},

	/**
	 * Read in JSON data from Google and return the parsed data
	 * @param  {Object} json Data from Google. God only knows what the spec of this would look like.
	 * @return {Object}      The data from the spreadsheet as a single Object
	 */
	parseJSON: function(json) {
		var data = eval(json);
		for (var i = 0; i < data.feed.entry.length; i++) {
			var row = this.parseRow(data.feed.entry[i]);
			this.data.push(row);
		};

		return this;
	},

	parseRow: function(rowData) {
		var row = {};
		// The first cell in a row
		var title = rowData.title.$t;
		// The remaining cells in the row
		var combinedCells = rowData.content.$t;

		row.id = title;

		var cells = this.separateCells(combinedCells);


		for (var i = 0; i < cells.length; i++) {
			var pieces = cells[i].split(":");
			var key = pieces[0];
			if (key) { key = key.trim(); }
			var value = pieces[1];
			if (value) { value = value.trim(); }
			row[key] = value;
		};
		
		return row;
	},

	addRowsToTable: function() {
		for (var row in this.data) {
			$(this.tableName + " tbody").append(this.createTableRow(this.data[row]));	
		}
		$(this.tableName).tablesorter();
		return this;
	},

	createTableRow: function(row) {
		var entry = "<tr>";
		for (var key in row) {
			if (key == "id") {
				continue;
			}
			var value = row[key];
			if (key == "address") {
				var address = value.split("\n");
				value = "";
				for (var line in address) {
					value += "<div>" + address[line] + "</div>";
				}
			}

			entry += "<td>" + value + "</td>";
		}
		entry += "<td>" + "<a class='ui red button' href='/location.php?id=" + row.id + "'>Upload</a>";

		entry += "</tr>";
		return entry;
	},

	/**
	 * Separate all the combined cells in a row into their own separate cell pieces.
	 * @param  {String} combinedCells
	 * @return {Array}  The individual contents of a cell, but not yet broken up into the key/value 
	 *                      pairs.
	 */
	separateCells: function(combinedCells) {
		var cells = [];
		var parts = combinedCells.split(",");

		for (var i = 0; i < parts.length; i++) {
			var part = parts[i];
			part = part.trim();
			// If it has a key, it's a new cell.
			if (this.hasKey(part)) {
				cells.push(part);
				continue;
			}
			// Otherwise, just append it to the previous cell.
			cells[cells.length-1] += ", " + part;
		};

		return cells;
	},

	/**
	 * Does the cell part contain a key?
	 * @param  {String}  part
	 * @return {Boolean} If the cell part has a key (denoted by ':' being present), return true
	 */
	hasKey: function(part) {
		return part.split(":").length > 1;
	},

	initializeSearch: function() {
		var $rows = $('#clues tbody tr');
		$('#search').keyup(function() {
			var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();
			
			$rows.show().filter(function() {
				var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
				return !~text.indexOf(val);
			}).hide();
		});
	}
}
