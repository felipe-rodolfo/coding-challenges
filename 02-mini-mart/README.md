# Mini Mart — Sistema de Carrinho de Compras

Um simulador de carrinho de compras para a MiniMart, uma pequena loja de bairro. O sistema implementa a lógica principal de um e-commerce: gerenciamento de estoque, manipulação do carrinho e checkout com cálculo de descontos.

## Características

- **Estoque**: 5 produtos cadastrados com quantidades fixas
- **Carrinho de Compras**: Adicionar, listar e remover itens com validação de estoque
- **Checkout**: Cálculo de valor final com cupons de desconto e método de pagamento

### Cupons Disponíveis
- `OFERTA5` — 5% de desconto
- `PROMO10` — 10% de desconto

### Métodos de Pagamento
- `PIX` — 5% de desconto adicional
- `CreditCard` — Sem desconto

## Como Rodar

### Requisitos
- Node.js 16+
- TypeScript (opcional, já incluso no projeto)

### Instalação
```bash
cd 02-mini-mart
npm install
```

### Compilação
```bash
npx tsc
```

### Execução
```bash
node src/index.js
# ou com ts-node (se instalado):
npx ts-node src/index.ts
```

## Exemplo de Uso

```typescript
import { Checkout, PaymentMethod } from "./domain/Checkout";
import { ShoppingCart } from "./domain/ShoppingCart";
import { Stock } from "./domain/Stock";

// Criar instâncias
const stock = new Stock();
const cart = new ShoppingCart(stock);

// Adicionar itens ao carrinho
cart.add("id-mouse", 2);
cart.add("id-fone", 1);

// Finalizar compra
const checkout = new Checkout(cart, stock, 'PROMO10', PaymentMethod.CreditCard);
console.log(checkout.checkout());
```

## Estrutura do Projeto

```
src/
├── domain/
│   ├── Stock.ts         # Gerencia estoque de produtos
│   ├── ShoppingCart.ts  # Manipula itens do carrinho
│   └── Checkout.ts      # Calcula valor final com descontos
└── index.ts             # Exemplo de uso
```

## Regras de Negócio

- Não é possível adicionar mais itens que o disponível em estoque
- Remover um item do carrinho devolve a quantidade ao estoque
- Apenas um cupom por compra (cupons inválidos são ignorados)
- Descontos são aplicados nesta ordem: cupom → método de pagamento

---

**Desenvolvido como exercício educacional de arquitetura de software.**
