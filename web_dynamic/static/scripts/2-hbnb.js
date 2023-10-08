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
});
