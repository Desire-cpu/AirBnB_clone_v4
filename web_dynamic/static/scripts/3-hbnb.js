$(document).ready(function() {
	const selectedAmenities = [];

	$('input[type="checkbox"]').change(function() {
		const amenityId = $(this).data('id');
		const amenityName = $(this).data('name');

		if ($(this).is(':checked')) {
			selectedAmenities.push(amenityId);
		} else {
			const index = selectedAmenities.indexOf(amenityId);
			if (index !== -1) {
				selectedAmenities.splice(index, 1);
			}
		}
		const amenitiesText = selectedAmenities.map(function(id) {
			return amenityName;
		}).join(', ');

		$('.popover h4').text(amenitiesText);
	});

	$.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
		if (data.status === 'OK') {
			$('#api_status').addClass('available');
		} else {
			$('#api_status').removeClass('available');
		}
	});

	// Function to fetch and display places
	function fetchAndDisplayPlaces() {
		$.ajax({
			url: 'http://0.0.0.0:5001/api/v1/places_search',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({}), // Empty dictionary as the body
			success: function(data) {
				// Loop through the result and create article tags for each place
				$('.places').empty(); // Clear the existing content

				data.forEach(function(place) {
					// Create an article tag for each place
					const placeArticle = $('<article>');
					placeArticle.html('<h2>' + place.name + '</h2><div class="price_by_night">$' + place.price_by_night + '</div><div class="information"><div class="max_guest">' + place.max_guest + ' Guest(s)</div><div class="number_rooms">' + place.number_rooms + ' Bedroom(s)</div><div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom(s)</div></div><div class="description">' + place.description + '</div></article>');

					// Append the article tag to the places section
					$('.places').append(placeArticle);
				});
			},
			error: function(error) {
				console.log('Error fetching places:', error);
			}
		});
	}

	// Call the function to fetch and display places when the page loads
	fetchAndDisplayPlaces();

	// Handle search button click
	$('#search-button').click(function() {
		fetchAndDisplayPlaces();
	});
});
