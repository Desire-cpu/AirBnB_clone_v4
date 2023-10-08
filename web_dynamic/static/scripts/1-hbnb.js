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
});
