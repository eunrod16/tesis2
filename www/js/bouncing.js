
// When we do animations in canvas, we have to repaint the whole canvas in each frame. Either clear the whole area or paint it with some color. This helps in keeping the area clean without any repetition mess.
// So, lets create a function that will do it for us.
function clearCanvas() {
	ctx.clearRect(0, 0, W, H);
	var img=document.getElementById("fondo");
	ctx.drawImage(img,0, 0,W,H);
}
//building siempre son las imagenes  buil es el de abajo y build 2 es el de arriba
function VerifyColission(){
	var DerBall = ball.x + ball.w;
	var IzqBall = ball.x;
	var SupBall= ball.y+ (ball.h/2);
	var InfBall = ball.y;
	var DerBuild = building.x + building.w;
	var IzqBuild = building.x;
	var SupBuild= building.y;
	var InfBuild = building.y + building.h;
	var DerBuild2 = building2.x + building2.w;
	var IzqBuild2 = building2.x;
	var SupBuild2= building2.y;
	var InfBuild2 = building2.y + building2.h;
	if(DerBuild> (IzqBall+10) &&  IzqBuild < (DerBall-10) && SupBuild < (InfBall-10)){  //verifica los limites de la colision
		 var valor = document.getElementById("building").value; //el value es la palabra
		 if(valor==palabraactual&&buena==false){ //la bandera buena significa si ya paso los limites una vez no debe sumar puntos si los vuelve a pasar
			 punteo++;
			 document.getElementById('puntuacion').innerHTML = punteo;
			 document.getElementById("building").src ="";
			 buena = true;
			 Buildcorrecto =1;
		 }
		 else if (valor != palabraactual){  //si se colisiona con la imagen incorrecta
		//	 document.getElementById('puntuacion').innerHTML = punteo--;
             loose = true;
			 window.localStorage.setItem('puntuacion', punteo);
             document.querySelector('#myNavigator').resetToPage('loose.html', {data: {title: "Loose"}});
			 // window.location = "loose.html";
		 }



	}
	if(DerBuild2> (IzqBall+10) &&  IzqBuild2 < (DerBall-10) && InfBuild2 > (SupBall+10) ){
		var valor = document.getElementById("building2").value;
		if(valor==palabraactual&& buena==false){
			punteo++;
			document.getElementById('puntuacion').innerHTML = punteo;
			document.getElementById("building2").src ="";
			buena = true;
			Buildcorrecto =2;
		}
		else if (valor != palabraactual){
	//		document.getElementById('puntuacion').innerHTML = punteo--;
			window.localStorage.setItem('puntuacion', punteo);
            loose = true;
            document.querySelector('#myNavigator').resetToPage('loose.html', {data: {title: "Loose"}});
			// window.location = "loose.html";
		}


	}

}


function consultarbd (){
		listpalabras = palabras.split("&"); //palabras es el parametro que se obtubo de la pagina anterior
		var len = listpalabras.length-1;
		var i1 = Math.floor((Math.random()*len)); //Primer random de palabraactual que es la correcta
		palabraactual = listpalabras[i1];
		listimagenes = imagenes.split("&");
		var i2=i1;
		while(i2 == i1){
			i2 = Math.floor((Math.random()*len)); //Palabra incorrecta
		}
		var turno = Math.floor((Math.random()*2)); //Random 0 1 para colocarlo ya sea arriba o abajo
		if (turno ==0){
			imagen2 = listimagenes[i1];
			palabra2 = listpalabras[i1];
			imagen1 = listimagenes[i2];
			palabra1 = listpalabras[i2];
		}
		else{
			imagen2 = listimagenes[i2];
			palabra2 = listpalabras[i2];
			imagen1 = listimagenes[i1];
			palabra1 = listpalabras[i1];
		}


}

// A function that will update the position of the ball is also needed. Lets create one
function update() {
    if(loose)
        return;
	VerifyColission();
	document.getElementById('palabra').innerHTML =palabraactual;
	if(Buildcorrecto!=1){ // el Buildcorrecto inicialmente es 0 ya que si el Buildcorrecto/imagencorrecta fue seleccionada ya no se vuelve a mostrar en la pagina
		document.getElementById("building").src=imagen1;
		document.getElementById("building").value = palabra1;
	}
	if (Buildcorrecto !=2){
		document.getElementById("building2").src=imagen2;
		document.getElementById("building2").value = palabra2;
	}

		clearCanvas();
		ball.draw();
		building.draw();
		building2.draw();



		// Now, lets make the ball move by adding the velocity vectors to its position
		if(ball.y<H){
			ball.y += ball.vy;
		}

		// Ohh! The ball is moving!
		// Lets add some acceleration
		if(ball.vy<100){
			ball.vy += gravity;
		}
		//Perfect! Now, lets make it rebound when it touches the floor
		if(ball.y + 60 > H) {
			// First, reposition the ball on top of the floor and then bounce it!
			ball.y = H - 60;
			//ball.vy *= -bounceFactor;
			// The bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
			console.log('fondo');
		}

		if(ball.y -5 < 0) {
			// First, reposition the ball on top of the floor and then bounce it!
			ball.y = 5;
			//ball.vy *= -bounceFactor;
			// The bounceFactor variable that we created decides the elasticity or how elastic the collision will be. If it's 1, then the collision will be perfectly elastic. If 0, then it will be inelastic.
			console.log('top');
		}
		if(buena){
			estrella.y = estrella.y -5;
			estrella.draw();
		}
		if(building.x+50>0){
			building.x = building.x -2;
			building2.x = building2.x -2.5;
		}else{
			building.x=W;
			building2.x=W;
			estrella.y = H/2;
			buena = false;
			Buildcorrecto=0;
			consultarbd();
		}


}

function loose(){

}


