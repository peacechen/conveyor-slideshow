// Get the element that the conveyor will render into.
var container = document.getElementsByClassName("conveyor-container")[0];

// Pass the container element to conveyor and intialize it.
var conveyor = new conveyorSlideshow(container, true);
conveyor.init();

// Uncomment the following to destroy the conveyor after 5 seconds
//------------------------------------------------------------------------------
// setTimeout(function() {
// 	conveyor.destroy();
// }, 5000)
