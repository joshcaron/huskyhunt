var Google = Google || {};

Google.Maps = {

	map: {},

	geocoder: {},

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
				console.log("Already have information.");
				this.placeMarker(clue.latlang);
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
			}
		});
		
	},

	placeMarker: function(clue) {
		var marker = new google.maps.Marker({
			map: this.map,
			position: clue.latlang,
			title: clue.description
		});
		console.log(marker);
	},

	handleGeocodeResponse: function(results, status) {
		
	}
}