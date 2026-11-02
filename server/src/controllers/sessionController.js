import { createSessionId } from '../utils/ids.js';
import { mysteryStore } from '../stores/mysteryStore.js';

const sessionStore = new Map();

export const createSession = async (req, res, next) => {
  try {
    const mysteryId = req.params.mysteryId;
    const sessionId = createSessionId();
    const session = {
      id: sessionId,
      mysteryId,
      status: 'InProgress',
      reviewedEvidenceIds: [],
      notes: '',
      selectedSuspectId: null,
      startedAt: new Date(),
      accusation: null,
      result: null,
    };

    sessionStore.set(sessionId, session);
    res.status(201).json({
      sessionId,
      authMethod: 'session-cookie',
      mysteryId,
      status: 'InProgress',
    });
  } catch (error) {
    next(error);
  }
};

export const updateProgress = async (req, res, next) => {
  try {
    const session = sessionStore.get(req.params.sessionId);
    if (!session) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Session not found.' });
    }

    session.reviewedEvidenceIds = req.body.reviewedEvidenceIds || session.reviewedEvidenceIds;
    session.notes = req.body.notes || session.notes;
    session.selectedSuspectId = req.body.selectedSuspectId || session.selectedSuspectId;
    session.updatedAt = new Date();

    res.json({
      sessionId: req.params.sessionId,
      reviewedEvidenceIds: session.reviewedEvidenceIds,
      notes: session.notes,
      selectedSuspectId: session.selectedSuspectId,
      status: session.status,
    });
  } catch (error) {
    next(error);
  }
};

export const submitAccusation = async (req, res, next) => {
  try {
    const session = sessionStore.get(req.params.sessionId);
    if (!session) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Session not found.' });
    }

    if (session.accusation) {
      return next({ statusCode: 409, code: 'DUPLICATE_SUBMISSION', message: 'This accusation has already been submitted.' });
    }

    const suspectId = req.body.suspectId;
    const mystery = mysteryStore.get(session.mysteryId);

    if (!mystery) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Mystery not found.' });
    }

    const correct = mystery.solution.culpritSuspectId === suspectId;
    const score = correct ? 100 : 0;

    session.accusation = {
      suspectId,
      submittedAt: new Date(),
    };
    session.status = 'Completed';
    session.result = {
      correct,
      score,
      message: correct ? 'Correct â€” you solved the mystery.' : 'Incorrect â€” the case remains unsolved.',
    };

    res.json({
      sessionId: req.params.sessionId,
      correct,
      score,
      message: session.result.message,
    });
  } catch (error) {
    next(error);
  }
};

export const getSolution = async (req, res, next) => {
  try {
    const session = sessionStore.get(req.params.sessionId);
    if (!session) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Session not found.' });
    }

    const reveal = req.query.reveal === 'true';
    if (!session.accusation && !reveal) {
      return next({ statusCode: 403, code: 'UNAUTHORIZED', message: 'Solution is not yet accessible.' });
    }

    const mystery = mysteryStore.get(session.mysteryId);
    if (!mystery) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Mystery not found.' });
    }

    res.json({
      sessionId: req.params.sessionId,
      culpritName: mystery.suspects.find((suspect) => suspect.id === mystery.solution.culpritSuspectId)?.name,
      motive: mystery.solution.motive,
      method: mystery.solution.method,
      eventSequence: mystery.solution.eventSequence,
      decisiveEvidence: mystery.solution.decisiveEvidenceIds.map((id) => {
        const evidence = mystery.evidence.find((item) => item.id === id);
        return evidence ? { id, title: evidence.title, explanation: evidence.solutionRelevance || evidence.description } : null;
      }).filter(Boolean),
      solutionExplanation: mystery.solution.solutionExplanation,
      redHerringExplanations: mystery.solution.redHerringExplanations,
      correct: session.result?.correct || false,
    });
  } catch (error) {
    next(error);
  }
};
