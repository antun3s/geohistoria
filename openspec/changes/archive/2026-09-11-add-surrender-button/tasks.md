# Tasks — add-surrender-button

## 1. Lógica do jogo (js/game.js)

- [x] 1.1 Adicionar ao estado: `surrenderCount`, `surrenderedPersonalities` e `endReason` (`"no-lives"`, `"collection-exhausted"`, `"surrender"`), resetados em `start()`
- [x] 1.2 Definir `endReason = "no-lives"` no encerramento por perda de vidas e `endReason = "collection-exhausted"` no esgotamento da coleção
- [x] 1.3 Implementar `surrender()` com guarda (`gameOver`, `skips <= 0`, `currentPersonality`): registra a personalidade, incrementa o contador, define `endReason = "surrender"` e encerra a partida sem consumir vida
- [x] 1.4 Expor em `getState()`: `surrenderCount`, `surrenderedPersonalities` e `endReason`; incluir desistidas em `reviewPersonalities`

## 2. Testes da lógica (test/game.test.js)

- [x] 2.1 Testar guarda: `surrender()` é ignorada quando restam pulos
- [x] 2.2 Testar que a desistência encerra a partida sem alterar vidas, erros ou contadores de pulo
- [x] 2.3 Testar contabilização: `surrenderCount`, `endReason === "surrender"` e presença da personalidade em `reviewPersonalities`
- [x] 2.4 Testar `endReason` para derrota e coleção esgotada (regressão do título de vitória)

## 3. Interface — HUD e tela inicial (index.html, js/ui.js, css/style.css)

- [x] 3.1 Substituir números por gauges de 3 indicadores (vidas e pulos) no HUD, com `aria-label` numérico e atualização em `setHud()`
- [x] 3.2 Adicionar linha de regras na tela inicial ("3 vidas · 3 pulos · digite a resposta livremente")
- [x] 3.3 Estilizar os indicadores preenchidos/vazios no CSS

## 4. Interface — desistência (index.html, js/ui.js, css/style.css)

- [x] 4.1 Morfose do botão em `setHud()`: rótulo "Não sei" quando `skips <= 0` (remover `disabled` permanente)
- [x] 4.2 Confirmação em dois toques: 1º toque arma ("Confirmar desistência?"), timeout de ~3s e reset ao submeter resposta
- [x] 4.3 Adicionar campo "Não sei" ao resumo final e incluir desistidas na lista de revisão
- [x] 4.4 Derivar o título final de `endReason` em `renderEndScreen()` (vitória apenas em `"collection-exhausted"`; "Fim de Jogo" em derrota e desistência)
- [x] 4.5 Estilizar o botão em estado armado

## 5. Fluxo da aplicação (js/app.js)

- [x] 5.1 Cadastrar `onSurrender` na inicialização da UI e tratar o resultado em handler dedicado
- [x] 5.2 No fluxo de desistência, reutilizar `revealAnswerBeforeEndScreen()` (feedback "Era X." → delay → tela final)

## 6. Testes de UI e feedback (test/ui-feedback.test.js)

- [x] 6.1 Testar a morfose do botão (rótulo e disponibilidade) conforme os pulos esgotam
- [x] 6.2 Testar a confirmação em dois toques (toque único não encerra; segundo toque encerra)
- [x] 6.3 Testar o título final por `endReason` (desistência com vidas sobrando não exibe "Vitória!")

## 7. Documentação

- [x] 7.1 Atualizar `docs/SPEC/SPEC.md`: seção 8 (ação "Não sei" como modo degradado do pular), seção 10 (categoria "Não sei" no resumo) e seção 11 (desistência como condição de encerramento), preservando o invariante "um pulo nunca consome uma vida"

## 8. Verificação

- [x] 8.1 Rodar a suíte de testes completa e validar o change (`openspec validate --change add-surrender-button`)
