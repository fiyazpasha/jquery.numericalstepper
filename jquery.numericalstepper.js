/**
 * @summary       Numerical Stepper
 * @description 	Increment/Decrement value using handlers
 * @version     	2.1
 * @file        	jquery.numericalstepper.js
 * @author      	Fiyaz Pasha
 * @contact     	http://in.linkedin.com/pub/fiyaz-pasha/22/70a/874/
 *
 * @filesRequired	Jquery library 1.8 and above
 *
 */

;(function($, undefined) {

	if(typeof myObj == 'undefined'){myObj = {}};

	function log() {
		window.console && console.log && console.log('[numericalstepper] ' + Array.prototype.join.call(arguments,' '));
	}

	$.fn.numericalstepper = function(obj) {
		var o = { s: this.selector, c: this.context };
		if (this.length === 0) {
			if (!$.isReady && o.s) {
				log('DOM not ready, queuing slideshow');
				$(function() {
					$(o.s,o.c).numericalstepper(obj);
				});
				return this;
			}
			// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
			log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
			return this;
		}

		// iterate the matched nodeset
		return this.each(function() {
			var opts = myObj.initializeOptions(this, obj);
			if(typeof opts == 'undefined')
				return
			myObj._setValue(this, opts)
			myObj._AddEventListeners(this, opts)
		});
	};

	myObj.initializeOptions = function($cont, $opts){
		this.options = {
			step:1,
			start : 50,
			min : 0,
			max : 100,
			stepHandler : null,
			value : null,
			stepperType : "+",
			eventHandler : "click"
		}
		this.options = $.extend(this.options, $opts);
		if(this.options.value == null){this.options.value = this.options.start};
		if(typeof this.options.stepUp == 'undefined' || typeof this.options.stepDown == 'undefined' || typeof this.options.displayObject == 'undefined'){
			alert("Required handlers missing. Please set handler values for increment, decrement and stepper display objects.")
			return;
		}else if(this.options.start < this.options.min || this.options.start > this.options.max){
			log("Invalid inputs for start & min/max values")
			return;
		}else{
			return this.options;
		}
	}

	myObj._AddEventListeners = function($cont, $opts){
		_t = this;

		function onMouseRelease(e){
			clearInterval(_t.intervalHandler);
			$(document).off('mouseup', onMouseRelease);
		}

		if($opts.stepUp !== 'undefined' || $opts.stepUp !== null){
			//create mouse down event for ++counter
			if($opts.eventHandler == "mousedown"){
				$($cont).on("mousedown", $opts.stepUp, function(event){
					$opts.stepperType = "+";
					_t.intervalHandler = setInterval(function(){myObj._mouseDownStepper($cont, $opts)}, 60);
					$(document).on('mouseup', onMouseRelease);
				});
				$($cont).on("mouseup", $opts.stepUp, onMouseRelease);
				$($cont).on("mouseleave", $opts.stepUp, onMouseRelease);
			}else{
				$($cont).on($opts.eventHandler, $opts.stepUp, function(event){
					myObj._stepUpEvent($cont, $opts);
				})
			}
		}
		if($opts.stepDown !== 'undefined' || $opts.stepDown !== null){
			//create mouse down event for --counter
			if($opts.eventHandler == "mousedown"){
				$($cont).on("mousedown", $opts.stepDown, function(event){
					$opts.stepperType = "-";
					_t.intervalHandler = setInterval(function(){myObj._mouseDownStepper($cont, $opts)}, 60);
					$(document).on('mouseup', onMouseRelease);
				});
				$($cont).on("mouseup", $opts.stepDown, onMouseRelease);
				$($cont).on("mouseleave", $opts.stepDown, onMouseRelease);
			}else{
				$($cont).on($opts.eventHandler, $opts.stepDown, function(event){
					myObj._stepDownEvent($cont, $opts);
				})
			}
		}
	}

	myObj._mouseDownStepper = function($cont, $opts){
		if($opts.stepperType == "+"){
			$opts.start+=$opts.step;
			if($opts.start > $opts.max){
				$opts.start = $opts.max;
			}
		}else{
			$opts.start-=$opts.step;
			if($opts.start < $opts.min){
				$opts.start = $opts.min;
			}
		}
		$opts.value = $opts.start;
		myObj._setValue($cont, $opts)
	}

	myObj._setValue = function($cont, $opts){
		if($opts.stepHandler != null && typeof $opts.stepHandler != "undefined"){
			$opts.stepHandler($opts);
		}
			var eleType = $($cont).find($opts.displayObject).prop("tagName");
			if(eleType.toLowerCase() == 'textarea' || eleType.toLowerCase() == 'input' || eleType.toLowerCase() == "select")
				$($cont).find($opts.displayObject).val($opts.start);
			else
				$($cont).find($opts.displayObject).text($opts.start);
	}

	myObj._stepUpEvent = function($cont, $opts){
		$opts.start+=$opts.step;
		if($opts.start > $opts.max){
			$opts.start = $opts.max;
		}
		$opts.value = $opts.start;
		myObj._setValue($cont, $opts)
	}

	myObj._stepDownEvent = function($cont, $opts){
		$opts.start-= $opts.step;
		if($opts.start < $opts.min){
			$opts.start = $opts.min;
		}
		$opts.value = $opts.start
		myObj._setValue($cont, $opts)
	}

})(jQuery);
