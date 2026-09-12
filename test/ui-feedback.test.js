import { test } from "node:test";
import assert from "node:assert/strict";
import { installFakeDocument, sleep } from "./helpers.js";

installFakeDocument();
const { showFeedback, setHud, init, renderEndScreen } = await import("../js/ui.js");

function countFilled(cells) {
    return cells.filter((cell) => cell.classList.contains("gauge__cell--filled")).length;
}

function setupHandlers() {
    const calls = { skip: 0, surrender: 0, answer: 0 };
    init({
        onStart: () => {},
        onAnswerSubmit: () => calls.answer++,
        onSkip: () => calls.skip++,
        onSurrender: () => calls.surrender++
    });
    return calls;
}

test("feedback antigo não apaga o feedback novo antes do tempo", async () => {
    const feedback = document.getElementById("feedback");

    showFeedback("primeira mensagem", "success");
    assert.equal(feedback.textContent, "primeira mensagem");

    await sleep(1000);
    showFeedback("segunda mensagem", "error");

    await sleep(1100);
    assert.equal(
        feedback.textContent,
        "segunda mensagem",
        "o timer do primeiro feedback não deveria ter apagado o segundo feedback"
    );

    await sleep(1000);
    assert.equal(feedback.textContent, "", "o feedback novo deveria sumir no seu próprio tempo");
});

test("HUD exibe vidas e pulos como gauges com rótulo acessível", () => {
    setHud({ lives: 2, skips: 1, correctCount: 0 });

    const livesCells = document.getElementById("lives-display").children;
    assert.equal(livesCells.length, 3);
    assert.equal(countFilled(livesCells), 2);
    assert.equal(document.getElementById("lives-display").getAttribute("aria-label"), "Vidas: 2");

    const skipsCells = document.getElementById("skips-display").children;
    assert.equal(skipsCells.length, 3);
    assert.equal(countFilled(skipsCells), 1);
    assert.equal(document.getElementById("skips-display").getAttribute("aria-label"), "Pulos: 1");
});

test("botão morfa de Pular para Não sei quando os pulos acabam", () => {
    const button = document.getElementById("skip-button");

    setHud({ lives: 3, skips: 1, correctCount: 0 });
    assert.equal(button.textContent, "Pular");
    assert.equal(button.classList.contains("button--secondary"), true);
    assert.equal(button.classList.contains("button--danger"), false);

    setHud({ lives: 3, skips: 0, correctCount: 0 });
    assert.equal(button.textContent, "Não sei");
    assert.equal(button.classList.contains("button--danger"), true);
    assert.equal(button.classList.contains("button--secondary"), false);
    assert.equal(button.disabled, false, "botão não deveria ficar desabilitado no modo Não sei");
});

test("com pulos restantes, clique único chama pular", () => {
    const calls = setupHandlers();
    setHud({ lives: 3, skips: 2, correctCount: 0 });

    document.getElementById("skip-button").listeners.click();

    assert.equal(calls.skip, 1);
    assert.equal(calls.surrender, 0);
    assert.equal(document.getElementById("skip-button").textContent, "Pular");
});

test("desistência exige dois toques", () => {
    const calls = setupHandlers();
    setHud({ lives: 3, skips: 0, correctCount: 0 });
    const button = document.getElementById("skip-button");

    button.listeners.click();

    assert.equal(calls.surrender, 0, "toque único não deveria desistir");
    assert.equal(button.textContent, "Confirmar desistência?");
    assert.equal(button.classList.contains("button--armed"), true);

    button.listeners.click();

    assert.equal(calls.surrender, 1);
    assert.equal(calls.skip, 0);
});

test("armação da desistência expira após o tempo", async () => {
    const calls = setupHandlers();
    setHud({ lives: 3, skips: 0, correctCount: 0 });
    const button = document.getElementById("skip-button");

    button.listeners.click();
    assert.equal(button.textContent, "Confirmar desistência?");

    await sleep(3100);

    assert.equal(button.textContent, "Não sei", "armação deveria expirar");
    assert.equal(button.classList.contains("button--armed"), false);

    button.listeners.click();

    assert.equal(calls.surrender, 0, "clique após expirar deveria armar novamente, não desistir");
    assert.equal(button.textContent, "Confirmar desistência?");

    document.getElementById("answer-input").value = "qualquer resposta";
    document.getElementById("answer-form").listeners.submit({ preventDefault() {} });

    assert.equal(button.classList.contains("button--armed"), false, "teste deve terminar desarmado");
}, 10000);

test("submeter resposta desarma a desistência", () => {
    const calls = setupHandlers();
    setHud({ lives: 3, skips: 0, correctCount: 0 });
    const button = document.getElementById("skip-button");

    button.listeners.click();
    assert.equal(button.textContent, "Confirmar desistência?");

    document.getElementById("answer-input").value = "um palpite";
    document.getElementById("answer-form").listeners.submit({ preventDefault() {} });

    assert.equal(button.textContent, "Não sei", "resposta submetida deveria desarmar a confirmação");
    assert.equal(button.classList.contains("button--armed"), false);
    assert.equal(calls.answer, 1);

    button.listeners.click();

    assert.equal(calls.surrender, 0, "clique após resposta deveria armar novamente, não desistir");
});

test("título final deriva de endReason, não de vidas restantes", () => {
    renderEndScreen(
        {
            lives: 2,
            correctCount: 1,
            wrongCount: 0,
            skipsUsed: 3,
            surrenderCount: 1,
            endReason: "surrender",
            reviewPersonalities: []
        },
        1
    );

    assert.equal(document.getElementById("end-title").textContent, "Fim de Jogo", "desistência com vidas sobrando não é vitória");
    assert.equal(String(document.getElementById("end-surrender").textContent), "1");

    renderEndScreen(
        {
            lives: 3,
            correctCount: 5,
            wrongCount: 0,
            skipsUsed: 0,
            surrenderCount: 0,
            endReason: "collection-exhausted",
            reviewPersonalities: []
        },
        5
    );

    assert.equal(document.getElementById("end-title").textContent, "Vitória!");

    renderEndScreen(
        {
            lives: 0,
            correctCount: 1,
            wrongCount: 3,
            skipsUsed: 0,
            surrenderCount: 0,
            endReason: "no-lives",
            reviewPersonalities: []
        },
        1
    );

    assert.equal(document.getElementById("end-title").textContent, "Fim de Jogo");
});
