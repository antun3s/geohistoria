import * as GameMap from "./map.js";

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
let onStart = null;
let feedbackTimeout = null;

function showScreen(name) {
    Object.values(screens).forEach((screen) => screen.classList.remove("screen--active"));
    screens[name].classList.add("screen--active");

    if (name === "game") {
        elements.answerInput.focus();
        setTimeout(() => GameMap.resize(), 50);
    }
}

function setHud(state) {
    elements.livesDisplay.textContent = state.lives;
    elements.skipsDisplay.textContent = state.skips;
    elements.scoreDisplay.textContent = state.correctCount;
    elements.skipButton.disabled = state.skips <= 0;
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
    const victory = state.lives > 0;
    elements.endTitle.textContent = victory ? "Vitória!" : "Fim de Jogo";
    elements.endCorrect.textContent = state.correctCount;
    elements.endWrong.textContent = state.wrongCount;
    elements.endSkips.textContent = state.skipsUsed;
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
        if (onSkip) {
            onSkip();
        }
    });
}

export function init(handlers) {
    onAnswerSubmit = handlers.onAnswerSubmit;
    onSkip = handlers.onSkip;
    onStart = handlers.onStart;
    bindEvents();
}

export { showScreen, setHud, displayPersonality, showFeedback, renderEndScreen };
