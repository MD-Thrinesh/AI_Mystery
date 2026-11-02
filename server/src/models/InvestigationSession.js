import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    mysteryId: { type: String, required: true },
    sessionTokenHash: String,
    reviewedEvidenceIds: [String],
    notes: String,
    selectedSuspectId: String,
    status: { type: String, enum: ['InProgress', 'Completed', 'Abandoned'], default: 'InProgress' },
    startedAt: { type: Date, default: Date.now },
    completedAt: Date,
    accusation: {
      suspectId: String,
      submittedAt: Date,
    },
    result: {
      correct: Boolean,
      score: Number,
      message: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'investigation_sessions' },
);

export const InvestigationSession = mongoose.models.InvestigationSession || mongoose.model('InvestigationSession', sessionSchema);
