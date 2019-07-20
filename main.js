const duration = 500;

let basis = {
	x1 : 100,
	x2 : 0,
	y1 : 0,
	y2 : 100,
};

let oldBasis = {
	x1 : 100,
	x2 : 0,
	y1 : 0,
	y2 : 100,
}

function Render() {
	RenderPoints();
	RenderVectors();
}

function RenderPoints() {
	$('.point').each(function(i, obj) {
    	let x = obj.getAttribute('data-x');
    	let y = obj.getAttribute('data-y');
    	let oldX = x*oldBasis.x1 + y*oldBasis.x2;
    	let oldY = x*oldBasis.y1 + y*oldBasis.y2;
    	let newX = x*basis.x1 + y*basis.x2;
    	let newY = x*basis.y1 + y*basis.y2;
    	let xStep = (newX - oldX) / (duration / 10);
    	let yStep = (newY - oldY) / (duration / 10);
    	let j = 1;
    	let animation = setInterval(function() {
    		obj.style.top = oldX + xStep*j + 'px';
    		obj.style.left = oldY + yStep*j + 'px';
    		j += 1;
    		if ( j === duration / 10 + 1 ) {
    			clearInterval( animation );
    		}
    	}, 10 );
	});
}

function RenderVectors() {
	$('.vector').each(function(i, obj) {
    	let x = obj.getAttribute('data-x');
    	let y = obj.getAttribute('data-y');
    	let oldX = x*oldBasis.x1 + y*oldBasis.x2;
    	let oldY = x*oldBasis.y1 + y*oldBasis.y2;
    	let newX = x*basis.x1 + y*basis.x2;
    	let newY = x*basis.y1 + y*basis.y2;
    	let xStep = (newX - oldX) / (duration / 10);
    	let yStep = (newY - oldY) / (duration / 10);
    	let j = 1;

    	let animation = setInterval(function() {
    		newX = oldX + xStep*j;
    		newY = oldY + yStep*j;
    		j++;
    		let magnitude = Math.sqrt( newX*newX + newY*newY );
	    	let angle = (Math.atan2( newX, newY )*180/Math.PI);
	    	obj.style.width = magnitude + 'px';
			obj.style.top = newX/2 + 'px';
			obj.style.left = newY/2 + 'px';
			obj.style.transform = "translate(-50%, -50%)";
	    	obj.style.transform += "rotate(" + angle + "deg)";
    		if ( j === duration / 10 + 1 ) {
    			clearInterval( animation );
    			oldBasis = basis;
    		}
    	}, 10 );
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
	for ( let i = -10; i <= 10; i ++ ) {
		let $gridline = $('<div>').addClass('gridlineV');
		$gridline.attr('id', 'gridline' + i);
		$gridline.css({
			'left': i*100 + 'px',
		});
		if ( i == 0 ) {
			$gridline.css({
				'background-color': 'red',
			});
		}
		$('.wrapper').append($gridline);
	}
	for ( let i = -10; i <= 10; i ++ ) {
		let $gridline = $('<div>').addClass('gridlineH');
		$gridline.attr('id', 'gridline' + i);
		$gridline.css({
			'top': i*100 + 'px',
		});
		if ( i == 0 ) {
			$gridline.css({
				'background-color': 'red',
			});
		}
		$('.wrapper').append($gridline);
	}

	Render();

	$("#basis_form").submit(function(e) {
	    e.preventDefault();
	    basis = {
	    	x1: parseInt(document.getElementById('x1').value, 10)*100,
	    	y1: parseInt(document.getElementById('y1').value, 10)*100*(-1),
	    	x2: parseInt(document.getElementById('x2').value, 10)*100*(-1),
	    	y2: parseInt(document.getElementById('y2').value, 10)*100,
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