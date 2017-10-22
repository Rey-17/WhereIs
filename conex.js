var mic = new Wit.Microphone(document.getElementById("microphone"));
var info = function (msg) {
    document.getElementById("info").innerHTML = msg;
};
var error = function (msg) {
    document.getElementById("error").innerHTML = msg;
};
mic.onready = function () {
    info("Microphone is ready to record");
};
mic.onaudiostart = function () {
    info("Recording started");
    error("");
};
mic.onaudioend = function () {
    info("Recording stopped, processing started");
};
var comercio, lugar;
mic.onresult = function (intent, entities) {
    console.log("intents: "+intent);
    console.log("entities: "+ JSON.stringify(entities));
    var r = kv("intent", intent);
    console.log("r: "+r);

    for (var k in entities) {
        var e = entities[k];

        if (!(e instanceof Array)) {
            r += kv(k, e.value);
        } else {
            for (var i = 0; i < e.length; i++) {
                r += kv(k, e[i].value);
            }
        }
    }

    document.getElementById("result").innerHTML = r;
    document.getElementById("local").value = comercio;
    document.getElementById("pac-input").value = "Panama, "+lugar;
    ch();

};
mic.onerror = function (err) {
    error("Error: " + err);
};
mic.onconnecting = function () {
    info("Microphone is connecting");
};
mic.ondisconnected = function () {
    info("Microphone is not connected");
};

mic.connect("PJEJ7DSH3ZM6QD2PZBOSZE56ZFPQJOTZ");
// mic.start();
// mic.stop();

function kv (k, v) {
    if (toString.call(v) !== "[object String]") {
        v = JSON.stringify(v);
    }

    if(k=="intent"){
        intento=v;
    }
    if((k=="local")){
        comercio=v;    //se le asigna a la variable comercio el valor de v solo cuando la entidad k es local
    }else if(k=="lugar"){
        lugar=v;      //se le asigna a la variable lugar el valor de v solo si la entidad k es lugar
    }

    return k + "=" + v + "\n";
}