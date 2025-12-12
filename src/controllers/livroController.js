import pool from '../config/db.js';

export const getAllLivros = async (req, res) => {
    const { id_autor } = req.query;
    
    let query = 'SELECT L.*, A.nome AS nome_autor FROM Livros L JOIN Autores A ON L.id_autor = A.id';
    let params = [];

    if (id_autor) {
        query += ' WHERE L.id_autor = ?';
        params.push(id_autor);
    }
    query += ' ORDER BY L.titulo';

    try {
        const [rows] = await pool.query(query, params);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar livros:', error);
        res.status(500).json({ message: 'Erro interno ao listar livros.' });
    }
};

export const createLivro = async (req, res) => {
    const { titulo, ano_publicacao, id_autor } = req.body;
    if (!titulo || !id_autor) {
        return res.status(400).json({ message: 'Título e ID do Autor são obrigatórios.' });
    }
    try {
        const query = 'INSERT INTO Livros (titulo, ano_publicacao, id_autor) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [titulo, ano_publicacao, id_autor]);
        res.status(201).json({ id: result.insertId, titulo, ano_publicacao, id_autor, message: 'Livro criado.' });
    } catch (error) {
        console.error('Erro ao criar livro:', error);
        res.status(500).json({ message: 'Erro interno ao criar livro. Verifique se o id_autor existe.' });
    }
};

export const getLivroById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT L.*, A.nome AS nome_autor FROM Livros L JOIN Autores A ON L.id_autor = A.id WHERE L.id = ?';
        const [rows] = await pool.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar livro:', error);
        res.status(500).json({ message: 'Erro interno ao buscar livro.' });
    }
};

export const updateLivro = async (req, res) => {
    const { id } = req.params;
    const { titulo, ano_publicacao, id_autor } = req.body;
    if (!titulo || !id_autor) {
        return res.status(400).json({ message: 'Título e ID do Autor são obrigatórios para atualização.' });
    }
    try {
        const query = 'UPDATE Livros SET titulo = ?, ano_publicacao = ?, id_autor = ? WHERE id = ?';
        const [result] = await pool.query(query, [titulo, ano_publicacao, id_autor, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.status(200).json({ id, titulo, ano_publicacao, id_autor, message: 'Livro atualizado.' });
    } catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({ message: 'Erro interno ao atualizar livro.' });
    }
};

export const deleteLivro = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Livros WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao eliminar livro:', error);
        res.status(500).json({ message: 'Erro interno ao eliminar livro. Verifique se existem empréstimos associados.' });
    }
};
