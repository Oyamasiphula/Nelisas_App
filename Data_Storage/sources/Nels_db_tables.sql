-- CREATE DATABASE Nels_db;
CREATE USER Nelisa@localhost IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON Nels_db.* To Nelisa@localhost;
FLUSH PRIVILEGES;

use Nels_db;

DROP TABLE IF EXISTS `Categories_td`;
create table Categories_td (
id int not null auto_increment,
    Category_name char(150),
    primary key(id)
);

DROP TABLE IF EXISTS `Products_td`;
create table Products_td (
    id int not null auto_increment,
    Product_name char(30),
    Category_id int,
    FOREIGN KEY (Category_id) REFERENCES Categories_td(id),
    primary key(id)
);

DROP TABLE IF EXISTS `Suppliers_td`;
create table Suppliers_td (
    id int not null auto_increment,
    Supplier_name char(50),
   	primary key(id)
);

DROP TABLE IF EXISTS `Purchases_td`;
create table Purchases_td (
    id int not null auto_increment,
    Purchases_date Date,
    Product_id int,
    qTy int,
    Supplier_id int,
    FOREIGN KEY (Product_id) REFERENCES Products_td(id),
    product_price char(15),
    FOREIGN KEY (Supplier_id) REFERENCES Suppliers_td(id),
    primary key(id)
);

DROP TABLE IF EXISTS `Sales_td`;
create table Sales_td (
    id int not null auto_increment,
    Sales_date Date,
    FOREIGN KEY (Product_id) REFERENCES Products_td(id),
    Product_id int,
    qTy int,
    product_price char(15),
    primary key(id)
);
