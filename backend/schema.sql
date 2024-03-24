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
  interested_categories VARCHAR(100),
  password VARCHAR(100) NOT NULL, 
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
  category_id INT,
  mrp INT DEFAULT 0 CHECK (mrp >= 0),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
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
  seller_id INT,
  warehouse_id INT,  
  total_cost DECIMAL(10,2),
  order_date DATE,
  mode_payment varchar(30),
  buyer_id INT,
  foreign key(buyer_id) references Buyer(buyer_id),
  FOREIGN KEY (seller_id) REFERENCES Seller(seller_id),
  FOREIGN KEY (warehouse_id) REFERENCES Warehouse(warehouse_id)  
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

INSERT INTO Buyer(buyer_name, buyer_phone, buyer_email, buyer_address, loyalty_points, payment_mode, buyer_dob, membership_type, password)
VALUES
('Ramesh', '9874561230', 'ramesh@gmail.com', '411023', 2100, 'Credit Card', '1989-05-12','regular', 'Ramesh12'),  
('Suresh', '8974561235', 'suresh@gmail.com', '411001', 1500, 'Debit Card', '1991-11-25','premium', 'Suresh25'),
('Mahesh', '7874539615', 'mahesh@gmail.com', '411005', 1300, 'Paytm', '1988-03-05','regular', 'Mahesh05'), 
('Ganesh', '8794531697', 'ganesh@gmail.com', '411006', 1900, 'GPay', '1993-09-28','regular', 'Ganesh28'), 
('Hitesh', '9887412340', 'hitesh@outlook.com', '411021', 2200, 'PhonePe', '1982-06-18','premium', 'Hitesh18'),  
('Parul', '8871562963', 'parul@rediff.com', '411012', 2500, 'Credit Card', '1995-01-31','premium', 'Parul31'),
('Reena', '9963258741', 'reena@yahoo.in', '411022', 1800, 'Debit Card', '1990-12-12','regular', 'Reena12'),
('Nisha', '8874591206', 'nisha@gmail.com', '411015', 3000, 'Paytm', '1987-07-10','regular', 'Nisha10'),
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
('Warehouse 1', '411027'),
('Warehouse 2', '411016'),
('Warehouse 3', '411013'),
('Warehouse 4', '411012'),
('Warehouse 5', '411024'),
('Warehouse 6', '411022'),  
('Warehouse 7', '411025'),
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

INSERT INTO Item(item_name, category_id, mrp)
VALUES
('Chips', 1, 25), 
('Milk', 2, 45),
('Soft Drink', 3, 50),  
('Shampoo', 4, 180),
('Diapers', 5, 350),
('Dog Food', 6, 625),
('Detergent', 7, 235),
('Apples', 8, 185),
('Bread', 9, 35),
('Floor Cleaner', 10, 99);

INSERT INTO Transaction_details(seller_id, warehouse_id, total_cost, order_date, mode_payment, buyer_id)
VALUES  
(1, 4, 550, '2023-03-05', 'Credit Card', 1),
(2, 9, 720, '2023-03-06', 'Net Banking', 2),
(3, 3, 2000, '2023-03-08', 'Wallet', 3),
(4, 8, 750, '2023-03-09', 'Debit Card', 5),
(6, 7, 800, '2023-03-11', 'Credit Card', 4),
(7, 2, 1800, '2023-03-14',  'UPI', 6),
(9, 1, 500, '2023-03-15', 'Wallet', 7),
(5, 5, 1300, '2023-03-17', 'Net Banking', 9), 
(8, 6, 950, '2023-03-18', 'Debit Card', 8),
(10, 10, 600, '2023-03-20', 'Credit Card', 10);   

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
(1, 1, 50), (1, 2, 45), (1, 3, 36), (1, 4, 77),
(2, 2, 30), (2, 3, 87), (2, 7, 63), (2, 8, 45),  
(3, 2, 80), (3, 3, 56), (3, 4, 93), (3, 8, 98),
(4, 2, 65), (4, 3, 79), (4, 6, 57), (4, 10, 42),  
(5, 3, 68), (5, 4, 74), (5, 7, 52), (5, 10, 70),   
(6, 1, 44), (6, 5, 92), (6, 6, 80), (6, 9, 33),
(7, 1, 103), (7, 3, 73), (7, 8, 88), (7, 9, 64),   
(8, 2, 94), (8, 3, 75), (8, 6, 66), (8, 10, 55),  
(9, 2, 59), (9, 4, 89), (9, 7, 31), (9, 9, 82),
(10, 1, 78), (10, 5, 65), (10, 8, 62), (10, 10, 83);

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
