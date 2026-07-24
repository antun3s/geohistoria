# DECISOES.md

# Decisões Arquiteturais

Este documento registra as principais decisões tomadas durante o planejamento do projeto.

Seu objetivo é explicar **por que** determinadas escolhas foram feitas.

Sempre que houver dúvida entre duas abordagens tecnicamente equivalentes, este documento deve orientar a implementação.

---

# Filosofia

GeoHistória é um jogo de associação entre História e Geografia.

O foco da aplicação não é representar o mundo com precisão cartográfica absoluta nem funcionar como uma enciclopédia histórica.

Seu objetivo é estimular a recuperação espontânea da memória através de pistas temporais e geográficas.

---

# KISS

## Decisão

Priorizar a solução mais simples que atenda corretamente aos requisitos.

## Motivação

Projetos simples são mais fáceis de manter, revisar e expandir.

Complexidade somente deve existir quando houver necessidade comprovada.

---

# Comportamento acima da Implementação

## Decisão

A especificação descreve comportamentos observáveis.

Não define algoritmos específicos quando isso não for necessário.

## Motivação

Permitir que diferentes LLMs ou desenvolvedores escolham soluções distintas produzindo resultados equivalentes.

---

# Assets Externos

## Decisão

O mapa faz parte dos assets do projeto.

## Motivação

Separar completamente o conteúdo visual da implementação.

A aplicação não deve desperdiçar esforço tentando gerar ou reconstruir recursos gráficos.

---

# Separação entre Conteúdo e Lógica

## Decisão

A Base de Conhecimento Histórica é independente do mecanismo do jogo.

## Motivação

Permitir expansão contínua do conteúdo sem necessidade de alterar código.

---

# Digitação Livre

## Decisão

A única forma de responder é através de digitação livre.

## Motivação

O objetivo do jogo é estimular recuperação espontânea da memória.

Reconhecimento entre alternativas reduz significativamente esse desafio cognitivo.

---

# Validação Flexível

## Decisão

A validação deve aceitar pequenas variações naturais de escrita.

O algoritmo utilizado fica a critério da implementação.

## Motivação

A experiência do participante é mais importante do que a técnica utilizada para validar a resposta.

---

# Aliases

## Decisão

Cada personalidade poderá possuir aliases cuidadosamente revisados.

## Motivação

Permitir respostas naturais sem comprometer a consistência da coleção.

Aliases nunca devem gerar ambiguidades.

---

# Zoom Automático

## Decisão

O mapa deve ajustar automaticamente o enquadramento da rodada.

## Motivação

Personalidades que viveram em locais muito próximos tornam-se difíceis de interpretar em um mapa mundial.

O enquadramento automático preserva a legibilidade sem exigir interação adicional.

---

# Sistema de Pulos

## Decisão

Cada participante possui três pulos por partida.

## Motivação

Evitar respostas aleatórias quando o participante realmente desconhece uma personalidade.

O participante pode optar por preservar vidas para rodadas futuras.

---

# Aprendizado Pós-Partida

## Decisão

O aprendizado ocorre após o encerramento da partida.

## Motivação

Evitar interromper o fluxo do jogo.

O participante pode aprofundar o conteúdo apenas quando desejar.

---

# Wikipédia

## Decisão

Cada personalidade possui um link para seu artigo correspondente na Wikipédia em português.

## Motivação

A Wikipédia funciona como ponto de partida para estudo posterior.

A aplicação não pretende substituir uma enciclopédia.

---

# Base de Conhecimento

## Decisão

Priorizar qualidade em vez de quantidade.

## Motivação

Uma coleção pequena e confiável possui maior valor do que milhares de registros inconsistentes.

---

# Coleções Futuras

## Decisão

A arquitetura deve permitir diferentes coleções históricas.

## Motivação

O mecanismo do jogo deve permanecer reutilizável para diferentes conjuntos de conhecimento.

---

# Interface

## Decisão

A interface deve permanecer minimalista.

## Motivação

O foco do participante deve estar na resolução do desafio.

Elementos decorativos possuem prioridade inferior.

---

# Internacionalização

## Decisão

A primeira versão será exclusivamente em português brasileiro.

## Motivação

Reduzir complexidade durante o desenvolvimento inicial.

---

# Fora de Escopo

## Decisão

Não implementar funcionalidades que não contribuam diretamente para a experiência principal.

Exemplos:

- contas;
- multiplayer;
- rankings;
- administração;
- animações complexas.

## Motivação

Evitar crescimento desnecessário do projeto.

---

# Princípio Final

Sempre que existir dúvida entre duas soluções tecnicamente válidas, deve ser escolhida aquela que:

- produz código mais simples;
- mantém menor acoplamento;
- facilita futuras contribuições;
- preserva a separação entre conteúdo e lógica;
- respeita integralmente o comportamento definido em `SPEC.md`.

Caso uma decisão aumente significativamente a complexidade sem benefício claro para a experiência do participante, ela deve ser descartada.
