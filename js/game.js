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
let surrenderCount = 0;
let surrenderedPersonalities = [];
let endReason = null;
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
    surrenderCount = 0;
    surrenderedPersonalities = [];
    endReason = null;
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
        endReason = "no-lives";
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

export function surrender() {
    if (gameOver || skips > 0 || !currentPersonality) {
        return null;
    }

    const surrenderedPersonality = currentPersonality;
    surrenderCount++;
    surrenderedPersonalities.push(surrenderedPersonality);
    endReason = "surrender";
    gameOver = true;
    return { result: "surrendered", personality: surrenderedPersonality };
}

function endGame() {
    endReason = "collection-exhausted";
    gameOver = true;
}

export function getState() {
    return {
        lives,
        skips,
        skipsUsed,
        correctCount,
        wrongCount,
        surrenderCount,
        wrongPersonalities: [...wrongPersonalities],
        surrenderedPersonalities: [...surrenderedPersonalities],
        endReason,
        reviewPersonalities: [
            ...wrongPersonalities,
            ...skippedPersonalities,
            ...surrenderedPersonalities
        ],
        gameOver,
        currentPersonality
    };
}
