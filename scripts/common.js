function CheckDecimal(inputtxt) { 
	const decimal=  /^[0-9]+(\.[0-9]+)?$/; 
	if(inputtxt.match(decimal)) { 
		return true;
	} else { 
		return false;
	}
} 


function rad2deg(rad){
	return rad * 360 / (2 * Math.PI);
}

function writeVal(id, num, me){
	if (num < 1000){
	document.getElementById(id).value = num.toFixed(3) + " " + me;
   } else if ( num < 1000000){
	num /= 1000;
	document.getElementById(id).value = num.toFixed(3) + " k" + me;
   } else if( num < 1000000000) {
    num /= 1000000;
	document.getElementById(id).value = num.toFixed(3) + " M" + me;
   } else {
    num /= 1000000000;
	document.getElementById(id).value = num.toFixed(3) + " G" + me;
   }
}