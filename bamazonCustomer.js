var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected as id " + connection.threadId+ "\n");
    initialProducts();
});


function initialProducts() {
    console.log("THE BAMAZON STORE \n");
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("---------------------------------------");
        choiceProduct();
    });
}

var choiceProduct = function(){
    connection.query("SELECT * FROM products", function(err,res){
        console.log("FIRST RES!!!" + res);
        var resProd = res; 
        inquirer.prompt([
            {
                name: "IDitemInput",
                type: "input",
                message: "Write the ID of the product you would like to buy",
                validate: function(value){
                    if(isNaN(value)==false){
                        return true;
                    }else {
                        return false;
                    }
                }
            }
        ]).then(function(answer){
            connection.query("SELECT * FROM products", function(res,err){
                console.log("THIS IS RESPRODDD!"+ resProd);
                for (var i = 0; i < resProd.length; i++) {
                    if(res[i].item_id == answer.IDitemInput) {
                        inquirer.prompt([
                            {
                                name: "unitsInput",
                                type: "input",
                                message: "How many units would like?",
                                validate: function(value){
                                    if(isNaN(value)==false){
                                        return true;
                                    }else {
                                        return false;
                                    }
                                }
                                
                            }
                        ]).then(function(answer){
                            connection.query("SELECT * FROM products", function(res, err){
                                if(answer.stock_quantity < res[i].stock_quantity){
                                    console.log("Succesfuly buy it!");
                                } else {
                                    console.log("Insufficient quantity! :(");
                                }
                            });
                        });
                    }    
                    
                }
                
            });

        });       
    });
}

