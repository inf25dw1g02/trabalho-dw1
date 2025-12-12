# RELATÓRIO TÉCNICO DE PROJETO: API RESTful PARA BIBLIOTECA DIGITAL

**Grupo:** inf25dw1g02\
**Unidade Curricular:** Desenvolvimento Web I\
**Repositório Docker:** `inf25dw1g02/servico-nodejs:latest`

------------------------------------------------------------------------

## 1. INTRODUÇÃO E ARQUITETURA DO PROJETO

Este relatório apresenta o desenvolvimento de uma API RESTful destinada
à gestão de uma biblioteca digital. O objetivo principal consistiu em
criar um sistema fiável e bem estruturado, capaz de organizar dados e
aplicar regras essenciais ao funcionamento do processo de empréstimos.

O projeto utiliza **Node.js (Express)** para a lógica aplicacional e
**MySQL 8.0** como sistema de gestão de base de dados. Foi aplicada uma
metodologia *Design-First*, iniciando o trabalho pela definição rigorosa
do contrato OpenAPI.

### 1.1 Especificação OpenAPI

A especificação `openapi.yml` definiu a estrutura e o comportamento da
API, garantindo coerência na comunicação e no tratamento dos diferentes
recursos.

Exemplo da rota relativa aos livros:

``` yaml
paths:
  /livros:
    get:
      tags: ["Livros"]
      summary: Mostra todos os Livros (Suporta filtro por Autor)
      parameters:
        - name: id_autor
          in: query
          description: Filtra livros pelo ID do autor (Chave Estrangeira).
          required: false
          schema:
            type: integer
      responses:
        '200':
          description: Lista de livros devolvida.
```

------------------------------------------------------------------------

## 2. BASE DE DADOS

A base de dados foi modelada de forma a garantir integridade e
consistência. A relação entre livros, utilizadores e empréstimos obedece
a regras que impedem conflitos e asseguram a fiabilidade dos dados.

### 2.1 Estrutura SQL e Relações

A tabela **Emprestimos** liga diretamente livros e utilizadores:

``` sql
CREATE TABLE IF NOT EXISTS Emprestimos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_livro INT NOT NULL,
    id_utilizador INT NOT NULL,
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    FOREIGN KEY (id_livro) REFERENCES Livros(id) ON DELETE RESTRICT,
    FOREIGN KEY (id_utilizador) REFERENCES Utilizadores(id) ON DELETE RESTRICT
);
```

A regra `ON DELETE RESTRICT` impede a eliminação de livros ou
utilizadores associados a empréstimos ativos.

------------------------------------------------------------------------

## 3. IMPLEMENTAÇÃO DA LÓGICA DE NEGÓCIO

### 3.1 Filtragem de Livros

A API permite consultar todos os livros ou filtrar por autor:

``` javascript
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
    } catch (err) {
        /* ... tratamento de erros ... */
    }
};
```

### 3.2 Gestão de Empréstimos

A API impede que um livro seja emprestado enquanto existir um empréstimo
ativo (ou seja, sem data de devolução registada):

``` javascript
export const createEmprestimo = async (req, res) => {
    const { id_livro, id_utilizador } = req.body;

    try {
        const [emprestimoAtivo] = await pool.query(
            'SELECT id FROM Emprestimos WHERE id_livro = ? AND data_devolucao IS NULL', 
            [id_livro]
        );

        if (emprestimoAtivo.length > 0) {
            return res.status(409).json({ message: 'O livro já se encontra emprestado. Registe a devolução primeiro.' });
        }

        const query = 'INSERT INTO Emprestimos (id_livro, id_utilizador, data_emprestimo) VALUES (?, ?, ?)';
        /* ... execução da query ... */

    } catch (err) {
        /* ... tratamento de erros ... */
    }
};
```

------------------------------------------------------------------------

## 4. CONTENTORIZAÇÃO E DEPLOYMENT

O projeto utiliza Docker, permitindo executar a aplicação de forma
consistente em qualquer ambiente.

-   **Imagem pública:** `inf25dw1g02/servico-nodejs:latest`\
-   **Acesso ao serviço:** `http://localhost:8080`

O ficheiro `docker-compose.yml` gere os serviços Node.js e MySQL numa
rede interna.

------------------------------------------------------------------------

## 5. CONCLUSÃO

A API desenvolvida cumpre os requisitos funcionais e técnicos definidos
inicialmente. O trabalho realizado permitiu aplicar boas práticas de
desenho de APIs, gestão de dados e utilização de contentorização. O
sistema encontra-se preparado para servir como base de uma biblioteca
digital totalmente funcional.
