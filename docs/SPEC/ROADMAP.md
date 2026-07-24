# Roadmap.md 

Este documento descreve funcionalidades consideradas para versões futuras do GeoHistória.

Os itens aqui presentes **não fazem parte da primeira versão** e não devem influenciar a simplicidade da implementação inicial.

A presença de uma funcionalidade neste documento não implica sua implementação futura.

---

# Princípios

Toda evolução deve respeitar os princípios definidos em `SPEC.md`.

Em especial:

- KISS;
- separação entre conteúdo e lógica;
- comportamento acima da implementação;
- facilidade de contribuição.

Nenhuma evolução deve tornar a arquitetura dependente de uma funcionalidade opcional.

---

# Prioridade 1

## Coleções Temáticas

Permitir que o participante escolha diferentes conjuntos de personalidades.

Exemplos:

- Cientistas
- Filósofos
- Imperadores
- Artistas
- Matemáticos
- Exploradores
- Compositores
- Escritores
- Revoluções
- Brasil
- Roma Antiga

A lógica do jogo deverá permanecer exatamente a mesma.

---

## Níveis de Dificuldade

Possibilitar diferentes níveis de dificuldade.

Exemplos:

- Fácil
- Médio
- Difícil

Os níveis poderão alterar critérios como:

- quantidade de personalidades;
- notoriedade das personalidades;
- quantidade de vidas;
- quantidade de pulos.

A forma de implementação fica para uma versão futura.

---

## Revisão Pós-Partida

Após o término da partida, permitir revisar todas as personalidades apresentadas.

Cada item poderá apresentar:

- mapa;
- anos;
- curiosidade;
- artigo da Wikipédia.

---

# Prioridade 2

## Partidas por Seed

Permitir partidas reproduzíveis através de uma seed compartilhada.

Participantes diferentes poderão jogar exatamente a mesma sequência de personalidades.

Essa funcionalidade poderá ser utilizada para desafios e competições.

---

## Desafio Diário

Gerar automaticamente uma partida diária utilizando uma seed conhecida.

Todos os participantes receberão exatamente a mesma sequência naquele dia.

---

## Estatísticas Locais

Registrar estatísticas apenas no dispositivo.

Exemplos:

- partidas realizadas;
- taxa de acerto;
- personalidades mais erradas;
- tempo médio.

Não envolve contas de usuário.

---

# Prioridade 3

## Novas Bases de Conhecimento

Expandir o projeto para outros temas mantendo a mesma mecânica.

Exemplos:

- Eventos Históricos
- Descobertas Científicas
- Batalhas
- Civilizações
- Dinastias
- Locais Históricos

---

## Modos de Jogo

Possíveis modos adicionais.

Exemplos:

- somente nascimento;
- somente morte;
- somente mapa;
- somente anos;
- sobrevivência.

---

## Aprendizado

Explorar novos mecanismos educativos.

Exemplos:

- revisão espaçada;
- listas de estudo;
- histórico pessoal;
- recomendações.

---

# Fora de Escopo

As funcionalidades abaixo não possuem previsão.

- multiplayer;
- rankings online;
- contas de usuário;
- painel administrativo;
- edição da base pela interface;
- microtransações;
- publicidade;
- recursos dependentes de serviços externos.

---

# Critério para Novas Funcionalidades

Toda nova funcionalidade deverá responder positivamente às seguintes perguntas.

- Melhora a experiência principal do jogo?
- Mantém a simplicidade do projeto?
- Preserva a separação entre lógica e conteúdo?
- Não aumenta significativamente a complexidade?
- Pode ser removida sem afetar a mecânica principal?

Caso alguma resposta seja negativa, a funcionalidade deverá ser reavaliada.

---

# Objetivo de Longo Prazo

O GeoHistória deve permanecer um jogo simples, educativo e facilmente expansível.

As futuras versões deverão ampliar o conteúdo disponível e não aumentar desnecessariamente a complexidade da aplicação.