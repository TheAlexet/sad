module.exports = class Product {
    constructor(id, name, description, price, amount) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.amount = amount;
    }

    get id() {
        return this._id;
    }

    set id(newId) {
        this._id = newId;
    }

    get name() {
        return this._name;
    }

    set name(newName) {
        this._name = newName
    }

    get description() {
        return this._description;
    }

    set description(newDescription) {
        this._description = newDescription
    }

    get price() {
        return this._price;
    }

    set price(newPrice) {
        this._price = newPrice
    }

    get amount() {
        return this._amount;
    }

    set amount(newAmount) {
        this._amount = newAmount;
    }

    toString() {
        return "ID: " + this._id + 
               ", name: " + this._name + 
               ", description: " + this._description + 
               ", price: " + this._price + 
               ", amount: " + this._amount + "."
    }
}