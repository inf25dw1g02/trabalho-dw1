import pool from '../config/db.js';

export const getAllEmprestimos = async (req, res) => {
    const query = `
        SELECT E.id, L.titulo, U.nome AS nome_utilizador, E.data_emprestimo, E.data_devolucao
        FROM Emprestimos E
        JOIN Livros L ON E.id_livro = L.id
        JOIN Utilizadores U ON E.id_utilizador = U.id
        ORDER BY E.data_emprestimo DESC
    `;
    try {
        const [rows] = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error('Erro ao listar empréstimos:', error);
        res.status(500).json({ message: 'Erro interno ao listar empréstimos.' });
    }
};

export const createEmprestimo = async (req, res) => {
    const { id_livro, id_utilizador } = req.body;
    const data_emprestimo = new Date().toISOString().slice(0, 10); /* Slice (tirar hora) */
    
    if (!id_livro || !id_utilizador) {
        return res.status(400).json({ message: 'IDs do Livro e Utilizador são obrigatórios.' });
    }

    try {
        const [emprestimoAtivo] = await pool.query('SELECT id FROM Emprestimos WHERE id_livro = ? AND data_devolucao IS NULL', [id_livro]);
        if (emprestimoAtivo.length > 0) {
            return res.status(409).json({ message: 'O livro já se encontra emprestado. Registe a devolução primeiro.' });
        }

        const query = 'INSERT INTO Emprestimos (id_livro, id_utilizador, data_emprestimo) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [id_livro, id_utilizador, data_emprestimo]);
        
        res.status(201).json({ 
            id: result.insertId, 
            id_livro, 
            id_utilizador, 
            data_emprestimo, 
            message: 'Empréstimo registado com sucesso.' 
        });
    } catch (error) {
        console.error('Erro ao registar empréstimo:', error);
        res.status(500).json({ message: 'Erro interno ao registar empréstimo. Verifique se os IDs existem.' });
    }
};

export const getEmprestimoById = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'SELECT * FROM Emprestimos WHERE id = ?';
        const [rows] = await pool.query(query, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar empréstimo:', error);
        res.status(500).json({ message: 'Erro interno ao buscar empréstimo.' });
    }
};

export const updateEmprestimo = async (req, res) => {
    const { id } = req.params;
    const { data_devolucao } = req.body;
    
    if (!data_devolucao) {
        return res.status(400).json({ message: 'A data de devolução é obrigatória para esta operação.' });
    }

    try {
        const query = 'UPDATE Emprestimos SET data_devolucao = ? WHERE id = ? AND data_devolucao IS NULL';
        const [result] = await pool.query(query, [data_devolucao, id]);
        
        if (result.affectedRows === 0) {
            const [check] = await pool.query('SELECT data_devolucao FROM Emprestimos WHERE id = ?', [id]);
            if (check.length === 0) {
                return res.status(404).json({ message: 'Empréstimo não encontrado.' });
            } else if (check[0].data_devolucao) {
                return res.status(409).json({ message: 'Este empréstimo já tinha sido devolvido.' });
            }
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        
        res.status(200).json({ id, data_devolucao, message: 'Devolução registada com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar empréstimo:', error);
        res.status(500).json({ message: 'Erro interno ao atualizar empréstimo.' });
    }
};

export const deleteEmprestimo = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM Emprestimos WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao eliminar empréstimo:', error);
        res.status(500).json({ message: 'Erro interno ao eliminar empréstimo.' });
    }
};
