import { createCaseId, createSuspectId, createEvidenceId } from '../utils/ids.js';
import { validateMysteryData } from '../services/mysteryValidationService.js';
import { mysteryStore } from '../stores/mysteryStore.js';


const buildSampleMystery = (payload) => {
  const suspectCount = Number(payload.suspectCount || 4);
  const suspects = Array.from({ length: suspectCount }, (_, index) => ({
    id: createSuspectId(index),
    name: ['Elena Hart', 'Marcus Vale', 'Rhea Bloom', 'Theo Price', 'Nina Cross', 'Jonas Reed'][index] || `Suspect ${index + 1}`,
    age: 30 + index,
    role: ['Curator', 'Head of Security', 'Archivist', 'Investor', 'Reporter', 'Mechanic'][index] || 'Witness',
    publicBio: 'A fictional figure connected to the case through circumstance and timing.',
    publicMotive: 'Each suspect had a plausible reason to act suspiciously.',
    portraitAssetId: `portrait_${index + 1}`,
    isCulprit: index === 1,
  }));

  const culprit = suspects[1];
  const evidence = [
    {
      id: createEvidenceId(0),
      type: 'Message',
      title: 'Late-night exchange',
      description: 'Marcus tells Elena he can still arrive before midnight, contradicting any claim that he stayed away and placing his plan inside the theft window.',
      solutionRelevance: 'The message is from Marcus and sets a specific late arrival time. It gives him a reason to be near the gallery after closing and conflicts with an alibi that puts him elsewhere.',
      timestamp: '2026-10-27T22:14:00Z',
      content: { sender: 'Marcus Vale', receiver: 'Elena Hart', messages: ['I can still make it before midnight.'] },
      relatedSuspectIds: [suspects[0].id, culprit.id],
      relatedEvidenceIds: [],
      generationStatus: 'Ready',
    },
    {
      id: createEvidenceId(1),
      type: 'Image',
      title: 'Storage room photograph',
      description: 'A timestamped photograph shows the storage-room door left ajar at 22:48, shortly before the CCTV sighting.',
      solutionRelevance: 'The door is already open only minutes before Marcus appears on camera. This supports the route and timing of the entry, while the photograph alone does not identify who opened it.',
      timestamp: '2026-10-27T22:48:00Z',
      content: { caption: 'The room appears disturbed just before the alarm resets.', altText: 'A dimly lit gallery storage room.' },
      relatedSuspectIds: [culprit.id],
      relatedEvidenceIds: [],
      generationStatus: 'Ready',
    },
    {
      id: createEvidenceId(2),
      type: 'CCTV',
      title: 'CCTV observation',
      description: 'North-corridor CCTV captures Marcus Vale entering the restricted storage-room corridor at 22:52.',
      solutionRelevance: 'The recording places Marcus at the storage-room entrance during the theft window, matching the access route shown by the photograph.',
      timestamp: '2026-10-27T22:52:00Z',
      content: { cameraId: 'CAM-07', location: 'North corridor', summary: 'Marcus Vale is identifiable entering the restricted corridor at 22:52.' },
      relatedSuspectIds: [culprit.id],
      relatedEvidenceIds: [],
      generationStatus: 'Ready',
    },
  ];

  const mystery = {
    _id: createCaseId(),
    title: 'The Glass Ledger',
    scenario: payload.scenario,
    summary: 'A valuable object disappears during a storm, leaving a trail of contradicting alibis.',
    difficulty: payload.difficulty,
    mysteryType: payload.mysteryType,
    status: 'Ready',
    suspects: suspects.map((suspect) => ({
      ...suspect,
      publicMotive: suspect.id === culprit.id ? 'He wanted access to the ledger before the auction.' : 'Public suspicion matched a plausible motive.',
    })),
    evidence,
    timeline: [
      { time: '2026-10-27T21:45:00Z', label: 'Gallery closes', description: 'The gallery closes and the final inventory is checked.' },
      { time: '2026-10-27T22:15:00Z', label: 'Suspicious message', description: 'A message exchange points to a late arrival.' },
      { time: '2026-10-27T22:52:00Z', label: 'CCTV movement', description: 'Security footage captures the culprit near the storage room.' },
    ],
    solution: {
      culpritSuspectId: culprit.id,
      motive: 'Marcus needed to sell the Glass Ledger to settle a debt before the auction closed, giving him both a financial reason and a deadline.',
      method: 'As head of security, Marcus knew the gallery routines. He arranged a late arrival by message, used the storage-room access route while the door was left open, removed the ledger, and relied on the storm and his role to make his movements seem routine.',
      eventSequence: [
        'The gallery was kept under surveillance while the culprit feigned concern for the inventory.',
        'A late communication created the impression of an unrelated interruption.',
        'The culprit used a gap in the security routine to reach the storage room and hide the object.',
      ],
      decisiveEvidenceIds: [evidence[0].id, evidence[1].id, evidence[2].id],
      suspectExclusions: ['Elena Hart was seen leaving the corridor before the theft window.', 'Rhea Bloom was still under staff supervision.'],
      redHerringExplanations: ['The storm created a plausible but false alibi for an outsider.'],
      solutionExplanation: 'The message establishes Marcus’s planned late arrival, the photograph shows the storage-room door open just before he appears, and CCTV places him at that entrance minutes later. Together, the clues connect his plan to the access route and place him at the scene during the theft window; his security role explains how he could use that route without drawing attention.',
    },
    generationMetadata: {
      provider: 'gemini',
      model: 'gemini-1.5-flash',
      status: 'Complete',
      createdAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  mysteryStore.set(mystery._id, mystery);
  return mystery;
};

export const createMystery = async (req, res, next) => {
  try {
    const payload = req.body;
    const validation = validateMysteryData(payload);

    if (!validation.valid) {
      return next({
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: validation.errors[0],
      });
    }

    const mystery = buildSampleMystery(payload);
    res.status(201).json({
      mysteryId: mystery._id,
      jobId: `job_${Date.now()}`,
      status: 'accepted',
    });
  } catch (error) {
    next(error);
  }
};

export const getMystery = async (req, res, next) => {
  try {
    const mystery = mysteryStore.get(req.params.mysteryId);

    if (!mystery) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Mystery not found.' });
    }

    const publicMystery = {
      id: mystery._id,
      title: mystery.title,
      summary: mystery.summary,
      difficulty: mystery.difficulty,
      mysteryType: mystery.mysteryType,
      status: mystery.status,
      suspects: mystery.suspects.map(({ id, name, age, role, publicBio, publicMotive, portraitAssetId }) => ({
        id,
        name,
        age,
        role,
        publicBio,
        publicMotive,
        portraitAssetId,
      })),
      evidence: mystery.evidence.map(({ id, type, title, description, timestamp, relatedSuspectIds, relatedEvidenceIds, generationStatus }) => ({
        id,
        type,
        title,
        description,
        timestamp,
        relatedSuspectIds,
        relatedEvidenceIds,
        generationStatus,
      })),
      timeline: mystery.timeline,
      generationMetadata: mystery.generationMetadata,
      createdAt: mystery.createdAt,
      updatedAt: mystery.updatedAt,
    };

    res.json(publicMystery);
  } catch (error) {
    next(error);
  }
};

export const getMysteryStatus = async (req, res, next) => {
  try {
    const mystery = mysteryStore.get(req.params.mysteryId);

    if (!mystery) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Mystery not found.' });
    }

    res.json({
      mysteryId: mystery._id,
      status: mystery.status,
      stage: 'ready',
      progress: 100,
    });
  } catch (error) {
    next(error);
  }
};

export const getEvidence = async (req, res, next) => {
  try {
    const mystery = mysteryStore.get(req.params.mysteryId);

    if (!mystery) {
      return next({ statusCode: 404, code: 'NOT_FOUND', message: 'Mystery not found.' });
    }

    res.json({
      mysteryId: mystery._id,
      evidence: mystery.evidence,
    });
  } catch (error) {
    next(error);
  }
};
