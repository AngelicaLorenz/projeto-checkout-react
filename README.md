# Sistema de Checkout Profissional com Simulação Antifraude

Aplicação web desenvolvida em React para gerenciamento de carrinho fixo, processamento de pagamento simulado, validação avançada de formulários e verificação de regras antifraude.

## 🚀 Objetivo do Sistema

O objetivo principal é simular um fluxo de e-commerce seguro, contendo um carrinho fixo com três produtos, cálculo automático de subtotais e total, tela de pagamento com validação rigorosa de dados de cartão de crédito (utilizando React Hook Form e Zod), simulação de processamento assíncrono e validação antifraude baseada em dígitos repetidos ("tentativa de golpe").

## 🛠️ Tecnologias Utilizadas

- **React**
- **Vite**
- **React Hook Form**
- **Zod**
- **@hookform/resolvers**

## 📋 Pré-requisitos e Execução

Para executar o projeto localmente, certifique-se de possuir o [Node.js](https://nodejs.org/) instalado em sua máquina.

1. Clone o repositório:

   ```bash
   git clone <url-do-repositorio>


2. Acesse a pasta do projeto:
   ```bash
   cd <nome-da-pasta>
   
3. Instale as dependências:
   ```bash
   npm install

4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev

5. Abra o navegador e acesse o endereço fornecido no terminal (geralmente http://localhost:5173).

## 🌿 Organização do Repositório e Git Flow

O versionamento do projeto seguiu as diretrizes de boas práticas de controle de versão:

main: Branch principal contendo a versão final, estável e consolidada do projeto.
develop: Branch de integração onde o código foi concentrado durante o desenvolvimento.

Feature Branches: Branches criadas a partir da develop para implementar tarefas isoladas (como a modelagem do carrinho, estruturação do formulário de pagamento e regras de validação antifraude).

Os commits foram realizados de forma concisa, direta e focada em pequenas entregas.

##   💡 Oportunidades de Melhoria

Migração total para o uso de rotas dedicadas com o React Router para gerenciar a navegação explícita entre as quatro telas (/, /pagamento, /sucesso e /falha).
Integração futura com uma API real de pagamentos e persistência de dados em banco de dados ou armazenamento local.

