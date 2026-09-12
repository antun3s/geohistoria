# GeoHistória

Jogo educativo de geografia e história: use pistas de tempo e lugar em um mapa para descobrir quem é a personalidade histórica.

**Jogue agora: https://geohistoria.antunes.pro/**

## Como jogar

- Você tem **3 vidas** e **3 pulos** por partida.
- Cada rodada mostra o local e o ano de nascimento e morte da personalidade em um mapa.
- Digite o nome livremente (acentos, maiúsculas e pequenos erros de digitação são ignorados).
- Errar custa uma vida; usar um pulo revela a resposta sem consumir vida.
- Quando os pulos acabam, o botão vira **"Não sei"** (desistência, com confirmação em dois toques).

## Rodando localmente

O projeto é 100% estático. Por causa do carregamento do JSON via `fetch`, use um servidor local:

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000/.

## Sugerir uma personalidade

Aceitamos sugestões de novas personalidades! Basta editar o arquivo [`data/personalities.json`](data/personalities.json) e abrir um Pull Request (ou uma Issue descrevendo a sugestão).

Cada item segue este formato:

```json
{
    "id": "chave-unica",
    "name": "Nome Completo",
    "aliases": ["Apelido"],
    "birth": {
        "year": 1452,
        "city": "Cidade",
        "country": "País",
        "latitude": 43.7833,
        "longitude": 10.9333
    },
    "death": {
        "year": 1519,
        "city": "Cidade",
        "country": "País",
        "latitude": 47.4133,
        "longitude": 0.9844
    },
    "curiosity": "Frase curta sobre a personalidade.",
    "wikipediaUrl": "https://pt.wikipedia.org/wiki/Nome_Completo"
}
```

Anos antes de Cristo devem ser negativos (ex.: `-69`).

## Testes

```bash
npm test
```

## Licença

Software livre sob a **GPL-3.0** (veja [`LICENSE`](LICENSE)). Os dados são baseados em informações da Wikipédia.