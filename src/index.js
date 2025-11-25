import express from 'express';
import autorRoutes from './routes/autorRoutes.js';
import pool from './config/db.js';

const app = express();
const PORT = 3000;

app.use(express.json());

/* Routes */
app.use('/api/autores', autorRoutes);

/* Validate */
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: "Serviço REST da Biblioteca a funcionar.",
        endpoints: {
            autores: "http://localhost:8080/api/autores",
        }
    });
});

if (pool) {
    app.listen(PORT, () => {
        console.log(`Servidor Node.js porta : ${PORT}. Acesso via http://localhost:8080/`);
    });
} else {
    console.error("Erro na conexão à BD.");
}