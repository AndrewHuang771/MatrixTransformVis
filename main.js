let basis = {
	x1 : 100,
	x2 : 0,
	y1 : 0,
	y2 : 100,
};

function Render() {
	RenderPoints();
	RenderVectors();
}

function RenderPoints() {
	$('.point').each(function(i, obj) {
    	let x = obj.getAttribute('data-x');
    	let y = obj.getAttribute('data-y');
    	obj.style.top = x*basis.x1 + y*basis.x2 + 'px';
    	obj.style.left = x*basis.y1 + y*basis.y2 + 'px';
	});
}

function RenderVectors() {
	$('.vector').each(function(i, obj) {
    	let x = obj.getAttribute('data-x');
    	let y = obj.getAttribute('data-y');
    	let newX = x*basis.x1 + y*basis.x2;
    	let newY = x*basis.y1 + y*basis.y2;
    	let magnitude = Math.sqrt( newX*newX + newY*newY );
    	let angle = (Math.atan2( newX, newY )*180/Math.PI);
    	obj.style.width = magnitude + 'px';
		obj.style.top = newX/2 + 'px';
		obj.style.left = newY/2 + 'px';
		obj.style.transform = "translate(-50%, -50%)";
    	obj.style.transform += "rotate(" + angle + "deg)";
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
			if ( i == 0 && j == 0 ) {
				$point.css({
					'background-color': 'red',
				});
			}
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
		Render();
	}, 1000);

	$("#basis_form").submit(function(e) {
	    e.preventDefault();
	    basis = {
	    	x1: parseInt(document.getElementById('x1').value, 10),
	    	y1: parseInt(document.getElementById('y1').value, 10),
	    	x2: parseInt(document.getElementById('x2').value, 10),
	    	y2: parseInt(document.getElementById('y2').value, 10),
	    }
	    Render();
	});

	$('#reset').on('click', function() {
		basis = {
			x1 : 100,
			x2 : 0,
			y1 : 0,
			y2 : 100,
		};
		Render();
	});
});

/*

Coordinates: 

Matrix A.
___________
|    |    |
| y1 | y2 |
|----|----|
| x1 | x2 |
|____|____|

*/