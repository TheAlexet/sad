var mongoClient = require ('./mongoClient.js');

module.exports = class Trolley {
    constructor(products) {
        this.products = products;
    }

    get products() {
        return this._products;
    }

    set products(newProducts) {
        this._products = newProducts;
    }

    toString() {
        var productsList = "Your trolley: ";
        this._products.map((product, index) => {
            if(index === this.products.length - 1) {
                productsList += product._pName + ".";
            } else {
                productsList += product._pName + ", ";
            }
        })
        return productsList;
    }

    addProduct(newProduct) {
        //Check if the newProduct is already in the trolley, by checking its id
        var productsList = this._products;
        var alreadyInTrolley = productsList.filter(product => product.id === newProduct.id).length > 0 ? true : false;

        if(alreadyInTrolley) { //If already in the trolley, add amounts
            var productIndex = productsList.findIndex(product => product.id === newProduct.id);
            productsList[productIndex].amount += newProduct.amount;
        } else { //If the product is new, add the product instead
            productsList = productsList.push(newProduct);
        }
        console.log("--- PRODUCT ADDED ---\n");
    }

    removeProduct(productId) {
        //Check if the product with id === productId is already in the trolley
        var productsList = this._products;
        var productInTrolley = productsList.filter(product => product.id === productId).length > 0 ? true : false;

        if(productInTrolley) { //If product in the trolley, remove product
            var productIndex = productsList.findIndex(product => product.id === productId);
            productsList = productsList.splice(productIndex, 1);
            console.log("--- PRODUCT REMOVED ---\n");
        }
    }

    addProductDB(newProduct) {
        //Check if the newProduct is already in the trolley, by checking its id
        var productsList = this._products;
        var alreadyInTrolley = productsList.filter(product => product.id === newProduct.id).length > 0 ? true : false;
        if(mongoClient.checkStock(productsList.id, productsList.amount)){
            if(alreadyInTrolley) { //If already in the trolley, add amounts
                var productIndex = productsList.findIndex(product => product.id === newProduct.id);
                productsList[productIndex].amount += newProduct.amount;
            } else { //If the product is new, add the product instead
                productsList = productsList.push(newProduct);
            }
            console.log("--- PRODUCT ADDED ---\n");
        
        } else{
            console.log("No stock available");
        }       
    }
}