CREATE DATABASE IF NOT EXISTS biblioteca_db;
USE biblioteca_db;

/* Tabela Autores */
/* Relação 1:n com Livros */
CREATE TABLE IF NOT EXISTS Autores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nacionalidade VARCHAR(100)
);

/* Tabela Livros */
CREATE TABLE IF NOT EXISTS Livros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    ano_publicacao INT,
    id_autor INT,
    FOREIGN KEY (id_autor) REFERENCES Autores(id) ON DELETE CASCADE
);

/* Tabela Utilizadores */
/* Relação 1:n com Empréstimos */
CREATE TABLE IF NOT EXISTS Utilizadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    numero_estudante VARCHAR(50) UNIQUE
);

/* Tabela Empréstimos */
CREATE TABLE IF NOT EXISTS Emprestimos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_livro INT NOT NULL,
    id_utilizador INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    FOREIGN KEY (id_livro) REFERENCES Livros(id) ON DELETE RESTRICT,
    FOREIGN KEY (id_utilizador) REFERENCES Utilizadores(id) ON DELETE RESTRICT
);

/* Inserir 5 Autores */
INSERT INTO Autores (nome, nacionalidade) VALUES
('José Saramago', 'Portuguesa'),
('Gabriel Garcia Marquez', 'Colombiana'),
('J.K. Rowling', 'Britânica'),
('Stephen King', 'Americana'),
('Mia Couto', 'Moçambicana');

/* Inserir 10 Livros (2 por Autor) */
INSERT INTO Livros (titulo, ano_publicacao, id_autor) VALUES
('Ensaio sobre a Cegueira', 1995, 1), ('O Evangelho Segundo Jesus Cristo', 1991, 1),
('Cem Anos de Solidão', 1967, 2), ('O Amor nos Tempos do Cólera', 1985, 2),
('Harry Potter e a Pedra Filosofal', 1997, 3), ('Harry Potter e a Câmara dos Segredos', 1998, 3),
('O Iluminado', 1977, 4), ('IT', 1986, 4),
('Terra Sonâmbula', 1992, 5), ('O Último Voo do Flamingo', 2000, 5);

/* Inserir 10 Utilizadores */
INSERT INTO Utilizadores (nome, email, numero_estudante) VALUES
('Ana Silva', 'ana.silva@biblioteca.pt', 'a2025001'), ('Bruno Costa', 'bruno.costa@umaia.pt', 'a2025002'),
('Carlos Dias', 'carlos.dias@biblioteca.pt', 'a2025003'), ('Daniela Gomes', 'daniela.gomes@biblioteca.pt', 'a2025004'),
('Eduardo Ferreira', 'eduardo.ferreira@biblioteca.pt', 'a2025005'), ('Filipa Henriques', 'filipa.henriques@biblioteca.pt', 'a2025006'),
('Gonçalo Inácio', 'goncalo.inacio@biblioteca.pt', 'a2025007'), ('Helena Jardim', 'helena.jardim@biblioteca.pt', 'a2025008'),
('Ivo Lopes', 'ivo.lopes@umaia.pt', 'a2025009'), ('Joana Marques', 'joana.marques@umaia.pt', 'a2025010');

/* Inserir 10 Empréstimos */
INSERT INTO Emprestimos (id_livro, id_utilizador, data_emprestimo, data_devolucao) VALUES
(1, 1, '2025-11-01', '2025-11-15'), (3, 2, '2025-11-02', NULL),
(5, 3, '2025-10-25', '2025-11-10'), (7, 4, '2025-11-05', '2025-11-20'),
(9, 5, '2025-11-07', NULL), (2, 6, '2025-11-08', '2025-11-21'),
(4, 7, '2025-11-09', NULL), (6, 8, '2025-11-10', '2025-11-22'),
(8, 9, '2025-11-11', NULL), (10, 10, '2025-11-12', '2025-11-23');
