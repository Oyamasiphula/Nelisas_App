# Nelisas_App

* To install node modules
  `npm install`

* To create database
First run mysql and navigate to Data_Storage then to navigate to sources

mySQL Command

  `mysql -u root -p`

* Database creation

  `create database Nels_db;`

* Switch to it 
  
  `use Nels_db;`

* and execute the following sql command`

  `source Nels_db.sql;`

CREATE USER nelisa@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON Nels_db.* TO nelisa@localhost;
flush privileges;

# finally you can run this app with nodejs
