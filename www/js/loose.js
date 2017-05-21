var puntuacion = window.localStorage.getItem('puntuacion');
var punteo = 0;
var categoria = 0;
function initLoose() {
    //var db = window.sqlitePlugin.openDatabase({name: "pruebas.db", location: 'default'});
    //db.transaction(CrearDB, errorDB);
    punteo = window.localStorage.getItem('puntuacion');
    document.getElementById('punteo').innerHTML = '<button class="button button--material--flat" disabled>' + punteo + '</button>';

    categoria = window.localStorage.getItem("categoria");
    var db = window.sqlitePlugin.openDatabase({name: "pruebas1.db", location: 'default'});
    db.transaction(actualizarPunteo, errorCB, successCB);

}
function jugar() {
    // window.location.replace("juego.html");
//        window.plugins.nativepagetransitions.slide({
//            "direction" : "left",
//            "href" : "juego.html"
//        });
    var options = {
        callback: gameplayLoaded,
        data: {title: "Juego"}
    };
    document.querySelector('#myNavigator').pushPage('juego.html', options);
}
function actualizarPunteo(tx) {
    console.log("actualizar punteo");
    tx.executeSql('update categorias set punteo = punteo + ? where id = ?',[punteo,categoria]);
}

function errorCB(err) {

    alert("Error processing SQL: "+err);
}

function successCB() {
    // alert("success!");
    console.log("acutalizado punteo con exito")
}

