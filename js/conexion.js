var mic = new Wit.Microphone(document.getElementById("microphone"));
var vec=[];
var comercio, lugar, intento;
var info = function (msg) {
	document.getElementById("info").innerHTML = msg;
};

var BD=function(c,l) {
	document.getElementById("consulta").innerHTML = "Lo que deseas buscar es lo siguiente: " + c +" "+ l;
	document.getElementById("boton").innerHTML='<button onclick="enviar()">Continuar</button>';
};

var compare=function(c,l,i){
	if(i=="Banco_General"){
		if((c=="Banco General")||(c=="banco general")||(c=="Banc General")||(c=="ban General")){
			c="Banco General";
			console.log("dentro del if");
		}
	}else if(i == "Banesco"){
		if((c=="banners")||(c=="Banesco")||(c=="banesco")||(c=="baneso")){
			c="Banesco";
			console.log("dentro del if banesco");
		}
	}else if(i == "Caja_de_Ahorros"){
		
	}else if(i == "Don_Lee"){
		if((c=="dunlee")||(c=="dongle")||(c=="Don Lee")||(c=="donnelley")||(c=="the only")||(c=="lonely")||(c=="durly")||(c=="doublelift")||(c=="2leep")||(c=="Download")||(c=="download")||(c=="dónde")){
			c="Don Lee";
		}
	}else if(i == "KFC"){
	}else if(i == "Mcdonald"){
	}else if(i == "Romero"){
	}else if(i == "Super_99"){
	}else if(i == "Super_Xtra"){
	}
	console.log(c);
	//if()
	
    BD(c,l);
	}

var error = function (msg) {
	document.getElementById("error").innerHTML = msg;
};
mic.onready = function () {
	info("Microfono esta listo para escuchar");
};
mic.onaudiostart = function () {
	info("Recording started");
	error("");
};
mic.onaudioend = function () {
	info("Grabacion Detenida, procesando resultado");
};
mic.onresult = function (intent, entities) {
	var r = kv("intent", intent);

	for (var k in entities) {
		var e = entities[k];

		if (!(e instanceof Array))
		{
			r += kv(k, e.value);
		}
		else
		{
			for (var i = 0; i < e.length; i++)
			{
				r += kv(k, e[i].value);
			}
		}
	}

	document.getElementById("result").innerHTML = r;
	compare(comercio, lugar, intento);
	//BD(comercio,lugar);
};
mic.onerror = function (err) {
	error("Error: " + err);
};
mic.onconnecting = function () {
	info("El microfono se esta conectando");
};
mic.ondisconnected = function () {
	info("El microfono no esta conectado");
};

mic.connect("PJEJ7DSH3ZM6QD2PZBOSZE56ZFPQJOTZ");  //en esta funcion se conecta al token creado en wit.ai
// mic.start();
// mic.stop();

function kv (k, v) {


	if (toString.call(v) !== "[object String]")
	{
		v = JSON.stringify(v);
	}
	//Agregando la linea de la conexión
	if(k=="intent"){
		intento=v;
		console.log(intento);
	}
	if((k=="local")){
		comercio=v;    //se le asigna a la variable comercio el valor de v solo cuando la entidad k es local
		console.log(comercio);
	}else if(k=="lugar"){
		lugar=v;      //se le asigna a la variable lugar el valor de v solo si la entidad k es lugar
		console.log(lugar);
	}
	return k + "=" + v + "\n";
	
}

function enviar(){
$.ajax({
	url:'consulta.php',
	type:'POST',
	data:{intento: intento, comercio: comercio,lugar:lugar},
	dataType: 'json',
	success: function(respuesta){
		alert(respuesta.mensaje);
	}
});
	
}
