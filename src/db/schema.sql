ALTER USER root
IDENTIFIED WITH mysql_native_password
BY 'password';

create database if not exists reviewsystem;
use reviewsystem;

create table if not exists companies
(
  id int not null auto_increment primary key,
  company_name varchar(64) not null,
  creator_id int not null, 
  created timestamp not null,
  UNIQUE KEY(company_name)
);
create table if not exists products 
(
  id int not null auto_increment primary key,
  product_name varchar(64) not null,
  company_id int not null,
  price double not null,
  created timestamp not null,
  UNIQUE_KEY(product_name)
);
create table if not exists reviews
(
  id int not null auto_increment primary key,
  product_id int not null, 
  rating int not null,
  message varchar(256),
  created timestamp not null,
  createdUserID int not null,
);