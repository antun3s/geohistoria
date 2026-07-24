# CODE_STYLE.md

# Objetivo

Este documento define o padrão de código esperado durante toda a implementação do GeoHistória.

Seu objetivo é manter consistência entre arquivos, facilitar manutenção e evitar crescimento desnecessário da complexidade.

Este documento complementa `IMPLEMENTATION.md`.

---

# Filosofia

Todo código produzido deve priorizar:

- simplicidade;
- clareza;
- previsibilidade;
- facilidade de manutenção.

O código deve ser escrito para ser facilmente compreendido por outra pessoa meses depois.

---

# Princípios

Sempre priorizar:

- funções pequenas;
- responsabilidades únicas;
- nomes descritivos;
- baixo acoplamento;
- alta coesão.

Evitar soluções "inteligentes" quando uma solução simples produzir o mesmo resultado.

---

# Nomeação

Os nomes devem explicar sua finalidade.

Evitar abreviações desnecessárias.

Preferir:

- `birthMarker`

em vez de

- `bm`

---

# Funções

Cada função deve possuir apenas uma responsabilidade.

Sempre que uma função começar a resolver múltiplos problemas independentes, considerar sua divisão.

Como regra geral:

- pequenas;
- legíveis;
- facilmente testáveis.

---

# Componentes

Cada componente deve representar um conceito claro da interface.

Evitar componentes extremamente grandes.

Sempre que possível, dividir componentes por responsabilidade.

---

# Comentários

Comentários devem explicar:

- decisões;
- restrições;
- comportamentos incomuns.

Comentários não devem explicar código óbvio.

Evitar:

```text
incrementa contador
contador++
```

Preferir código autoexplicativo.

---

# Constantes

Valores fixos devem ser centralizados.

Evitar números mágicos espalhados pela implementação.

---

# Duplicação

Sempre que existir duplicação significativa, considerar extração.

Não criar abstrações prematuras para eliminar pequenas repetições.

---

# Tratamento de Erros

Erros devem ser tratados próximo de sua origem.

Mensagens devem ser claras durante o desenvolvimento.

Falhas silenciosas devem ser evitadas.

---

# Estado

Manter o menor estado possível.

Sempre que um valor puder ser calculado, preferir cálculo em vez de armazenamento.

---

# Dependências

Cada nova dependência deve possuir uma justificativa clara.

Evitar instalar bibliotecas para resolver problemas pequenos.

---

# Organização

Agrupar arquivos por responsabilidade.

Evitar diretórios excessivamente profundos.

A estrutura deve permanecer intuitiva.

---

# Refatoração

Refatorar continuamente.

Não acumular dívida técnica desnecessária.

Pequenas melhorias frequentes são preferíveis a grandes reescritas.

---

# Testabilidade

Sempre que possível:

- lógica separada da interface;
- funções determinísticas;
- poucas dependências implícitas.

---

# Performance

Não realizar otimizações prematuras.

Primeiro produzir uma implementação correta.

Somente otimizar quando existir benefício comprovado.

---

# Legibilidade

O código deve poder ser compreendido sem necessidade de documentação adicional.

Nomes claros são preferíveis a comentários extensos.

---

# Complexidade

Sempre perguntar:

- isso realmente precisa existir?
- pode ser simplificado?
- existe uma solução menor?

Caso exista uma alternativa significativamente mais simples, ela deve ser priorizada.

---

# Critério Final

Ao finalizar qualquer implementação, considere que outro desenvolvedor assumirá este projeto amanhã.

O código deve permitir que essa pessoa compreenda rapidamente:

- sua estrutura;
- responsabilidades;
- fluxo de execução;
- pontos de extensão.

Caso isso não seja possível, a implementação deve ser simplificada antes de ser considerada concluída.