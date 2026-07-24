const UI = (function () {
    const screens = {
        start: document.getElementById("start-screen"),
        game: document.getElementById("game-screen"),
        end: document.getElementById("end-screen")
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
        wrongAnswersSection: document.getElementById("wrong-answers-section"),
        wrongAnswersList: document.getElementById("wrong-answers-list")
    };

    let onAnswerSubmit = null;
    let onSkip = null;
    let onStart = null;

    function showScreen(name) {
        Object.values(screens).forEach((screen) => screen.classList.remove("screen--active"));
        screens[name].classList.add("screen--active");

        if (name === "game") {
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
        elements.feedback.textContent = message;
        elements.feedback.className = `feedback feedback--${type}`;

        setTimeout(() => {
            elements.feedback.textContent = "";
            elements.feedback.className = "feedback";
        }, 2000);
    }

    function renderEndScreen(state) {
        const victory = state.lives > 0;
        elements.endTitle.textContent = victory ? "Vitória!" : "Fim de Jogo";
        elements.endCorrect.textContent = state.correctCount;
        elements.endWrong.textContent = state.wrongCount;
        elements.endSkips.textContent = state.skipsUsed;

        elements.wrongAnswersList.innerHTML = "";

        if (state.wrongPersonalities.length === 0) {
            elements.wrongAnswersSection.style.display = "none";
        } else {
            elements.wrongAnswersSection.style.display = "block";
            state.wrongPersonalities.forEach((personality) => {
                const item = document.createElement("li");
                item.className = "learning__item";
                item.innerHTML = `
                    <span class="learning__name">${personality.name}</span>
                    <a class="learning__link" href="${personality.wikipediaUrl}" target="_blank" rel="noopener noreferrer">
                        Ler na Wikipédia
                    </a>
                `;
                elements.wrongAnswersList.appendChild(item);
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

    function init(handlers) {
        onAnswerSubmit = handlers.onAnswerSubmit;
        onSkip = handlers.onSkip;
        onStart = handlers.onStart;
        bindEvents();
    }

    return {
        init,
        showScreen,
        setHud,
        displayPersonality,
        showFeedback,
        renderEndScreen
    };
}());
