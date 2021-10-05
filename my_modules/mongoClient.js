var mgdb=require('mongodb');
var assert = require('assert');

var mongoclient = mgdb.MongoClient;

var url='mongodb://localhost:27017/shopping'

var collection;

mongoclient.connect(url,function (err,db) {
 	assert.equal(err,null);
 	console.log('conectado');

	/*db.createCollection("documents", function(err, res) {
    	if (err) throw err;
    	console.log("Collection created!");
  	});*/
    insertProducts(db,function() {
    	if (err) throw err;
    	console.log('success with insertion!');
    	db.close();
    });
 });

var insertProducts = function(db, callback) {
  // Get the documents collection
  collection = db.collection('products');
  //Clean the database
  collection.deleteMany({});
  // Insert some documents
  collection.insertMany([
    {id: 1, name: "Agua", description: "Bronchales 12L", price: 2.35, amount: 5}, 
    {id: 2, name: "Pizza barbacoa", description: "Pizza barbacoa Cassa Tarradellas", price: 2.93, amount: 5}, 
    {id: 3, name: "Ron Captain Morgan", description: "Arrrrrrrrrrrrrrggg", price: 7.25, amount: 5},
    {id: 4, name: "Platano", description: "De Canarias", price: 0.45, amount: 5},
    {id: 5, name: "Mascarilla", description: "#Stay home", price: 0.5, amount: 5}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    console.log("Inserted 5 products into the collection");
    db.close();
    callback(err, result);
  });
}