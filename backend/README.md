# ⚙️ Backend — Book Manager API

API RESTful construída para fornecer dados e segurança para a plataforma Book Manager. Desenvolvida com foco em princípios SOLID e Clean Code.

## 🛠️ Stack Tecnológica

* Java 17
* Spring Boot 3
* Spring Security & JJWT (Autenticação Stateless)
* Spring Data JPA
* MySQL 8
* OpenAPI (Swagger)

## 🔒 Segurança e Autenticação

A aplicação utiliza rotas protegidas via tokens JWT. Os endpoints de listagem e mutação exigem um cabeçalho de autorização válido: `Authorization: Bearer <token>`.

## 🗄️ Banco de Dados

O versionamento estrutural do banco de dados relacional está garantido pelo arquivo `schema.sql` localizado em `src/main/resources`. O Spring Boot o executa automaticamente na inicialização da aplicação, construindo as tabelas `users` e `books`.

## ▶️ Execução Local (Sem Docker)

Para rodar a API isoladamente na sua máquina:

1. Configure as credenciais do MySQL no `application.properties` ou exporte as variáveis de ambiente (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `JWT_SECRET`).
2. Execute o wrapper do Maven:
```bash
./mvnw spring-boot:run
```
3. A API estará disponível na porta `8080`.