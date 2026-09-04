const BEST_SCORE_KEY = "geohistoria:best-score";

export function loadBestScore() {
    return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
}

export function saveBestScore(score) {
    if (score > loadBestScore()) {
        localStorage.setItem(BEST_SCORE_KEY, String(score));
        return score;
    }
    return loadBestScore();
}
