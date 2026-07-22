/**
 * Scoring Engine for AI Opportunity Compass
 * Calculates user profile scores based on quiz answers
 */

const PROFILES = {
  builder: "builder",
  operator: "operator",
  creator: "creator",
  entrepreneur: "entrepreneur",
  strategist: "strategist",
};

/**
 * Extract score from an answer based on question type
 * @param {Object} question - Question object from questions.json
 * @param {*} answer - User's answer (varies by question type)
 * @returns {Object} Score object with profile keys
 */
function extractScore(question, answer) {
  const defaultScore = {
    builder: 0,
    operator: 0,
    creator: 0,
    entrepreneur: 0,
    strategist: 0,
  };

  if (!answer) return defaultScore;

  switch (question.type) {
    case "single-choice":
      // Find the selected option and return its score
      if (Array.isArray(question.options)) {
        const option = question.options.find((opt) => opt.id === answer);
        return option?.score || defaultScore;
      }
      break;

    case "multiple-choice":
      // For multiple choices, we need to aggregate scores
      // answer should be an array of selected option IDs
      if (Array.isArray(question.options) && Array.isArray(answer)) {
        const aggregatedScore = { ...defaultScore };
        answer.forEach((selectedId) => {
          const option = question.options.find((opt) => opt.id === selectedId);
          if (option?.score) {
            Object.keys(PROFILES).forEach((profile) => {
              aggregatedScore[profile] += option.score[profile] || 0;
            });
          }
        });
        return aggregatedScore;
      }
      break;

    case "scale":
      // For scale questions, use the answer as a key in the score object
      // Answer should be a number (1-5)
      if (
        typeof answer === "number" &&
        question.score &&
        question.score[answer]
      ) {
        return question.score[answer];
      }
      break;

    default:
      return defaultScore;
  }

  return defaultScore;
}

/**
 * Calculate the top two profiles based on scores
 * @param {Object} scores - Final aggregated scores for each profile
 * @returns {Object} { primaryProfile, secondaryProfile }
 */
function determineTopProfiles(scores) {
  const profileEntries = Object.entries(scores).sort(([, a], [, b]) => b - a);

  return {
    primaryProfile: profileEntries[0]?.[0] || null,
    secondaryProfile: profileEntries[1]?.[0] || null,
  };
}

/**
 * Calculate user profile based on quiz answers
 * @param {Object} answers - User's answers keyed by question ID
 *                          Example: { 1: "1a", 2: 4, 3: "3b", 7: ["7a", "7b"] }
 * @param {Array} questions - Array of question objects from questions.json
 * @returns {Object} { scores, primaryProfile, secondaryProfile }
 */
function calculateProfile(answers, questions = []) {
  // Initialize scores for all profiles
  const scores = {
    builder: 0,
    operator: 0,
    creator: 0,
    entrepreneur: 0,
    strategist: 0,
  };

  if (!Array.isArray(questions) || questions.length === 0) {
    console.warn("No questions provided to calculateProfile");
    return {
      scores,
      primaryProfile: null,
      secondaryProfile: null,
    };
  }

  // Process each answer
  questions.forEach((question) => {
    const answer = answers[question.id];

    if (answer !== undefined && answer !== null) {
      const questionScore = extractScore(question, answer);

      // Add to total scores
      Object.keys(PROFILES).forEach((profile) => {
        scores[profile] += questionScore[profile] || 0;
      });
    }
  });

  // Determine primary and secondary profiles
  const { primaryProfile, secondaryProfile } = determineTopProfiles(scores);

  return {
    scores,
    primaryProfile,
    secondaryProfile,
  };
}

/**
 * Calculate profile with scores normalized to a percentage (0-100)
 * @param {Object} answers - User's answers
 * @param {Array} questions - Array of question objects
 * @returns {Object} { scores (normalized), primaryProfile, secondaryProfile }
 */
function calculateProfileNormalized(answers, questions = []) {
  const result = calculateProfile(answers, questions);

  // Calculate the maximum possible score
  let maxPossibleScore = 0;
  questions.forEach((question) => {
    if (question.type === "single-choice" || question.type === "scale") {
      // For single choice and scale, find the max score across all options
      if (question.type === "single-choice" && Array.isArray(question.options)) {
        const maxInQuestion = Math.max(
          ...question.options.map(
            (opt) => opt.score?.builder || 0,
            opt.score?.operator || 0,
            opt.score?.creator || 0,
            opt.score?.entrepreneur || 0,
            opt.score?.strategist || 0
          )
        );
        maxPossibleScore += maxInQuestion;
      } else if (question.type === "scale" && question.score) {
        // For scale, assume user selects max value
        const maxValue = question.scale?.max || 5;
        if (question.score[maxValue]) {
          const maxInQuestion = Math.max(
            ...Object.values(question.score[maxValue])
          );
          maxPossibleScore += maxInQuestion;
        }
      }
    }
  });

  // Normalize scores to 0-100
  const normalizedScores = {};
  Object.keys(PROFILES).forEach((profile) => {
    normalizedScores[profile] =
      maxPossibleScore > 0
        ? Math.round((result.scores[profile] / maxPossibleScore) * 100)
        : 0;
  });

  return {
    scores: normalizedScores,
    primaryProfile: result.primaryProfile,
    secondaryProfile: result.secondaryProfile,
  };
}

/**
 * Validate answers against questions
 * @param {Object} answers - User's answers
 * @param {Array} questions - Array of question objects
 * @returns {Object} { isValid, errors }
 */
function validateAnswers(answers, questions = []) {
  const errors = [];

  questions.forEach((question) => {
    const answer = answers[question.id];

    if (answer === undefined || answer === null) {
      return; // Skip unanswered questions
    }

    if (question.type === "single-choice") {
      const validIds = question.options?.map((opt) => opt.id) || [];
      if (!validIds.includes(answer)) {
        errors.push(`Question ${question.id}: Invalid choice "${answer}"`);
      }
    } else if (question.type === "multiple-choice") {
      if (!Array.isArray(answer)) {
        errors.push(
          `Question ${question.id}: Expected array for multiple-choice`
        );
      } else {
        const validIds = question.options?.map((opt) => opt.id) || [];
        answer.forEach((id) => {
          if (!validIds.includes(id)) {
            errors.push(
              `Question ${question.id}: Invalid choice in array "${id}"`
            );
          }
        });
      }
    } else if (question.type === "scale") {
      const min = question.scale?.min || 1;
      const max = question.scale?.max || 5;
      if (typeof answer !== "number" || answer < min || answer > max) {
        errors.push(
          `Question ${question.id}: Expected number between ${min} and ${max}`
        );
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

module.exports = {
  calculateProfile,
  calculateProfileNormalized,
  validateAnswers,
  PROFILES,
};
