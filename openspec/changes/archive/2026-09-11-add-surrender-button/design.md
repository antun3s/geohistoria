# Design — add-surrender-button

## Context

Estado atual (mapeado em exploração):

- `js/game.js` mantém `lives` (3) e `skips` (3) como recursos independentes; só existem duas condições de fim: derrota (`lives <= 0`) e vitória (coleção esgotada). `skip()` não termina o jogo — apenas consome o recurso.
- `js/ui.js` → `setHud()` exibe vidas/pulos como números crus e desabilita o botão de pular quando `skips <= 0` (sinal fraco). `renderEndScreen()` infere vitória com `state.lives > 0`.
- `js/app.js` tem o fluxo de reveal antes da tela final (`GAME_OVER_REVEAL_DELAY = 1200ms`), usado no game-over por derrota.
- Sem pulos e sem conhecimento, o jogador é obrigado a digitar um palpite descartável para avançar ("teatro de erro").
- `openspec/specs/` vazio — esta é a primeira capability formal do projeto; a SPEC humana vive em `docs/SPEC/SPEC.md`.

## Goals / Non-Goals

**Goals:**

- Oferecer uma saída honesta ("Não sei") para quem esgotou os pulos: desistência com encerramento limpo e reveal da resposta.
- Tornar a economia de recursos visível desde o início (gauges no HUD, regras na tela inicial).
- Reutilizar fluxos existentes (reveal → tela final) e manter KISS.

**Non-Goals:**

- Botão de desistência sempre visível ("cortar a partida" com pulos restantes) — ação dominada por pular; possível feature futura.
- Regeneração de pulos, bônus por pulos não usados, recuperação de vidas.
- Mudanças no sistema de vidas/pulos (quantidades permanecem 3/3).
- Internacionalização, temas, novos modos de jogo.

## Decisions

### D1 — Morfose em um único botão (Pular → Não sei)

O botão de pular muda de rótulo e semântica quando `skips = 0`. "Não sei" só existe como modo degradado do pular.

*Alternativas rejeitadas:* dois botões coexistentes (com pulos restantes, ninguém desistiria — ação dominada); botão separado sempre visível (escopo maior, fuga do KISS).

*Aderência:* SPEC atual, seção 8 ("quando todos os pulos forem utilizados, essa opção deixa de estar disponível") é rescrita — "Não sei" é ação distinta de pular, preservando o invariante *"um pulo nunca consome uma vida"*.

### D2 — Desistência não custa vida; categoria própria no resumo

`surrender()` encerra a partida sem tocar em `lives`. O resumo ganha "Não sei: N" (contador próprio, `surrenderCount`) e a personalidade entra na lista de revisão (`reviewPersonalities`).

*Alternativas rejeitadas:* cobrar vida (a tela final não exibe vidas — seria um ritual invisível); contar como erro (apaga a distinção entre errar e admitir ignorância, e pune a honestidade).

### D3 — Confirmação em dois toques no próprio botão

1º toque arma o botão (rótulo muda para algo como "Confirmar desistência?"); 2º toque executa. Armação expira após ~3s (timeout) e é resetada se o jogador submeter uma resposta.

*Alternativas rejeitadas:* modal (infra de UI nova, quebra o fluxo); `window.confirm` (bloqueante, visual nativo inconsistente); sem confirmação (ação irreversível com risco de toque acidental).

### D4 — `endReason` explícito no estado do jogo

`getState()` passa a expor por que a partida acabou: `"no-lives"`, `"collection-exhausted"` ou `"surrender"`. A UI deriva o título final do `endReason`, não de `lives > 0`.

*Motivo crítico:* sem isso há bug latente — desistência termina com vidas > 0 e a UI atual exibiria **"Vitória!"** para quem acabou de desistir.

### D5 — Reveal reutiliza o fluxo existente

Desistência segue o padrão do game-over: feedback "Era X." → delay de 1200ms (`GAME_OVER_REVEAL_DELAY`) → tela final. Quem desiste é justamente quem quer saber quem era.

### D6 — Gauges visuais com acessibilidade numérica

HUD troca números crus por indicadores preenchidos/vazios (3 células por recurso: `●●○`). Cada gauge mantém `aria-label` com o número ("Vidas: 2") — leitores de tela preservam a informação exata.

*Alternativa rejeitada:* manter números com tooltip — saliência insuficiente, que era a dor original.

### D7 — Guarda na lógica, não só na UI

`surrender()` em `js/game.js` valida `skips <= 0 && !gameOver && currentPersonality` — a regra "desistência só existe sem pulos" é invariante do jogo, não comportamento de interface. `reviewPersonalities` passa a ser `[...wrong, ...skipped, ...surrendered]`.

## Risks / Trade-offs

- **[Jogador desiste sem entender que encerra a partida]** → rótulo do estado armado explicita a consequência ("Confirmar desistência?"); o morfose só ocorre quando a alternativa grátis já não existe.
- **[Toque acidental no "Não sei"]** → dois toques + timeout de desarme + reset ao submeter resposta.
- **[Mudança de contrato de `getState()`]** → campo aditivo (`endReason`, `surrenderCount`); não há estado persistido entre sessões (apenas `bestScore`, não afetado). Sem migration.
- **[Gauge menos preciso que número para parte dos usuários]** → `aria-label` numérico preserva a informação; HUD permanece uma linha compacta.

## Migration Plan

Deploy direto (app client-side estática, sem backend/estado persistente). Rollback = reverter o commit; nenhum dado do usuário é migrado.

## Open Questions

Nenhuma bloqueante. Decisões menores já fechadas: título final da desistência = "Fim de Jogo" (reutiliza string existente); desistência não altera `bestScore` (que considera apenas `correctCount`).
