(function () {
    async function loadPersonalities() {
        const response = await fetch("data/personalities.json");
        if (!response.ok) {
            throw new Error("Não foi possível carregar a coleção de personalidades.");
        }
        return response.json();
    }

    function startGame() {
        Game.start();
        UI.showScreen("game");
        GameMap.init("map");
        updateScreen();
    }

    function updateScreen() {
        const state = Game.getState();
        UI.setHud(state);
        UI.displayPersonality(state.currentPersonality);
    }

    function handleAnswerSubmit(answer) {
        const result = Game.submitAnswer(answer);
        const state = Game.getState();

        if (!result) {
            return;
        }

        if (result.result === "correct") {
            UI.showFeedback("Correto!", "success");
        } else if (result.result === "wrong") {
            UI.showFeedback(`Errado. Era ${result.personality.name}.`, "error");
        }

        if (state.gameOver) {
            UI.renderEndScreen(state);
            UI.showScreen("end");
            return;
        }

        UI.setHud(state);
        UI.displayPersonality(state.currentPersonality);
    }

    function handleSkip() {
        const result = Game.skip();
        if (!result) {
            return;
        }

        UI.showFeedback("Pulado!", "error");
        const state = Game.getState();

        if (state.gameOver) {
            UI.renderEndScreen(state);
            UI.showScreen("end");
            return;
        }

        UI.setHud(state);
        UI.displayPersonality(state.currentPersonality);
    }

    async function init() {
        try {
            const personalities = await loadPersonalities();
            Game.loadCollection(personalities);

            UI.init({
                onStart: startGame,
                onAnswerSubmit: handleAnswerSubmit,
                onSkip: handleSkip
            });

            UI.showScreen("start");
        } catch (error) {
            console.error(error);
            document.body.innerHTML = `
                <main class="app">
                    <div class="card card--centered">
                        <h2>Erro ao carregar o jogo</h2>
                        <p>${error.message}</p>
                    </div>
                </main>
            `;
        }
    }

    init();
}());
