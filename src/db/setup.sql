CREATE DATABASE IF NOT EXISTS biblioteca_db;
USE biblioteca_db;

/* Tabela Autores */
/* Relação 1:n com Livros */
CREATE TABLE IF NOT EXISTS Autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100)
);

/* Inserir 5 Autores */
INSERT INTO Autores (nome, nacionalidade) VALUES
('José Saramago', 'Portuguesa'),
('Gabriel Garcia Marquez', 'Colombiana'),
('J.K. Rowling', 'Britânica'),
('Stephen King', 'Americana'),
('Mia Couto', 'Moçambicana');
