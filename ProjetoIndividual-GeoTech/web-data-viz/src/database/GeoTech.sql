CREATE DATABASE geotech;

USE geotech;

--  CREATE TABLE USUARIO E CONTATOS

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY auto_increment,
nome varchar (100),
email varchar(250) unique,
senha varchar(200),
continente varchar(200),
telefone varchar(20)
);

insert into usuario values
(null,'Alexandre','teste@teste.com','teste123','Europa','(11) 99999-0000');

create table contato(
idContato int primary key auto_increment,
nome varchar(45),
email varchar(250),
mensagem varchar(280),
dtContato DATETIME
);

create table feedback(
idFeedback int primary key auto_increment,
nome varchar(45),
email varchar(250),
tipo varchar(50),
mensagem varchar(280),
dtFeedback DATETIME
);

create table conexao(
idConexao int,
pkUsuario int,
pkFeedback int,
primary key (pkUsuario, pkFeedback, idConexao),
foreign key (pkUsuario) references usuario(idUsuario),
foreign key (pkFeedback) references feedback(idFeedback),
dtConexao DATETIME
);

select * from usuario;
select * from contato;
select * from feedback;
select * from conexao;

-- SELECTS USUARIOS POR CONTINENTE

select count(continente) from usuario where continente = 'Europa';
select count(continente) from usuario where continente = 'África';
select count(continente) from usuario where continente = 'Oceânia';
select count(continente) from usuario where continente = 'Ásia';
select count(continente) from usuario where continente = 'América do Sul';
select count(continente) from usuario where continente = 'América do Norte e Central';

-- CREATE TABLE JOGOS

create table jogos(
idJogo int primary key auto_increment,
nome varchar(45),
descricao varchar(200),
dificuldade varchar(5),
constraint chkDificuldade check (dificuldade in ('Baixo', 'Médio', 'Alto'))
);

insert into jogos values
(default, 'Jogo Da Memoria (Sem Tempo)', 'Um Jogo da Memoria onde o usuario ira desafiar sua mente para lembrar aonde estão as bandeiars dos paises, com tempo ilimitado. Diversao Pura', 'Baixo'),
(default, 'O Quiz', 'Um Quiz Super desafiador onde o usuario será desafiado a responder 10 perguntas com dificuldade alta, será que você é capaz? Iremos ver. Com Tempo Limitado, então responda rápido.', 'Alto'),
(default, 'Jogo Da Memoria (Com Tempo)', 'Um Jogo da Memoria onde o usuario ira desafiar sua mente para lembrar aonde estão as bandeiars dos paises, agora com tempo limitado, porem com menor número de bandeiras. Diversao Pura', 'Médio'),
(default, 'Acerte o País', 'Um jogo onde os usuarios veem imagens de bandeiras de diferentes países e devem identificar corretamente a qual país cada bandeira pertence.', 'Baixo'),
(default, 'Jogo Da Forca', 'Um jogo onde o jogador recebe uma dica sobre um país e deve adivinhar o nome letra por letra antes que a forca seja completada.','Médio'),
(default, 'Jogo Das Bandeiras', 'Um jogo onde o jogador vê três bandeiras e deve arrastá-las para os nomes corretos dos países. O objetivo é combinar cada bandeira com seu respectivo país corretamente.','Baixo');

create table historico(
idTentativa int auto_increment,
pkUsuario int,
pkJogo int,
dtJogada datetime,
foreign key (pkUsuario) references usuario(idUsuario),
foreign key (pkJogo) references jogos(idJogo),
primary key (idTentativa, pkUsuario, pkJogo)
);

select * from jogos;

select * from historico;

select usuario.nome, jogos.nome, dtJogada as 'Data de Início' from historico join jogos on pkJogo = idJogo join usuario on pkUsuario = idUsuario;