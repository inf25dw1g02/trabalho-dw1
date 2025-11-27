CREATE DATABASE IF NOT EXISTS biblioteca_db;
USE biblioteca_db;

/* Tabela Autores */
CREATE TABLE IF NOT EXISTS Autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100)
);

/* Tabela Utilizadores */
CREATE TABLE IF NOT EXISTS Utilizadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    numero_estudante VARCHAR(50) UNIQUE
);

/* Inserir 5 Autores */
INSERT INTO Autores (nome, nacionalidade) VALUES
('José Saramago', 'Portuguesa'),
('Gabriel Garcia Marquez', 'Colombiana'),
('J.K. Rowling', 'Britânica'),
('Stephen King', 'Americana'),
('Mia Couto', 'Moçambicana');

/* Inserir 10 Utilizadores */
INSERT INTO Utilizadores (nome, email, numero_estudante) VALUES
('Ana Silva', 'ana.silva@biblioteca.pt', 'a2025001'), ('Bruno Costa', 'bruno.costa@umaia.pt', 'a2025002'),
('Carlos Dias', 'carlos.dias@biblioteca.pt', 'a2025003'), ('Daniela Gomes', 'daniela.gomes@biblioteca.pt', 'a2025004'),
('Eduardo Ferreira', 'eduardo.ferreira@biblioteca.pt', 'a2025005'), ('Filipa Henriques', 'filipa.henriques@biblioteca.pt', 'a2025006'),
('Gonçalo Inácio', 'goncalo.inacio@biblioteca.pt', 'a2025007'), ('Helena Jardim', 'helena.jardim@biblioteca.pt', 'a2025008'),
('Ivo Lopes', 'ivo.lopes@umaia.pt', 'a2025009'), ('Joana Marques', 'joana.marques@umaia.pt', 'a2025010');
