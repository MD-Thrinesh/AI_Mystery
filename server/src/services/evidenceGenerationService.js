export const generateEvidenceBundle = (mystery) => ({
  messageEvidence: [{
    id: 'ev_01',
    type: 'Message',
    title: 'Final exchange',
    timestamp: '2026-10-27T22:14:00Z',
    description: 'A crucial message confirms the timing conflict.',
  }],
  imageEvidence: [{
    id: 'ev_02',
    type: 'Image',
    title: 'Storage room still',
    timestamp: '2026-10-27T22:48:00Z',
    description: 'An image showing the disturbed room and the suspect path.',
  }],
  cctvEvidence: [{
    id: 'ev_03',
    type: 'CCTV',
    title: 'North corridor recording',
    timestamp: '2026-10-27T22:52:00Z',
    description: 'Camera footage used to verify the culprit route.',
  }],
  mystery,
});
