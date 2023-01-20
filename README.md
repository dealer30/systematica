  <p align="center" style="color: red">Atenção, essa é uma aplicação em desenvolvimento.</p>
  <p align="center" style="color: red">Falhas inesperadas podem acontecer durante a sua execução.</p>
<p align="center">
<img src="https://cdn.discordapp.com/attachments/961837559980372009/1065848183298723911/image.png" width="500" />
</p>

  <p align="center">Aplicação Full-stack SYSTEMATICA</p>

## Description
SYSTEMATICA é uma aplicação full-stack em React e NestJS que une essas duas frameworks de front-end e back-end respectivamente para trazer um login de usuários que podem visualizar,
editar e criar novos sistemas.

## Tecnologias
- MYSQL (Banco de dados relacional)
- Redis (Banco de dados não relacional)
- NestJS (Back-end)
- React (Front-end)
- Docker (Containerização)
- MikroORM (ORM)

## Features

- [x] Login de usuários
- [x] Visualização de sistemas
- [x] Paginação de sistemas
- [x] Pesquisa de sistemas
- [x] Edição de sistemas
- [x] Criação de sistemas
- [x] Documentação OpenAPI
- [x] Validações de campos
- [ ] Estilização Completa
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes de aceitação

## Pré-requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation
#### Construa os contêineres do Docker:
```bash
$ docker-compose up --build
```
#### Após isso, verifique o IP do Gateway do servidor Mysql e com ele,
#### crie o .env na pasta raiz do servidor.
```bash
DATABASE_URL="mysql://root:root@"gateway mysql":3307/kingspan"
PORT="3001"
JWT_SECRET="secret"
JWT_EXPIRES_IN="1h"
REDIS_HOST="localhost"
REDIS_PORT="6380"
MODE="DEV"
```

#### Após isso, construa novamente os contêineres do Docker e
#### digite isso no terminal do contêiner do servidor.
```bash
$ npx mikro-orm schema:fresh --seed --run
```


## Docs

A documentação pode ser acessada ao iniciar o servidor, ir para a rota /docs.

## Acompanhe:

- Author - [Lucas Reis](https://www.linkedin.com/in/lucasreis30/)
