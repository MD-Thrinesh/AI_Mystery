export const scoreAccusation = (isCorrect) => ({
  correct: isCorrect,
  score: isCorrect ? 100 : 0,
  message: isCorrect ? 'Correct — the culprit is identified.' : 'Incorrect — the evidence points elsewhere.',
});
