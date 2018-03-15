 "use strict";

/*-----------------------------------------------------------------------------------------------------*/

 var sh= new StoreHouse.getInstance();
console.log("Almacen 'sh' creado");
console.log("Nombre de Almacen: "+(sh.name='StoreHouse'));

/*-----------------------------------------------------------------------------------------------------*/





/*-----------------------------------------------------------------------------------------------------*/

 var Televisores=new Category("Televisores");
 var Ordenadores=new Category("Ordenadores");
 var SmartPhone=new Category("SmartPhone");
 Televisores.description="TV";
 Ordenadores.description="PC";
 SmartPhone.description="SP";
 console.log ("");
 console.log ("*------Añadimos las categorias------*");
 console.log("Categoria 'Televisores' añadida a almacen sh, Categorias="+sh.addCategory(Televisores));
 console.log("Categoria 'Ordenadores' añadido a almacen sh, Categorias="+sh.addCategory(Ordenadores));
 console.log("Categoria 'SmartPhone' añadido a almacen sh, Categorias="+sh.addCategory(SmartPhone));
 
 
 function showCategories(){
    //Recorremos las categorías.
    console.log ("*------Recorremos las categorias------*");
    var categories = sh.categories;
    var category = categories.next();
    while (category.done !== true){
        console.log ("Categoria: " + category.value);		//.name
        category = categories.next();
    }		
}
showCategories();

console.log ("");
console.log ("*------Eliminamos una categoria------*");
console.log("Categoria 'Televisores' eleminada de almacen sh, Categorias="+sh.removeCategory(Televisores));
showCategories();
console.log ("");
console.log ("*------Añadimos una categoria------*");
console.log("Categoria 'Televisores' añadida a almacen sh, Categorias="+sh.addCategory(Televisores));
showCategories();

/*-----------------------------------------------------------------------------------------------------*/





/*-----------------------------------------------------------------------------------------------------*/

//Productos
var tv1= new TV("lg43p21","TV LG 43","297","21");
var pc1= new PC("a10708g","ASUS 1070 8G","629","21");
var pc2= new PC("a108016","ASUS 1080 16G","831","21");
var sp1= new SP("ix133321","IPHONE X","1333","21");
console.log ("");
console.log ("*------Añadimos los Productos------*");

try{
    console.log("Producto 'tv1' añadido a almacen sh, Producto="+sh.addProduct(tv1));
}catch(err){
    console.error(err)
}

try{   
    console.log("Producto 'pc1' añadido a almacen sh, Producto="+sh.addProduct(pc1));
}catch(err){
    console.error(err)
}

try{
    console.log("Producto 'pc2' añadido a almacen sh, Producto="+sh.addProduct(pc2));
}catch(err){
    console.error(err)
}
try{
    console.log("Producto 'sp1' añadido a almacen sh, Producto="+sh.addProduct(sp1));
}catch(err){
    console.error(err)
}







function showProducts(){
    //Recorremos los Productos.
    console.log ("*------Recorremos los Productos------*");
    var product = sh.product;
    var products = product.next();
    while (products.done !== true){
        console.log ("Producto: " + products.value);		
        products = product.next();
    }		
}
showProducts();

console.log ("");
console.log ("*------Eliminamos un producto------*");
console.log("Producto 'tv1' eliminado de almacen sh, Producto="+sh.removeProduct(tv1));
showProducts();
console.log ("");
console.log ("*------Añadimos un producto------*");
console.log("Producto 'tv1' añadido a almacen sh, Producto="+sh.addProduct(tv1));
showProducts();

/*-----------------------------------------------------------------------------------------------------*/




/*-----------------------------------------------------------------------------------------------------*/

var tienda1= new Shop("A12345678","Tienda 1","C/Falsa Nº123","963852741");
var tienda2= new Shop("B12345678","Tienda 2","C/Arriba Nº24","963852741");
var tienda3= new Shop("C12345678","Tienda 3","C/Abajo Nº35","963852741");
console.log ("");
console.log ("*------Añadimos las Tiendas------*");
console.log("Tienda 'tienda1' añadida a almacen sh, Tienda="+sh.addShop(tienda1));
console.log("Tienda 'tienda2' añadida a almacen sh, Tienda="+sh.addShop(tienda2));
console.log("Tienda 'tienda3' añadida a almacen sh, Tienda="+sh.addShop(tienda3));


function showShops(){
   //Recorremos los Tiendas.
    console.log ("*------Recorremos las Tiendas------*");
    var shop = sh.shop;
    var shops = shop.next();
    while (shops.done !== true){
        console.log ("Tienda: " + shops.value);     
        shops = shop.next();
    }	
}
showShops();

console.log ("");
console.log ("*------Eliminamos una tienda------*");
console.log("Tienda 'tienda1' eliminada de almacen sh, Tienda="+sh.removeShop(tienda1));
showShops();
console.log ("");
console.log ("*------Añadimos una tienda------*");
console.log("Tienda 'tienda1' añadida a almacen sh, Tienda="+sh.addShop(tienda1));
showShops();


/*-----------------------------------------------------------------------------------------------------*/


console.log ("");
console.log ("");
console.log ("*------Añadimos Categorias a Productos------*");
console.log("Añadimos Categoria 'Por Defecto' a Producto 'tv1' ; Categorias de tv1: "+sh.addCategoryInProduct(tv1,null));

console.log("Añadimos Categoria 'Televisores' a Producto 'tv1' ; Categorias de tv1: "+sh.addCategoryInProduct(tv1,Televisores));
try{
    console.log("Añadimos Categoria 'Televisores' a Producto 'tv1' ; Categorias de tv1: "+sh.addCategoryInProduct(tv1,Televisores));    //meter la misma categoria
}catch(err){
    console.error(err.message);
}
console.log("Añadimos Categoria 'Ordenadores' a Producto 'pc1' ; Categorias de pc1: "+sh.addCategoryInProduct(pc1,Ordenadores));
console.log("Añadimos Categoria 'Ordenadores' a Producto 'pc2' ; Categorias de pc2: "+sh.addCategoryInProduct(pc2,Ordenadores));
console.log("Añadimos Categoria 'SmartPhoe' a Producto 'sp1' ; Categorias de sp1: "+sh.addCategoryInProduct(sp1,SmartPhone));






//MOSTRAR CATEGORIA DE CADA PRODUCTO
console.log ("");
function showCategory(categories){
    var category= categories.next();
    while (category.done !== true){
        console.log("Categoria: "+ category.value);
        category = categories.next();
    }
}
function showAllCategories(){
    console.log ("*------Mostramos las Categorias de cada Producto------*");
    var product = sh.product;
    var products = product.next();
    while (products.done !== true){
       
        console.log ("Producto: " + products.value);	
        showCategory(sh.getProductCategory(products.value));
        products = product.next();
        console.log ("");
    }
}

showAllCategories();




//mostrar productos de una categoria
/*var it = sh.getCategoryProduct(Ordenadores);

var p = it.next();
while(p.done !== true){
    console.log(p.value);
    p = it.next();
}*/

//console.log(sh.getCategoryProduct(Televisores));

//mostrar productos de una categoria
function showProduct(product){
    var products= product.next();
    while (products.done !== true){
        console.log("Producto: "+ products.value.product);
        products = product.next();
    }
}
function showAllProducts(){
    console.log ("*------Mostramos los Productos de cada Categoria------*");
    var category = sh.categories;
    var categories = category.next();
    while (categories.done !== true){
       
        console.log ("Categoria: " + categories.value);	
        showProduct(sh.getCategoryProduct(categories.value));
        categories = category.next();
        console.log ("");
    }
}

showAllProducts();









console.log("");
//test añadir productos en tiendas
console.log("*------Añadimos Productos a Tienda 1------*");
console.log ("Producto tv1, cantidad 5, añadido a tienda; Productos distintos en tienda: "+sh.addProductInShop(tv1,tienda1,5));   
console.log ("Producto sp1, cantidad 7, añadido a tienda; Productos distintos en tienda: "+sh.addProductInShop(sp1,tienda1,7));   
console.log ("Producto pc2, cantidad 1, añadido a tienda; Productos distintos en tienda: "+sh.addProductInShop(pc2,tienda1,1));   
console.log ("Producto pc11, cantidad 2, añadido a tienda; Productos distintos en tienda: "+sh.addProductInShop(pc1,tienda1,2));   

try{
    console.log (sh.addProductInShop(pc2,tienda1,5));
}catch(err){
    console.error(err.message);
}
try{
    console.log (sh.addProductInShop(sp1,tienda1,5));
}catch(err){
    console.error(err.message);
}
console.log("");
console.log("*------Añadimos Stock a Tienda 1------*");
console.log("Producto sp1, añadido 1 en stock; cantidad en tienda: "+sh.addQuantityProductInShop(sp1,tienda1,1));    
console.log("Producto sp1, añadido 2 en stock; cantidad en tienda: "+sh.addQuantityProductInShop(sp1,tienda1,2));    
console.log("Producto pc1, añadido 2 en stock; cantidad en tienda: "+sh.addQuantityProductInShop(pc1,tienda1,2));    



console.log("");
console.log("*------Añadimos Productos a Tienda 2------*");
console.log ("Producto sp1, cantidad 4, añadido a tienda; Productos distintos en tienda: "+sh.addProductInShop(sp1,tienda2,4));   
console.log ("Producto tv1, cantidad 6, añadido a tienda; Productos distintos en tienda: "+sh.addProductInShop(tv1,tienda2,6));   
console.log ("Producto pc1, cantidad 6, añadido a tienda; Productos distintos en tienda: "+sh.addProductInShop(pc1,tienda2,6));   
console.log("");
console.log("*------Añadimos Stock a Tienda 2------*");
console.log("Producto sp1, añadido 4 en stock; cantidad en tienda: "+sh.addQuantityProductInShop(sp1,tienda2,4));    
console.log("Producto sp1, añadido 3 en stock; cantidad en tienda: "+sh.addQuantityProductInShop(sp1,tienda2,3));    
 


console.log("");
//test eliminar
console.log("Categoria 'Televisores' eleminada de almacen sh, Categorias="+sh.removeCategory(Televisores))

showAllCategories();
showAllProducts();

console.log("Producto 'sp1' eliminado de almacen sh, Producto="+sh.removeProduct(sp1));

//mostrar productos de una categoria
/*
var it = sh.getShopProducts(tienda2);

var s = it.next();
while(s.done !== true){
    console.log(s.product);
    console.log(s.stock);
    s = it.next();
}
*/




console.log ("");

function showProduct2(products){
    var product= products.next();
    while (product.done !== true){
        console.log("Producto: "+ product.product.product);
        console.log("Stock: "+ product.stock);
        product = products.next();
    }
}
function showAllShops(){
    console.log ("*------Mostramos los Productos de cada Tienda------*");
    var shop = sh.shop;
    var shops = shop.next();
    while (shops.done !== true){
       
        console.log ("*------Tienda: " + shops.value);	
        showProduct2(sh.getShopProducts(shops.value));//
        shops = shop.next();
        console.log ("");
    }
}

showAllShops();




console.log ("*------Eliminamos Tiendas------*");
console.log("Tienda 'tienda2' eliminada de almacen sh, Tienda="+sh.removeShop(tienda2));
console.log("Tienda 'tienda1' eliminada de almacen sh, Tienda="+sh.removeShop(tienda1));
console.log ("");

showAllShops();