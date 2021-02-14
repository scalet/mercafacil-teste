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

***
***

## Pré-requisitos
[Docker](https://www.docker.com/)

[Docker compose](https://docs.docker.com/compose/install/) 

## Mãos na massa

### Subindo os containers

O projeto está utilizando containers em docker, para executar o projeto corretamente devemos subir os containers.
São três containers: API (NodeJS), MySQL e PostgresQL; 

````
docker-compose up -d --build
````

### Criação das tabelas no postgres
Por conta da falta de tempo, e pouca experiência em Node e docker, acabei desenvolvendo um end point para criar as tabelas que não estavam funcionando para o Postgres.
Portanto para funcionar corretamente é necessário consumir este end point  via POST enviando a variável
Este comando executará o arquivo db-init e de preferência deve ser utilizado apenas uma vez.
```
POST
http://localhost:3333/system/init
Body: {
  "token": "48C3A86515BDD197AE727083EF199BE7A852C75E59A79DC3DA1A6A510133419E"
}
```
Após a execução do system/init será possível consumir os end points.
A API ficará disponível na porta 3333 -> http://locahost:3333
***
***

## ENDPOINTS


### http://localhost:3333/login | POST
- Retorna o token para utilização nos end points
- O token retornado será utilizado via Auth Bearer no header dos próximos end points.
- O cliente Macapá não conseguirá visualizar a lista do cliente Varejão e vice-versa

### http://localhost:3333/contact/macapa | GET
- Listar os registros do cliente macapa
### http://localhost:3333/contact/macapa | POST
- Grava os contatos do cliente macapa 

### http://localhost:3333/contact/varejao | GET
- Listar os registros do cliente varejao

### http://localhost:3333/contact/varejao | POST
- Grava os contatos do cliente varejao




***
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

Enviar JSON no corpo da requisição, exemplo:
```
{
  "email":"macapa@mercafacil.com.br",
  "pass":"macapa"
}
```

API retornará o Token, exemplo de retorno:
```
{
  "auth": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MDUxOTYxOTMsImV4cCI6MTYwNTE5NjQ5M30.G8_hBf4C75kqWItaemnw3erkpYy6qeaSv6qFeDjija4"
}
```

API Lista contatos macapa
```
GET
Host: localhost:3333/contact/macapa
Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MDUxOTYxOTMsImV4cCI6MTYwNTE5NjQ5M30.G8_hBf4C75kqWItaemnw3erkpYy6qeaSv6qFeDjija4
```

API Envia contatos macapa
```
POST
Host: localhost:3333/contact/macapa
Header: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJpYXQiOjE2MDUxOTYxOTMsImV4cCI6MTYwNTE5NjQ5M30.G8_hBf4C75kqWItaemnw3erkpYy6qeaSv6qFeDjija4
Body: 
{
    "contacts": [
      {
        "name": "Marina Rodrigues",
        "cellphone": "5541996941919"
      },
      {
        "name": "Nicolas Rodrigues",
        "cellphone": "5541954122723"
      }
    ]
}  
```