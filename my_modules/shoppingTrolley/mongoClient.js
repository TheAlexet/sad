var mgdb=require('mongodb');
var assert = require('assert');

var mongoclient = mgdb.MongoClient;

var url='mongodb+srv://dbUser:dbUserPassword@cluster0.oiahf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

var collection;

exports.checkStock = function(pName, number){
  mongoclient.connect(url,function (err,db) {
    assert.equal(err,null);
    var product = db.collection('shopping').find({pName:pName});
    var amount = product.getAmount();
    return number < amount;
  });
}
/*mongoclient.connect(url,function (err,db) {
 	assert.equal(err,null);
 	console.log('conectado');

	db.createCollection("documents", function(err, res) {
    	if (err) throw err;
    	console.log("Collection created!");
  	});
    insertProducts(db,function() {
    	if (err) throw err;
    	console.log('success with insertion!');
    	db.close();
    });
 }); */

exports.insertProducts = function(callback) {
  mongoclient.connect(url,function (err,db) {
    assert.equal(err,null);
    var dbo = db.db('shopping');
    // Get the documents collection
    collection = dbo.collection('products');
    //Clean the database
    collection.deleteMany({});
    // Insert some documents
    collection.insertMany([
      {id: 1, pName: "Agua", description: "Bronchales 12L", price: 2.35, amount: 5}, 
      {id: 2, pName: "Pizza barbacoa", description: "Pizza barbacoa Cassa Tarradellas", price: 2.93, amount: 5}, 
      {id: 3, pName: "Ron Captain Morgan", description: "Arrrrrrrrrrrrrrggg", price: 7.25, amount: 5},
      {id: 4, pName: "Platano", description: "De Canarias", price: 0.45, amount: 5},
      {id: 5, pName: "Mascarilla", description: "#Stay home", price: 0.5, amount: 85}
    ], function(err, result) {
      assert.equal(err, null);
      console.log("Inserted 5 products into the collection");
      db.close();
      callback(err, result);
    });
  });
}