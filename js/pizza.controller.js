angular.module("Pizzaria").controller("PizzariaController", function($scope){


	$scope.titulo = 'Pizzaria da SeComp';

	$scope.pedidos = [];
	// Initialize Firebase
 var config = {
    apiKey: "AIzaSyCrpLTWeXX91TmFmqqLOYR-QDeNufX9Tro",
    authDomain: "secomp-5bd82.firebaseapp.com",
    databaseURL: "https://secomp-5bd82.firebaseio.com",
    projectId: "secomp-5bd82",
    storageBucket: "secomp-5bd82.appspot.com",
    messagingSenderId: "280220638811"
  };
  //Funcao para inicializar a aplicacao
firebase.initializeApp(config);

//Variavel de referencia para o database no Firebase
var dbRef = firebase.database().ref('/Angular/');

//Pega os dados sempre que acontecer alguma mudança no banco
dbRef.on('value', function(data) {
		$scope.apresentarView(data.val());
	});

$scope.novoPedido = {};

//Pega apenas a lista dentro do object retornado
$scope.apresentarView = function (pedidos){
var all_chaves = Object.keys(pedidos);
	
	for(var key in all_chaves){

		var chave = all_chaves[key];
		var valor = pedidos[chave];

		var valor = valor.replace(/"/g,'')
		lista = valor.split('#')

		var pedido = angular.copy($scope.novoPedido);
		pedido.id = chave;
		pedido.mesa = lista[0];
		pedido.quantidade = lista[1];
		pedido.sabor = lista[2];

		$scope.pedidos.push(pedido);

		$scope.novoPedido = {};		

	}
	//Chamada do botao para atualizar o conteudo no HTML
	$("#btn_listar").click();	
}

//Funcao para atualizar o conteudo no HTML
$scope.refreshDiv = function(){}

$scope.cadastrar = function(){

	var pedido = angular.copy($scope.novoPedido);
	pedido.id = Date.now();
	$scope.pedidos.push(pedido);
	$scope.novoPedido = {};
}

$scope.remover = function(id){
	angular.forEach($scope.pedidos, function(pedido, i){
		if(pedido.id == id){
			$scope.pedidos.splice(i,1);
			dbRef.child(id).remove();
		}
	});
}





});