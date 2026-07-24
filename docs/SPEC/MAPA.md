# MAPA.md

# Sistema Cartográfico

## Objetivo

O Sistema Cartográfico é responsável por representar visualmente as informações geográficas de cada personalidade histórica.

Seu propósito não é fornecer navegação geográfica detalhada, mas oferecer contexto espacial suficiente para auxiliar a identificação da personalidade.

A informação histórica possui prioridade sobre a representação cartográfica.

---

# Princípios

O Sistema Cartográfico deve seguir os seguintes princípios.

- simplicidade;
- legibilidade;
- consistência;
- independência da lógica do jogo;
- independência da coleção de personalidades.

---

# Asset Cartográfico

O mapa utilizado pela aplicação é um asset externo pertencente ao projeto.

A implementação não deve gerar, modificar, reconstruir ou simplificar esse recurso.

Sua responsabilidade limita-se a:

- carregar o asset;
- renderizá-lo;
- posicionar corretamente os elementos dinâmicos.

---

# Sistema de Coordenadas

Todas as coordenadas históricas devem utilizar:

- latitude;
- longitude;

no sistema geográfico WGS84.

A implementação é responsável por convertê-las corretamente para o sistema de coordenadas utilizado pelo mapa.

A estratégia utilizada para essa conversão fica a critério da implementação.

---

# Contrato Cartográfico

Independentemente da tecnologia utilizada, a implementação deve garantir que:

- todas as coordenadas sejam posicionadas corretamente;
- o mapa mantenha sua projeção original;
- nenhum marcador seja renderizado em posição incompatível com sua localização geográfica.

---

# Representação

Cada rodada deve representar:

- nascimento;
- morte;
- ligação entre ambos.

A forma visual utilizada para representar esses elementos fica a critério da implementação.

---

# Marcadores

Os marcadores devem permanecer claramente identificáveis.

Quando dois ou mais marcadores estiverem muito próximos, a implementação deve utilizar alguma estratégia visual para evitar sobreposição.

A estratégia utilizada fica a critério da implementação.

---

# Enquadramento Automático

A aplicação deve enquadrar automaticamente todos os elementos geográficos relevantes da rodada dentro da área visível do mapa, aplicando o nível de zoom necessário para manter os marcadores claramente visíveis, confortavelmente separados e facilmente interpretáveis.

O objetivo é preservar a legibilidade da informação geográfica, independentemente da distância entre nascimento e morte.

---

# Legibilidade

A leitura das informações históricas possui prioridade sobre a exibição do mapa.

Caso exista conflito entre estética e legibilidade, deve ser priorizada a legibilidade.

---

# Modo de Depuração

Durante o desenvolvimento, recomenda-se a existência de um modo de depuração cartográfica.

Quando habilitado, ele pode exibir informações úteis para validação da implementação, como:

- latitude;
- longitude;
- coordenadas projetadas;
- área enquadrada;
- limites do mapa;
- demais informações consideradas relevantes.

Esse modo não deve estar disponível ao usuário final.

---

# Critérios de Aceitação

A implementação será considerada correta quando:

- todas as coordenadas forem posicionadas corretamente;
- nascimento e morte forem facilmente distinguíveis;
- o enquadramento automático preservar a legibilidade;
- marcadores próximos permanecerem identificáveis;
- o asset cartográfico não for alterado pela aplicação.