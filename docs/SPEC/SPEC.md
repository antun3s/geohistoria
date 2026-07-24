# SPEC.md

# GeoHistória
**Versão:** 2.0 (Draft)

---

# 1. Visão Geral

GeoHistória é um jogo de conhecimento histórico no qual o participante deve identificar uma personalidade histórica utilizando informações temporais e geográficas sobre sua vida.

Cada rodada apresenta:

- local de nascimento;
- ano de nascimento;
- local de morte;
- ano de morte.

Essas informações são representadas visualmente sobre um mapa-múndi, permitindo que o participante utilize tanto o contexto temporal quanto o contexto geográfico para formular sua resposta.

O objetivo do jogo não é testar apenas conhecimentos de História nem apenas conhecimentos de Geografia, mas incentivar a associação entre ambos.

Ao final da partida, o participante recebe um resumo de seu desempenho e pode utilizar os links disponibilizados para aprofundar seu conhecimento sobre as personalidades que não conseguiu identificar.

---

# 2. Objetivos

O projeto possui quatro objetivos principais.

## 2.1 Experiência simples

A interface deve possuir o menor número possível de elementos, permitindo que o participante concentre sua atenção nas informações apresentadas.

A interação deve ocorrer prioritariamente através da observação do mapa e da digitação livre da resposta.

---

## 2.2 Aprendizado

O jogo deve incentivar o aprendizado histórico.

Cada rodada deve representar uma oportunidade para que o participante descubra novas personalidades e compreenda melhor sua distribuição temporal e geográfica.

O aprendizado deve ocorrer de forma leve e sem interromper o fluxo da partida.

---

## 2.3 Conteúdo expansível

A lógica do jogo deve permanecer independente do conjunto de personalidades utilizado.

Novas coleções poderão ser adicionadas futuramente sem necessidade de alterações na mecânica principal da aplicação.

---

## 2.4 Simplicidade

Todo o projeto deve seguir o princípio KISS (Keep It Simple, Stupid).

Sempre que existirem múltiplas soluções possíveis, deve ser escolhida aquela que apresente menor complexidade, desde que atenda corretamente aos requisitos desta especificação.

---

# 3. Filosofia do Projeto

Esta especificação define o comportamento esperado da aplicação.

Ela não determina tecnologias específicas, bibliotecas, algoritmos ou padrões arquiteturais, exceto quando estritamente necessário.

Sempre que houver liberdade de implementação, ela será explicitamente indicada.

---

# 4. Princípios Gerais

## 4.1 KISS

A implementação deve priorizar simplicidade.

Evite abstrações desnecessárias, arquiteturas complexas ou otimizações prematuras.

---

## 4.2 Comportamento acima da implementação

Esta especificação descreve o comportamento esperado da aplicação.

A implementação possui liberdade para escolher algoritmos, bibliotecas e estruturas internas, desde que o comportamento observado pelo usuário permaneça consistente.

---

## 4.3 Separação entre lógica e conteúdo

A lógica do jogo deve permanecer completamente separada do conteúdo.

Coleções de personalidades, mapas, configurações e demais recursos devem ser tratados como dados independentes da implementação.

---

## 4.4 Assets externos

Recursos gráficos como mapas, ícones e demais elementos visuais fazem parte dos assets do projeto.

A implementação deve utilizá-los conforme disponibilizados.

Não faz parte da responsabilidade da aplicação gerar, redesenhar ou reconstruir esses recursos.

---

## 4.5 Conteúdo é independente

As personalidades históricas fazem parte do conteúdo da aplicação.

O mecanismo do jogo não deve depender da quantidade de registros existentes nem assumir características específicas de uma coleção.

---

## 4.6 Facilidade de contribuição

O projeto deve favorecer futuras contribuições.

Sempre que possível:

- dados devem permanecer separados da lógica;
- arquivos devem possuir responsabilidades bem definidas;
- alterações de conteúdo não devem exigir alterações na implementação.

---

## 4.7 Legibilidade

Código simples e legível deve ser priorizado em relação a soluções excessivamente sofisticadas.

---

## 4.8 Autonomia técnica responsável

Sempre que esta especificação não definir uma implementação específica, cabe ao desenvolvedor ou à LLM escolher a solução mais adequada.

Essa liberdade não autoriza a introdução de funcionalidades fora do escopo do projeto nem aumento desnecessário da complexidade.

---

# 5. Escopo da Primeira Versão

A primeira versão da aplicação deve fornecer uma experiência completa de jogo individual.

Ela deve incluir:

- seleção aleatória de personalidades;
- apresentação cartográfica;
- resposta por digitação livre;
- validação tolerante da resposta;
- sistema de vidas;
- sistema de pulos;
- tela final da partida;
- resumo dos resultados;
- links para aprofundamento na Wikipédia.

Qualquer funcionalidade não descrita nesta especificação deve ser considerada fora do escopo da primeira versão.

# 6. Mecânica do Jogo

## 6.1 Estrutura da partida

Uma partida consiste em uma sequência de rodadas independentes.

Cada rodada apresenta uma única personalidade histórica.

A personalidade deve ser escolhida aleatoriamente entre aquelas que ainda não participaram da partida.

Uma personalidade não pode aparecer mais de uma vez na mesma partida.

---

## 6.2 Informações apresentadas

Cada rodada deve apresentar ao participante:

- ano de nascimento;
- local de nascimento;
- ano de morte;
- local de morte;
- representação cartográfica dessas informações.

Esses elementos constituem todas as pistas disponíveis para identificação da personalidade.

A primeira versão não deve utilizar dicas adicionais.

---

## 6.3 Objetivo da rodada

O participante deve identificar corretamente a personalidade histórica utilizando as informações disponíveis.

A resposta deve ser fornecida exclusivamente por digitação livre.

Não devem existir modos alternativos de resposta, como:

- múltipla escolha;
- listas de sugestões;
- autocomplete;
- reconhecimento por imagem;
- seleção em listas.

A experiência do jogo baseia-se na recuperação espontânea da memória do participante.

---

## 6.4 Fluxo da rodada

Cada rodada segue o fluxo abaixo.

1. Seleção aleatória da personalidade.
2. Exibição das informações históricas e geográficas.
3. Digitação da resposta ou utilização de um pulo.
4. Validação da resposta.
5. Atualização do estado da partida.
6. Início da próxima rodada ou encerramento da partida.

---

# 7. Sistema de Vidas

O participante inicia cada partida com três vidas.

Cada resposta incorreta consome uma vida.

Quando todas as vidas forem perdidas, a partida é encerrada imediatamente.

Respostas corretas não recuperam vidas.

---

# 8. Sistema de Pulos

Cada participante possui três pulos por partida.

O uso de um pulo representa a decisão de não responder aquela personalidade.

Ao utilizar um pulo:

- a rodada é encerrada imediatamente;
- nenhuma vida é perdida;
- a personalidade não é contabilizada como acerto;
- a personalidade não é contabilizada como erro;
- ela não poderá voltar a aparecer durante a mesma partida.

Após o pulo, uma nova personalidade deve ser selecionada.

Quando todos os pulos forem utilizados, essa opção deixa de estar disponível.

---

# 9. Validação das Respostas

A validação deve priorizar o comportamento observado pelo participante, e não um algoritmo específico.

Ela deve tolerar pequenas variações naturais de escrita.

Entre elas:

- diferenças entre maiúsculas e minúsculas;
- acentuação;
- pequenos erros ortográficos;
- diferenças de espaçamento;
- pontuação.

Cada personalidade também poderá possuir aliases previamente definidos.

Uma resposta será considerada correta quando corresponder ao nome principal ou a um alias válido daquela personalidade.

Aliases não devem introduzir ambiguidades entre personalidades existentes na mesma coleção.

A estratégia utilizada para realizar essa validação fica a critério da implementação.

---

# 10. Aprendizado Pós-Partida

Ao término da partida, a aplicação deve apresentar um resumo contendo:

- quantidade de acertos;
- quantidade de erros;
- quantidade de pulos utilizados.

Além disso, deve ser apresentada uma lista contendo todas as personalidades respondidas incorretamente.

Cada item da lista deve possuir um link para seu respectivo artigo na Wikipédia em português.

O objetivo dessa etapa é incentivar o aprendizado após o término do jogo sem interromper o fluxo da partida.

---

# 11. Critérios para Vitória e Derrota

A partida é encerrada quando ocorrer qualquer uma das seguintes condições.

## Vitória

Todas as personalidades previstas para a partida foram respondidas corretamente ou puladas sem que o participante perdesse todas as vidas.

## Derrota

O participante perde todas as vidas disponíveis.

---

# 12. Interface

A interface da primeira versão deve permanecer intencionalmente simples.

Ela deve destacar prioritariamente:

- mapa;
- anos;
- campo de resposta.

Informações secundárias devem possuir menor destaque visual.

A primeira versão deve possuir interface exclusivamente em português brasileiro.

Não fazem parte do escopo inicial:

- temas visuais;
- internacionalização;
- personalização da interface.

# 13. Sistema Cartográfico

## Objetivo

O sistema cartográfico tem como finalidade fornecer contexto geográfico para auxiliar a identificação da personalidade histórica.

O mapa constitui um elemento central da experiência do jogo e deve privilegiar clareza e legibilidade.

---

## 13.1 Asset cartográfico

O mapa utilizado pela aplicação é um asset externo fornecido ao projeto.

Sua geração, edição ou atualização não fazem parte das responsabilidades da implementação.

A aplicação deve apenas carregar esse recurso e utilizá-lo como base para renderização dos elementos dinâmicos.

---

## 13.2 Representação

Cada rodada deve representar visualmente:

- local de nascimento;
- local de morte;
- ligação entre ambos.

A representação deve permitir compreender rapidamente a distribuição geográfica da vida da personalidade.

---

## 13.3 Enquadramento automático

A aplicação deve enquadrar automaticamente todos os elementos geográficos relevantes da rodada dentro da área visível do mapa, aplicando o nível de zoom necessário para manter os marcadores claramente visíveis, confortavelmente separados e facilmente interpretáveis.

O objetivo é preservar a legibilidade da informação geográfica, independentemente da distância entre os locais de nascimento e morte.

A estratégia utilizada para determinar o enquadramento e o nível de zoom fica a critério da implementação.

---

## 13.4 Sobreposição

Quando dois ou mais elementos ocuparem posições muito próximas, a implementação deve adotar uma estratégia visual para preservar sua identificação individual.

A estratégia utilizada fica a critério da implementação.

---

## 13.5 Legibilidade

A informação histórica deve possuir prioridade sobre o mapa.

O mapa atua como elemento de contexto e não deve dificultar a leitura dos marcadores, anos ou demais informações apresentadas.

---

# 14. Coleção de Personalidades

A coleção de personalidades constitui o conteúdo histórico da aplicação.

Ela deve permanecer completamente independente da lógica do jogo.

---

## 14.1 Critérios de inclusão

Cada personalidade deve representar uma pessoa historicamente existente.

Para ser aceita na coleção, uma personalidade deve possuir:

- existência histórica documentada;
- falecimento confirmado;
- local de nascimento conhecido;
- local de morte conhecido;
- ano de nascimento conhecido ou estimado;
- ano de morte conhecido ou estimado.

---

## 14.2 Não são aceitos

Não fazem parte da coleção:

- personagens fictícios;
- entidades mitológicas;
- pessoas vivas;
- personagens lendários;
- personalidades contemporâneas ainda vivas.

Santos e outras figuras religiosas poderão ser incluídos desde que representem pessoas historicamente reconhecidas.

---

## 14.3 Qualidade dos dados

As informações históricas devem ser baseadas em fontes confiáveis.

Em casos de controvérsia histórica, deve ser adotada a interpretação predominante na literatura especializada.

---

## 14.4 Aliases

Cada personalidade poderá possuir uma lista de aliases.

Os aliases representam formas pelas quais aquela personalidade é amplamente conhecida.

Eles existem para tornar a experiência do participante mais natural.

Aliases não devem introduzir ambiguidades dentro da coleção.

---

## 14.5 Conteúdo

A coleção constitui um recurso editorial da aplicação.

Sua expansão deverá priorizar qualidade, consistência e revisão histórica em vez de quantidade de registros.

---

# 15. Invariantes do Sistema

As seguintes regras devem permanecer verdadeiras durante toda a execução da aplicação.

- Uma personalidade nunca pode aparecer duas vezes na mesma partida.

- Um pulo nunca consome uma vida.

- Uma resposta correta nunca consome uma vida.

- Uma resposta incorreta sempre consome exatamente uma vida.

- Um alias nunca pode identificar duas personalidades distintas.

- O conteúdo histórico nunca deve depender da lógica da aplicação.

- A lógica da aplicação nunca deve depender de uma coleção específica.

- Recursos gráficos nunca devem ser modificados automaticamente pela aplicação.

# 16. Requisitos Não Funcionais

Além dos requisitos funcionais descritos anteriormente, a implementação deve observar as seguintes características.

## 16.1 Simplicidade

A implementação deve priorizar soluções simples, legíveis e facilmente mantidas.

Sempre que duas soluções atenderem igualmente aos requisitos, deve ser escolhida a de menor complexidade.

---

## 16.2 Organização

O código deve possuir responsabilidades bem definidas.

Sempre que possível:

- lógica;
- interface;
- assets;
- configurações;
- coleção de personalidades

devem permanecer separados.

---

## 16.3 Desempenho

A experiência deve ser fluida.

O participante não deve perceber atrasos durante:

- carregamento de uma rodada;
- mudança entre rodadas;
- validação das respostas;
- atualização do mapa.

Não são estabelecidas metas numéricas de desempenho para esta versão.

---

## 16.4 Compatibilidade

A aplicação deve funcionar corretamente em navegadores modernos.

Não existe obrigação de compatibilidade com navegadores obsoletos.

---

## 16.5 Responsividade

A aplicação deve adaptar sua interface a diferentes tamanhos de tela.

A experiência deve permanecer confortável tanto em computadores quanto em dispositivos móveis.

---

## 16.6 Acessibilidade

Sempre que possível, devem ser utilizadas boas práticas de acessibilidade.

Isso inclui:

- contraste adequado;
- navegação por teclado;
- textos alternativos quando aplicável;
- estrutura semântica do HTML.

A acessibilidade completa está fora do escopo da primeira versão.

---

# 17. Critérios de Aceitação

A implementação será considerada concluída quando todos os requisitos abaixo forem atendidos.

## Mecânica

- O jogo apresenta uma personalidade por rodada.

- Nenhuma personalidade é repetida durante a mesma partida.

- O participante responde exclusivamente por digitação livre.

- A validação aceita pequenas variações naturais de escrita.

- Aliases válidos são reconhecidos.

- O participante possui três vidas.

- O participante possui três pulos.

- Personalidades puladas não retornam durante a partida.

---

## Sistema Cartográfico

- O mapa é carregado corretamente.

- Os marcadores representam corretamente nascimento e morte.

- O enquadramento automático mantém os elementos claramente visíveis.

- Marcadores próximos permanecem identificáveis.

---

## Conteúdo

- A coleção permanece separada da lógica.

- O mapa permanece separado da lógica.

- Assets não são modificados pela aplicação.

---

## Encerramento

Ao final da partida é apresentado:

- quantidade de acertos;
- quantidade de erros;
- quantidade de pulos;
- lista das personalidades respondidas incorretamente;
- links para os respectivos artigos na Wikipédia em português.

---

# 18. Fora de Escopo

Os seguintes recursos não fazem parte da primeira versão.

- contas de usuário;
- autenticação;
- rankings;
- multiplayer;
- estatísticas permanentes;
- painel administrativo;
- edição da coleção pela própria aplicação;
- animações complexas;
- sistema de conquistas;
- sistema de níveis;
- coleções temáticas;
- internacionalização;
- importação automática de conteúdo histórico.

A implementação não deve adicionar essas funcionalidades por iniciativa própria.

---

# 19. Roadmap

As funcionalidades abaixo poderão ser consideradas em versões futuras.

## Conteúdo

- coleções temáticas;
- expansão da coleção principal;
- novos conjuntos históricos.

---

## Mecânica

- níveis de dificuldade;
- partidas por seed compartilhada;
- desafios diários;
- modos alternativos de jogo.

---

## Aprendizado

- estatísticas locais;
- revisão das personalidades erradas;
- filtros temáticos.

A presença destes itens neste documento não implica sua implementação na primeira versão.

---

# 20. Decisões Arquiteturais

| Decisão | Motivação |
|----------|-----------|
| Digitação livre | Priorizar recuperação espontânea da memória. |
| Assets externos | Separação entre conteúdo e implementação. |
| Zoom automático | Melhorar a legibilidade independentemente da distância entre os pontos. |
| Coleção desacoplada | Facilitar futuras expansões. |
| KISS | Reduzir complexidade e facilitar manutenção. |
| Interface em português brasileiro | Simplificar a primeira versão. |
| Comportamento acima da implementação | Permitir liberdade técnica mantendo consistência da experiência. |

---

# 21. Considerações Finais

Esta especificação define o comportamento esperado da aplicação GeoHistória.

Ela não estabelece uma tecnologia obrigatória nem impõe arquiteturas específicas.

Sempre que não houver um requisito explícito sobre a forma de implementação, cabe ao desenvolvedor escolher a solução técnica mais adequada, desde que respeite:

- os objetivos do projeto;
- os princípios gerais;
- os requisitos funcionais;
- os requisitos não funcionais;
- os critérios de aceitação.

O foco principal do projeto é proporcionar uma experiência simples, educativa e facilmente expansível, preservando a separação entre lógica e conteúdo e evitando complexidade desnecessária.
