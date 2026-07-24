const Validator = (function () {
    const MAX_EDIT_DISTANCE = 2;

    function normalize(text) {
        if (!text) {
            return "";
        }

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function levenshteinDistance(a, b) {
        const matrix = [];

        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                const cost = b[i - 1] === a[j - 1] ? 0 : 1;
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + cost
                );
            }
        }

        return matrix[b.length][a.length];
    }

    function isCloseEnough(answer, target) {
        const normalizedAnswer = normalize(answer);
        const normalizedTarget = normalize(target);

        if (!normalizedAnswer || !normalizedTarget) {
            return false;
        }

        if (normalizedAnswer === normalizedTarget) {
            return true;
        }

        const distance = levenshteinDistance(normalizedAnswer, normalizedTarget);
        return distance <= MAX_EDIT_DISTANCE;
    }

    function isCorrect(answer, personality) {
        const targets = [personality.name, ...(personality.aliases || [])];
        return targets.some((target) => isCloseEnough(answer, target));
    }

    return {
        isCorrect
    };
}());
