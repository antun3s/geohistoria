# Spec Delta — surrender-action

## ADDED Requirements

### Requirement: Botão de pular morfa para "Não sei" quando os pulos acabam

Quando o jogador não possui pulos restantes, o botão de pular MUST mudar de rótulo e semântica, tornando-se uma ação de desistência ("Não sei"). Enquanto houver pulos restantes, a ação de desistência MUST NOT estar disponível — apenas o pular.

#### Scenario: Último pulo é utilizado
- **WHEN** o jogador utiliza seu último pulo e a próxima rodada é carregada
- **THEN** o botão exibe o rótulo "Não sei" no lugar de "Pular", sinalizando que a economia mudou

#### Scenario: Pulos restantes
- **WHEN** o jogador possui um ou mais pulos restantes
- **THEN** apenas a ação "Pular" está disponível e nenhuma ação de desistência é oferecida

### Requirement: Confirmação em dois toques

A desistência MUST exigir dois toques no próprio botão para ser executada: o primeiro toque arma a confirmação (alterando o rótulo para explicitar a consequência, ex.: "Confirmar desistência?") e o segundo confirma. A armação MUST ser desfeita após um tempo curto (~3 segundos) ou quando o jogador submeter uma resposta.

#### Scenario: Toque único não desiste
- **WHEN** o jogador toca em "Não sei" uma única vez
- **THEN** a partida não é encerrada e o botão passa ao estado armado de confirmação

#### Scenario: Confirmação expira
- **WHEN** o botão está armado e o jogador não o confirma dentro do tempo limite
- **THEN** a armação é desfeita e o botão retorna ao estado "Não sei", sem efeito sobre a partida

#### Scenario: Resposta submetida com botão armado
- **WHEN** o jogador submete uma resposta enquanto o botão está armado
- **THEN** a armação é desfeita e a resposta é processada normalmente

### Requirement: Desistência encerra a partida sem custo de vida

A desistência MUST encerrar a partida imediatamente, sem consumir vidas e sem ser contabilizada como erro. A lógica do jogo MUST validar que a desistência só é permitida quando não restam pulos.

#### Scenario: Desistência com vidas restantes
- **WHEN** o jogador confirma a desistência possuindo vidas restantes
- **THEN** a partida é encerrada, o contador de vidas permanece inalterado e o contador de erros permanece inalterado

#### Scenario: Tentativa de desistir com pulos restantes
- **WHEN** a lógica do jogo recebe uma ação de desistência enquanto restam pulos
- **THEN** a ação é ignorada e o estado da partida não se altera

### Requirement: Revelação da personalidade antes da tela final

Ao confirmar a desistência, a aplicação MUST revelar quem era a personalidade atual (feedback "Era X.") antes de apresentar a tela final, seguindo o mesmo fluxo de revelação do encerramento por derrota.

#### Scenario: Revelação antes do resumo
- **WHEN** o jogador confirma a desistência
- **THEN** a aplicação exibe quem era a personalidade atual e, após um curto atraso, apresenta a tela final da partida

### Requirement: Contabilização própria no resumo final

A tela final MUST exibir a quantidade de desistências em categoria própria ("Não sei: N"), separada de acertos, erros e pulos. As personalidades desistidas MUST aparecer na lista de revisão pós-partida.

#### Scenario: Resumo com desistência
- **WHEN** a partida termina por desistência
- **THEN** o resumo exibe o campo "Não sei" com valor 1, e os contadores de erros e pulos não incluem a desistência

#### Scenario: Personalidade desistida na revisão
- **WHEN** a partida termina por desistência
- **THEN** a personalidade que estava em jogo aparece na lista de revisão com link para a Wikipédia

### Requirement: Desistência não é vitória

A tela final MUST NOT exibir o título de vitória quando a partida termina por desistência, independentemente das vidas restantes. O estado do jogo MUST expor o motivo do encerramento (derrota, coleção esgotada ou desistência).

#### Scenario: Desistência com vidas sobrando
- **WHEN** o jogador desiste possuindo vidas restantes
- **THEN** a tela final exibe um título de encerramento neutro ("Fim de Jogo") e não o título de vitória
