import pool from '../config/db.js';

export const getAllAutores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Autores ORDER BY nome');
        res.status(200).json(rows); 
    } catch (error) {
        console.error('Erro ao buscar autores:', error);
        res.status(500).json({ message: 'Erro interno ao listar autores.' });
    }
};


export const createAutor = async (req, res) => {
    const { nome, nacionalidade } = req.body;
    if (!nome) {
        return res.status(400).json({ message: 'O nome do autor é obrigatório.' });
    }
    try {
        const query = 'INSERT INTO Autores (nome, nacionalidade) VALUES (?, ?)';
        const [result] = await pool.query(query, [nome, nacionalidade]);
        
        res.status(201).json({ 
            id: result.insertId, 
            nome, 
            nacionalidade,
            message: 'Autor criado com sucesso.' 
        });
    } catch (error) {
        console.error('Erro ao criar autor:', error);
        res.status(500).json({ message: 'Erro interno ao criar autor.' });
    }
};

export const getAutorById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM Autores WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Autor não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar autor:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const updateAutor = async (req, res) => {
    const { id } = req.params;
    const { nome, nacionalidade } = req.body;
    if (!nome) {
        return res.status(400).json({ message: 'O nome é obrigatório para atualização.' });
    }
    try {
        const query = 'UPDATE Autores SET nome = ?, nacionalidade = ? WHERE id = ?';
        const [result] = await pool.query(query, [nome, nacionalidade, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Autor não encontrado para atualização.' });
        }

        res.status(200).json({ id, nome, nacionalidade, message: 'Autor atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar autor:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

export const deleteAutor = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Autores WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Autor não encontrado para eliminação.' });
        }
        res.status(204).send(); 
    } catch (error) {
        console.error('Erro ao eliminar autor:', error);
        res.status(500).json({ message: 'Erro interno ao eliminar autor.' });
    }
};