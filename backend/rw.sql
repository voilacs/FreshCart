1st_transaction:-

start transaction;
ra:- SELECT * FROM warehouse_inventory WHERE item_id = 1 and warehouse_id=1;
ra,wa:- UPDATE warehouse_inventory SET quantity_in_stock = quantity_in_stock - 5 WHERE item_id = 1;


2nd_transaction:-

start transaction;
ra:- SELECT * FROM warehouse_inventory WHERE item_id = 1 and warehouse_id=1;
ra,wa:-UPDATE warehouse_inventory SET quantity_in_stock = quantity_in_stock - 5 WHERE item_id = 1;
c2;


schedule:-
t1ra, t2ra,t2wa,t2c2,t1ra,t1wa;