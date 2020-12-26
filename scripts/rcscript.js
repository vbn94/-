function powerRC(U, f, R, C){
	var Xc = 0;
	if (C != 0 || f != 0){
		Xc = 1 / (2 * Math.PI * f * C);
	}
	var P = (U * U) / (Math.sqrt(R * R + Xc * Xc));
	return P;
}

function calcRC() {
   var U, f, R, C;
   
   var flagCheck = false;
   if (CheckDecimal(document.getElementById("voltage").value)){
	   U = parseFloat(document.getElementById("voltage").value);
	   switch (document.getElementById("metricV").value) {
		case "kv": U *= 1000; break;
	   }
   } else {
	    document.getElementById("voltage").value = "";
		flagCheck = true;
   }
   
   if (CheckDecimal(document.getElementById("voltageF").value)){
	   f = parseFloat(document.getElementById("voltageF").value);
	   switch (document.getElementById("metricF").value) {
		case "khz": f *= 1000; break;
		case "mhz": f *= 1000000; break;
		case "rads": f /= (2 * Math.PI); break;
	   }
   } else {
	   document.getElementById("voltageF").value = "";
	   flagCheck = true;
   }
   
   if (CheckDecimal(document.getElementById("res").value)){
	    R = parseFloat(document.getElementById("res").value);
	   switch (document.getElementById("metricR").value) {
		case "kohm": R *= 1000; break;
		case "mohm": R *= 1000000; break;
	   }
   } else {
	   document.getElementById("res").value = "";
	   flagCheck = true;
   }
   
   if (CheckDecimal(document.getElementById("cap").value)){
	   C = parseFloat(document.getElementById("cap").value);
	   switch (document.getElementById("metricC").value) {
		case "nf": C /= 1000000000; break;
		case "uf": C /= 1000000; break;
		case "mf": C /= 1000; break;
	   }
   } else {
	   document.getElementById("cap").value = "";
	   flagCheck = true;
   }
   
   if (flagCheck){
	   alert("Не сте въвели коректни стойности!");
	   return;
   }
   
   var S, P, Q, phi, PF;
   if (U != 0 && R != 0 && C != 0 && f != 0){
	   var Xc = 1 / (2 * Math.PI * f * C);
	   phi = Math.atan(Xc / R);
	   S = powerRC(U, f, R, C);
	   P = S * Math.cos(phi);
	   Q = S * Math.sin(phi);
	   PF = P / S;
   } else if (U == 0 || (f == 0 && C != 0)) {
	   PF = P = Q = S = phi = 0;
   } else if (C == 0) {
	   Q = phi = 0;
	   P = S = powerRC(U, f, R, C);
	   PF = 1;
   } else if (R == 0){
	   PF = P = 0;
	   phi = Math.PI / 2;
	   Q = S = powerRC(U, f, R, C);
   }
   writeVal("apow", P, "W");
   
   writeVal("rpow", Q, "VAr");
   
   writeVal("spow", S, "VA");
   
   document.getElementById("cos").value = PF.toFixed(5);
   
   document.getElementById("fi").value = phi.toFixed(5) + " rad";
   
   document.getElementById("fid").value = rad2deg(phi).toFixed(5) + " deg";
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
