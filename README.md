jquery.numericalstepper
=======================

A jquery based plugin for numerical increasing/decreasing counter


The plugin provides a method called numericalstepperwhich is invoked on a container element.

All default values are explained below
HTML Example code:

<div class="stepUpSlider1">
<div class="inputContainer theme2"><input class="stepUpCounter1" type="text" value=""/></div>
<div class="example2Handles">
<div class="increase theme2">Increase</div>
<div class="decrease theme2">Decrease</div>
</div>
</div>

Javascript Example code for the above HTML:

$(".stepUpSlider").numericalstepper
stepUp : ".increase",  			//ID or Class of incrementing element, required property
stepDown : ".decrease",				//ID or class of decrementing element, required property
displayObject : ".stepUpCounter",	//ID or Class of container where the increment should be displayed, required property
start : 10,		//default value is 50
stepHandler: function(ns){			//Callback function to handle get and set functionality.
	$(".stepUpCounter").text(ns.value);
},
step: 1,		//assign the number for increment/decrement.
min : 20,		//default value is 0
max : 100,	//default value is 100
eventHandler : "mousedown"		//To override mouse action. Default value is "click". allowed values mousedown/click 

})

Note: This plugin requires Jquery version 1.8 and above.
External link :  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
Akamai Library link :  <script src="http://www.akamai.com/js/jquery-min.js"></script>
