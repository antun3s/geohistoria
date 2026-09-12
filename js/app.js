import * as Game from "./game.js";
import * as GameMap from "./map.js";
import * as Storage from "./storage.js";
import * as UI from "./ui.js";

const GAME_OVER_REVEAL_DELAY = 1200;

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

function finishGame(state) {
    const bestScore = Storage.saveBestScore(state.correctCount);
    UI.renderEndScreen(state, bestScore);
    UI.showScreen("end");
}

function revealAnswerBeforeEndScreen(state) {
    setTimeout(() => {
        finishGame(state);
    }, GAME_OVER_REVEAL_DELAY);
}

function handleAnswerSubmit(answer) {
    const result = Game.submitAnswer(answer);
    if (!result) {
        return;
    }

    const state = Game.getState();

    if (result.result === "correct") {
        UI.showFeedback("Correto!", "success");
    } else {
        UI.showFeedback(`Errado. Era ${result.personality.name}.`, "error");
    }

    if (state.gameOver) {
        if (result.result === "game-over") {
            revealAnswerBeforeEndScreen(state);
        } else {
            finishGame(state);
        }
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

    UI.showFeedback(`Pulado! Era ${result.personality.name}.`, "error");
    const state = Game.getState();

    if (state.gameOver) {
        revealAnswerBeforeEndScreen(state);
        return;
    }

    UI.setHud(state);
    UI.displayPersonality(state.currentPersonality);
}

function handleSurrender() {
    const result = Game.surrender();
    if (!result) {
        return;
    }

    UI.showFeedback(`Era ${result.personality.name}.`, "error");
    revealAnswerBeforeEndScreen(Game.getState());
}

async function init() {
    try {
        const personalities = await loadPersonalities();
        Game.loadCollection(personalities);

        UI.init({
            onStart: startGame,
            onAnswerSubmit: handleAnswerSubmit,
            onSkip: handleSkip,
            onSurrender: handleSurrender
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
