import express from 'express';
import autorRoutes from './routes/autorRoutes.js'; 
import livroRoutes from './routes/livroRoutes.js';
import utilizadorRoutes from './routes/utilizadorRoutes.js';
import emprestimoRoutes from './routes/emprestimoRoutes.js';
import pool from './config/db.js';

const app = express();
const PORT = 3000; 

app.use(express.json());

// Routes
app.use('/api/autores', autorRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/utilizadores', utilizadorRoutes);
app.use('/api/emprestimos', emprestimoRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Serviço REST da Biblioteca (4 Recursos) a funcionar.",
        endpoints: {
            autores: "http://localhost:8080/api/autores",
            livros: "http://localhost:8080/api/livros",
            utilizadores: "http://localhost:8080/api/utilizadores",
            emprestimos: "http://localhost:8080/api/emprestimos"
        }
    });
});

if (pool) {
    app.listen(PORT, () => {
        console.log(`Servidor Node.js a correr na porta interna ${PORT}. Acesso via http://localhost:8080/`);
    });
} else {
    console.error("Não foi possível iniciar o servidor Node.js devido a erro na conexão à BD.");
    process.exit(1); 
}