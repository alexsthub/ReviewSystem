ALTER USER root
IDENTIFIED WITH mysql_native_password
BY 'password';

create database if not exists reviewsystem;
use reviewsystem;

create table if not exists companies
(
  id int not null auto_increment primary key,
  company_name varchar(64) not null,
  creator_id varchar(64) not null, 
  created timestamp not null,
  UNIQUE KEY(company_name)
);

insert into companies
(company_name, creator_id, created)
values
("test inc", "M3fdQvztKvdagO84WEvNJPf5krB3", current_timestamp);

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
  created_user_id varchar(64) not null,
  time_created timestamp not null,
);