function crearcuadros() {
	document.getElementById("resultado2").innerHTML = '';
	d = document.getElementById("cuadros");
	while (d.hasChildNodes()) {  
  		d.removeChild(d.firstChild);} 
	var n = document.getElementById("n");
	for(var i = 1; i <= parseInt(n.value); i++){
		var p = document.createElement("P");
		p.appendChild(document.createTextNode("Dirección IP "+ i.toString() + ": "));
		p.setAttribute("id", "p" + i.toString());
		var inp = document.createElement("INPUT");
  		inp.setAttribute("type", "text");
  		inp.setAttribute("id", i.toString());
  		p.appendChild(inp);
  		d.appendChild(p);
  		document.getElementById("p" + i.toString()).style.fontFamily = "Helvetica";
	}
	boton = document.createElement("BUTTON");
	boton.setAttribute("onclick", "sumredes()");
	boton.appendChild(document.createTextNode("Sumarización de rutas"));
	boton.setAttribute("class", "btn-success");
	d.appendChild(boton);
}

//Toma los datos de los cuadros de texto y realiza la sumarización de rutas
function sumredes() {
	var n = document.getElementById("n");
	var direcciones = [];
	for(var i = 1; i <= parseInt(n.value); i++){
		var ip = document.getElementById(i.toString());
		direcciones.push(ip.value);
	}
	document.getElementById("resultado2").innerHTML = sumarizacion(direcciones);
  	document.getElementById("resultado2").style.fontFamily = "Helvetica";
}

//Sumarización de redes
function sumarizacion(direcciones){
	var dir = [];
	var dirbinarias = [];
	var sum = 'Hay ' + direcciones.length.toString() + ' direcciones:\n\n';
	for (var i = 0; i < direcciones.length; i++){
		dir.push(creaoctetos(direcciones[i]));
		dirbinarias.push(dirbin(dir[i]));
		sum += direcciones[i] + '\n' + dirbin(dir[i]) + '\n\n'}
	if (verificasum(dir, direcciones) == false){
		return '';
	}
		sum += compara(dirbinarias);
	return sum;	
}

//Verifica errores en los datos de la sumarización de rutas
function verificasum(dir, direcciones){
	for (var i = 0; i < dir.length; i++){
		if (clase(dir[i]) == 0 || dir[i].length != 4){
			alert("Dirección IP no válida");
			return false;}
		if (clase(dir[0]) != clase(dir[i])){
			alert("Las direcciones IP deben ser de la misma clase");
			return false;}
		if (direcciones.lastIndexOf(direcciones[i]) != i){
			alert("Dirección IP repetida");
			return false;}
		for (var j = 0; j <= 3; j++){
			if(dir[i][j] > 255){
				alert("Dirección IP no válida");
				return false;}}}
	if (contiguas(dir) == false){
		alert('Las direcciones NO son contiguas');
		return false;
	}
	return true;
}

//Verifica si las direcciones son contiguas
function contiguas(dir){
	var lista = [];
	for (var j = 0; j < dir[0].length; j++){
		for (var i = 1; i < dir.length; i++){
			if(dir[0][j] != dir[i][j]){
				var end = true;
				break;}}
		if (end){
			break;}}
	for (var i = 0; i < dir.length; i++){
		lista.push(dir[i][j]);
	}
	lista = lista.sort();
	for (var i = 0; i < lista.length; i++){
		if (lista[lista.length-1] - lista[i] != lista.length-i-1){
			return false;}}
	return true;
}

//Asigna clase a la dirección IP
function clase(octetos){
	if (octetos[0] <= 127){
		return 8;
	}
	else if (octetos[0] <= 191){
		return 16;
	}
	else if (octetos[0] <= 223){
		return 24;
	}
	return 0;
}

//Separa la dirección IP en octetos
function creaoctetos(dir){
	var octetos = dir.split('.');
	for (var i = 0; i < octetos.length; i++){
		octetos[i] = parseInt(octetos[i]);
	}
	return octetos
}

//Completa el octeto
function completa(binario){
	while (binario.length < 8){
		binario = '0' + binario;}
	return binario;
}

//Convierte direcciones IP a su equivalente binario
function dirbin(octetos){
	var binario  = '';
	for (var i = 0; i < octetos.length; i++){
		binario += completa(octetos[i].toString(2)) + '.'}
	return binario.substr(0, binario.length - 1);
}

//Convierte una dirección binaria a decimal
function bindir(binario){
	bin = binario.split('.');
	dir = ''
	for (var i = 0; i < bin.length; i++){
		dir += parseInt(bin[i], 2).toString() + '.';}
	return dir.substr(0, dir.length - 1);
}

//Compara los bits de las direcciones para obtener el segmento de red y la máscara modificada
function compara(dirbinarias){
	var superr = '';
	var mm = '';
	var sufijo = 0, aux;
	for (var i = 1; i <= 35; i++){
		for (var j = 1; j < dirbinarias.length; j++){
			if (dirbinarias[0].substring(0, i) != dirbinarias[j].substring(0, i)){
				var end = true;
				break;}}
		if (end){
			break;}
		if (dirbinarias[0][i-1] != '.'){
			sufijo++;}
		superr += dirbinarias[0][i-1];}
	if (sufijo == 0){
		return sufijo.toString() + ' bits coinciden de izquierda a derecha\n' + 
		'No se puede realizar una sumarización de rutas';
	}
	while (superr.length < 35){
		if (superr.length == 8 || superr.length == 17 || superr.length == 26){
			superr += '.';}
		else{
			superr += '0';}}
	aux = sufijo;
	while (mm.length < 35){
		if (mm.length == 8 || mm.length == 17 || mm.length == 26){
			mm += '.';}
		else if (aux > 0){
			mm += '1';
			aux--;}
		else{
			mm += '0';
		}

	}
	return sufijo.toString() + ' bits coinciden de izquierda a derecha\n' + superr + '\n\n' + 
	'La dirección IP y la máscara de red de la súper red son:\n' + 
	bindir(superr) + '/' + sufijo.toString() + '\n' + bindir(superr) + '/' + bindir(mm); 
}