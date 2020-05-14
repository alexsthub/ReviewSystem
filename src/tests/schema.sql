ALTER USER root
IDENTIFIED WITH mysql_native_password
BY 'password';

create database if not exists reviewsystem;
use reviewsystem;

CREATE TABLE if not exists companies
(
  id int not null auto_increment primary key,
  company_name varchar(64) not null,
  creator_id varchar(64) not null, 
  created_time timestamp not null,
  UNIQUE KEY(company_name)
);

INSERT INTO companies
(company_name, creator_id, created_time)
values
("test inc", "M3fdQvztKvdagO84WEvNJPf5krB3", current_timestamp);

CREATE TABLE if not exists products (
  id int not null auto_increment primary key,
  product_name varchar(64) not null,
  company_id int not null,
  price double not null,
  created_time timestamp not null,    
  UNIQUE KEY(product_name)
);

INSERT INTO products
(product_name, company_id, price, created_time)
VALUES
("Test Product", 1, 3.69, current_timestamp),
("Test Product Two", 1, 4.00, current_timestamp);

CREATE TABLE if not exists reviews (
  id int not null auto_increment primary key,
  product_id int not null, 
  rating int not null,
  message varchar(256),
  created_user_id varchar(64) not null,
  created_time timestamp not null
);

INSERT INTO reviews
(product_id, rating, message, created_user_id, created_time)
VALUES
(1, 5, "Sensational product", "M3fdQvztKvdagO84WEvNJPf5krB3", current_timestamp),
(1, 4, "Pretty good product", "M3fdQvztKvdagO84WEvNJPf5krB3", current_timestamp);