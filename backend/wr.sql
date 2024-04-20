1st_transaction:-

start transaction;
ra:-SELECT * FROM warehouse_inventory WHERE item_id = 1 and warehouse_id=1;
ra,wa:-UPDATE Warehouse_Inventory
    SET quantity_in_stock = quantity_in_stock - 5
    WHERE warehouse_id = 1 AND item_id = 1;

r1:-:-rollback;


2nd_transaction:-


start transaction;
ra:- SELECT quantity_in_stock INTO @old_quantity
     FROM Warehouse_Inventory
     WHERE warehouse_id = 1 AND item_id = 1;

ra:- SELECT quantity_in_stock INTO @new_quantity
     FROM Warehouse_Inventory
    WHERE warehouse_id = 1 AND item_id = 1;


wc:- SET @difference = @old_quantity - @new_quantity;

rd:- SELECT mrp INTO @price
     FROM Item
     WHERE item_id = 1;

we1:- SET @revenue_to_add = @difference * @price;

re,we:- UPDATE Seller
     SET revenue = revenue + @revenue_to_add
    WHERE seller_id = 1;

c2:-commit;

schedule:-
t2ra,t1ra,t1wa,t2ra,t2wc,t2rd,t2w1,t2re,t2we,t2c2,t1r1;