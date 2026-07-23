# KINGSCOUT

Ferramenta de registro de eventos ao vivo para análise de desempenho na
Kings League. Uso por um único operador durante a partida — o objetivo
central do produto é permitir registrar eventos com o mínimo de
fricção possível, sem perder lances.

A documentação completa do produto (Arquitetura, Especificação
Funcional, UX da Tela Principal e Design System) é a fonte oficial de
verdade do comportamento esperado do sistema e deve ser consultada
antes de qualquer alteração de regra de negócio.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- [Supabase](https://supabase.com) (Postgres + Auth)
- ESLint + Prettier

## Pré-requisitos

- Node.js 20+
- Uma conta e um projeto criado em [supabase.com](https://supabase.com)

## Configuração do ambiente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de variáveis de ambiente de exemplo:

   ```bash
   cp .env.example .env.local
   ```

3. No painel do seu projeto Supabase, acesse **Project Settings > API**
   e copie os dois valores necessários para dentro de `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-aqui
   ```

## Rodando o projeto localmente

```bash
npm run dev
```

A aplicação sobe em [http://localhost:3000](http://localhost:3000).

## Validando a conexão com o Supabase

Com o servidor de desenvolvimento rodando, acesse:

```
http://localhost:3000/api/health
```

- Resposta `200` com `"status": "ok"` → conexão com o Supabase
  estabelecida com sucesso (este é o critério de conclusão da Fase 1
  do roadmap).
- Resposta `500` → variáveis de ambiente ausentes ou inválidas. A
  mensagem de erro retornada indica exatamente o que falta configurar.

## Scripts disponíveis

| Comando                | Descrição                                |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Sobe o servidor de desenvolvimento       |
| `npm run build`        | Gera o build de produção                 |
| `npm run start`        | Roda o build de produção já gerado       |
| `npm run lint`         | Roda o ESLint                            |
| `npm run format`       | Formata todo o projeto com Prettier      |
| `npm run format:check` | Verifica formatação sem alterar arquivos |

## Estrutura do projeto (Fase 1)

```
kingscout/
├── src/
│   ├── app/
│   │   ├── api/health/route.ts   # rota de diagnóstico de conexão com o Supabase
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── lib/
│       ├── env.ts                # validação centralizada das env vars
│       └── supabase/
│           ├── client.ts         # cliente Supabase para Client Components
│           └── server.ts         # cliente Supabase para Server Components/Route Handlers
├── .env.example
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
└── .prettierrc.json
```

> A árvore de pastas completa do produto (componentes, hooks, store,
> domínio) será aplicada na Fase 2 do roadmap. Esta fase entrega
> apenas a base de infraestrutura.
