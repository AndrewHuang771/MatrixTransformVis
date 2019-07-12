let basis = {
	x1 : 100,
	x2 : 0,
	y1 : 0,
	y2 : 100,
};

function reRenderPoints() {
	$('.point').each(function(i, obj) {
    	let x = obj.getAttribute('data-x');
    	let y = obj.getAttribute('data-y');
    	obj.style.top = x*basis.x1 + y*basis.x2 + 'px';
    	obj.style.left = x*basis.y1 + y*basis.y2 + 'px';
	});
}

$(document).ready(function() {
	for ( let i = -10; i <= 10; i ++ ) {
		for ( let j = -10; j <= 10; j ++ ) {
			let $point = $('<div>').addClass('point');
			$point.attr('id', 'point' + i + j);
			$point.attr('data-x', i);
			$point.attr('data-y', j);
			$point.css({
				'top': i*basis.x1 + j*basis.x2 + 'px',
				'left': i*basis.y1 + j*basis.y2 + 'px',
			});
			$('.wrapper').append($point);
		}
	}
	setTimeout(function() {
		basis = {
			x1 : 0,
			x2 : 0,
			y1 : 0,
			y2 : 100,
		};
		reRenderPoints();
	}, 1000);

	$("#basis_form").submit(function(e) {
	    e.preventDefault();
	    basis = {
	    	x1: parseInt(document.getElementById('x1').value, 10),
	    	y1: parseInt(document.getElementById('y1').value, 10),
	    	x2: parseInt(document.getElementById('x2').value, 10),
	    	y2: parseInt(document.getElementById('y2').value, 10),
	    }
	    reRenderPoints();
	});
});

/*

Matrix A.
___________
|    |    |
| y2 | y1 |
|----|----|
| x2 | x1 |
|____|____|

*/