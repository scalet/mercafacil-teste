# Processo Seletivo Backend Mercafácil

O objetivo deste teste é avaliar seu desempenho em desenvolver uma solução de integração entre sistemas.

O problema consiste em receber 1 ou mais contatos de celulares através de uma API Rest e adicioná-los ao banco de dados do cliente Macapá ou do cliente VareJão.

Fluxo de Ações
- A API receberá um JSON via POST contendo o nome e celular;
- O cliente deverá estar autenticado para inserir o contato na base
- O contato deverá ser inserido no banco de dados do cliente seguindo as regras de cada cliente

Especificações da API:
- A autenticação será através de um token JWT no Authorization Header
- Cada cliente tem 1 uma chave única
- A lista de contatos que será inserido em cada cliente está no arquivo contato.json

Especificações do Cliente Macapá:
- Banco de dados Mysql
- Formato do Nome é somente maiúsculas
- O formato de telefone segue o padrão +55 (41) 93030-6905
- Em anexo está o sql de criação da tabela

Especificações do Cliente VareJão:
- Banco de dados Postgresql
- Formato do Nome é livre
- O formato de telefone segue o padrão 554130306905
- Em anexo está o sql de criação da tabela

A criação de um ambiente de testes usando Docker para simular o banco de dados do cliente é altamente recomendada. A solução poderá ser desenvolvida em Golang ou Node.js. Fique livre para desenhar a solução da maneira que achar mais conveniente e supor qualquer cenário que não foi abordado nas especificações acima. Se, por qualquer motivo, você não consiga completar este teste, recomendamos que nos encaminhe o que foi desenvolvido de qualquer maneira. A falta de cumprimento de alguns dos requisitos aqui descritos não implica necessariamente na desconsideração do candidato.


## Pré-requisitos
[Docker](https://www.docker.com/)

[Docker compose](https://docs.docker.com/compose/install/) 

## Mãos na massa

### Subindo os containers

O projeto está utilizando containers em docker, para executar o projeto corretamente devemos subir os containers.
São três containers: API (NodeJS), MySQL e PostgresQL; 

`docker-compose up -d --build`

### Criação das tabelas no postgres
Por conta da falta de tempo, e pouca experiência em Node e docker, eu montei um end point para criar as tabelas que não estavam funcionando para o Postgres.
Portanto para funcionar corretamente é necessário consumir este end point `localhost:3333/system/init` via POST enviando a variável `{"token": "48C3A86515BDD197AE727083EF199BE7A852C75E59A79DC3DA1A6A510133419E"}`
Este comando executará o arquivo db-init.

Após a execução do system/init será possível consumir os end points:

## ENDPOINTS
Login

- POST /login
Retorna o token para utilização nos end points
Os tokens devem ser enviados via Auth Bearer no header da aplicação

- POST /contact/macapa
Grava os contatos do cliente macapa 

- GET /contact/macapa
Listar os registros do cliente macapa

- POST /contact/varejao
Grava os contatos do cliente varejao

GET /contact/varejao
- Listar os registros do cliente varejao

***
## LOGIN E JWT TOKEN

### Varejão
email: varejao@mercafacil.com.br  
senha: varejao

### Macapa
email: macapa@mercafacil.com.br 
senha: macapa

### Exemplo

POST http://localhost:3333/login

enviar JSON no corpo da requisição, exemplo:
`
{
  "email":"macapa@mercafacil.com.br",
  "pass":"macapa"
}
`
API ira retornar o JWT Token, exemplo de retorno:
`
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MDUxOTYxOTMsImV4cCI6MTYwNTE5NjQ5M30.G8_hBf4C75kqWItaemnw3erkpYy6qeaSv6qFeDjija4"
}