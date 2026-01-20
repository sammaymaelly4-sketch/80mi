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
  lib/                # Utilitários (motion, storage, feedback, receitas)
```

## Como alterar os mocks

- **Home**: `src/app/page.js` (atalhos, dicas e tarefas).
- **Rotina > Alimentação**: `src/app/rotina/alimentacao/page.js` (cardápio e alimentos).
- **Rotina > Exercícios**: `src/app/rotina/exercicios/page.js` (lista de exercícios).
- **Agenda > Remédios**: `src/app/agenda/remedios/page.js` (horários e doses).
- **Agenda > Consultas**: `src/app/agenda/consultas/page.js` (consultas).
- **Exames**: `src/app/exames/page.js` (lista de exames).

## Persistência local

Tarefas concluídas e streak semanal são salvos em `localStorage`. Veja `src/lib/storage.js`.

## Boas-vindas personalizadas

O app mostra uma abertura curta com saudação por horário e o nome padrão **Julio**. Ela aparece apenas no primeiro acesso do dia, usando `localStorage`.

- **Componente:** `src/components/welcome/WelcomeSplash.jsx`
- **Regras de exibição:** `src/lib/welcomeGate.js`
- **Voz opcional:** `src/lib/voice.js`

### Ajustes rápidos

- **Nome padrão:** ajuste o prop `name` no `WelcomeSplash` ou passe via layout.  
- **Mostrar sempre (modo cuidador):** defina `localStorage.setItem("welcome_show_always", "true")`.
- **Habilitar voz:** defina `localStorage.setItem("voice_enabled", "true")`.
- **Reset diário:** apague `welcome_last_seen_date` para forçar a abertura no próximo acesso.
