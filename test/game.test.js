const { test } = require("node:test");
const assert = require("node:assert");
const { loadScript } = require("./helpers");

globalThis.Validator = loadScript("js/validator.js");
const Game = loadScript("js/game.js");

function createCollection(size) {
    const personalities = [];
    for (let index = 0; index < size; index++) {
        personalities.push({
            id: `person-${index}`,
            name: `Personalidade ${index} Nome Longo`,
            aliases: [],
            birth: { year: 1500, city: "Cidade", country: "País", latitude: 0, longitude: 0 },
            death: { year: 1550, city: "Cidade", country: "País", latitude: 1, longitude: 1 },
            wikipediaUrl: "https://pt.wikipedia.org/wiki/X"
        });
    }
    return personalities;
}

function answerWrong() {
    return Game.submitAnswer("resposta totalmente errada e longa");
}

test("rejeita coleção inválida", () => {
    assert.throws(() => Game.loadCollection([]));
    assert.throws(() => Game.loadCollection("não é array"));
});

test("start reseta o estado da partida", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    const state = Game.getState();
    assert.strictEqual(state.lives, 3);
    assert.strictEqual(state.skips, 3);
    assert.strictEqual(state.correctCount, 0);
    assert.strictEqual(state.wrongCount, 0);
    assert.strictEqual(state.gameOver, false);
    assert.ok(state.currentPersonality);
});

test("resposta correta avança de personalidade", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    const result = Game.submitAnswer(Game.getState().currentPersonality.name);

    assert.strictEqual(result.result, "correct");
    assert.strictEqual(Game.getState().correctCount, 1);
    assert.notStrictEqual(Game.getState().currentPersonality.id, result.personality.id);
});

test("acertar todas as personalidades encerra com vitória", () => {
    Game.loadCollection(createCollection(2));
    Game.start();

    const first = Game.submitAnswer(Game.getState().currentPersonality.name);
    assert.strictEqual(first.result, "correct");

    const second = Game.submitAnswer(Game.getState().currentPersonality.name);
    assert.strictEqual(second.result, "correct");

    const state = Game.getState();
    assert.strictEqual(state.gameOver, true);
    assert.strictEqual(state.lives, 3);
    assert.strictEqual(state.correctCount, 2);
});

test("três erros encerram o jogo e revelam quem era a última personalidade", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    assert.strictEqual(answerWrong().result, "wrong");
    assert.strictEqual(answerWrong().result, "wrong");

    const personalityBeforeLastAnswer = Game.getState().currentPersonality;
    const lastResult = answerWrong();

    assert.strictEqual(lastResult.result, "game-over");
    assert.strictEqual(lastResult.personality.id, personalityBeforeLastAnswer.id);

    const state = Game.getState();
    assert.strictEqual(state.gameOver, true);
    assert.strictEqual(state.lives, 0);
    assert.strictEqual(state.wrongCount, 3);
    assert.strictEqual(state.wrongPersonalities.length, 3);
    assert.ok(state.wrongPersonalities.some((p) => p.id === lastResult.personality.id));
    assert.strictEqual(Game.getState().currentPersonality.id, lastResult.personality.id);
});

test("não aceita resposta após o fim do jogo", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    answerWrong();
    answerWrong();
    answerWrong();

    assert.strictEqual(Game.submitAnswer("qualquer coisa"), null);
});

test("pulo consome um pulo e avança de personalidade", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    const before = Game.getState().currentPersonality.id;
    const result = Game.skip();

    assert.strictEqual(result.result, "skipped");
    assert.strictEqual(Game.getState().skips, 2);
    assert.strictEqual(Game.getState().skipsUsed, 1);
    assert.notStrictEqual(Game.getState().currentPersonality.id, before);
});

test("pulo é negado sem pulos restantes", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    Game.skip();
    Game.skip();
    Game.skip();

    assert.strictEqual(Game.skip(), null);
    assert.strictEqual(Game.getState().skips, 0);
});
