function powerRL(U, f, R, L){
	var Xl = 2 * Math.PI * f * L;
	var P = (U * U) / (Math.sqrt(R * R + Xl * Xl));
	return P;
}

function calcRL() {
   var U, f, R, L;
   
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
   
   if (CheckDecimal(document.getElementById("ind").value)){
	   L = parseFloat(document.getElementById("ind").value);
	   switch (document.getElementById("metricL").value) {
		case "mh": L /= 1000; break;
	   }
   } else {
	   document.getElementById("ind").value = "";
	   flagCheck = true;
   }
   
   if (flagCheck){
	   alert("Не сте въвели коректни стойности!");
	   return;
   }
   var S, P, Q, phi, PF;
   if (U != 0 && R != 0 && L != 0 && f != 0){
	   var Xl = 2 * Math.PI * f * L;
	   phi = Math.atan(Xl / R);
	   S = powerRL(U, f, R, L);
	   P = S * Math.cos(phi);
	   Q = S * Math.sin(phi);
	   PF = P / S;
   } else if (U == 0) {
	   PF = P = Q = S = phi = 0;
   } else if (L == 0 || f == 0) {
	   Q = phi = 0;
	   P = S = powerRL(U, f, R, L);
	   PF = 1;
   } else if (R == 0){
	   PF = P = 0;
	   phi = Math.PI / 2;
	   Q = S = powerRL(U, f, R, L);
   }
   
   writeVal("apow", P, "W");
   
   writeVal("rpow", Q, "VAr");
   
   writeVal("spow", S, "VA");
   
 
   document.getElementById("cos").value = PF.toFixed(5);
   
   document.getElementById("fi").value = phi.toFixed(5) + " rad";
   
   document.getElementById("fid").value = rad2deg(phi).toFixed(5) + " deg";
}
