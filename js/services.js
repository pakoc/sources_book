angular.module('jinr').service('TouchEventServise', function(){
	var isTouchSupported = 'ontouchstart' in window;
	return {
		startEvent : (function(){
			return isTouchSupported ? 'touchstart' : 'mousedown';
		})(),
		moveEvent : (function(){
			return isTouchSupported ? 'touchmove' : 'mousemove';
		})(),
		endEvent : (function(){
			return isTouchSupported ? 'touchend' : 'mouseup';
		})()
	}
});