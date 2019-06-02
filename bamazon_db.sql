DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (50) NOT NULL,
department_name VARCHAR (50) NOT NULL,
price INT DEFAULT 0,
stock_quantity INT DEFAULT 0,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drone", "Gadgets", 100, 20), ("Kindle", "E-readers", 170, 30), ("iPhone S6", "Smartphones", 250, 10),
("Nikon D3500", "Photography", 270, 7), ("Office 365", "Software", 70, 50), ("Interview with the Vampire", "Book's", 65, 5),
("Laptop Gaming Omen", "Computer", 220, 12), ("Smart TV", "Electronics", 110, 10), ("Mouse gaming", "Gadgets", 52, 20),
("Microwave", "Home", 37, 18);

SELECT * FROM products;