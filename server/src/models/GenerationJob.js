import mongoose from 'mongoose';

const generationJobSchema = new mongoose.Schema(
  {
    mysteryId: { type: String, required: true },
    status: { type: String, enum: ['Queued', 'Running', 'Completed', 'Failed'], default: 'Queued' },
    stage: String,
    progress: Number,
    errorCode: String,
    errorMessage: String,
    attemptCount: { type: Number, default: 0 },
    startedAt: Date,
    completedAt: Date,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'generation_jobs' },
);

export const GenerationJob = mongoose.models.GenerationJob || mongoose.model('GenerationJob', generationJobSchema);
