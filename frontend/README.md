# Frontend - Book Manager UI

A interface de usuário foi concebida como uma Single Page Application (SPA), focada em proporcionar uma experiência fluida, responsiva e agradável para gerenciar o acervo de livros.

## Stack Tecnológica

* React (construído via Vite)
* TypeScript
* Tailwind CSS para estilização utilitária
* React Hook Form + Zod para manipulação e validação de formulários
* Axios para integração HTTP

## Decisões de Engenharia e UX

Durante o desenvolvimento do frontend, tomei algumas decisões visando a escalabilidade do código e a experiência do usuário final:

* **Estética Minimalista e Dark Mode:** Padronizei a aplicação em um tema escuro. Além de reduzir o cansaço visual, transmite um tom de sofisticação e foca a atenção nos dados que importam.
* **Validação Antecipada (Zod):** Antes de enviar qualquer requisição para a API, o esquema de validação do Zod barra formulários incorretos localmente e fornece feedback imediato na tela (via toasts). Isso poupa tráfego de rede desnecessário e melhora o tempo de resposta percebido.
* **Componentização Inteligente:** Construí a aplicação de forma modular. Formulários de criação, edição, botões e controles de paginação são componentes reutilizáveis, mantendo a base de código limpa e facilitando futuras expansões.
* **Resiliência de Rede:** Implementei interceptadores globais no Axios que detectam respostas demoradas da API. Em ambientes de hospedagem gratuitos sujeitos a "cold starts" (como o Render), o usuário é notificado ativamente de que o servidor está "acordando", evitando que ele ache que a aplicação travou e abandone a página.

## Execução Local (Sem Docker)

Se você preferir rodar a interface web isoladamente da API na sua máquina local:

1. Instale as dependências do projeto:
```bash
npm install
```

2. Inicie o servidor de desenvolvimento do Vite:
```bash
npm run dev
```

3. A aplicação estará rodando na porta padrão do Vite em `http://localhost:5173`.
