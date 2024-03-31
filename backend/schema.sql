CREATE TABLE Buyer (
  buyer_id INTEGER PRIMARY KEY,
  buyer_name VARCHAR(50) NOT NULL,
  buyer_phone VARCHAR(12),
  buyer_email VARCHAR(100) UNIQUE,
  buyer_dob DATE,
  buyer_address VARCHAR(255),
  loyalty_points INT,
  membership_type VARCHAR(15),
  payment_mode VARCHAR(30),
  password VARCHAR(100) NOT NULL, 
  spent_amount DECIMAL(10,2) DEFAULT 0 CHECK (spent_amount >= 0),
  CONSTRAINT CHK_ValidPhone CHECK (REGEXP('^[0-9]{10}$', buyer_phone) = 1),
  CONSTRAINT CHK_ValidEmail CHECK (buyer_email LIKE '%@%.%') 
);

CREATE TABLE Seller (
  seller_id INTEGER PRIMARY KEY,
  seller_name VARCHAR(255) NOT NULL, 
  seller_phone VARCHAR(12),
  seller_address VARCHAR(255),
  revenue INT,
  password VARCHAR(100) NOT NULL 
);

CREATE TABLE Warehouse (
  warehouse_id INTEGER PRIMARY KEY,
  warehouse_name VARCHAR(100),
  warehouse_address VARCHAR(255) 
);

CREATE TABLE Category (
  category_id INTEGER PRIMARY KEY,
  category_name VARCHAR(100)
);  

CREATE TABLE Item (
  item_id INTEGER PRIMARY KEY,
  item_name VARCHAR(100),
  current_price INT DEFAULT 0 CHECK (current_price >= 0),
  category_id INT,
  mrp INT DEFAULT 0 CHECK (mrp >= 0),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TABLE Cart (
  buyer_id INTEGER,
  item_id INTEGER,
  quantity INTEGER,
  PRIMARY KEY (buyer_id, item_id),
  FOREIGN KEY (buyer_id) REFERENCES Buyer(buyer_id),
  FOREIGN KEY (item_id) REFERENCES Item(item_id)
);


CREATE TABLE Review (
  item_id INT,
  buyer_id INT,
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review VARCHAR(500),
  review_date DATE,
  PRIMARY KEY (item_id, buyer_id),
  FOREIGN KEY (item_id) REFERENCES Item(item_id),
  FOREIGN KEY (buyer_id) REFERENCES Buyer(buyer_id)
);

CREATE TABLE Transaction_details (
  order_id INTEGER PRIMARY KEY,
  pincode VARCHAR(255),  
  total_cost DECIMAL(10,2),
  order_date DATE,
  mode_payment varchar(30),
  buyer_id INT NOT NULL,
  foreign key(buyer_id) references Buyer(buyer_id)
);

CREATE TABLE Order_Details (
  order_id INT,
  item_id INT, 
  quantity INT,
  PRIMARY KEY (order_id, item_id),
  FOREIGN KEY (order_id) REFERENCES Transaction_details(order_id),
  FOREIGN KEY (item_id) REFERENCES Item(item_id)
);

CREATE TABLE Warehouse_Inventory (
  warehouse_id INT,
  item_id INT,
  quantity_in_stock INT,
  PRIMARY KEY (warehouse_id, item_id),
  FOREIGN KEY (warehouse_id) REFERENCES Warehouse(warehouse_id),
  FOREIGN KEY (item_id) REFERENCES Item(item_id)
);
CREATE TABLE interested_categories (
  buyer_id INT NOT NULL,
  category_id INT,
  quantity INT,
  PRIMARY KEY (buyer_id, category_id),
  FOREIGN KEY (buyer_id) REFERENCES Buyer(buyer_id),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TRIGGER update_buyer_spent_amount
AFTER INSERT ON Transaction_details 
BEGIN
    UPDATE Buyer
    SET spent_amount = spent_amount + NEW.total_cost
    WHERE buyer_id = NEW.buyer_id;
END;

CREATE TRIGGER update_interested_categories
AFTER INSERT ON Order_Details
BEGIN
    -- Update existing rows
    UPDATE interested_categories
    SET quantity = quantity + NEW.quantity
    WHERE buyer_id = (SELECT buyer_id FROM Transaction_details WHERE order_id = NEW.order_id)
    AND category_id = (SELECT category_id FROM Item WHERE item_id = NEW.item_id);
    
    -- Insert new row if no existing row found
    INSERT INTO interested_categories (buyer_id, category_id, quantity)
    SELECT 
        (SELECT buyer_id FROM Transaction_details WHERE order_id = NEW.order_id),
        (SELECT category_id FROM Item WHERE item_id = NEW.item_id),
        NEW.quantity
    WHERE NOT EXISTS (
        SELECT 1 FROM interested_categories 
        WHERE buyer_id = (SELECT buyer_id FROM Transaction_details WHERE order_id = NEW.order_id)
        AND category_id = (SELECT category_id FROM Item WHERE item_id = NEW.item_id)
    );
END;




INSERT INTO Buyer(buyer_name, buyer_phone, buyer_email, buyer_address, loyalty_points, payment_mode, buyer_dob, membership_type, password)
VALUES
('Ramesh', '9874561230', 'ramesh@gmail.com', '411023', 2100, 'Credit Card', '1989-05-12','regular', 'Ramesh12'),  
('Suresh', '8974561235', 'suresh@gmail.com', '411001', 1500, 'Debit Card', '1991-11-25','premium', 'Suresh25'),
('Mahesh', '7874539615', 'mahesh@gmail.com', '411005', 1300, 'Paytm', '1988-03-05','regular', 'Mahesh05'), 
('Ganesh', '8794531697', 'ganesh@gmail.com', '411006', 1900, 'GPay', '1993-09-28','regular', 'Ganesh28'), 
('Hitesh', '9887412340', 'hitesh@outlook.com', '411021', 2200, 'PhonePe', '1982-06-18','premium', 'Hitesh18'),  
('Parul', '8871562963', 'parul@rediff.com', '411012', 2500, 'Credit Card', '1995-01-31','premium', 'Parul31'),
('Reena', '9963258741', 'reena@yahoo.in', '411022', 1800, 'Debit Card', '1990-12-12','regular', 'Reena12'),
('Nisha', '8874591206', 'nisha@gmail.com', '411005', 3000, 'Paytm', '1987-07-10','regular', 'Nisha10'),
('Binita', '6385124790', 'binita@gmail.com', '411018', 3500, 'Netbanking', '1997-08-21','premium', 'Binita21'), 
('Ansh', '9987452137', 'ansh@outlook.com', '411020', 2700, 'PhonePe', '1996-04-17','regular', 'Ansh17');

INSERT INTO Seller(seller_name, seller_phone, seller_address, revenue, password) 
VALUES
('ABC Stores', '8527419630', '201301', 75000, 'ABC30'),
('My Grocers', '9547618230', '110001', 55000, 'My30'),
('Food Palace', '8877665500', '201302', 150000, 'Food00'),
('Daily Needs', '8447552930', '411016', 35000, 'Daily30'), 
('Kirana Supermart', '9887412054', '300032', 12500, 'Kirana54'),
('Sam Fresh Farm', '9856214870', '411019', 175000, 'Sam70'), 
('Madurai Stores', '7985463210', '700016', 65000, 'Madurai10'),
('Bombay Stores', '8659741230', '400034', 95000, 'Bombay30'),
('Modern Bazaar', '9856214837', '560088', 105000, 'Modern37'),  
('Needs Grocery', '798574230', '411014', 80000, 'Needs30');

INSERT INTO Warehouse(warehouse_name, warehouse_address)
VALUES
('Primary WH', '201301'),  
('Warehouse 1', '411005'),
('Warehouse 2', '411023'),
('Warehouse 3', '411006'),
('Warehouse 4', '411012'),
('Warehouse 5', '411020'),
('Warehouse 6', '411022'),  
('Warehouse 7', '411001'),
('Warehouse 8', '411018'),
('Warehouse 9', '411021');

INSERT INTO Category(category_name)  
VALUES 
('Packaged Foods'),
('Dairy Items'),
('Beverages'),
('Personal Care'),
('Baby Care'),
('Pet Supplies'),
('Household'),
('Fruits & Vegetables'), 
('Bread & Bakery'),
('Cleaning Agents'); 

INSERT INTO Item(item_name, category_id, mrp, current_price)
VALUES
('Chips', 1, 25, 20), 
('Milk', 2, 45, 40),
('Coca Cola', 3, 50, 45),  
('Shampoo', 4, 180, 150),
('Diapers', 5, 350, 320),
('Dog Food', 6, 625, 600),
('Detergent', 7, 235, 200),
('Apples', 8, 185, 160),
('Bread', 9, 35, 30),
('Floor Cleaner', 10, 99, 90);

INSERT INTO Transaction_details(pincode, total_cost, order_date, mode_payment, buyer_id)
VALUES  
('411023', 2580, '2023-03-05', 'Credit Card', 1),
('411001', 840, '2023-03-06', 'Net Banking', 2),
('411005', 4600, '2023-03-08', 'Wallet', 3),
('411021', 1605, '2023-03-09', 'Debit Card', 5),
('411006', 2765, '2023-03-11', 'Credit Card', 4),
('411012', 3850, '2023-03-14', 'UPI', 6),
('411022', 70, '2023-03-15', 'Wallet', 7),
('411018', 2850, '2023-03-17', 'Net Banking', 9),
('411005', 11850, '2023-03-18', 'Debit Card', 8),
('411020', 4800, '2023-03-20', 'Credit Card', 10);


INSERT INTO Order_Details(order_id, item_id, quantity)  
VALUES
(1, 1, 5), (1, 2, 2),  (1, 6, 4),
(2, 3, 8), (2, 9, 1), (2, 10, 5),
(3, 7, 15), (3, 8, 10),
(4, 2, 1), (4, 3, 3), (4, 5, 4), (4, 9, 5),
(5, 3, 4), (5, 6, 3),
(6, 4, 5), (6, 7, 8), 
(7, 1, 2), (7, 8, 10),
(8, 3, 12), (8, 10, 5),
(9, 5, 12), (9, 6, 19),
(10, 4, 3), (10, 6, 7), (10, 9, 2);

INSERT INTO Warehouse_Inventory(warehouse_id, item_id, quantity_in_stock)  
VALUES  
(1, 1, 1000), (1, 2, 1000), (1, 3, 1000), (1, 4, 1000), (1, 5, 1000),
(1, 6, 1000), (1, 7, 1000), (1, 8, 1000), (1, 9, 1000), (1, 10, 1000),
(2, 1, 100), (2, 2, 100), (2, 3, 100), (2, 4, 100), (2, 5, 100),
(2, 6, 100), (2, 7, 100), (2, 8, 100), (2, 9, 100), (2, 10, 100),
(3, 1, 100), (3, 2, 100), (3, 3, 100), (3, 4, 100), (3, 5, 100),
(3, 6, 100), (3, 7, 100), (3, 8, 100), (3, 9, 100), (3, 10, 100),
(4, 1, 100), (4, 2, 100), (4, 3, 100), (4, 4, 100), (4, 5, 100),
(4, 6, 100), (4, 7, 100), (4, 8, 100), (4, 9, 100), (4, 10, 100),
(5, 1, 100), (5, 2, 100), (5, 3, 100), (5, 4, 100), (5, 5, 100),
(5, 6, 100), (5, 7, 100), (5, 8, 100), (5, 9, 100), (5, 10, 100),
(6, 1, 100), (6, 2, 100), (6, 3, 100), (6, 4, 100), (6, 5, 100),
(6, 6, 100), (6, 7, 100), (6, 8, 100), (6, 9, 100), (6, 10, 100),
(7, 1, 100), (7, 2, 100), (7, 3, 100), (7, 4, 100), (7, 5, 100),
(7, 6, 100), (7, 7, 100), (7, 8, 100), (7, 9, 100), (7, 10, 100),
(8, 1, 100), (8, 2, 100), (8, 3, 100), (8, 4, 100), (8, 5, 100),
(8, 6, 100), (8, 7, 100), (8, 8, 100), (8, 9, 100), (8, 10, 100),
(9, 1, 100), (9, 2, 100), (9, 3, 100), (9, 4, 100), (9, 5, 100),
(9, 6, 100), (9, 7, 100), (9, 8, 100), (9, 9, 100), (9, 10, 100),
(10, 1, 100), (10, 2, 100), (10, 3, 100), (10, 4, 100), (10, 5, 100),
(10, 6, 100), (10, 7, 100), (10, 8, 100), (10, 9, 100), (10, 10, 100);


INSERT INTO Review VALUES
(1, 1, 4, 'Good quality chips, nice crunch!', '2024-03-07'),
(2, 1, 3, 'Milk was good but not very fresh', '2024-03-07'),
(6, 1, 5, 'Dog food had great ingredients', '2024-03-07'),  
(3, 2, 4, 'Tasted like a regular soft drink', '2024-03-09'),
(9, 2, 5, 'Fresh bakery bread', '2024-03-09'),
(10, 2, 3, 'Floor cleaner had strong chemical smell', '2024-03-09'),
(7, 3, 5, 'Apples were very ripe and sweet', '2024-03-10'),
(8, 3, 4, 'Vegetables were fresh', '2024-03-10'),
(2, 5, 3, 'Milk quality was average', '2024-03-11'),
(3, 5, 4, 'Soft drink was good', '2024-03-11'),
(5, 5, 5, 'Diapers were very absorbent', '2024-03-11'),
(9, 5, 2, 'Bread was a bit stale', '2024-03-11'),  
(3, 4, 5, 'Love this soft drink!', '2024-03-15'),
(6, 4, 2, 'Dog food had an unpleasant odor', '2024-03-15'), 
(9, 4, 4, 'Bread was tasty', '2024-03-15'),
(1, 6, 3, 'Chips were a bit bland', '2024-03-17'),
(7, 6, 4, 'Fresh apples', '2024-03-17'),
(3, 9, 5, 'Best soft drink ever', '2024-03-19'),
(10, 9, 4, 'Strong cleaning floor cleaner', '2024-03-19'),
(4, 10, 2, 'Shampoo made my hair dry', '2024-03-21'),
(6, 10, 5, 'My dog loves this food!', '2024-03-21'),
(9, 10, 3, 'Bread was a little hard', '2024-03-21');

INSERT INTO Cart (buyer_id, item_id, quantity)
VALUES
(1, 1, 3),  
(1, 6, 2),  
(2, 3, 5),  
(2, 9, 2),  
(3, 7, 10), 
(3, 8, 5),  
(4, 2, 4),  
(4, 3, 3),  
(5, 3, 2),  
(5, 6, 3);

