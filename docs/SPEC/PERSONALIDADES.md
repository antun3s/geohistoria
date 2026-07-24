# PERSONALIDADES.md

# Base de Conhecimento Histórica

## Objetivo

A Base de Conhecimento Histórica contém todas as informações utilizadas pelo jogo.

Ela representa exclusivamente o conteúdo da aplicação e deve permanecer completamente desacoplada da lógica do jogo.

Sua expansão não deve exigir alterações na implementação.

---

# Estrutura Geral

Cada personalidade deve possuir um identificador permanente e único.

Os demais campos representam informações históricas e editoriais.

A implementação é livre para escolher o formato físico de armazenamento (JSON, YAML, banco de dados, etc.), desde que preserve esta estrutura lógica.

---

# Informações Obrigatórias

Cada personalidade deve possuir, no mínimo:

- identificador único;
- nome principal;
- lista de aliases;
- ano de nascimento;
- cidade de nascimento;
- país de nascimento;
- latitude do nascimento;
- longitude do nascimento;
- ano de morte;
- cidade de morte;
- país de morte;
- latitude da morte;
- longitude da morte;
- curiosidade histórica;
- link para o artigo correspondente na Wikipédia em português.

---

# Identificador

Cada personalidade deve possuir um identificador permanente.

Esse identificador nunca deve depender:

- do nome;
- da posição na coleção;
- da ordem dos registros.

Seu único objetivo é identificar inequivocamente uma personalidade dentro da coleção.

---

# Nome Principal

O nome principal representa a forma preferencial utilizada pela aplicação.

Ele deve corresponder ao nome pelo qual a personalidade é mais amplamente conhecida.

---

# Aliases

Cada personalidade poderá possuir uma lista de aliases.

Os aliases representam formas naturais pelas quais um participante pode identificar corretamente aquela personalidade.

Exemplos:

- sobrenomes;
- nomes artísticos;
- pseudônimos;
- nomes popularmente utilizados.

Os aliases não existem para listar todas as variações possíveis de escrita.

Seu objetivo é tornar a experiência do participante mais natural.

---

# Ambiguidade

Nenhum alias pode identificar mais de uma personalidade dentro da mesma coleção.

Quando houver ambiguidade, deve ser adotado o nome mais específico.

---

# Curiosidade

Cada personalidade deve possuir uma breve curiosidade histórica.

Ela deve:

- ser objetiva;
- possuir caráter educativo;
- despertar interesse para leitura posterior.

Não deve assumir formato de biografia.

---

# Critérios de Inclusão

Uma personalidade somente poderá ser adicionada quando atender simultaneamente aos seguintes requisitos:

- existência histórica documentada;
- falecimento confirmado;
- local de nascimento conhecido;
- local de morte conhecido;
- datas historicamente conhecidas ou estimadas;
- relevância histórica reconhecida.

---

# Não São Aceitos

Não fazem parte desta coleção:

- personagens fictícios;
- entidades mitológicas;
- personagens lendários;
- pessoas vivas;
- personalidades contemporâneas ainda vivas.

Santos poderão ser aceitos desde que representem pessoas historicamente reconhecidas.

---

# Qualidade dos Dados

As informações devem ser baseadas em fontes historicamente confiáveis.

Quando existirem divergências entre fontes, deve ser adotada a interpretação predominante na literatura especializada.

---

# Coordenadas

Todas as coordenadas devem utilizar:

- latitude;
- longitude;

em WGS84.

As coordenadas representam o ponto aproximado da cidade histórica considerada.

Não é necessário representar edifícios ou locais exatos.

---

# Cidades

Sempre que possível devem ser armazenados:

- cidade;
- país;
- latitude;
- longitude.

Mesmo que o jogo utilize apenas as coordenadas, cidade e país tornam a coleção mais legível para futuras contribuições.

---

# Curadoria

A expansão da Base de Conhecimento deve priorizar qualidade em vez de quantidade.

Antes da inclusão de uma personalidade recomenda-se verificar:

- consistência das datas;
- consistência das coordenadas;
- qualidade da curiosidade;
- qualidade dos aliases;
- existência de ambiguidades.

---

# Evolução

A arquitetura deve permitir que, futuramente, outras bases de conhecimento possam ser utilizadas.

Exemplos:

- cientistas;
- artistas;
- exploradores;
- filósofos;
- imperadores;
- inventores.

A lógica do jogo não deve depender de nenhuma coleção específica.

---

# Critérios de Aceitação

A Base de Conhecimento será considerada consistente quando:

- todas as personalidades possuírem identificador único;
- nenhum alias gerar ambiguidade;
- todas as coordenadas forem válidas;
- todas as personalidades possuírem curiosidade;
- todas possuírem artigo correspondente na Wikipédia em português;
- todos os registros atenderem aos critérios editoriais definidos neste documento.