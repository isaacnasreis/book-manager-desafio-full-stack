# 🎨 Frontend — Book Manager UI

Interface de usuário desenvolvida como uma Single Page Application (SPA), desenhada para proporcionar uma experiência fluida, responsiva e focada na produtividade.

## 🛠️ Stack Tecnológica

* React (via Vite)
* TypeScript
* Tailwind CSS
* React Hook Form + Zod (Validação)
* Axios (Integração)

## 💡 Decisões de UI/UX

* **Estética Minimalista:** Adoção de um tema escuro (Dark Mode) padronizado para reduzir o cansaço visual e transmitir sofisticação.
* **Validação Antecipada:** O uso do esquema de validação Zod bloqueia formulários inválidos e fornece feedback imediato (toasts) antes de gerar carga de rede desnecessária para a API.
* **Componentização:** Arquitetura modular visando a escalabilidade, facilitando a reutilização de componentes visuais complexos, como os formulários de criação e edição.
* **Resiliência a Frio:** Implementação de interceptadores HTTP globais que detectam a demora da resposta da API (Cold Starts) e notificam ativamente o usuário, evitando abandono da página.

## ▶️ Execução Local (Sem Docker)

Para rodar a interface isoladamente:

1. Instale as dependências:
```bash
npm install
```
2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```
3. A aplicação estará disponível em `http://localhost:5173`.
