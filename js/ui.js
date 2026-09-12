import * as GameMap from "./map.js";

const RESOURCE_GAUGE_TOTAL = 3;
const SURRENDER_ARM_TIMEOUT = 3000;
const SKIP_LABEL = "Pular";
const SURRENDER_LABEL = "Não sei";
const SURRENDER_CONFIRM_LABEL = "Confirmar desistência?";
const END_TITLES = {
    "collection-exhausted": "Vitória!",
    "no-lives": "Fim de Jogo",
    "surrender": "Fim de Jogo"
};

const elements = {
    startButton: document.getElementById("start-button"),
    restartButton: document.getElementById("restart-button"),
    answerForm: document.getElementById("answer-form"),
    answerInput: document.getElementById("answer-input"),
    skipButton: document.getElementById("skip-button"),
    feedback: document.getElementById("feedback"),
    livesDisplay: document.getElementById("lives-display"),
    skipsDisplay: document.getElementById("skips-display"),
    scoreDisplay: document.getElementById("score-display"),
    birthYear: document.getElementById("birth-year"),
    birthPlace: document.getElementById("birth-place"),
    deathYear: document.getElementById("death-year"),
    deathPlace: document.getElementById("death-place"),
    endTitle: document.getElementById("end-title"),
    endCorrect: document.getElementById("end-correct"),
    endWrong: document.getElementById("end-wrong"),
    endSkips: document.getElementById("end-skips"),
    endSurrender: document.getElementById("end-surrender"),
    endBest: document.getElementById("end-best"),
    wrongAnswersSection: document.getElementById("wrong-answers-section"),
    wrongAnswersList: document.getElementById("wrong-answers-list")
};

const screens = {
    start: document.getElementById("start-screen"),
    game: document.getElementById("game-screen"),
    end: document.getElementById("end-screen")
};

let onAnswerSubmit = null;
let onSkip = null;
let onSurrender = null;
let onStart = null;
let feedbackTimeout = null;
let skipsRemaining = 3;
let surrenderArmed = false;
let disarmTimeout = null;

function showScreen(name) {
    Object.values(screens).forEach((screen) => screen.classList.remove("screen--active"));
    screens[name].classList.add("screen--active");

    if (name === "game") {
        elements.answerInput.focus();
        setTimeout(() => GameMap.resize(), 50);
    }
}

function renderGauge(container, label, remaining) {
    const filled = Math.max(0, Math.min(RESOURCE_GAUGE_TOTAL, remaining));
    const cells = [];

    for (let index = 0; index < RESOURCE_GAUGE_TOTAL; index++) {
        const cell = document.createElement("span");
        cell.classList.add("gauge__cell");
        if (index < filled) {
            cell.classList.add("gauge__cell--filled");
        }
        cells.push(cell);
    }

    container.replaceChildren();
    container.append(...cells);
    container.setAttribute("aria-label", `${label}: ${Math.max(0, remaining)}`);
}

function armSurrender() {
    surrenderArmed = true;
    elements.skipButton.textContent = SURRENDER_CONFIRM_LABEL;
    elements.skipButton.classList.add("button--armed");
    disarmTimeout = setTimeout(disarmSurrender, SURRENDER_ARM_TIMEOUT);
}

function disarmSurrender() {
    surrenderArmed = false;

    if (disarmTimeout) {
        clearTimeout(disarmTimeout);
        disarmTimeout = null;
    }

    elements.skipButton.classList.remove("button--armed");

    if (skipsRemaining <= 0) {
        elements.skipButton.textContent = SURRENDER_LABEL;
    }
}

function setHud(state) {
    skipsRemaining = state.skips;
    renderGauge(elements.livesDisplay, "Vidas", state.lives);
    renderGauge(elements.skipsDisplay, "Pulos", state.skips);
    elements.scoreDisplay.textContent = state.correctCount;

    if (state.skips > 0) {
        disarmSurrender();
        elements.skipButton.classList.remove("button--danger");
        elements.skipButton.classList.add("button--secondary");
        elements.skipButton.textContent = SKIP_LABEL;
    } else {
        elements.skipButton.classList.remove("button--secondary");
        elements.skipButton.classList.add("button--danger");
        if (!surrenderArmed) {
            elements.skipButton.textContent = SURRENDER_LABEL;
        }
    }
}

function formatPlace(city, country) {
    return `${city}, ${country}`;
}

function displayPersonality(personality) {
    if (!personality) {
        return;
    }

    elements.birthYear.textContent = personality.birth.year;
    elements.birthPlace.textContent = formatPlace(personality.birth.city, personality.birth.country);
    elements.deathYear.textContent = personality.death.year;
    elements.deathPlace.textContent = formatPlace(personality.death.city, personality.death.country);

    GameMap.update(personality.birth, personality.death);
}

function showFeedback(message, type) {
    if (feedbackTimeout) {
        clearTimeout(feedbackTimeout);
    }

    elements.feedback.textContent = message;
    elements.feedback.className = `feedback feedback--${type}`;

    feedbackTimeout = setTimeout(() => {
        elements.feedback.textContent = "";
        elements.feedback.className = "feedback";
        feedbackTimeout = null;
    }, 2000);
}

function createReviewItem(personality) {
    const item = document.createElement("li");
    item.className = "learning__item";

    const header = document.createElement("div");
    header.className = "learning__header";

    const name = document.createElement("span");
    name.className = "learning__name";
    name.textContent = personality.name;

    const link = document.createElement("a");
    link.className = "learning__link";
    link.href = personality.wikipediaUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Ler na Wikipédia";

    header.append(name, link);
    item.append(header);

    if (personality.curiosity) {
        const curiosity = document.createElement("p");
        curiosity.className = "learning__curiosity";
        curiosity.textContent = personality.curiosity;
        item.append(curiosity);
    }

    return item;
}

function renderEndScreen(state, bestScore) {
    elements.endTitle.textContent = END_TITLES[state.endReason] ?? "Partida Encerrada";
    elements.endCorrect.textContent = state.correctCount;
    elements.endWrong.textContent = state.wrongCount;
    elements.endSkips.textContent = state.skipsUsed;
    elements.endSurrender.textContent = state.surrenderCount;
    elements.endBest.textContent = bestScore;

    elements.wrongAnswersList.replaceChildren();

    if (state.reviewPersonalities.length === 0) {
        elements.wrongAnswersSection.style.display = "none";
    } else {
        elements.wrongAnswersSection.style.display = "block";
        state.reviewPersonalities.forEach((personality) => {
            elements.wrongAnswersList.appendChild(createReviewItem(personality));
        });
    }
}

function bindEvents() {
    elements.startButton.addEventListener("click", () => {
        if (onStart) {
            onStart();
        }
    });

    elements.restartButton.addEventListener("click", () => {
        if (onStart) {
            onStart();
        }
    });

    elements.answerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        disarmSurrender();

        const answer = elements.answerInput.value.trim();
        if (!answer) {
            return;
        }

        if (onAnswerSubmit) {
            onAnswerSubmit(answer);
        }

        elements.answerInput.value = "";
        elements.answerInput.focus();
    });

    elements.skipButton.addEventListener("click", () => {
        if (skipsRemaining > 0) {
            if (onSkip) {
                onSkip();
            }
            return;
        }

        if (!surrenderArmed) {
            armSurrender();
            return;
        }

        disarmSurrender();

        if (onSurrender) {
            onSurrender();
        }
    });
}

export function init(handlers) {
    onAnswerSubmit = handlers.onAnswerSubmit;
    onSkip = handlers.onSkip;
    onSurrender = handlers.onSurrender;
    onStart = handlers.onStart;
    bindEvents();
}

export { showScreen, setHud, displayPersonality, showFeedback, renderEndScreen };
