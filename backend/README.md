# Backend API - Book Manager

Esta é a API RESTful construída para fornecer o núcleo de dados e segurança para a plataforma Book Manager. O backend foi desenvolvido tendo em mente princípios de Clean Code e as melhores práticas do ecossistema Java.

## Stack Tecnológica

* Java 17
* Spring Boot 3
* Spring Security & JJWT (Autenticação Stateless)
* Spring Data JPA
* MySQL 8
* OpenAPI (Swagger) para documentação interativa

## Segurança e Autenticação

A segurança é um pilar importante deste projeto. A aplicação utiliza rotas protegidas via tokens JWT e isolamento de recursos (multi-tenancy). Isso significa que, além da API exigir um cabeçalho de autorização válido (`Authorization: Bearer <token>`) para acessar as rotas, ela também garante que um usuário só consiga gerenciar e visualizar os livros que pertencem à sua própria conta.

## Estrutura do Banco de Dados

A base de dados escolhida foi o MySQL. O versionamento e a estrutura inicial do banco relacional estão definidos e garantidos pelo arquivo `schema.sql` (localizado em `src/main/resources`). O Spring Boot executa esse arquivo automaticamente na inicialização da aplicação, criando as tabelas de usuários e livros e estabelecendo o relacionamento correto de chaves estrangeiras.

## Execução Local (Sem Docker)

Caso queira rodar a API isoladamente na sua máquina, fora do container:

1. Configure as credenciais do seu banco MySQL no `application.properties` ou simplesmente exporte as variáveis de ambiente necessárias (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`).
2. Execute o projeto usando o wrapper do Maven:
```bash
./mvnw spring-boot:run
```
3. A API estará exposta na porta `8080` e a documentação do Swagger pode ser acessada em `http://localhost:8080/swagger-ui.html`.