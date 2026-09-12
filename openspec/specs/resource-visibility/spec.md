# resource-visibility Specification

## Purpose

Tornar a economia da partida visível desde o primeiro contato: gauges visuais de vidas e pulos no HUD (com rótulos acessíveis para leitores de tela) e uma linha concisa de regras na tela inicial.

## Requirements

### Requirement: HUD exibe vidas como gauge visual

O HUD MUST exibir as vidas como um gauge visual de três indicadores (preenchidos para vidas disponíveis, vazios para vidas perdidas), no lugar de um número cru. O gauge MUST ser atualizado a cada mudança de estado da partida.

#### Scenario: Vida perdida
- **WHEN** o jogador erra uma resposta e perde uma vida
- **THEN** o gauge de vidas passa a exibir dois indicadores preenchidos e um vazio

#### Scenario: Estado inicial
- **WHEN** uma nova partida é iniciada
- **THEN** o gauge de vidas exibe os três indicadores preenchidos

### Requirement: HUD exibe pulos como gauge visual

O HUD MUST exibir os pulos como um gauge visual de três indicadores (preenchidos para pulos disponíveis, vazios para pulos usados), no lugar de um número cru. O gauge MUST ser atualizado a cada mudança de estado da partida.

#### Scenario: Pulo utilizado
- **WHEN** o jogador utiliza um pulo
- **THEN** o gauge de pulos passa a exibir dois indicadores preenchidos e um vazio

#### Scenario: Pulos esgotados
- **WHEN** o jogador utiliza seu último pulo
- **THEN** o gauge de pulos exibe os três indicadores vazios e o botão de ação assume o comportamento de desistência

### Requirement: Gauges acessíveis a leitores de tela

Cada gauge do HUD MUST expor um `aria-label` com a contagem numérica do recurso correspondente (ex.: "Vidas: 2"), preservando a informação exata para leitores de tela.

#### Scenario: Leitor de tela anuncia contagem
- **WHEN** a página é avaliada por um leitor de tela com o gauge de pulos em um indicador preenchido
- **THEN** o rótulo acessível anuncia "Pulos: 1"

### Requirement: Tela inicial explica as regras da partida

A tela inicial MUST explicar, em uma linha concisa, a economia da partida antes de o jogador iniciá-la, mencionando a quantidade de vidas, a quantidade de pulos e a digitação livre como forma de resposta.

#### Scenario: Regras visíveis antes de iniciar
- **WHEN** o jogador abre a aplicação
- **THEN** a tela inicial exibe a linha de regras (ex.: "3 vidas · 3 pulos · digite a resposta livremente") junto ao botão de iniciar
