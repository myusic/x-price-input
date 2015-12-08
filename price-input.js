/*
 * Author: Marilyn Hynes Nov 30th, 2015
 * Kosmoscentral.com | marilyn@kosmoscentral.com
 *
 * Document is for custom calculator for input pricing feature of x-cart
 * Input pricing has been disabled for this purposes in the html
 *
 * INSTALLATION Notes::
 * a) Add id to the text button to calculate prices: #size_calc
 * b) Make sure property of input field is disabled so that customers cannot input their own prices and so that premature adding to cart is blocked.
 *
*/

$(document).ready(function(){
		var price = $('#list_price').text();
		
		var size = [3, 6, 9, 12, 16, 18, 24, 36, 48, 60, 72, 96];
		//console.log(size);

		//make sure add to cart button is disabled on landing on a product in category 4 so that products are not added to the cart at $0.00 price
		$('button.disabled').prop('disabled', true);

	$('#size_calc').click(function(){
		//get price
		//divide by 144
		var ppi = price / 144;
		var width = $('.product-options tr:nth-child(2) .property-value input').val().replace(/[^\d.-]/g, ''); 
		var height = $('.product-options tr:nth-child(3) .property-value input').val().replace(/[^\d.-]/g, '');
		var set = 'True';

		//check to make sure width is valid
		if (!width.trim()) {
    		// is empty or whitespace
    		$('.product-options tr:nth-child(2) .property-value input').addClass('red');
    		set = 'False';
		}

		//check to make sure height is valid
		if (!height.trim()) {
    		// is empty or whitespace
    		$('.product-options tr:nth-child(3) .property-value input').addClass('red');
    		set = 'False';
		}


		//get actual width and height to be calculated.

		var position_x = $.inArray(width, size);
		if (position_x > -1) {
			var new_width = width;
		} else {
			var new_sizes = [];
			$.each(size, function (index, value) {
				
				if (width < value) {
					new_sizes.push(value);
					//console.log(new_sizes[0]);
				}
			});

			new_width = new_sizes[0];
			//console.log(new_width);

		}

		var position_y = $.inArray(height, size);
		if (position_y >-1) {
			var new_height = height;
		} else {
			var new_sizes = [];
			$.each(size, function (index, value) {
				
				if (height < value) {
					new_sizes.push(value);
					//console.log(new_sizes[0]);
				}
			});

			new_height = new_sizes[0];
			//console.log(new_height);
		}
		
		//get input fields
		//round up
		//multiply by divided number.
		var new_price = new_height * new_width * ppi;
		console.log(new_price);
		var set_price = new_price.toFixed(2);
		console.log(set_price);		


		//check set_price and update input field, enable add to cart button
		if (set == 'False') {
			} else{
				if(width > 96 | height > 96) {
								console.log('error');

				$('.quantity-row').prepend('<span class="size_calc_quote">Your custom size appears to be too large. Please contact us at ### for a quote.</span>');
			
		} else {
				$('#set_price').val(set_price);
				$('button.disabled').prop('disabled', false);
			}
}
		
	});


});