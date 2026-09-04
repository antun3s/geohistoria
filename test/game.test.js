import { test } from "node:test";
import assert from "node:assert/strict";
import * as Game from "../js/game.js";

function createCollection(size) {
    const personalities = [];
    for (let index = 0; index < size; index++) {
        personalities.push({
            id: `person-${index}`,
            name: `Personalidade ${index} Nome Longo`,
            aliases: [],
            birth: { year: 1500, city: "Cidade", country: "País", latitude: 0, longitude: 0 },
            death: { year: 1550, city: "Cidade", country: "País", latitude: 1, longitude: 1 },
            curiosity: `Curiosidade ${index}`,
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
    assert.equal(state.lives, 3);
    assert.equal(state.skips, 3);
    assert.equal(state.correctCount, 0);
    assert.equal(state.wrongCount, 0);
    assert.equal(state.gameOver, false);
    assert.ok(state.currentPersonality);
});

test("cada personalidade aparece no máximo uma vez por partida", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    const seen = new Set();
    for (let round = 0; round < 5; round++) {
        seen.add(Game.getState().currentPersonality.id);
        const result = Game.submitAnswer(Game.getState().currentPersonality.name);
        assert.equal(result.result, "correct");
    }

    assert.equal(seen.size, 5);
    assert.equal(Game.getState().gameOver, true);
});

test("resposta correta avança de personalidade", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    const result = Game.submitAnswer(Game.getState().currentPersonality.name);

    assert.equal(result.result, "correct");
    assert.equal(Game.getState().correctCount, 1);
    assert.notEqual(Game.getState().currentPersonality.id, result.personality.id);
});

test("três erros encerram o jogo e revelam quem era a última personalidade", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    assert.equal(answerWrong().result, "wrong");
    assert.equal(answerWrong().result, "wrong");

    const personalityBeforeLastAnswer = Game.getState().currentPersonality;
    const lastResult = answerWrong();

    assert.equal(lastResult.result, "game-over");
    assert.equal(lastResult.personality.id, personalityBeforeLastAnswer.id);

    const state = Game.getState();
    assert.equal(state.gameOver, true);
    assert.equal(state.lives, 0);
    assert.equal(state.wrongCount, 3);
    assert.equal(state.wrongPersonalities.length, 3);
    assert.equal(state.currentPersonality.id, lastResult.personality.id);
});

test("não aceita resposta após o fim do jogo", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    answerWrong();
    answerWrong();
    answerWrong();

    assert.equal(Game.submitAnswer("qualquer coisa"), null);
});

test("pulo consome um pulo, avança e revela quem era", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    const before = Game.getState().currentPersonality.id;
    const result = Game.skip();

    assert.equal(result.result, "skipped");
    assert.ok(result.personality);
    assert.equal(result.personality.id, before);
    assert.equal(Game.getState().skips, 2);
    assert.equal(Game.getState().skipsUsed, 1);
    assert.notEqual(Game.getState().currentPersonality.id, before);
});

test("pulo é negado sem pulos restantes", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    Game.skip();
    Game.skip();
    Game.skip();

    assert.equal(Game.skip(), null);
    assert.equal(Game.getState().skips, 0);
});

test("lista de revisão reúne erradas e puladas", () => {
    Game.loadCollection(createCollection(5));
    Game.start();

    answerWrong();
    const skippedResult = Game.skip();

    const state = Game.getState();
    assert.equal(state.reviewPersonalities.length, 2);
    assert.equal(state.wrongPersonalities.length, 1);
    assert.equal(state.reviewPersonalities[0].id, state.wrongPersonalities[0].id);
    assert.equal(state.reviewPersonalities[1].id, skippedResult.personality.id);
});

test("vitória esgota a coleção sem perder vidas", () => {
    Game.loadCollection(createCollection(2));
    Game.start();

    const first = Game.submitAnswer(Game.getState().currentPersonality.name);
    assert.equal(first.result, "correct");

    const second = Game.submitAnswer(Game.getState().currentPersonality.name);
    assert.equal(second.result, "correct");

    const state = Game.getState();
    assert.equal(state.gameOver, true);
    assert.equal(state.lives, 3);
    assert.equal(state.correctCount, 2);
    assert.equal(state.reviewPersonalities.length, 0);
});
