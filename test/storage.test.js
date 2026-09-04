import { test } from "node:test";
import assert from "node:assert/strict";
import { installFakeStorage } from "./helpers.js";
import { loadBestScore, saveBestScore } from "../js/storage.js";

installFakeStorage();

test("recorde começa em zero", () => {
    assert.equal(loadBestScore(), 0);
});

test("salva novo recorde e o retorna", () => {
    assert.equal(saveBestScore(4), 4);
    assert.equal(loadBestScore(), 4);
});

test("não substitui recorde por pontuação menor", () => {
    saveBestScore(7);
    assert.equal(saveBestScore(3), 7);
    assert.equal(loadBestScore(), 7);
});

test("mantém recorde empatado", () => {
    saveBestScore(7);
    assert.equal(saveBestScore(7), 7);
});
