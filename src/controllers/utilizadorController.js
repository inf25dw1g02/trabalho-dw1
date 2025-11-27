import pool from '../config/db.js';

export const getAllUtilizadores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nome, email, numero_estudante FROM Utilizadores ORDER BY nome');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar utilizadores:', error);
        res.status(500).json({ message: 'Erro interno ao listar utilizadores.' });
    }
};

export const createUtilizador = async (req, res) => {
    const { nome, email, numero_estudante } = req.body;
    if (!nome || !email || !numero_estudante) {
        return res.status(400).json({ message: 'Nome, Email e Número de Estudante são obrigatórios.' });
    }
    try {
        const query = 'INSERT INTO Utilizadores (nome, email, numero_estudante) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [nome, email, numero_estudante]);
        res.status(201).json({ id: result.insertId, nome, email, numero_estudante, message: 'Utilizador criado.' });
    } catch (error) {
        console.error('Erro ao criar utilizador:', error);
        if (error.errno === 1062) {
            return res.status(409).json({ message: 'Email ou Número de Estudante já registado.' });
        }
        res.status(500).json({ message: 'Erro interno ao criar utilizador.' });
    }
};

export const getUtilizadorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT id, nome, email, numero_estudante FROM Utilizadores WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar utilizador:', error);
        res.status(500).json({ message: 'Erro interno ao buscar utilizador.' });
    }
};

export const updateUtilizador = async (req, res) => {
    const { id } = req.params;
    const { nome, email, numero_estudante } = req.body;
    if (!nome || !email || !numero_estudante) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios para atualização.' });
    }
    try {
        const query = 'UPDATE Utilizadores SET nome = ?, email = ?, numero_estudante = ? WHERE id = ?';
        const [result] = await pool.query(query, [nome, email, numero_estudante, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }
        res.status(200).json({ id, nome, email, numero_estudante, message: 'Utilizador atualizado.' });
    } catch (error) {
        console.error('Erro ao atualizar utilizador:', error);
        if (error.errno === 1062) {
            return res.status(409).json({ message: 'Email ou Número de Estudante já registado por outro utilizador.' });
        }
        res.status(500).json({ message: 'Erro interno ao atualizar utilizador.' });
    }
};

export const deleteUtilizador = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Utilizadores WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Utilizador não encontrado.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao eliminar utilizador:', error);
        res.status(500).json({ message: 'Erro interno ao eliminar utilizador. Verifique se existem empréstimos associados.' });
    }
};