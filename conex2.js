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
        if((c=="Caja de Ahorros")||(c=="Caja Ahorros")||(c=="caja ahorros")||(c=="ca de ahorros")||(c=="Ca de Ahorros")||(c=="caja de ahorros")||
            (c=="caj de ahorros")||(c=="Caj de Ahorros")){
            c="Caja de Ahorros";
        }

    }else if(i == "Don_Lee"){
        if((c=="dunlee")||(c=="dongle")||(c=="Don Lee")||(c=="donnelley")||(c=="the only")||(c=="lonely")||(c=="durly")||(c=="doublelift")||(c=="2leep")||
            (c=="Download")||(c=="download")||(c=="dónde")||(c=="Don")||(c=="don")||(c=="Donde")||(c=="donde")||(c=="Dónde")||(c=="Don Lino")||(c=="don lino")||
            (c=="Don lino")||(c=="Doully")||(c=="Only")||(c=="doully")||("only")||(c=="daunlip")||(c=="Daunlip")||(c=="Doublelift")||(c=="down")||(c=="Down")){
            c="Don Lee";
        }
    }else if(i == "KFC"){
        if((c=="KFC")||(c=="kfc")||(c=="kaefece")||(c=="keifci")||(c=="caefece")||(c=="Kaefece")||(c=="Caefece")||(c=="Keifici")||(c=="caefese")||(c=="Caefese")||
            (c=="kaefese")||(c=="Kaefese")){
            c="KFC";
        }
    }else if(i == "Mcdonald"){
        if((c=="Mcdonald")||(c=="mcdonald")||(c=="Macdonalds")||(c=="macdonalds")||(c=="Mcdonald's")||(c=="mcdonald's")||(c=="macdonald's")||(c=="Macdonald's")){
            c="Mcdonald";
        }
    }else if(i == "Romero"){
        if((c=="romero")||(c=="Romero")||(c=="Romer")||(c=="romer")){
            c="Romero";
        }
    }else if(i == "Super_99"){
        if((c=="super 99")||(c=="Super 99")||(c=="súper 99")||(c=="Súper 99")||(c=="super99")||(c=="Super99")||(c=="Súper99")||(c=="súper99")||
            (c=="super noventa y nueve")||(c=="Super Noventa y Nueve")||(c=="super29")||(c=="Super29")||(c=="super 29")||(c=="Super 29")){
            c="Super 99";
        }
    }else if(i == "Super_Xtra"){
        if((c=="Super Xtra")||(c=="super xtra")||(c=="super Xtra")||(c=="Super xtra")||(c=="Súper Xtra")||(c=="Súper xtra")||(c=="súper Xtra")||(c=="súper xtra")||
            (c=="Súper estra")||(c=="súper estra")||(c=="Súper Estra")||(c=="súper Estra")||(c=="Super Extra")||(c=="Super extra")||(c=="super extra")||
            (c=="super Extra")||(c=="Súper Extra")||(c=="Súper extra")||(c=="súper Extra")||(c=="súper extra")){
            c="Super Xtra";
        }
    }
    console.log(c);
    if((l=="Via Veneto")||(l=="via veneto")||(l=="events")||(l=="Vía Veneto")||(l=="vía veneto")||(l=="Vía veneto")||(l=="vía Veneto")||(l=="Events")){
        l="Via Veneto";
    }else if((l=="Las Acacias")||(l=="las acacias")||(l=="Las acacias")||(l=="las Acacias")||(l=="Lacasia")||(l=="lacasia")||(l=="Las Acasias")||(l=="Las acasias")||
        (l=="las Acasias")||(l=="las acasias")){
        l="Las Acacias";
    }else if((l=="Brisas del Golf")||(l=="Brisas del golf")||(l=="Brisas Del Golf")||(l=="brisas del golf")||(l=="brisas del Golf")){
        l="Brisas del Golf";
    }else if((l=="San Miguelito"||"san miguelito"||"San miguelito"||"san Miguelito")){
        l="San Miguelito";
    }else if(l=="Plaza Carolina"||"plaza carolina"||""){
        l="Plaza Carolina";
    }

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
