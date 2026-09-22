# Hotel Booking API

API REST para cotação de preços de hospedagem. Dado um conjunto de datas e um tipo de usuário, retorna o preço total da estadia em cada hotel do catálogo.

## Stack

- **Node.js** + **TypeScript**
- **Express** — servidor HTTP
- **Prisma ORM** (v8) — acesso a dados
- **PostgreSQL** (via Docker) — banco de dados

## Arquitetura

O projeto segue uma separação simples por responsabilidade, com a lógica de negócio isolada de detalhes de infraestrutura:

```
src/
  domain/hotel/          # Tipos e regras de negócio (não depende de HTTP nem de banco)
    Hotel.ts
    Quote.ts
  application/            # Orquestra domínio + dados, expõe HTTP
    controllers/
    services/
    routes.ts
  infrastructure/         # Acesso a dados
    repositories/
      HotelRepository.ts  # Implementa IHotelRepository sobre o Postgres via Prisma
    mocks/
      HotelsData.ts       # Dados usados no seed
  prisma/                 # Contrato Prisma, client e seed
    contract.prisma
    db.ts
    seed.ts
  server.ts
```

`HotelRepository` implementa a interface `IHotelRepository`, o que permite trocar a fonte de dados (hoje Postgres) sem alterar `QuoteService`, `QuoteController` ou `routes.ts`.

## Pré-requisitos

- Node.js 20+
- Docker e Docker Compose

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Criar o .env a partir do template
cp .env.example .env
# .env deve conter (bate com o docker-compose.yml):
# DATABASE_URL="postgresql://postgres:postgres@localhost:5433/hotel_booking"

# 3. Subir o Postgres
docker compose up -d

# 4. Gerar o contrato Prisma (tipos + client)
npm run contract:emit

# 5. Criar as tabelas no banco
npx prisma db init

# 6. Popular o banco com os hotéis de exemplo
npm run db:seed

# 7. Rodar em modo desenvolvimento
npm run dev
```

O servidor sobe em `http://localhost:3000`.

> A porta do Postgres é `5433` (não a `5432` padrão) para evitar conflito com outras instâncias já rodando na máquina.

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Sobe o servidor em modo desenvolvimento (hot reload) |
| `npm run build` | Compila o TypeScript para `dist/` |
| `npm start` | Roda a versão compilada (`dist/server.js`) |
| `npm run contract:emit` | Regenera `contract.json`/`contract.d.ts` a partir de `contract.prisma` |
| `npm run db:seed` | Popula o banco com os hotéis de exemplo |

## API

### `POST /quotes`

Retorna o preço total da estadia em cada hotel do catálogo, para as datas e o tipo de usuário informados.

**Request**

```json
{
  "dates": ["2026-03-13", "2026-03-14", "2026-03-15"],
  "userType": "premium"
}
```

- `dates`: array de datas no formato `YYYY-MM-DD`
- `userType`: `"regular"` ou `"premium"`

**Response `200 OK`**

```json
[
  { "hotel": "Hotel Aurora Palace", "stars": 3, "totalPrice": 240 },
  { "hotel": "Hotel Costa Verde Resort", "stars": 4, "totalPrice": 270 },
  { "hotel": "Hotel Imperial Prime", "stars": 5, "totalPrice": 240 }
]
```

O preço de cada dia varia conforme ele cair em dia de semana (`weekday`) ou fim de semana (`weekend`).

**Response `400 Bad Request`**

Quando `dates` ou `userType` estão ausentes, ou `userType` não é `"regular"`/`"premium"`:

```json
{ "error": "dates and userTypes required and UserType must be \"regular\" or \"premium\" " }
```
