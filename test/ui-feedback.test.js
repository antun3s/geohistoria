const { test } = require("node:test");
const assert = require("node:assert");
const { loadScript, installFakeDocument, sleep } = require("./helpers");

installFakeDocument();
const UI = loadScript("js/ui.js");

test("feedback antigo não apaga o feedback novo antes do tempo", async () => {
    const feedback = document.getElementById("feedback");

    UI.showFeedback("primeira mensagem", "success");
    assert.strictEqual(feedback.textContent, "primeira mensagem");

    await sleep(1000);
    UI.showFeedback("segunda mensagem", "error");

    await sleep(1100);
    assert.strictEqual(
        feedback.textContent,
        "segunda mensagem",
        "o timer do primeiro feedback não deveria ter apagado o segundo feedback"
    );

    await sleep(1000);
    assert.strictEqual(feedback.textContent, "", "o feedback novo deveria sumir no seu próprio tempo");
});
