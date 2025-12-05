import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DB_HOST || 'localhost', 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306, 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;

try {
    pool = mysql.createPool(dbConfig);
    console.log("Conexão ao MySQL Pool estabelecida com sucesso.");

    pool.getConnection()
        .then(connection => {
            console.log("Teste de conexão bem-sucedido. DB pronta.");
            connection.release();
        })
        .catch(err => {
            console.error("ERRO: Não foi possível obter uma conexão da base de dados. Verifique o serviço 'db'.", err.message);
        });

} catch (error) {
    console.error("ERRO: Falha ao criar o pool de conexões:", error.message);
}

export default pool;