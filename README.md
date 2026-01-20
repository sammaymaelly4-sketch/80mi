# Painel de Saúde (84+)

Aplicação web mobile-first para rotina, agenda e exames com UX simples e acessível.

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Estrutura

```
src/
  app/                # Rotas (App Router)
  components/flash/   # Flash cards premium e listas
  components/nav/     # Bottom navigation
  components/exams/   # Splash de exames
  data/exams/         # Mocks dos alertinhas e itens ok dos exames
  lib/                # Utilitários (motion, storage, feedback, receitas)
```

## Como alterar os mocks

- **Home**: `src/app/page.js` (atalhos, dicas e tarefas).
- **Rotina > Alimentação**: `src/app/rotina/alimentacao/page.js` (cardápio e alimentos).
- **Rotina > Exercícios**: `src/app/rotina/exercicios/page.js` (lista de exercícios).
- **Agenda > Remédios**: `src/app/agenda/remedios/page.js` (horários e doses).
- **Agenda > Consultas**: `src/app/agenda/consultas/page.js` (consultas).
- **Exames**: `src/app/exames/page.js` (lista de exames).
- **Alertinhas de exames**: `src/data/exams/julio_alert_cards.json` (cards, itens ok e regras de rotação).

## Rotação dos alertinhas

- A Home mostra **1 card por dia**, seguindo prioridade ascendente.
- O botão **Entendi** (dismiss) oculta o card até o dia seguinte.
- Os estados são salvos em `localStorage` usando as chaves definidas em `display_rules.rotation.storage_keys`.

## Persistência local

Tarefas concluídas e streak semanal são salvos em `localStorage`. Veja `src/lib/storage.js`.
