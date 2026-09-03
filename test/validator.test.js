const { test } = require("node:test");
const assert = require("node:assert");
const { loadScript } = require("./helpers");

const Validator = loadScript("js/validator.js");

function personality(name, aliases) {
    return { name, aliases };
}

test("responde corretamente com nome exato", () => {
    assert.strictEqual(Validator.isCorrect("Isaac Newton", personality("Isaac Newton")), true);
});

test("ignora acentos e capitalização", () => {
    assert.strictEqual(Validator.isCorrect("cleopatra", personality("Cleópatra VII", ["Cleópatra"])), true);
});

test("ignora pontuação", () => {
    assert.strictEqual(Validator.isCorrect("Joana dArc!", personality("Joana d'Arc")), true);
});

test("hífen vira espaço em vez de concatenar palavras", () => {
    assert.strictEqual(Validator.isCorrect("Jean Paul Sartre", personality("Jean-Paul Sartre")), true);
    assert.strictEqual(Validator.isCorrect("Maria Antonieta", personality("Maria-Antonieta")), true);
});

test("acentos são removidos sem virar espaço", () => {
    assert.strictEqual(Validator.isCorrect("Joao", personality("João")), true);
    assert.strictEqual(Validator.isCorrect("Platao", personality("Platão")), true);
});

test("aceita até 1 erro de digitação em nomes curtos", () => {
    assert.strictEqual(Validator.isCorrect("Newtonn", personality("Newton")), true);
});

test("não aceita distância 2 em nomes curtos", () => {
    assert.strictEqual(Validator.isCorrect("Nelson", personality("Newton")), false);
    assert.strictEqual(Validator.isCorrect("dariwn", personality("Darwin")), false);
});

test("aceita até 2 erros de digitação em nomes longos", () => {
    assert.strictEqual(Validator.isCorrect("Isaac Netwon", personality("Isaac Newton")), true);
    assert.strictEqual(Validator.isCorrect("Marie Cuire", personality("Marie Curie")), true);
});

test("aceita aliases", () => {
    assert.strictEqual(Validator.isCorrect("Leonardo", personality("Leonardo da Vinci", ["Leonardo"])), true);
});

test("rejeita resposta vazia", () => {
    assert.strictEqual(Validator.isCorrect("", personality("Isaac Newton")), false);
    assert.strictEqual(Validator.isCorrect("   ", personality("Isaac Newton")), false);
});

test("rejeita nome completamente diferente", () => {
    assert.strictEqual(Validator.isCorrect("Zé Ninguém", personality("Isaac Newton")), false);
});
