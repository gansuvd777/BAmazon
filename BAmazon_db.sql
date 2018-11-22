CREATE DATABASE BAmazon_db;

USE BAmazon_db;

CREATE TABLE products (
	ID INT(15) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT(10) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Christmas Sweater', 'Clothing', 25.99, 350),
		('Loreal Matte Lipstick', 'Cosmetics', 7.29, 627),
		('Wrangler Carry-on Bag', 'Luggage & Travel Gear', 47.99, 150),
		('Business & Money', 'Books', 9.25, 270),
		('Granny Smith Apples', 'Produce', 0.39, 600),
		('Chiquita Bannana', 'Produce', 0.29, 999),
		('Wireless Bluetooth Headphones', 'Electronic', 16.69, 269),
		('Pampers Baby Wipes', 'Children', 2.59, 110),
		('Barbie Doll', 'Toys & Game', 8.88, 220),
		('Bright LED Floor Lamp', 'Home & Garden', 49.99, 180);

        
UPDATE products
SET price = 1.35
WHERE ID = 5;

UPDATE products
SET price = 1.20
WHERE ID = 6;

SELECT * FROM BAmazon_db.products;
