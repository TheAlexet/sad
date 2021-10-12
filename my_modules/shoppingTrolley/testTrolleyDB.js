var product = require('./shoppingProduct.js');
var trolley = require('./shoppingTrolley.js');
var mongoClient = require('./mongoClient.js');

var url='mongodb+srv://dbUser:dbUserPassword@cluster0.oiahf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'




exports.testShoppingTrolley = async function() {

    const productsInserted = await mongoClient.insertProducts();
    console.log(productsInserted);

    console.log("\n------------------------------ WELCOME TO MERCADONA ------------------------------\n");

    var product1 = new product(1, "Agua", "Bronchales 12L", 2.35, 2);
    var product2 = new product(2, "Pizza barbacoa", "Pizza barbacoa Casa Tarradellas", 2.93, 1);
    var product3 = new product(3, "Ron Captain Morgan", "Arrrrrrrrrrrrrrggg", 7.25, 85);
    var product4 = new product(4, "Platano", "De Canarias", 0.45, 3);
    var myTrolley = new trolley([product1])

    console.log("\n------------------------------ PRODUCTS STOCK ------------------------------\n");

    console.log(product1.toString());
    console.log(product2.toString());
    console.log(product3.toString());

    console.log("\n------------------------------ YOUR TROLLEY ------------------------------\n");

    console.log(myTrolley.toString())

    console.log("\n------------------------------  I'm starving. Gotta buy some pizza. ------------------------------\n");

    try {
        const addingResult = await myTrolley.addProductDB(product2);
    }catch(err){
        console.log(err.message);
    }
    
    console.log(myTrolley.toString());

    console.log("\n------------------------------  I wanna be the pirate king. Need to find some crewmates. ------------------------------\n");

    try {
        const addingResult = await myTrolley.addProductDB(product3);
    }catch(err){
        console.log(err);
    }

    console.log(myTrolley.toString());

    console.log("\n------------------------------  Not hungry anymore. ------------------------------\n");

    myTrolley.removeProduct(2);
    console.log(myTrolley.toString());

    console.log("\n------------------------------  Water is for ducks. ------------------------------\n");

    myTrolley.removeProduct(1);
    console.log(myTrolley.toString());

    console.log("\n------------------------------  I want bananas. ------------------------------\n");

    try {
        const addingResult = await myTrolley.addProductDB(product4);
    }catch(err){
        console.log(err);
    }

    console.log(myTrolley.toString());
}