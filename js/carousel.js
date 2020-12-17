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
 if (e.targetTouches.length == 2 && e.changedTouches.length == 2) {
		var point1=-1, point2=-1;
   for (var i=0; i < tpCache.length; i++) {
     if (tpCache[i].identifier == ev.targetTouches[0].identifier) point1 = i;
     if (tpCache[i].identifier == ev.targetTouches[1].identifier) point2 = i;
   }
   if (point1 >=0 && point2 >= 0) {
     // Calculate the difference between the start and move coordinates
     var diff1 = Math.abs(tpCache[point1].clientX - ev.targetTouches[0].clientX);
     var diff2 = Math.abs(tpCache[point2].clientX - ev.targetTouches[1].clientX);

     // This threshold is device dependent as well as application specific
     var PINCH_THRESHHOLD = ev.target.clientWidth / 10;
     if (diff1 >= PINCH_THRESHHOLD && diff2 >= PINCH_THRESHHOLD)
         ev.target.style.background = "green";
   }
	} else{
	x = e.touches[0].pageX;
	y = e.touches[0].pageY;			
	carousel.addEventListener("touchmove", run_carousel, false);
	document.addEventListener("touchend", function(e) {
		carousel.removeEventListener("touchmove", run_carousel);
	}, false);}
}

// handle_pinch_zoom = function(ev) {

//  if (ev.targetTouches.length == 2 && ev.changedTouches.length == 2) {
//    // Check if the two target touches are the same ones that started
//    // the 2-touch
//    var point1=-1, point2=-1;
//    for (var i=0; i < tpCache.length; i++) {
//      if (tpCache[i].identifier == ev.targetTouches[0].identifier) point1 = i;
//      if (tpCache[i].identifier == ev.targetTouches[1].identifier) point2 = i;
//    }
//    if (point1 >=0 && point2 >= 0) {
//      // Calculate the difference between the start and move coordinates
//      var diff1 = Math.abs(tpCache[point1].clientX - ev.targetTouches[0].clientX);
//      var diff2 = Math.abs(tpCache[point2].clientX - ev.targetTouches[1].clientX);

//      // This threshold is device dependent as well as application specific
//      var PINCH_THRESHHOLD = ev.target.clientWidth / 10;
//      if (diff1 >= PINCH_THRESHHOLD && diff2 >= PINCH_THRESHHOLD)
//          ev.target.style.background = "green";
//    }
//    else {
//      // empty tpCache
//      tpCache = new Array();
//    }
//  }
// }

carousel.addEventListener("touchstart", handleTouchStart, false);
