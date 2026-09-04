import { isCorrect } from "./validator.js";

const INITIAL_LIVES = 3;
const INITIAL_SKIPS = 3;

let collection = [];
let cursor = 0;
let currentPersonality = null;
let lives = INITIAL_LIVES;
let skips = INITIAL_SKIPS;
let skipsUsed = 0;
let correctCount = 0;
let wrongCount = 0;
let wrongPersonalities = [];
let skippedPersonalities = [];
let gameOver = false;

function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function loadCollection(newCollection) {
    if (!Array.isArray(newCollection) || newCollection.length === 0) {
        throw new Error("Coleção de personalidades inválida ou vazia.");
    }
    collection = newCollection;
}

export function start() {
    lives = INITIAL_LIVES;
    skips = INITIAL_SKIPS;
    skipsUsed = 0;
    correctCount = 0;
    wrongCount = 0;
    wrongPersonalities = [];
    skippedPersonalities = [];
    gameOver = false;
    collection = shuffle(collection);
    cursor = 0;
    nextRound();
}

function nextRound() {
    if (gameOver) {
        return;
    }

    if (cursor >= collection.length) {
        endGame();
        return;
    }

    currentPersonality = collection[cursor];
    cursor++;
}

export function submitAnswer(answer) {
    if (gameOver || !currentPersonality) {
        return null;
    }

    const answeredPersonality = currentPersonality;
    const isAnswerCorrect = isCorrect(answer, answeredPersonality);

    if (isAnswerCorrect) {
        correctCount++;
        nextRound();
        return { result: "correct", personality: answeredPersonality };
    }

    lives--;
    wrongCount++;
    wrongPersonalities.push(answeredPersonality);

    if (lives <= 0) {
        gameOver = true;
        return { result: "game-over", personality: answeredPersonality };
    }

    nextRound();
    return { result: "wrong", personality: answeredPersonality };
}

export function skip() {
    if (gameOver || skips <= 0 || !currentPersonality) {
        return null;
    }

    const skippedPersonality = currentPersonality;
    skips--;
    skipsUsed++;
    skippedPersonalities.push(skippedPersonality);
    nextRound();
    return { result: "skipped", personality: skippedPersonality };
}

function endGame() {
    gameOver = true;
}

export function getState() {
    return {
        lives,
        skips,
        skipsUsed,
        correctCount,
        wrongCount,
        wrongPersonalities: [...wrongPersonalities],
        reviewPersonalities: [...wrongPersonalities, ...skippedPersonalities],
        gameOver,
        currentPersonality
    };
}
