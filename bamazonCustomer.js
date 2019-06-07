var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");
var figlet = require('figlet');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"chDCV305098698_",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId+ "\n");
    initialProducts();
});


var initialProducts = function() {
    console.log(figlet.textSync("BAMAZON", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default"
    }));    
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var displayProducts = new Table ({
            head: ["ID", "Product Name", "Department", "Price", "Stock"],
            colWidths: [5, 30, 25, 10, 10]
        });
        for (var i = 0; i < res.length; i++) {
            displayProducts.push(
                [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            );
        }
        console.log(displayProducts.toString());
        choiceProduct(); 
    });
}

function choiceProduct(){
        inquirer.prompt([
            {
                name: "IDitemInput",
                type: "input",
                message: "Choice the product you would like to buy",
                filter: Number
            },
            {
                name: "unitsInput",
                type: "input",
                message: "How many units would like?",
                filter: Number
                
            }
        ]).then(function(answer){
            var quantityNeed = answer.unitsInput;
            var IDreq = answer.IDitemInput;
            orderProduct(IDreq, quantityNeed);
        });
};


function orderProduct(IDitemInput, amtNeed){
    connection.query("SELECT * FROM products WHERE item_id = " + IDitemInput, function(err, res){
        if (err) throw err;
        if(amtNeed <= res[0].stock_quantity){
            var totalCost = res[0].price * amtNeed;
            console.log("Your product is on stock!");
            console.log("Your total for " + amtNeed + " " + res[0].product_name + " is $ " + totalCost);
            console.log("---------------------------------------------");
            var newStock = res[0].stock_quantity - amtNeed;
            connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: newStock
                    },
                    {
                        item_id: IDitemInput
                    }
                ], 
                ); 
        } else {
            console.log("Sorry, insufficent quantity of " + res[0].product_name);
        };
        initialProducts();
    }); 
}