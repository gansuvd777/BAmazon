// require node modules
var mysql = require('mysql');
var inquirer = require('inquirer');
// require('console.table');

// users total bill
var totalCheckout = 0;
var itemLength = 0;

// connect to mysql
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Bamazon_db'
})

// connect to mysql
connection.connect(function(err) {
    if (err) throw err;
    console.log("*********************************************************************");
    startShopping();
});

// confirm entrance to store
var startShopping = function() {
    inquirer.prompt({
        name: "startShopping",
        type: "confirm",
        message: "Do you need anything from Bamazon 🏪?",
    }).then(function(answer) {
        if (answer.startShopping) {
            productsTable();
        } else {
            console.log("<--------------------------------------------------------------------->");
            console.log("                          ⚓️  SEE YOU SOON ⚓️                            ");
            console.log("<--------------------------------------------------------------------->");
        }
    });
};

// display store products
function productsTable() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("<--------------------------------------------------------------------->");
        console.log("                       🛍 WELCOME TO BAMAZON 🛒                         ");
        console.log("<--------------------------------------------------------------------->");
        console.table(res);
        itemLength = res.length;
        productInquirer();
    });
}

// query purchase
var productInquirer = function() {
    console.log("****************************************************************************************************");
    inquirer.prompt([{
        name: "productId",
        type: "input",
        message: "What's the 'ID' of the item you would like to buy?",
        validate: function(value) {
            if (isNaN(value) === false && (value <= itemLength) && (value != 0)) {
                return true;
            }
            return false;
        }
    }, {
        name: "quantity",
        type: "input",
        message: "How many would you like?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {

        var productId = parseInt(answer.productId) - 1;
        var quantityCount = parseInt(answer.quantity);
        var availableStock;
        var newStock;

        // select product from table using id
        connection.query("SELECT * FROM products WHERE id=" + answer.productId, function(err, res) {
            if (err) throw err;
                availableStock = res[0].stock_quantity;
                if (quantityCount <= availableStock) {
                    newStock = availableStock - quantityCount;
                    console.log("*********************************************************************");
                    updateInventory(newStock, answer.productId);
                    totalCheckout += (answer.quantity * res[0].price);
                    console.log("Your total is 💸 $" + totalCheckout);
                    console.log("*********************************************************************");
                    startShopping();
                } else {
                    console.log("There's not enough inventory to fullfill your order. \nPlease re-order and select from the available quantity.");
                    console.log("*********************************************************************");
                    startShopping();
                }

        });

        console.log("*********************************************************************");
    });
};

// update inventory after purchase
function updateInventory(update, id) {
    connection.query("UPDATE products SET stock_quantity=" + update + " WHERE id=" + id, function(err, res) {
        if (err) throw err;
    });
}