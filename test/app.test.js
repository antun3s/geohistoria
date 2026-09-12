import { test } from "node:test";
import assert from "node:assert/strict";
import { installFakeDocument, installLeafletStub, installFakeStorage, sleep } from "./helpers.js";
import * as Game from "../js/game.js";

installFakeDocument();
installLeafletStub();
const storage = installFakeStorage();

const collection = [1, 2, 3, 4, 5].map((index) => ({
    id: `figura-${index}`,
    name: `${index}ª Figura Histórica da História`,
    aliases: [],
    birth: { year: 1000 + index, city: "Cidade", country: "País", latitude: index, longitude: index },
    death: { year: 1050 + index, city: "Cidade", country: "País", latitude: -index, longitude: -index },
    curiosity: `Curiosidade da figura ${index}`,
    wikipediaUrl: `https://pt.wikipedia.org/wiki/Figura_${index}`
}));

globalThis.fetch = async () => ({
    ok: true,
    json: async () => collection
});

await import("../js/app.js");

function clickStart() {
    document.getElementById("start-button").listeners.click();
}

function submitAnswer(answer) {
    document.getElementById("answer-input").value = answer;
    document.getElementById("answer-form").listeners.submit({ preventDefault() {} });
}

function skipCurrent() {
    document.getElementById("skip-button").listeners.click();
}

function screenIsActive(id) {
    return document.getElementById(id).classList.contains("screen--active");
}

test("aplicação carrega e mostra a tela inicial", async () => {
    await sleep(50);
    assert.equal(screenIsActive("start-screen"), true);
});

test("partida completa: acerto, erros, revelação, recorde e curiosidades", async () => {
    clickStart();

    assert.equal(screenIsActive("game-screen"), true);
    assert.ok(document.getElementById("answer-input").focusCount > 0, "input deveria receber foco ao entrar no jogo");

    submitAnswer(Game.getState().currentPersonality.name);
    assert.equal(document.getElementById("feedback").textContent, "Correto!");

    submitAnswer("resposta errada número um");
    submitAnswer("resposta errada número dois");

    const lastPersonality = Game.getState().currentPersonality;
    submitAnswer("resposta errada número três");

    const feedback = document.getElementById("feedback");
    assert.equal(feedback.textContent, `Errado. Era ${lastPersonality.name}.`);
    assert.equal(screenIsActive("game-screen"), true, "tela final não deveria aparecer imediatamente");

    await sleep(1400);

    assert.equal(screenIsActive("end-screen"), true, "tela final deveria aparecer após o atraso");
    assert.equal(String(document.getElementById("end-wrong").textContent), "3");
    assert.equal(String(document.getElementById("end-correct").textContent), "1");
    assert.equal(String(document.getElementById("end-best").textContent), "1", "recorde deveria ser 1");
    assert.equal(storage.get("geohistoria:best-score"), "1");

    const items = document.getElementById("wrong-answers-list").children;
    assert.equal(items.length, 3);
    items.forEach((item, index) => {
        const [header, curiosity] = item.children;
        const state = Game.getState();
        assert.equal(header.children[0].textContent, state.reviewPersonalities[index].name);
        assert.equal(header.children[1].href, state.reviewPersonalities[index].wikipediaUrl);
        assert.equal(curiosity.textContent, state.reviewPersonalities[index].curiosity);
    });
}, 10000);

test("pulo revela quem era a personalidade pulada", async () => {
    document.getElementById("restart-button").listeners.click();

    const skippedName = Game.getState().currentPersonality.name;
    skipCurrent();

    assert.equal(document.getElementById("feedback").textContent, `Pulado! Era ${skippedName}.`);
    assert.equal(document.getElementById("skips-display").getAttribute("aria-label"), "Pulos: 2");
    assert.equal(Game.getState().reviewPersonalities.length, 1);
});

test("desistência com dois toques encerra sem vitória e revela quem era", async () => {
    document.getElementById("restart-button").listeners.click();

    skipCurrent();
    skipCurrent();
    skipCurrent();

    const surrenderedName = Game.getState().currentPersonality.name;
    const button = document.getElementById("skip-button");

    assert.equal(button.textContent, "Não sei");

    button.listeners.click();

    assert.equal(button.textContent, "Confirmar desistência?");
    assert.equal(screenIsActive("game-screen"), true, "toque único não deveria encerrar a partida");
    assert.equal(Game.getState().gameOver, false);

    button.listeners.click();

    assert.equal(document.getElementById("feedback").textContent, `Era ${surrenderedName}.`);
    assert.equal(screenIsActive("game-screen"), true, "tela final não deveria aparecer imediatamente");

    await sleep(1400);

    assert.equal(screenIsActive("end-screen"), true, "tela final deveria aparecer após o atraso");
    assert.equal(document.getElementById("end-title").textContent, "Fim de Jogo", "desistência com vidas sobrando não pode ser vitória");
    assert.equal(String(document.getElementById("end-surrender").textContent), "1");
    assert.equal(String(document.getElementById("end-wrong").textContent), "0");
    assert.equal(String(document.getElementById("end-skips").textContent), "3");
    assert.equal(String(document.getElementById("end-best").textContent), "1", "recorde anterior (1) deveria ser mantido");
    assert.equal(Game.getState().lives, 3, "desistência não deveria consumir vida");
}, 10000);
