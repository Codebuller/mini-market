# Mini-market
### This repository contains a pet project implementing an abstract e-commerce platform. The project leverages NestJS for the backend, Redis for caching, and MariaDB for the main database. Additionally, Swagger is used for API documentation, and Docker/Docker Compose is utilized for containerization.

## Enviroment:
.env(example):

- MARIA_DB_USERNAME=root
- MARIA_DB_PASSWORD=||some_password||
- MARIA_DB_HOST=127.0.0.1
- MARIA_DB_DATABASE=market
- SUPERUSER_PASSWORD=12341234
- SUPERUSER_EMAIL=test@mail.com
- PRIVATE_KEY=sectet #secret for jwt
- MARIA_DB_PORT=3307</li> #default for maria is 3306
- REDIS_PORT=6378</li> #default for maria is 6379
- REDIS_HOST=127.0.0.1

## Swagger: http://localhost:8000/api/docs

## Technologies

- [NestJS](https://nestjs.com/)
- [Redis](https://redis.io/)
- [MariaDB](https://mariadb.org/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
