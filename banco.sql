create table coluna (
    codigo serial not null primary key, 
	titulo varchar(50) not null
);

insert into coluna (titulo) values ('A fazer'), ('Em andamento'), ('Finalizado')  returning codigo, titulo; 

----

create table tarefa (
    codigo serial not null primary key, 
    codigo_coluna int not null,
    titulo varchar(50) not null,
    corpo text,
    foreign key(codigo_coluna) references coluna(codigo)
);

insert into tarefa (codigo_coluna, titulo, corpo) 
	values (1, 'Tarefa Geografia', 'Revisar tipos de relevo') returning codigo, codigo_coluna, titulo, corpo;