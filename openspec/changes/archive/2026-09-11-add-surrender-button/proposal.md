## Why

Dois problemas de experiência identificados na mecânica de fim de jogo:

1. **Economia invisível**: o jogador não sabe a quantos pulos tem direito nem percebe o orçamento de recursos da partida. O HUD exibe números crus ("Pulos: 3") sem saliência, e a tela inicial não explica regra nenhuma — a mecânica é descoberta por tentativa e erro.
2. **Erro forçado**: quando os pulos acabam, quem não sabe a resposta é obrigado a digitar um palpite sem sentido para avançar — um "teatro de erro" que frustra e não gera aprendizado. Não existe saída honesta para quem não sabe mais nada.

## What Changes

- O botão "Pular" **morfa para "Não sei"** quando os pulos chegam a zero (modo degradado do mesmo botão).
- Acionar "Não sei" é uma **desistência**: encerra a partida imediatamente, revela quem era a personalidade e leva à tela final.
- Confirmação em **dois toques** no próprio botão (1º toque arma "Confirmar?", 2º confirma) — sem modal.
- A desistência **não custa vida**: entra no resumo final como categoria própria ("Não sei: N") e a personalidade vai para a lista de revisão.
- O reveal antes da tela final segue o mesmo fluxo do game-over atual (feedback "Era X." → 1.2s → tela final).
- HUD exibe **vidas e pulos como gauges visuais** (indicadores preenchidos/vazios) em vez de números crus.
- Tela inicial passa a explicar as regras em uma linha ("3 vidas · 3 pulos · digite a resposta livremente").

## Capabilities

### New Capabilities

- `surrender-action`: ação de desistência ("Não sei") — morfa do botão de pular, confirmação em dois toques, reveal da resposta, encerramento imediato da partida e contabilização própria no resumo final.
- `resource-visibility`: visibilidade da economia de recursos — gauges visuais de vidas e pulos no HUD e explicação das regras na tela inicial.

### Modified Capabilities

(nenhuma — `openspec/specs/` ainda não possui capabilities registradas)

## Impact

- **js/game.js**: nova ação de desistência (estado, contabilização, encerramento, personalidade revelada).
- **js/ui.js**: renderização do HUD com gauges, morfose do botão, confirmação em dois toques, novo campo "Não sei" na tela final.
- **js/app.js**: handler de desistência, fluxo reveal → tela final.
- **index.html**: marcação do HUD (gauges), linha de regras na tela inicial, campo "Não sei" no resumo.
- **css/style.css**: estilos de gauge, botão em estado armado/confirmável.
- **test/game.test.js, test/ui-feedback.test.js**: cobertura da nova ação e dos fluxos de UI.
- **docs/SPEC/SPEC.md**: seções 8 (Sistema de Pulos), 10 (Aprendizado Pós-Partida) e 11 (Critérios de Vitória e Derrota) precisam refletir a desistência e os novos elementos de interface — a SPEC em português é a fonte documental do projeto.
