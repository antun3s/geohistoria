# IMPLEMENTATION.md

# Objetivo

Este documento orienta exclusivamente a implementação da primeira versão do GeoHistória.

Enquanto `SPEC.md` descreve **o que** o sistema deve fazer, este documento descreve **como a implementação deve ser conduzida**.

Sempre que existir conflito entre este documento e `SPEC.md`, prevalece `SPEC.md`.

---

# Papel da LLM

A implementação deve agir como um desenvolvedor experiente.

Seu objetivo não é apenas produzir código funcional, mas entregar um projeto organizado, simples e facilmente mantido.

Sempre que existir liberdade técnica, devem ser priorizadas soluções pequenas, legíveis e desacopladas.

---

# Princípios

Durante toda a implementação devem ser respeitados os seguintes princípios.

- KISS
- Baixo acoplamento
- Alta coesão
- Código legível
- Componentes reutilizáveis
- Separação entre lógica e conteúdo
- Evitar otimizações prematuras

---

# Autonomia

A implementação possui liberdade para decidir:

- bibliotecas;
- organização interna;
- algoritmos;
- componentes;
- estrutura de código.

Desde que:

- respeite toda a especificação;
- não aumente desnecessariamente a complexidade;
- preserve o comportamento esperado.

---

# Tecnologias

Nenhuma tecnologia é obrigatória.

Caso seja necessário escolher um framework, biblioteca ou ferramenta, deve ser escolhida uma solução:

- madura;
- amplamente utilizada;
- bem documentada;
- compatível com manutenção de longo prazo.

Evitar dependências experimentais.

---

# Estrutura do Projeto

A estrutura de diretórios deve permanecer simples.

Arquivos com responsabilidades diferentes devem permanecer separados.

Exemplo de responsabilidades:

- interface
- lógica
- componentes
- assets
- coleção histórica
- configurações
- utilidades

A estrutura exata fica a critério da implementação.

---

# Implementação Incremental

A aplicação deve ser construída em pequenas etapas.

Cada etapa deve permanecer funcional antes do início da próxima.

Evitar desenvolver múltiplos sistemas simultaneamente.

---

# Ordem Recomendada

A seguinte ordem é recomendada.

1. Estrutura inicial do projeto.
2. Renderização da interface.
3. Carregamento do mapa.
4. Renderização dos marcadores.
5. Sistema de zoom automático.
6. Carregamento da Base de Conhecimento.
7. Seleção aleatória.
8. Campo de resposta.
9. Validação.
10. Sistema de vidas.
11. Sistema de pulos.
12. Tela final.
13. Revisão e refatoração.

Caso exista motivo técnico relevante, outra ordem poderá ser utilizada.

---

# Qualidade do Código

Priorizar:

- funções pequenas;
- nomes claros;
- baixo acoplamento;
- poucas responsabilidades por componente.

Evitar:

- funções gigantes;
- duplicação;
- código morto;
- comentários desnecessários.

O código deve ser suficientemente claro para que os próprios nomes expliquem seu funcionamento.

---

# Tratamento de Erros

Falhas previsíveis devem ser tratadas.

Exemplos:

- asset inexistente;
- coleção vazia;
- coordenadas inválidas;
- personalidade incompleta;
- erro de carregamento.

Sempre que possível, apresentar mensagens úteis durante o desenvolvimento.

---

# Desenvolvimento

Durante a implementação recomenda-se utilizar:

- logs;
- validações;
- verificações automáticas.

Esses recursos podem ser removidos ou reduzidos na versão final.

---

# Testabilidade

A implementação deve favorecer testes.

Sempre que possível:

- lógica independente da interface;
- funções puras;
- componentes desacoplados.

---

# Critérios Antes de Criar Código

Antes de implementar qualquer funcionalidade, verificar:

- o requisito existe em SPEC.md?
- já existe solução semelhante?
- isso aumenta a complexidade?
- isso pode ser reutilizado?

Caso alguma resposta seja negativa, reconsiderar a implementação.

---

# Critérios Antes de Adicionar Dependências

Antes de instalar qualquer biblioteca verificar:

- resolve um problema real?
- reduz significativamente o código?
- possui boa manutenção?
- realmente é necessária?

Preferir implementar soluções pequenas quando isso resultar em menor complexidade.

---

# Refatoração

Após cada grande funcionalidade recomenda-se revisar:

- duplicações;
- nomes;
- responsabilidades;
- organização.

Refatorações pequenas e frequentes são preferíveis a grandes reescritas.

---

# Critérios de Conclusão

A implementação somente poderá ser considerada concluída quando:

- todos os critérios de aceitação definidos em SPEC.md forem atendidos;
- não existirem funcionalidades fora do escopo;
- o código permanecer organizado;
- a aplicação puder ser executada integralmente.

---

# Restrições

A implementação não deve adicionar espontaneamente:

- novas mecânicas;
- modos de jogo;
- animações complexas;
- efeitos visuais desnecessários;
- sistemas online;
- funcionalidades previstas apenas no ROADMAP.

Sempre que surgir uma ideia interessante, ela deve ser considerada para versões futuras, e não incorporada automaticamente.

---

# Objetivo Final

Ao concluir a implementação, o resultado esperado é um projeto:

- simples;
- organizado;
- educativo;
- facilmente expansível;
- consistente com toda a documentação;
- preparado para evolução futura sem necessidade de reestruturação significativa.