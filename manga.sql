CREATE DATABASE IF NOT EXISTS `manga_ads`;

USE `manga_ads`;

CREATE TABLE IF NOT EXISTS mangas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_manga VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  resumo TEXT NOT NULL,
  genero VARCHAR(255) NOT NULL,
  capa_img VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS capitulos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome_capitulo VARCHAR(255),
  numero_capitulo INT,
  id_manga INT,
  FOREIGN KEY (id_manga) REFERENCES mangas(id)
);

CREATE TABLE IF NOT EXISTS paginas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  numero_pagina INT,
  img VARCHAR(255),
  id_capitulo INT,
  FOREIGN KEY (id_capitulo) REFERENCES capitulos(id)
);

INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);

INSERT INTO mangas (nome_manga, autor, resumo, genero, capa_img ) Values ("Vagabond", "Inoue, Takehiko", "Vagabundo é a recontagem fictícia da vida de um dos 
espadachins mais renomados do Japão, o 'Santo da Espada' Musashi Miyamoto - sua ascensão de um espadachim sem nenhum desejo além de se tornar 'Invencível sob os céus' 
para um guerreiro iluminado que lentamente aprende sobre o importância de amigos íntimos, auto-reflexão e da própria vida","Ação , Aventura", 
"https://media.discordapp.net/attachments/975457691713564672/1104393714815750154/Vagabond-1-capa.png?width=447&height=670");

INSERT INTO capitulos(nome_capitulo, numero_capitulo, id_manga) Values ("Shinmen Takezo", 1,1);

INSERT INTO paginas(numero_pagina, img, id_capitulo) VALUES(1, "https://media.discordapp.net/attachments/975457691713564672/1104396286343528468/VagaProject_01_001_00.png?width=472&height=670",
1);




