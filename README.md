# 📘 Book Manager — Full Stack Challenge

<div align="center">
  <img src="./docs/print.png" alt="Book Manager Application" width="100%" />
</div>

Uma plataforma completa para gerenciamento de livros, desenvolvida como resolução de desafio técnico. O projeto adota uma arquitetura limpa, separando a API RESTful e a Interface de Usuário em ambientes isolados, orquestrados via Docker para garantir uma experiência de execução instantânea.

## 🚀 Tecnologias e Arquitetura

O ecossistema foi dividido em duas frentes principais. Para detalhes técnicos de cada stack, consulte as documentações específicas:

* [Link da Aplicação em Produção (Vercel) ➔](https://book-manager-isnr.vercel.app/)
* [Documentação da API em Produção (Swagger) ➔](https://book-manager-backend-pys9.onrender.com/swagger-ui.html)
* [Documentação do Backend (API) ➔](./backend/README.md)
* [Documentação do Frontend (Interface) ➔](./frontend/README.md)
* [Postman Collection para Testes ➔](./docs/book-manager-collection.json)

## ⚡ Quick Start (Ambiente Docker)

A aplicação está totalmente containerizada (Multi-stage build). Para rodar o sistema completo de forma efêmera:

1. Clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/book-manager-desafio-full-stack.git
```

2. Inicie os serviços na raiz do projeto:
```bash
docker-compose up -d --build
```

3. Acesse os serviços:
* Frontend: http://localhost:5173
* Swagger (Documentação da API): http://localhost:8080/swagger-ui.html

## ✨ Diferenciais Entregues

* Orquestração de containers com Docker Compose.
* Documentação interativa da API via OpenAPI/Swagger.
* Interface com validações rigorosas e feedback em tempo real.
* Paginação nativa e busca otimizada no lado do servidor.
* Deploy funcional da aplicação (com link)
