RELATÓRIO DE AVALIAÇÃO CONTÍNUA, MOMENTO 2 (DW I)

Grupo: inf25dw1g02

Tema: Gestão de uma Biblioteca Digital (API RESTful)

Status da Entrega: Funcionalidade CRUD completa para o recurso Autores em ambiente contentorizado.

1. ARQUITETURA E EXECUÇÃO DO PROJETO

O trabalho foi desenvolvido com uma visão clara: construir um serviço web que obedece a regras.

1.1. Filosofia Design-First

Começámos pelo design (o ficheiro openapi.yml), definindo o que a API faria antes de escrever o código. A API é RESTful, o que significa que usa os verbos HTTP para interagir com os recursos (entidades).

1.2. As Tecnologias que Fazem a Magia

    Servidor: Usámos Node.js com o framework Express.

    Base de Dados: Usámos MySQL 8.0 

    Ambiente: Tudo corre dentro do Docker Compose que junta o contentor MySQL (db) e o contentor Node.js (app) numa rede fechada.

2. COMPROVAÇÃO DE REQUISITOS OBRIGATÓRIOS


2.1. O CRUD COMPLETO (4 Verbos HTTP)

O recurso Autores implementa todas as quatro operações vitais, comprovadas no Postman:
Verbo HTTP	Operação	Finalidade	Status de Sucesso
POST	Criar	Adiciona um novo autor.	201 Created
GET	Ler	Lista todos os autores ou um específico.	200 OK
PUT	Atualizar	Modifica os dados de um autor existente.	200 OK
DELETE	Apagar	Remove um autor da base de dados.	204 No Content

2.2. Base de Dados Populada

O nosso ficheiro de setup SQL cria a tabela Autores e injeta 30 registos iniciais. Requisito dos 30+ registos.

2.3. Prova da Relação 1:N

A relação de cardinalidade 1:N (Autor para Livro) foi definida no esquema MySQL, garantindo que a base de dados tem a integridade referencial correta,

3. CONTENTORIZAÇÃO


3.1. Execução Multi-Container

    A aplicação corre via Docker Compose (ficheiro docker-compose.yml), que é a prova do ambiente multi-container exigido.

    O servidor Node.js atende em http://localhost:8080/ (porta mapeada do contentor).

3.2. Publicação e Partilha (DockerHub)

A imagem compilada da nossa aplicação (com o seu código) foi enviada para o nosso repositório público.

    URL de Partilha: https://hub.docker.com/u/inf25dw1g02

    Imagem Publicada: inf25dw1g02/servico-nodejs:latest

4. REFLEXÃO CRÍTICA

    Onde a IA Ajudou: O contentor Node.js estava a crashar em loop por causa de um erro de importação (ERR_MODULE_NOT_FOUND) causado pelo macOS não se entender com o Linux do Docker. A IA ajudou a diagnosticar e a fazer a atualizar o index.js para desativar as rotas problemáticas e garantir a estabilidade da entrega faseada.

