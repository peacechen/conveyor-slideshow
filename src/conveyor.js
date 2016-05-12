/*
	Simple manual slideshow written in plain old Javascript / HTML5 / CSS.

	UMD module may be imported or required, or script injected as a global.
*/

(function(root, factory) {
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else if (typeof module === "object" && module.exports) {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.conveyorSlideshow = factory();
	}
}(this, function() {

	var Conveyor = function(containerElement, showPaginationDots) {
		var conveyor,
			currIndex = 0;

		// PUBLIC FUNCTIONS
		// -----------------------------------------------------------------

		this.init = function init() {
			conveyor = containerElement.getElementsByClassName("conveyor")[0];

			// On init reset current index to 0.
			currIndex = 0;

			drawConveyor();
		};

		this.drawConveyor = drawConveyor;

		this.destroy = function destroy() {
			//clear out conveyor contents
			var convDisplay = containerElement.getElementsByClassName("conveyor-display")[0];
			convDisplay.parentNode.removeChild(convDisplay);

			destroyArrows();
			destroyDots();
			conveyor = undefined;
		};
		//----------------------------------------------------------------------

		function drawConveyor() {
			// hide the contents until they are resized
			conveyor.style.visibility = "hidden";

			// Manage dots & arrows
			var items = getItems();
			createDots(conveyor, items.length);
			createArrows(conveyor, items.length);

			// Navigate to first page.
			navigate(currIndex);

			// Page is ready to be shown
			conveyor.style.visibility = "visible";
		}

		function getItems() {
			return conveyor.getElementsByClassName("conveyor-display")[0].getElementsByClassName("item");
		}

		//----------------------------------------------------------------------
		var numSlides = 0;
		function createDots(conveyorEl, itemsLength) {
			destroyDots(); // re-draw dots in case number of slides has changed
			numSlides = itemsLength;
			if (numSlides > 1 && showPaginationDots) {
				var dotslist = "";
				for (var i = 0; i < numSlides; i++) {
					dotslist += "<li class='conveyor-dot'></li>";
				}
				conveyorEl.innerHTML += "<ol class='dotsList'>" + dotslist + "</ol>";
			}
		}

		function setCurrentDot(index) {
			if (numSlides > 1 && showPaginationDots) {
				var currentIndex = Math.abs(index),
					dotsList = conveyor.getElementsByClassName("dotsList")[0];
					currDot = dotsList.getElementsByClassName("conveyor-dot-current")[0]
				if (currDot) {
					currDot.classList.remove("conveyor-dot-current");
				}
				dotsList.getElementsByTagName("li")[currentIndex].classList.add("conveyor-dot-current");
			}
		}

		function destroyDots() {
			if (numSlides > 1 && showPaginationDots) {
				var dots = containerElement.getElementsByClassName("dotsList");
				for (var i = dots.length - 1; i >= 0; i--) {
			        dots[i].parentNode.removeChild(dots[i]);
			    }
			}
		}

		//----------------------------------------------------------------------
		function navigate(index) {
			var items = getItems(); // must retrieve fresh elements list in case DOM has changed
			if (items.length < 1) {
				throw {error: "Conveyor: No slides found."};
			}
			var current = items[currIndex];
			if (current) {
				current.classList.remove("conveyor-current");
			}

			// Handle positive & negative wrap-around
			currIndex = (index) % items.length;
			if (currIndex < 0) {
				currIndex = items.length + currIndex;
			}
			setCurrentDot(currIndex, items.length);
			current = items[currIndex];
            if (!current) {
                throw {error: "Conveyor: Unable to navigate to slide " + currIndex};
			}
			current.classList.add("conveyor-current");
			// Show only current slide; hide all others.
			current.style.visibility = "visible";
			for (var i=0; i<items.length; i++) {
				if (i !== currIndex) {
					items[i].style.visibility = "hidden";
				}
			}
		}

		//----------------------------------------------------------------------
		// Setup previous and next arrow buttons
		function createArrows(conveyorEl, numSlides) {
			destroyArrows(); // re-draw arrows in case number of slides has changed
			if (numSlides < 2) {
				return; // Only show arrows if more than one slide
			}
			conveyorEl.innerHTML += "<div class='conveyor-ctrl-left'><a class='conveyor-prev'>" +
                    				"<span class='icon icon-arrow-left'></span>" +
                					"</a></div>" +
									"<div class='conveyor-ctrl-right'><a class='conveyor-next'>" +
                    				"<span class='icon icon-arrow-right'></span>" +
                					"</a></div>";

			var prevArrow = conveyorEl.getElementsByClassName("conveyor-prev")[0];
			var nextArrow = conveyorEl.getElementsByClassName("conveyor-next")[0];

			if (!prevArrow || !nextArrow) {
                throw {error: "Conveyor: Unable to create arrows"};
			}
			prevArrow.addEventListener("click", prevArrowClickHandler);
			nextArrow.addEventListener("click", nextArrowClickHandler);
		}

		function destroyArrows() {
			// must retrieve fresh elements in case DOM has changed
			var prevArrow = conveyor.getElementsByClassName("conveyor-prev")[0];
			if(prevArrow) {
				prevArrow.removeEventListener("click", prevArrowClickHandler);
				var prevArrowParent = prevArrow.parentNode; // aka conveyor-ctrl-left
				prevArrowParent.parentNode.removeChild(prevArrowParent);
			}
			var nextArrow = conveyor.getElementsByClassName("conveyor-next")[0];
			if(nextArrow) {
				nextArrow.removeEventListener("click", nextArrowClickHandler);
				var nextArrowParent = nextArrow.parentNode; // aka conveyor-ctrl-right
				nextArrowParent.parentNode.removeChild(nextArrowParent);
			}
		}

		function prevArrowClickHandler(ev) {
			navigate(currIndex-1);
		}

		function nextArrowClickHandler(ev) {
			navigate(currIndex+1);
		}
		//----------------------------------------------------------------------

	};

	return Conveyor;
}));
