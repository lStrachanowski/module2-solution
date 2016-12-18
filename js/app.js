(function(){
	'use strict';

var app = angular.module('MyApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController (ShoppingListCheckOffService){
		var itemToBuy = this;
		itemToBuy.addedItem = "";
		itemToBuy.addedQuatity = "";
		itemToBuy.addItem = function(){
			ShoppingListCheckOffService.addItem(itemToBuy.addedItem, itemToBuy.addedQuatity);
		};

		itemToBuy.alreadyBought = function(index){
			ShoppingListCheckOffService.setItemAsBought(index);
		};
		itemToBuy.items = ShoppingListCheckOffService.getItemsToBuy();

	}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var itemsBought = this;
		itemsBought.item = ShoppingListCheckOffService.getItemsAlreadyBought();
	}


function ShoppingListCheckOffService(){
	var service = this;
	var itemsToBuy = [];
	var itemsAlreadyBought = [];

	service.addItem = function(itemName, itemQuantity){
		var item = {
			name:itemName,
			quantity:itemQuantity
		};
		if(item.name =="" || item.quantity ==""){
			alert("Check fields");
		}else{
			itemsToBuy.push(item);
		}
	};

	service.getItemsToBuy = function(){
		return itemsToBuy;
	};

	service.getItemsAlreadyBought = function(){
		return itemsAlreadyBought;
	};

	service.setItemAsBought = function(index){
		var item = {
			name:itemsToBuy[index].name,
			quantity:itemsToBuy[index].quantity
		};
		itemsAlreadyBought.push(item);
		itemsToBuy.splice(index,1);
	};
}

}) ();