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
			numSlides = itemsLength;
			if (numSlides > 0 && showPaginationDots) {
				var dotslist = "";
				for (var i = 0; i < numSlides; i++) {
					dotslist += "<li class='conveyor-dot'></li>";
				}
				conveyorEl.innerHTML += "<ol class='dotsList'>" + dotslist + "</ol>";
			}
		}

		function setCurrentDot(index) {
			if (numSlides > 0 && showPaginationDots) {
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
			if (numSlides > 0 && showPaginationDots) {
				var dots = containerElement.getElementsByTagName("ol");
				for (var i = dots.length - 1; i >= 0; i--) {
			        dots[i].parentNode.removeChild(dots[i]);
			    }
			}
		}

		//----------------------------------------------------------------------
		function navigate(direction) {
			var items = getItems();
			var current = items[currIndex];
			if (!current) {
				return;
			}
			current.classList.remove("conveyor-current");

			// Handle positive & negative wrap-around
			currIndex = (currIndex + direction) % items.length;
			if (currIndex < 0) {
				currIndex = items.length + currIndex;
			}
			setCurrentDot(currIndex, items.length);
			var current = items[currIndex];
			current.classList.add("conveyor-current");
		}

		//----------------------------------------------------------------------
		// Setup previous and next arrow buttons
		var prevArrow,
			nextArrow;

		function createArrows(conveyorEl, numSlides) {
			if (numSlides === 0) {
				return; // Only show arrows if more than one slide
			}

			conveyorEl.innerHTML += "<div class='conveyor-ctrl-left'><a class='conveyor-prev'>" +
                    				"<span class='icon icon-arrow-left'></span>" +
                					"</a></div>" +
									"<div class='conveyor-ctrl-right'><a class='conveyor-next'>" +
                    				"<span class='icon icon-arrow-right'></span>" +
                					"</a></div>";

			prevArrow = conveyorEl.getElementsByClassName("conveyor-prev")[0];
			nextArrow = conveyorEl.getElementsByClassName("conveyor-next")[0];

			if (prevArrow) {
				prevArrow.addEventListener("click", prevArrowClickHandler);
			}
			if (nextArrow) {
				nextArrow.addEventListener("click", nextArrowClickHandler);
			}
		}

		function destroyArrows() {
			if (prevArrow) {
				prevArrow.removeEventListener("click", prevArrowClickHandler);
				var prevArrowParent = prevArrow.parentNode; // aka conveyor-ctrl-left
				prevArrowParent.parentNode.removeChild(prevArrowParent);
			}
			if (nextArrow) {
				nextArrow.removeEventListener("click", nextArrowClickHandler);
				var nextArrowParent = nextArrow.parentNode; // aka conveyor-ctrl-right
				nextArrowParent.parentNode.removeChild(nextArrowParent);
			}
		}

		function prevArrowClickHandler(ev) {
			navigate(-1);
		}

		function nextArrowClickHandler(ev) {
			navigate(1);
		}
		//----------------------------------------------------------------------

	};

	return Conveyor;
}));
