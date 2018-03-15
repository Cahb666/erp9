"use strict";
//Objeto StoreHouse

function StoreHouseException() {
	this.name = "StoreHouseException";
	this.message = "Error: Product Manger Generic Exception.";
}
StoreHouseException.prototype = new BaseException(); 													//Hereda de BaseException
StoreHouseException.prototype.constructor = StoreHouseException;

function ShopStoreHouseException() {
	this.name = "ShopStoreHouseException";
	this.message = "Error: The method needs a Shop parameter.";
}
ShopStoreHouseException.prototype = new StoreHouseException(); 											//Hereda de StoreHouseException
ShopStoreHouseException.prototype.constructor = ShopStoreHouseException;

function ShopExistsStoreHouseException() {
	this.name = "ShopExistsStoreHouseException";
	this.message = "Error: The shop exist";
}
ShopExistsStoreHouseException.prototype = new StoreHouseException(); 									//Hereda de StoreHouseException
ShopExistsStoreHouseException.prototype.constructor = ShopExistsStoreHouseException;

function ShopNotExistsStoreHouseException() {
	this.name = "ShopNotExistsStoreHouseException";
	this.message = "Error: The shop doesn't exist.";
}
ShopNotExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
ShopNotExistsStoreHouseException.prototype.constructor = ShopNotExistsStoreHouseException;

function DefaultShopStoreHouseException() {
	this.name = "DefaultShopStoreHouseException";
	this.message = "Error: The deafult shop can't be removed.";
}
DefaultShopStoreHouseException.prototype = new StoreHouseException(); 									//Hereda de StoreHouseException
DefaultShopStoreHouseException.prototype.constructor = DefaultShopStoreHouseException;

function CategoryStoreHouseException() {
	this.name = "CategoryStoreHouseException";
	this.message = "Error: The method needs a Category parameter.";
}
CategoryStoreHouseException.prototype = new StoreHouseException(); 										//Hereda de StoreHouseException
CategoryStoreHouseException.prototype.constructor = CategoryStoreHouseException;

function CategoryExistsStoreHouseException() {
	this.name = "CategoryExistsStoreHouseException";
	this.message = "Error: The category exist";
}
CategoryExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
CategoryExistsStoreHouseException.prototype.constructor = CategoryExistsStoreHouseException;

function CategoryNotExistsStoreHouseException() {
	this.name = "CategoryNotExistsStoreHouseException";
	this.message = "Error: The category doesn't exist";
}
CategoryNotExistsStoreHouseException.prototype = new StoreHouseException(); 							//Hereda de StoreHouseException
CategoryNotExistsStoreHouseException.prototype.constructor = CategoryNotExistsStoreHouseException;

function DefaultCategoryStoreHouseException() {
	this.name = "DefaultCategoryStoreHouseException";
	this.message = "Error: The deafult category can't be removed.";
}
DefaultCategoryStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
DefaultCategoryStoreHouseException.prototype.constructor = DefaultCategoryStoreHouseException;

function ProductStoreHouseException() {
	this.name = "ProductStoreHouseException";
	this.message = "Error: The method needs a Product parameter.";
}
ProductStoreHouseException.prototype = new StoreHouseException(); 										//Hereda de StoreHouseException
ProductStoreHouseException.prototype.constructor = ProductStoreHouseException;


function ProductExistsStoreHouseException() {
	this.name = "ProductExistsStoreHouseException";
	this.message = "Error: The product exist";
}
ProductExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
ProductExistsStoreHouseException.prototype.constructor = ProductExistsStoreHouseException;

function ProductNotExistsStoreHouseException() {
	this.name = "ProductNotExistsStoreHouseException";
	this.message = "Error: The product doesn't exist.";
}
ProductNotExistsStoreHouseException.prototype = new StoreHouseException(); 								//Hereda de StoreHouseException
ProductNotExistsStoreHouseException.prototype.constructor = ProductNotExistsStoreHouseException;





/*--------------------------------------------------------------------------------------------*/ 

var StoreHouse = (function () { 																		//La funcion anonima devuelve un metodo getInstance que permite obtener el objeto unico
	
	var instantiated;
																	//Objeto con la instancia unica StoreHouse
	function init() { 																					//Inicializacion del Singleton

		function StoreHouse(){				




																	//Declaracion de la funcion constructora de la instancia StoreHouse
			if (!(this instanceof StoreHouse)) 
				throw new InvalidAccessConstructorException();

				/*--------------------------------------------------------------------------------------------*/ 

				//IndexedDB
			var permisoIndexedDB=window.indexedDB;
			var version=1;
			var db=null;
			var ObjectCategory=null;
			

			/*--------------------------------------------------------------------------------------------*/ 

			//Nombre Almacen
			var _name = "Anonimous";
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(name = "Anonimous"){
					name = name.trim();
					if (name === 'undefined' || name === 'Anon') throw new EmptyValueException("name");					
					_name = name;
				}		
			});		

			/*--------------------------------------------------------------------------------------------*/ 





			/*--------------------------------------------------------------------------------------------*/ 

			//Categorias
			var _categories = []; 

			//Iterator de Categorias
			Object.defineProperty(this, 'categories', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _categories.length ?
				               {value: _categories[nextIndex++].category, done: false} :	//linea 159
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade Categoria
			this.addCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		
				var position = getCategoryPosition(category); 	
				if (position === -1){
					_categories.push(
						{
							category: category				//"propiedad"
						}
					);
					
					

				} else{
					throw new CategoryExistsStoreHouseException();
				}	

				return _categories.length;
			}

			//Elimina Categoria
			this.removeCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		
				var position = getCategoryPosition(category); 	
				if (position !== -1){
					if (category.name !== _defaultCategory.name){
						_categories.splice(position, 1);				//splice(n, 1) = elimina 1 categoria(n) del array
						
						for(let i=0;i<_products.length;i++){			//recorre productos y borra la categoria
							for(let j=0;j<_products[i].category.length;j++){
								if(_products[i].category[j].name == category.name){
									_products[i].category.splice(j, 1);

									if(_products[i].category.length==0){		//añadir categoria por defecto si se qeda sin categoria
										_products[i].category.push(_categories[0].category);
									}
									
								}

							}
						}
						
						//Se borra tambien de las tiendas

					} else{
						throw new DefaultCategoryStoreHouseException();
					}					
				} else{
					throw new CategoryNotExistsStoreHouseException();
				}	
				return _categories.length;
			}
			




			//Posicion de la Categoria en el Array
			function getCategoryPosition(category){
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}		

				function compareElements(element) {
				  return (element.category.name === category.name)		
				}
				
				return _categories.findIndex(compareElements);		//findIndex = indice del primer elemento en el array con una comparacion
			}

			//Categoria por defecto
			var _defaultCategory = new Category ("Default Category"); 
			this.addCategory(_defaultCategory);
			_defaultCategory.description="DC";		//descripcion
			Object.defineProperty(this, 'defaultCategory', {
				get:function(){
					return _defaultCategory;
				}	
			});	

			/*--------------------------------------------------------------------------------------------*/ 





			/*--------------------------------------------------------------------------------------------*/ 

			//Productos
			var _products=[];
			//Iterator de Productos
			Object.defineProperty(this, 'product', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _products.length ?
				               {value: _products[nextIndex++].product, done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade un nuevo Producto.
			this.addProduct = function(product){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}	
				var position = getProductPosition(product); 	
				
				if (position === -1){
					_products.push(					
						{
							product: product,
							category: []
						}
					);
				}else{
					throw new ProductExistsStoreHouseException();
				}

				return _products.length;
			}

			//Posicion del Producto en el Array
			function getProductPosition(product){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}	

				function compareElements(element) {
				  return (element.product.SN === product.SN)		
				}
				
				return _products.findIndex(compareElements);		
			}

			//Elimina Producto
			this.removeProduct = function(product){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}		
				var position = getProductPosition(product); 	
				if (position !== -1){
					_products.splice(position, 1);

					for(let i=0;i<_shops.length;i++){								//recorre tiendas y borra el producto
						for(let j=0;j<_shops[i].product.length;j++){
							if(_shops[i].product[j].product.name == product.name){
								_shops[i].product.splice(j, 1);
							}
						}
					}

				} else{
					throw new ProductNotExistsStoreHouseException();
				}	
				return _products.length;
			}
			

			/*--------------------------------------------------------------------------------------------*/ 
		




			/*--------------------------------------------------------------------------------------------*/ 

			//Tiendas
			var _shops = [];
			//Iterator de Tiendas
			Object.defineProperty(this, 'shop', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _shops.length ?
				               {value: _shops[nextIndex++].shop, done: false} :
				               {done: true};
				       }
				    }
				}	
			});	

			//Añade un nuevo Tienda.
			this.addShop = function(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException();
				}	
				var position = getShopPosition(shop); 	
				
				if (position === -1){
					_shops.push(					
						{
							shop: shop,
							product: [],
							stock: []
						}
					);
				}else{
					throw new ShopExistsStoreHouseException();
				}

				return _shops.length;
			}

			//Elimina Tienda
			this.removeShop = function(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException();
				}		
				var position = getShopPosition(shop); 	
				if (position !== -1){
					if (shop.cif !== _defaultShop.cif){
						
						for(let i=0;i<_shops[position].product.length;i++){			//al borrar la tienda recorre productos y los añade a la tienda por defecto
							
							var product;
							function compareElements(element) {
								return (element.product.SN === product.SN)		
							}

							product = _shops[position].product[i].product;
							var posProduct = _shops[INDEX_DEFAULT_SHOP].product.findIndex(compareElements);
							if(posProduct == -1){
								this.addProductInShop(_shops[position].product[i].product, 
												_shops[INDEX_DEFAULT_SHOP].shop, 
												_shops[position].stock[i]);
							}else{
								this.addQuantityProductInShop(_shops[position].product[i].product, 
														_shops[INDEX_DEFAULT_SHOP].shop, 
														_shops[position].stock[i]);
							}

						}
						
						_shops.splice(position, 1);

					} else{
						throw new DefaultShopStoreHouseException();
					}					
				}else{
					throw new ShopNotExistsStoreHouseException();
				}
				return _shops.length;
			}

			//Posicion de la Tienda en el Array
			function getShopPosition(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException ();
				}		

				function compareElements(element) {
				  return (element.shop.cif === shop.cif)
				}
				
				return _shops.findIndex(compareElements);		
			}

			//Tienda por defecto
			var _defaultShop = new Shop("x12345678","Default Shop","Default Direction","900123123");
		 	const INDEX_DEFAULT_SHOP = 0;
			this.addShop(_defaultShop);

			Object.defineProperty(this, 'defaultShop', {
				get:function(){
					return _defaultShop;
				}	
			});	

			/*--------------------------------------------------------------------------------------------*/ 




			//Añade categorias a un producto
			this.addCategoryInProduct = function(product, category){
				if (category === null || category === 'undefined' || category === ''){
					category = _defaultCategory;
				}	
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}	
				var position = getProductPosition(product); 	

				var categoryPosition = getCategoryPosition(category); 
				

				function compareElements(element) {
				  return (element.name === category.name)		//element es la categoria
				}
				
				//console.log(_products[position].category);

				var posCatRepe = _products[position].category.findIndex(compareElements);		//compara si la categoria esta repetida

				//console.log("Repetido: " + posCatRepe);
				if(posCatRepe==-1){
					//console.log("no repe");
					_products[position].category.push(_categories[categoryPosition].category);	
				}else{
					//console.log("repe");
					throw new CategoryExistsStoreHouseException();
				}

				
				return _products[position].category.length;
			}
			

			//Devuelve todas las categorias de un determinado producto
			this.getProductCategory = function(product){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}		

				var productPosition = getProductPosition(product); 	
				if (productPosition === -1) throw new ProductNotExistsStoreHouseException();
				var nextIndex = 0;
			    return {
			       next: function(){
			           return nextIndex < _products[productPosition].category.length ?
			               {value: _products[productPosition].category[nextIndex++], done: false} :
			               {done: true};
			       }
			    }
			}


			//Devuelve todos los productos de una determinada categoria
			this.getCategoryProduct = function(category){
				
				if (category === null || category === 'undefined' || category === ''){
					category = _defaultCategory;
				}	
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}

				var _productosFiltrados = [];

				/*_products.forEach( function(producto){ //por cada elemento del array llama la funcion
					producto.category.forEach(function(categoria){	//por cada elemento del array de categoria del producto
						if(categoria.name == category.name){
							_productosFiltrados.push(producto);
						}
					})
				});*/

				for(let i=0;i<_products.length;i++){
					for(let j=0;j<_products[i].category.length;j++){
						if(_products[i].category[j].name == category.name){
							_productosFiltrados.push(_products[i]);
						}

					}
				}

				//Iterator
				var nextIndex = 0;
			    return {
			       next: function(){
			           return nextIndex < _productosFiltrados.length ?
			               {value: _productosFiltrados[nextIndex++], done: false} :
			               {done: true};
			       }
			    }


			}


			//Devuelve todos los productos de una determinada categoria
			this.getCategoryProductShop = function(category, shop){
				
				if (category === null || category === 'undefined' || category === ''){
					category = _defaultCategory;
				}	
				if (!(category instanceof Category)) { 
					throw new CategoryStoreHouseException();
				}


				var _productosFiltrados = [];

				/*_products.forEach( function(producto){ //por cada elemento del array llama la funcion
					producto.category.forEach(function(categoria){	//por cada elemento del array de categoria del producto
						if(categoria.name == category.name){
							_productosFiltrados.push(producto);
						}
					})
				});*/

				for(let i=0;i<shop.product.length;i++){
					for(let j=0;j<shop.product[i].category.length;j++){
						if(shop.product[i].category[j].name == category.name){
							_productosFiltrados.push(shop.product[i]);
						}

					}
				}

				//Iterator
				var nextIndex = 0;
			    return {
			       next: function(){
			           return nextIndex < _productosFiltrados.length ?
			               {value: _productosFiltrados[nextIndex++], done: false} :
			               {done: true};
			       }
			    }


			}


			
			//añade productos a tiendas;	error si producto ya existe "en tienda"
			this.addProductInShop = function(product, shop, stock){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}	
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException();
				}

				if (stock === null || stock === 'undefined' || stock < 1){
					// Valor defecto
					stock = 1;
				}

				var productPosition = getProductPosition(product);
				var shopPosition = getShopPosition(shop);

				//comparar productos
				function compareElements(element) {
					return (element.product.SN === product.SN)		
				}
				var posProRepe = _shops[shopPosition].product.findIndex(compareElements);

				//console.log(_shops);

				if (posProRepe === -1){ 
					_shops[shopPosition].product.push(_products[productPosition]);
					_shops[shopPosition].stock[_shops[shopPosition].product.length-1] = stock;	
				} else{
					throw new ProductExistsStoreHouseException();
				}

				return _shops[shopPosition].product.length;
				
			}


			//añade cantidad de productos a tiendas;	error si producto no existe en tienda
			this.addQuantityProductInShop = function(product, shop, stock){
				if (!(product instanceof Product)) { 
					throw new ProductStoreHouseException();
				}	
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException();
				}	


				var productPosition = getProductPosition(product);
				var shopPosition = getShopPosition(shop);

				//comparar productos
				function compareElements(element) {
					return (element.product.SN === product.SN)		//
				}

				//Si es distinto de -1, sera la posicion del producto
				var posProRepe = _shops[shopPosition].product.findIndex(compareElements);
				
				if (posProRepe !== -1){ 
					_shops[shopPosition].stock[posProRepe] += stock;	
				} else{
					throw new ProductNotExistsStoreHouseException();
				}

				return _shops[shopPosition].stock[posProRepe];
			

			}

			//Devuelve todas los productos de una determinada tienda
			this.getShopProducts = function(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException();
				}		

				var shopPosition = getShopPosition(shop); 	
				if (shopPosition === -1) throw new ShopNotExistsStoreHouseException();
				var nextIndex = 0;
			    return {
			       next: function(){
			           return nextIndex < _shops[shopPosition].product.length ?
			               {value: _shops[shopPosition].product[nextIndex], stock: _shops[shopPosition].stock[nextIndex++], done: false} :
			               {done: true};
			       }
			    }
			}







			//QUE DEVUELVA EL STOCK TOTAL DE UN PRODUCTO DE TODAS LAS TIENDAS
			this.getAllStock = function(producto){

				var stockProd = 0;

				for(let i=0;i<_shops.length;i++){
					for(let j=0;j<_shops[i].product.length;j++){
						if(_shops[i].product[j].product.SN == producto.SN){
							stockProd+=(_shops[i].stock[j]);
						}

					}
				}
				return stockProd;
			}

			this.getStockProduct = function(producto, shop){
				
				var stockProd = 0;

				for(let i=0;i<_shops.length;i++){
					for(let j=0;j<_shops[i].product.length;j++){
						if(_shops[i].shop.cif==shop.cif && _shops[i].product[j].product.SN == producto.SN){
							stockProd+=(_shops[i].stock[j]);
						}

					}
				}
				return stockProd;
			}



			
			this.getShopAt = function(shop){
				if (!(shop instanceof Shop)) { 
					throw new ShopStoreHouseException();
				}

				var pos = getShopPosition(shop)

				if(pos == -1){
					return null;
				}else{
					return _shops[pos];
				}

			}

			this.getShopAtCIF = function(cif){
				if (cif === null || cif === 'undefined' ||  cif === ''){ 
					throw new ShopStoreHouseException();
				}

				var pos = getShopPosition(new Shop(cif))

				if(pos == -1){
					return null;
				}else{
					return _shops[pos];
				}

			}

			
			this.getCategoryAt = function(name_category){
				if (name_category === null || name_category === 'undefined' ||  name_category === ''){ 
					throw new CategoryStoreHouseException();
				}

				var pos = getCategoryPosition(new Category(name_category))

				if(pos == -1){
					return null;
				}else{
					return _categories[pos];
				}

			}
			
			this.getProductAt = function(sn_product){
				if (sn_product === null || sn_product === 'undefined' ||  sn_product === ''){ 
					throw new ProductStoreHouseException();
				}

				var pos = getProductPosition(new TV(sn_product))

				if(pos == -1){
					return null;
				}else{
					return _products[pos];
				}

			}

		





		/*--------------------------------------------------------------------------------------------*/ 	

		} //Fin constructor StoreHouse
		StoreHouse.prototype = {}; 
		StoreHouse.prototype.constructor = StoreHouse;

		var instance = new StoreHouse();//Devolvemos el objeto StoreHouse para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();

/*--------------------------------------------------------------------------------------------*/ 