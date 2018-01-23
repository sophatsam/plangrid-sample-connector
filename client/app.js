(function($){
	$.post('/batch', {
		request: [{
			method: 'GET',
			path: '/me'
		}, {
			method: 'GET',
			path: '/projects'
		}]
	}, function(data){
		if (data.data){
			$('.name').text('Hello ' + JSON.parse(data.data[0].body).first_name + '.');
			$('.project-count').text('You have access to ' + JSON.parse(data.data[1].body).total_count + ' projects.');
		} else {
			window.location.replace('/')
		}
	})
})(jQuery);