import { test } from "node:test";
import assert from "node:assert/strict";
import { installFakeDocument, sleep } from "./helpers.js";

installFakeDocument();
const { showFeedback } = await import("../js/ui.js");

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
