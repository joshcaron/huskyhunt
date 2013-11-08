var Google = Google || {};

Google.Maps = {

	map: {},

	geocoder: {},

	openInfoBox: {
		close: function() {
			// do nothing
		}
	},

	blueMarker: '/assets/img/marker_blue.png',
	redMarker: '/assets/img/marker_red.png',
	greenMarker: '/assets/img/marker_green.png',

	init: function() {
		this.geocoder = new google.maps.Geocoder();
		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(42.3397, -71.0895389),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		this.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
		this.placeSpreadsheetMarkers();
	},

	placeSpreadsheetMarkers: function() {
		var data = Google.Spreadsheet.data;
		for (var id in data) {
			var clue = data[id];
			if (clue.latlang) {
				// console.log("Already have information.");
				this.placeMarker(clue);
				this.placeMarkerInfo(clue);
			} else {
				var address = clue.address;
				if (address == '-') {
					continue;
				}
				var geocode = this.geocode(clue, address);
			}
		}
	},

	geocode: function(clue, address) {
		var self = this;
		var response = this.geocoder.geocode( { 'address': address}, function(results, status) {
			if (status !== google.maps.GeocoderStatus.OK) {
				console.error("Geocode was not successful for the following reason: " + status);
			} else {
				var latlang = results[0].geometry.location;
				clue.latlang = latlang;
				self.placeMarker(clue);
				self.placeMarkerInfo(clue);
			}
		});
		
	},

	placeMarker: function(clue) {
		var icon = this.determineClueColor(clue);
		var marker = new google.maps.Marker({
			map: this.map,
			position: clue.latlang,
			title: clue.description,
			icon: icon
		});
		clue.marker = marker;
	},

	placeMarkerInfo: function(clue) {
		var contents =
			"<dl class='info'>"
			+ "<dt>Clue ID</dt><dd>" + clue.id + "</dd>"
			+ "<dt>Description</dt><dd>" + clue.description + "</dd>"
			+ "<dt>Points</dt><dd>" + clue.pointvalue + "</dd>"
			+ "<dt>Address</dt><dd>" + clue.address + "</dd>"
			+ "</dl>";
		var infowindow = new google.maps.InfoWindow({
			content: contents
		});
		var self = this;
		google.maps.event.addListener(clue.marker, 'click', function() {
			self.openInfoBox.close();
			infowindow.open(self.map, clue.marker);
			self.openInfoBox = infowindow;
		});
	},

	determineClueColor: function(clue) {
		var points = clue.pointvalue;
		var icon = this.redMarker;
		if (points > 100) {
			icon = this.greenMarker;
		}

		if (points > 200) {
			icon = this.blueMarker;
		}

		return icon;
	}
}