const Game = (function () {
    const INITIAL_LIVES = 3;
    const INITIAL_SKIPS = 3;

    let collection = [];
    let usedIds = new Set();
    let currentPersonality = null;
    let lives = INITIAL_LIVES;
    let skips = INITIAL_SKIPS;
    let skipsUsed = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let wrongPersonalities = [];
    let gameOver = false;

    function shuffle(array) {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    function loadCollection(newCollection) {
        if (!Array.isArray(newCollection) || newCollection.length === 0) {
            throw new Error("Coleção de personalidades inválida ou vazia.");
        }
        collection = newCollection;
    }

    function start() {
        usedIds.clear();
        lives = INITIAL_LIVES;
        skips = INITIAL_SKIPS;
        skipsUsed = 0;
        correctCount = 0;
        wrongCount = 0;
        wrongPersonalities = [];
        gameOver = false;
        collection = shuffle(collection);
        nextRound();
    }

    function nextRound() {
        if (gameOver) {
            return;
        }

        if (usedIds.size >= collection.length) {
            endGame();
            return;
        }

        const available = collection.filter((p) => !usedIds.has(p.id));
        currentPersonality = available[Math.floor(Math.random() * available.length)];
        usedIds.add(currentPersonality.id);
    }

    function submitAnswer(answer) {
        if (gameOver || !currentPersonality) {
            return null;
        }

        const answeredPersonality = currentPersonality;
        const isCorrect = Validator.isCorrect(answer, answeredPersonality);

        if (isCorrect) {
            correctCount++;
            nextRound();
            return { result: "correct", personality: answeredPersonality };
        }

        lives--;
        wrongCount++;
        wrongPersonalities.push(answeredPersonality);

        if (lives <= 0) {
            gameOver = true;
            endGame();
            return { result: "game-over", personality: answeredPersonality };
        }

        nextRound();
        return { result: "wrong", personality: answeredPersonality };
    }

    function skip() {
        if (gameOver || skips <= 0 || !currentPersonality) {
            return null;
        }

        skips--;
        skipsUsed++;
        nextRound();
        return { result: "skipped" };
    }

    function endGame() {
        gameOver = true;
    }

    function getState() {
        return {
            lives,
            skips,
            skipsUsed,
            correctCount,
            wrongCount,
            wrongPersonalities: [...wrongPersonalities],
            gameOver,
            currentPersonality
        };
    }

    return {
        loadCollection,
        start,
        submitAnswer,
        skip,
        getState
    };
}());
