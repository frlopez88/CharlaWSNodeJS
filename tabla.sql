drop table tbl_animal;

create table tbl_animal
(
    id int primary key auto_increment,
    nombre varchar(100),
    sonido varchar(10)
);


insert into tbl_animal
(nombre, sonido)
values
('Leon', 'Roar'),
('Perro', 'Wouf'),
('Pato', 'Cuak');


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'passa1234b';
flush privileges;
