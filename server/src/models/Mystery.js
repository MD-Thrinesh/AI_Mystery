import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    age: Number,
    role: String,
    publicBio: String,
    publicMotive: String,
    portraitAssetId: String,
    isCulprit: { type: Boolean, default: false },
  },
  { _id: false },
);

const evidenceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    timestamp: String,
    content: mongoose.Schema.Types.Mixed,
    assetId: String,
    relatedSuspectIds: [String],
    relatedEvidenceIds: [String],
    generationStatus: { type: String, default: 'Ready' },
    solutionRelevance: String,
  },
  { _id: false },
);

const timelineSchema = new mongoose.Schema(
  {
    time: { type: String, required: true },
    label: { type: String, required: true },
    description: String,
  },
  { _id: false },
);

const solutionSchema = new mongoose.Schema(
  {
    culpritSuspectId: String,
    motive: String,
    method: String,
    eventSequence: [String],
    decisiveEvidenceIds: [String],
    suspectExclusions: [String],
    redHerringExplanations: [String],
    solutionExplanation: String,
  },
  { _id: false },
);

const mysterySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    scenario: { type: String, required: true },
    summary: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    mysteryType: { type: String, required: true },
    status: { type: String, enum: ['Generating', 'Ready', 'Failed', 'Archived'], default: 'Ready' },
    suspects: [suspectSchema],
    evidence: [evidenceSchema],
    timeline: [timelineSchema],
    solution: solutionSchema,
    generationMetadata: {
      provider: String,
      model: String,
      status: String,
      createdAt: Date,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'mysteries' },
);

export const Mystery = mongoose.models.Mystery || mongoose.model('Mystery', mysterySchema);
