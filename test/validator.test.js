import { test } from "node:test";
import assert from "node:assert/strict";
import { isCorrect } from "../js/validator.js";

function personality(name, aliases) {
    return { name, aliases };
}

test("responde corretamente com nome exato", () => {
    assert.equal(isCorrect("Isaac Newton", personality("Isaac Newton")), true);
});

test("ignora acentos e capitalização", () => {
    assert.equal(isCorrect("cleopatra", personality("Cleópatra VII", ["Cleópatra"])), true);
});

test("ignora pontuação", () => {
    assert.equal(isCorrect("Joana dArc!", personality("Joana d'Arc")), true);
});

test("hífen vira espaço em vez de concatenar palavras", () => {
    assert.equal(isCorrect("Jean Paul Sartre", personality("Jean-Paul Sartre")), true);
    assert.equal(isCorrect("Maria Antonieta", personality("Maria-Antonieta")), true);
});

test("acentos são removidos sem virar espaço", () => {
    assert.equal(isCorrect("Joao", personality("João")), true);
    assert.equal(isCorrect("Platao", personality("Platão")), true);
});

test("aceita até 1 erro de digitação em nomes curtos", () => {
    assert.equal(isCorrect("Newtonn", personality("Newton")), true);
});

test("não aceita distância 2 em nomes curtos", () => {
    assert.equal(isCorrect("Nelson", personality("Newton")), false);
    assert.equal(isCorrect("dariwn", personality("Darwin")), false);
});

test("aceita até 2 erros de digitação em nomes longos", () => {
    assert.equal(isCorrect("Isaac Netwon", personality("Isaac Newton")), true);
    assert.equal(isCorrect("Marie Cuire", personality("Marie Curie")), true);
});

test("aceita aliases", () => {
    assert.equal(isCorrect("Leonardo", personality("Leonardo da Vinci", ["Leonardo"])), true);
});

test("rejeita resposta vazia", () => {
    assert.equal(isCorrect("", personality("Isaac Newton")), false);
    assert.equal(isCorrect("   ", personality("Isaac Newton")), false);
});

test("rejeita nome completamente diferente", () => {
    assert.equal(isCorrect("Zé Ninguém", personality("Isaac Newton")), false);
});
