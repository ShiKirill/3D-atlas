// carousel
console.log("carousel.js is loaded");

var images = document.getElementsByClassName('my-carousel-img');
var i = 0;
carousel = document.getElementById("my-carousel");
var x;
var y;

const OFFSET = 25;

change_image = function(is_forward) {
	current_image = images[i];
	current_image.classList.remove("active");
	current_image.classList.add("inactive");

	if (is_forward) {
		i = (i < images.length - 1) ? i+1 : 0;
	} else {
		i = (i > 0) ? i-1 : images.length - 1;
	}

	next_image = images[i];
	next_image.classList.remove("inactive");
	next_image.classList.add("active");
}

run_carousel = function(e) {
	event = (e.touches === undefined) ? e : e.touches[0];
	// Photos are taken in the direction of clock rotation if you look at them from the top
	if(x - event.pageX > OFFSET) {
		change_image(true);
		x = event.pageX;
		y = event.pageY;
	}
	else if(event.pageX - x > OFFSET) {
		change_image(false);
		x = event.pageX;
		y = event.pageY;
	}
}

carousel.ondragstart = function() {
	return false;
}

carousel.onmousedown = function(e) {
	x = e.pageX;
	y = e.pageY;
	carousel.onmousemove = function(e) { run_carousel(e) };
	document.onmouseup = function() {
		carousel.onmousemove = null;
	}
}

handleTouchStart = function(e) {
	e.preventDefault();
	x = e.touches[0].pageX;
	y = e.touches[0].pageY;			
	carousel.addEventListener("touchmove", run_carousel, false);
	document.addEventListener("touchend", function(e) {
		carousel.removeEventListener("touchmove", run_carousel);
	}, false);
}

carousel.addEventListener("touchstart", handleTouchStart, false);


var objzoom = document.querySelector("active");
var scaling = false;
var dist = 0;
var scale_factor = 1.0;
var curr_scale = 1.0;
var max_zoom = 8.0;
var min_zoom = 0.5
/*Пишем функцию, которая определяет расстояние меж пальцами*/
function distance (p1, p2) {
return (Math.sqrt(Math.pow((p1.clientX - p2.clientX), 2) + Math.pow((p1.clientY - p2.clientY), 2)));
}
/*Ловим начало косания*/
objzoom.addEventListener('touchstart', function(evt) {
evt.preventDefault();
var tt = evt.targetTouches;
if (tt.length >= 2) {
dist = distance(tt[0], tt[1]);
scaling = true;
} else {
scaling = false;
}
}, false);
/*Ловим зумирование*/
objzoom.addEventListener('touchmove', function(evt) {
evt.preventDefault();
var tt = evt.targetTouches;
if (scaling) {
curr_scale = distance(tt[0], tt[1]) / dist * scale_factor;
objzoom.style.WebkitTransform = "scale(" + curr_scale + ", " + curr_scale + ")";
}
}, false);
/*Ловим конец косания*/
objzoom.addEventListener('touchend', function(evt) {
var tt = evt.targetTouches;
if (tt.length < 2) {
scaling = false;
if (curr_scale < min_zoom) {
scale_factor = min_zoom;
} else {
if (curr_scale > max_zoom) {
scale_factor = max_zoom;
} else {
scale_factor = curr_scale;
}
}
objzoom.style.WebkitTransform = "scale(" + scale_factor + ", " + scale_factor + ")";
} else {
scaling = true;
}
}, false);