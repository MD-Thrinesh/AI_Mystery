export const validateMysteryData = (payload) => {
  const errors = [];

  if (!payload?.scenario || payload.scenario.trim().length < 30) {
    errors.push('Scenario must be at least 30 characters long.');
  }

  if (!['easy', 'medium', 'hard'].includes(payload?.difficulty)) {
    errors.push('Difficulty must be easy, medium, or hard.');
  }

  if (!['theft', 'murder', 'disappearance', 'sabotage', 'general'].includes(payload?.mysteryType)) {
    errors.push('Mystery type is invalid.');
  }

  if (!Number.isInteger(payload?.suspectCount) || payload.suspectCount < 3 || payload.suspectCount > 6) {
    errors.push('Suspect count must be between 3 and 6.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};
