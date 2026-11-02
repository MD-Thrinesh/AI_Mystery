export const createCaseId = () => `case_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
export const createSessionId = () => `sess_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
export const createEvidenceId = (index = 0) => `ev_${String(index + 1).padStart(2, '0')}`;
export const createSuspectId = (index = 0) => `sus_${String(index + 1).padStart(2, '0')}`;
