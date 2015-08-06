// Déclaration du module 'magasin'
angular.module('ecMobileApp.magasin', [
    'ngRoute',
    'ngStorage',
    'ecMobileApp.shared'
]);

// Configuration du module 'magasin'
angular.module('ecMobileApp.magasin').config(function($routeProvider) {

	$routeProvider
	.when("/magasin", {
		templateUrl: "/magasin/template/magasin.tpl.html",
		controller: "magasinCtrl",
		controllerAs: "magasinCtrl"
	})
	.when("/panier", {
		templateUrl: "/magasin/template/panier.tpl.html",
		controller: "panierCtrl",
		controllerAs: "panierCtrl"
	});
});

// Contrôleur principal du module 'magasin'
// Usage de la syntaxe 'controller as', pas besoin du '$scope'
angular.module('ecMobileApp.magasin').controller('magasinCtrl', function(userService, magasinService, panierService) {

    var magasinCtrl = this;

	function getProduits (){
		magasinService.getProduits().then(function (result){
			console.log("magasinCtrl : " + result);
			//magasinCtrl.listProduits = result.data;
		});
	}

	getProduits();

    magasinCtrl.addToPanier = function(idProduit) {
        panierService.addToPanier(idProduit, 1);
    };
});


angular.module('ecMobileApp.magasin').controller('panierCtrl', function(userService, panierService) {

	var panierCtrl = this;

	panierCtrl.totalPrix = 0;

	function getPanier (){
		/*panierService.getPanier().then(function (result){
			//panierCtrl.panier = result.data;

		});*/
		panierCtrl.panier = [{id : 1, libelle : "Produit 1", image : "http://lorempixel.com/120/120", prix : 500, quantite : 3}, {id : 2, libelle : "Produit 2", image : "http://lorempixel.com/120/120", prix : 500, quantite : 4}, {id : 3, libelle : "Produit 3", image : "http://lorempixel.com/120/120", prix : 500, quantite : 2}];
		updateTotalPanier();
	}

	getPanier();

	function updateTotalPanier(){
		panierCtrl.totalPrix = 0;
		for(var i = 0; i < panierCtrl.panier.length; i++){
			panierCtrl.totalPrix = panierCtrl.totalPrix + (panierCtrl.panier[i].prix * panierCtrl.panier[i].quantite);
		}
	}

	panierCtrl.diminuerQuantite = function (id_produit){
		for(var i = 0; i < panierCtrl.panier.length; i++){
			if(panierCtrl.panier[i].id === id_produit){
				if(panierCtrl.panier[i].quantite > 0){
					panierCtrl.panier[i].quantite -= 1;
				}
				break;
			}
		}
		updateTotalPanier();
	};

	panierCtrl.augmenterQuantite = function (id_produit){
		for(var i = 0; i < panierCtrl.panier.length; i++){
			if(panierCtrl.panier[i].id === id_produit){
				panierCtrl.panier[i].quantite += 1;
				break;
			}
		}
		updateTotalPanier();
	};

});
