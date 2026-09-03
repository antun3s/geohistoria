const { test } = require("node:test");
const assert = require("node:assert");
const { loadScript, installFakeDocument, installLeafletStub, sleep } = require("./helpers");

installFakeDocument();
installLeafletStub();

const collection = [
    {
        id: "figura-1",
        name: "Primeira Figura Histórica",
        aliases: [],
        birth: { year: 1000, city: "Cidade A", country: "País A", latitude: 10, longitude: 10 },
        death: { year: 1050, city: "Cidade B", country: "País B", latitude: 20, longitude: 20 },
        wikipediaUrl: "https://pt.wikipedia.org/wiki/Primeira"
    },
    {
        id: "figura-2",
        name: "Segunda Figura Histórica",
        aliases: [],
        birth: { year: 1200, city: "Cidade C", country: "País C", latitude: 30, longitude: 30 },
        death: { year: 1250, city: "Cidade D", country: "País D", latitude: 40, longitude: 40 },
        wikipediaUrl: "https://pt.wikipedia.org/wiki/Segunda"
    },
    {
        id: "figura-3",
        name: "Terceira Figura Histórica",
        aliases: [],
        birth: { year: 1400, city: "Cidade E", country: "País E", latitude: 50, longitude: 50 },
        death: { year: 1450, city: "Cidade F", country: "País F", latitude: 60, longitude: 60 },
        wikipediaUrl: "https://pt.wikipedia.org/wiki/Terceira"
    },
    {
        id: "figura-4",
        name: "Quarta Figura Histórica",
        aliases: [],
        birth: { year: 1600, city: "Cidade G", country: "País G", latitude: 70, longitude: 70 },
        death: { year: 1650, city: "Cidade H", country: "País H", latitude: 80, longitude: 80 },
        wikipediaUrl: "https://pt.wikipedia.org/wiki/Quarta"
    },
    {
        id: "figura-5",
        name: "Quinta Figura Histórica",
        aliases: [],
        birth: { year: 1800, city: "Cidade I", country: "País I", latitude: -10, longitude: -10 },
        death: { year: 1850, city: "Cidade J", country: "País J", latitude: -20, longitude: -20 },
        wikipediaUrl: "https://pt.wikipedia.org/wiki/Quinta"
    }
];

globalThis.fetch = async () => ({
    ok: true,
    json: async () => collection
});

globalThis.Validator = loadScript("js/validator.js");
globalThis.Game = loadScript("js/game.js");
globalThis.GameMap = loadScript("js/map.js");
globalThis.UI = loadScript("js/ui.js");
loadScript("js/app.js", null);

function clickStart() {
    document.getElementById("start-button").listeners.click();
}

function submitAnswer(answer) {
    document.getElementById("answer-input").value = answer;
    document.getElementById("answer-form").listeners.submit({ preventDefault() {} });
}

function screenIsActive(id) {
    return document.getElementById(id).classList.contains("screen--active");
}

test("aplicação carrega e mostra a tela inicial", async () => {
    await sleep(50);
    assert.strictEqual(screenIsActive("start-screen"), true);
});

test("último erro mostra quem era e adia a tela final", async () => {
    clickStart();

    submitAnswer("resposta errada número um");
    submitAnswer("resposta errada número dois");

    const lastPersonality = Game.getState().currentPersonality;
    submitAnswer("resposta errada número três");

    const feedback = document.getElementById("feedback");
    assert.strictEqual(
        feedback.textContent,
        `Errado. Era ${lastPersonality.name}.`,
        "o feedback deve revelar a personalidade no erro final"
    );
    assert.strictEqual(Game.getState().gameOver, true);
    assert.strictEqual(screenIsActive("game-screen"), true, "tela final não deveria aparecer imediatamente");

    await sleep(1400);

    assert.strictEqual(screenIsActive("end-screen"), true, "tela final deveria aparecer após o atraso");
    assert.strictEqual(String(document.getElementById("end-wrong").textContent), "3");
    assert.strictEqual(document.getElementById("end-title").textContent, "Fim de Jogo");
    assert.strictEqual(
        document.getElementById("wrong-answers-list").children.length,
        3,
        "a lista de revisão deve incluir o último erro"
    );
}, 10000);
