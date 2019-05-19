var calculadora = {
	init : function(){ //Inicializa la calculadora
		var Operador1=''
		var Operador=''
		//Ingresamos en un vector el valor de las teclas
		var teclas = [0,1,2,3,4,5,6,7,8,9,'punto','on','sign','raiz','dividido','por','menos','mas','igual']; 
		for(i=0;i<=18;i++){ //le otorgamos escuchas a los eventos cuando se oprime y suelta el mouse a cada tecla
			document.getElementById(teclas[i]).onmousedown=this.cambiaTeclas;
			document.getElementById(teclas[i]).onmouseup=this.cambiaTeclas;
		}
		
		
	},
	
	cambiaTeclas : function(eventoTecla){ //Cambia el efecto de las teclas y direcciona para realizar una accion
		
		var evento = eventoTecla || window.event; //capturamos el evento
		switch(evento.type) {
			case 'mousedown': //Si se oprime la tecla
				this.style="box-shadow: inset -50px -50px 50px 50px rgba(255,255,255,255)";							  
				break;
			case 'mouseup': //si se suelta la tecla
				this.style="box-shadow: 0 0 0 0 rgba(0,0,0,0)";
				calculadora.verifiqueAccion(this.id)  //Verificamos que accion tomar segun la tecla oprimida
				break;
			default :
				alert('no entra a ninguno de los casos de eventos en las teclas '+ evento.type);
				break;
		}
	},
	
	escribeEnPantalla : function(Valor){ //Escribe en la pantalla
		var display = document.getElementById('display')
		var Valor = String(Valor)
		var n = Valor.indexOf('-'); //Busco el negativo
		if(Valor != 'clear'){
			if(Valor.length>8 && n<0 && Valor != 0){
				Valor=Valor.substr(0,8)
			}else if(Valor.length>8 && n>=0 && Valor != 0){
				Valor=Valor.substr(0,9)
			}
			display.innerHTML=Valor
		}else{
			display.innerHTML=0;
		}		
		
	},
	
	verifiqueAccion : function(idTecla){  //Verifica que tecla fue oprimida y realiza la accion correspondiente
		var display = document.getElementById('display')
		var displayValorActual= display.innerHTML
		var nuevoValor=displayValorActual
		console.log(displayValorActual)
		if(idTecla >=0 || idTecla<=9){ //Cuando la tecla va del 0 al 9
			
			if(displayValorActual=="0"){ //Si el valor actual es 0 lo reemplaza por el valor de la tecla oprimida
				nuevoValor=idTecla
					
			}else{
				nuevoValor=displayValorActual+idTecla
			}
			
			
		}
		//Si se oprime la tecla on
		if(idTecla == 'on'){
			nuevoValor="clear"
			
		}
		//si se oprime la tecla punto
		if(idTecla == 'punto'){
			var n = displayValorActual.indexOf('.'); //Busco el punto
			console.log(n)
			if(n<=0){
				nuevoValor=displayValorActual+'.'
			}
			
		}
		//si se oprime el signo negativo
		if(idTecla == 'sign'){
			var n = displayValorActual.indexOf('-'); //Busco el negativo
			console.log(n)
			if(n>=0){
				nuevoValor=displayValorActual.replace('-', '');
			}else{
				if(displayValorActual>0){
					nuevoValor='-'+displayValorActual
				}
			}
			
		}
		
		this.escribeEnPantalla(nuevoValor)
		
		//si se recibe algun comando
		if(idTecla == 'mas' || idTecla == 'menos' || idTecla == 'por' || idTecla == 'dividido'){
			this.Operador1=displayValorActual
			this.Operacion=idTecla
			display.innerHTML=''
		}
		
		//Si recibo el ==
		if(idTecla=='igual'){
			var resultado;
			resultado=this.operaciones(this.Operador1,nuevoValor,this.Operacion);
			
			this.escribeEnPantalla(resultado)
		}
		
		//Si recibo raiz
		if(idTecla=='raiz'){
			var resultado;
			resultado=Math.sqrt(displayValorActual);			
			this.escribeEnPantalla(resultado)
		}
		
		
	},

	operaciones : function(Operador1,Operador2,Operacion){
		console.log(Operador1+" "+Operacion+" "+Operador2)
		if( Operador1 !='' && Operacion != ''){
			var resultado=0;
			switch (Operacion){
				case 'mas':
					resultado=parseFloat(Operador1)+parseFloat(Operador2);
					console.log(Operador1+" + "+Operador2+"="+resultado)
					return(resultado);
					break;
				case 'resta':
					resultado=parseFloat(Operador1)-parseFloat(Operador2);
					return(resultado);
					break;
				case 'por':
					resultado=parseFloat(Operador1)*parseFloat(Operador2);
					return(resultado);
					break;
				case 'dividido':
					resultado=parseFloat(Operador1)/parseFloat(Operador2);
					return(resultado);
					break;	
					
						
			}
			
			
		}else{
			return('NA');
		}
		
		
	}
	
}

calculadora.init()