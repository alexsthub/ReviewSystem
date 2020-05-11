ALTER USER root
IDENTIFIED WITH mysql_native_password
BY 'password';

create table if not exists users
(
  id int not null auto_increment primary key,
  email varchar(40) not null,
  password char(64) not null,
  username varchar(255) not null,
  UNIQUE KEY(email),
  UNIQUE KEY(username)
);