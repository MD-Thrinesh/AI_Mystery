# AI Mystery Room — Product Specification Sheet (SSOT)

**Document type:** Product Requirements + Technical Specification  
**Project name:** AI Mystery Room  
**Document status:** Initial implementation specification  
**Target implementation:** MVP (Minimum Viable Product)  
**Frontend:** React.js  
**Backend:** Node.js + Express.js  
**Database:** MongoDB  
**AI provider:** Google Gemini  
**Primary coding agent:** OpenAI Codex  
**Version:** 1.0  
**Date:** October 28, 2026

---

# 1. Project Overview

## 1.1 Product Description

AI Mystery Room is an interactive, AI-powered mystery investigation website. Users submit a short fictional scenario, story idea, or mystery theme. The application transforms that input into an interactive investigation containing suspects, clues, evidence, a hidden culprit, and a final accusation stage.

Users investigate the case by reviewing evidence such as:

- WhatsApp-style conversations.
- AI-generated photographs and other visual evidence.
- CCTV-style recordings or video evidence.
- Witness statements.
- Timelines, alibis, and other investigative documents.

Users must examine the evidence, connect facts, identify contradictions, and select the person responsible for the fictional crime or mystery.

After submission, the application reveals the correct answer and explains how the evidence supports the solution.

## 1.2 Problem Statement

Traditional mystery games often use fixed storylines and predictable clues. AI Mystery Room aims to provide replayable, personalized mysteries generated from user-provided scenarios.

The application should combine AI-generated storytelling, evidence exploration, and logical deduction in a single website.

## 1.3 Product Goals

1. Allow users to create mysteries from their own scenario ideas.
2. Generate coherent fictional investigations using Gemini.
3. Provide different types of evidence in an interactive interface.
4. Keep the culprit hidden until the user submits a final accusation or explicitly reveals the answer.
5. Ensure every mystery has a logically defensible solution.
6. Support multiple mystery sessions and preserve progress.
7. Provide explanations showing how the clues establish the solution.
8. Build a maintainable MERN architecture that can support additional AI capabilities later.

## 1.4 Non-Goals for the MVP

The initial release will not include:

- Real police investigations or real-world criminal identification.
- Live access to actual WhatsApp accounts, CCTV systems, or private devices.
- Multiplayer investigations.
- Public user-generated mystery sharing.
- Subscription payments or monetization.
- A complex ranking, leaderboard, or achievement system.
- Custom model training.
- Live camera recording or surveillance.

All investigations and characters must be fictional.

---

# 2. Target Users

### Primary users

People who enjoy detective games, crime fiction, puzzle solving, escape rooms, and interactive storytelling.

### Secondary users

- Students interested in logical reasoning.
- Content creators seeking original mystery scenarios.
- Users exploring AI-generated interactive entertainment.

### Core user need

"I want to create or experience a mystery, examine the evidence, and solve the case myself."

---

# 3. Core User Journey

1. The user opens the home page.
2. The user selects **Create a Mystery**.
3. The user enters a story or scenario.
4. The user chooses the mystery difficulty and optional settings.
5. The application validates the input and sends a generation request to the backend.
6. Gemini generates the investigation plan, suspects, hidden solution, timeline, clues, and evidence descriptions.
7. The backend validates the generated mystery and saves it to MongoDB.
8. The application generates or retrieves the required AI-created evidence assets.
9. The user enters the Mystery Room.
10. The user explores suspects, messages, photographs, CCTV evidence, and other documents.
11. The user selects a culprit and submits an accusation.
12. The application evaluates the accusation.
13. The application displays the result, explanation, supporting clues, and optional replay action.

**Important:** The interface must not expose the correct culprit, hidden solution, or private solution fields before the user submits an accusation or chooses to reveal the answer.

---

# 4. Functional Requirements

## FR-01: Home Page

The home page must provide:

- Application name and branding.
- A short description of the game.
- A primary **Create a Mystery** button.
- A secondary **How to Play** section.
- A short explanation that cases are fictional and AI-generated.
- Responsive navigation.

The primary button must open the mystery creation page.

## FR-02: Mystery Creation

The user must be able to enter:

- **Scenario:** Required free-text description.
- **Difficulty:** Easy, Medium, or Hard.
- **Mystery type:** Theft, murder mystery, disappearance, sabotage, or general mystery.
- **Number of suspects:** Default 4; supported range 3–6.
- **Evidence intensity:** Standard or Detailed.
- **Optional setting:** Location, time period, or atmosphere.

The user must be able to submit the form and generate a case.

### Validation rules

- Scenario length: 30–2,000 characters.
- Scenario cannot be empty.
- Number of suspects must be between 3 and 6.
- Difficulty and mystery type must be valid predefined values.
- Trim leading and trailing whitespace.
- Reject oversized or malformed requests.
- Treat user input as story data, not as instructions that can override application rules.

The application must show validation errors next to the relevant fields.

## FR-03: AI Mystery Generation

Gemini must generate a structured mystery containing:

- Case title and summary.
- Fictional setting and background.
- A list of suspects.
- Suspect profiles and motives.
- The culprit and the actual sequence of events.
- A canonical event timeline.
- Evidence items and their relationships to the timeline.
- Clues supporting the solution.
- Red herrings that are misleading but explainable.
- The final solution and reasoning.
- A difficulty-appropriate accusation outcome.

All generated information must be internally consistent.

### Mystery generation rules

1. Exactly one culprit must be designated as the primary solution in the MVP.
2. The culprit must be one of the generated suspects.
3. The case must be solvable using the available evidence.
4. At least three meaningful clues must support the solution.
5. Each suspect must have a unique ID.
6. Every evidence item must have a unique ID.
7. Evidence timestamps must be consistent with the canonical timeline.
8. Alibis and statements must not contradict the solution accidentally.
9. Red herrings must have a plausible explanation in the final solution.
10. The culprit must not be disclosed in the public case description.
11. The backend must validate the generated data before making the case playable.
12. If validation fails, the backend should request a bounded repair or regeneration attempt and then return a clear error if the case remains invalid.

The model must return structured JSON matching the application's defined schema. The backend, not the browser, owns the authoritative mystery and its solution.

## FR-04: Suspect Board

The investigation page must display suspect cards containing:

- Fictional name.
- Generated portrait or approved AI-generated visual.
- Relationship to the case.
- Public background information.
- Publicly known motive or reason for suspicion.
- A button to view the complete suspect profile.

Private solution information must not appear in suspect profiles.

The suspect board must allow the user to compare suspects without losing investigation progress.

## FR-05: WhatsApp-Style Evidence

The application must provide a chat evidence viewer that resembles a fictional messaging application.

Each conversation may contain:

- Sender name.
- Receiver or group name.
- Message text.
- Timestamp.
- Message ordering.
- Fictional delivery/read indicators where appropriate.
- Attachments or references to other evidence items.
- Multiple participants in group conversations.

Messages must be generated from the canonical mystery and must support the intended solution.

The interface must clearly identify the content as fictional evidence, not a real WhatsApp export.

## FR-06: AI-Generated Image Evidence

The application must support evidence images such as:

- Scene photographs.
- Suspect-related photographs.
- Objects or physical evidence.
- Location images.
- Relevant details that help establish the timeline or identify contradictions.

Requirements:

- Images must be generated specifically for the fictional case.
- Images must have evidence IDs and captions.
- Each image must have a short description and relevance metadata.
- The user must be able to open an image in a larger viewer.
- The image must be associated with the correct case.
- Generated image assets must be stored through an appropriate asset-storage service, with their metadata saved in MongoDB.
- Failed image generation must not leave the case in a misleading state.

Where possible, generated images should avoid visible text. Any important text or timestamps should be rendered as interface overlays or stored as structured evidence metadata.

## FR-07: CCTV-Style Evidence

The application must support fictional security-camera evidence.

A CCTV evidence item should include:

- Camera identifier.
- Fictional camera location.
- Recording date and time.
- Duration, if a video is available.
- A short summary.
- Relevant timestamps or time ranges.
- Important observations.
- A reference to the associated video, still frames, or transcript.
- A statement of what the recording does and does not establish.

The intended user experience is a CCTV viewer with playback controls when actual generated video is available.

### Media generation requirement

Gemini is the primary reasoning and content-generation provider. The implementation must verify the capabilities of the configured Gemini model and API before assuming that it can generate video files.

The media-generation layer must support an interchangeable provider adapter for AI-generated images and, where supported, AI-generated video. If the selected provider cannot generate video, the system must use another configured AI video-generation provider rather than falsely label a static image or text description as an actual video.

If no video provider is configured, the case must clearly show a video-generation limitation or use a clearly labeled CCTV evidence alternative, such as AI-generated still frames and an AI-generated observation transcript. This fallback must not be presented as a real video recording.

## FR-08: Evidence Board

The investigation interface must provide an evidence board or evidence library.

Users must be able to:

- Browse all evidence items.
- Filter evidence by type.
- Open an evidence item.
- Read its description and metadata.
- Navigate to related suspects or evidence.
- Mark evidence as reviewed.
- Add personal investigation notes.
- View the canonical evidence timestamps without seeing the hidden solution.

Supported evidence categories:

- Messages.
- Images.
- CCTV/video.
- Witness statements.
- Documents.
- Timeline records.

The evidence board must not reveal whether a clue is decisive, misleading, or connected to the culprit.

## FR-09: Investigation Timeline

The application must show a chronological timeline of publicly available events.

Users must be able to compare:

- Message timestamps.
- Witness statements.
- Suspect alibis.
- Photograph timestamps.
- CCTV observations.
- Other case events.

The timeline must preserve the actual timestamps generated for the case. It must not introduce conflicting times when rendering evidence.

The application may show unknown or disputed time ranges where appropriate.

## FR-10: Final Accusation

The accusation screen must:

- Display the suspects available for selection.
- Allow exactly one suspect to be selected.
- Allow the user to submit the accusation.
- Prevent duplicate submissions for the same completed session.
- Show a loading state while the result is calculated.
- Display the outcome after submission.

The submitted suspect ID must be validated against the case's suspect list.

The server must evaluate the accusation against the authoritative solution stored in MongoDB.

## FR-11: Solution Reveal

After the accusation, the application must display:

- Whether the accusation was correct.
- The actual culprit's name and profile.
- The motive.
- The sequence of events.
- The decisive clues.
- The contradictions that rule out other suspects.
- The explanation of relevant red herrings.
- The user's final score, if scoring is enabled.
- Buttons to return home or start another mystery.

The explanation must reference actual evidence IDs from the case.

The final explanation must not introduce entirely new decisive evidence that was unavailable during the investigation.

## FR-12: Investigation Progress

The application must preserve:

- Case ID.
- Reviewed evidence IDs.
- User notes.
- Session start time.
- Current investigation state.
- Selected suspect before final submission.
- Final accusation and result after submission.

Progress should be stored on the server and restored when the user returns to an active case.

For the MVP, anonymous sessions may use a securely generated session identifier stored in a suitable browser cookie. Do not rely on a user-editable case ID alone to authorize access to private solution data.

---

# 5. Difficulty System

## Easy

- 3–4 suspects.
- Clearer evidence.
- Fewer red herrings.
- Direct clues that can be connected with basic reasoning.

## Medium

- 4–5 suspects.
- Multiple pieces of evidence must be combined.
- Some misleading statements.
- Contradictions between alibis and timestamps.

## Hard

- 5–6 suspects.
- More complex timelines.
- Subtle inconsistencies.
- Multiple red herrings with plausible explanations.
- Several evidence items required to establish the solution.

Difficulty must affect the mystery's logical complexity, not merely increase the amount of text.

---

# 6. AI Architecture and Generation Pipeline

## 6.1 Provider Responsibilities

### Gemini

Gemini is responsible for:

- Converting the user's scenario into a coherent investigation.
- Generating structured case data.
- Creating fictional suspect profiles.
- Generating messages and witness statements.
- Designing evidence and the event timeline.
- Producing the final reasoning and explanation.
- Helping repair invalid generated cases.
- Creating image prompts and, if supported by the configured model, image assets.

### Media provider adapter

A separate backend service must manage image and video generation capabilities.

It must:

- Select the configured media provider.
- Submit generation jobs.
- Track job status.
- Handle timeouts and provider errors.
- Save generated assets to storage.
- Return stable asset references.
- Support retries within configured limits.

The media adapter should be replaceable without changing the React application or core case schema.

## 6.2 Generation Sequence

1. Validate the user's input.
2. Create a generation job.
3. Generate the canonical mystery plan and hidden solution.
4. Validate the mystery structure and logic.
5. Generate evidence text from the canonical plan.
6. Validate timestamps, references, and clue coverage.
7. Generate image/video assets using configured providers.
8. Save case and evidence metadata to MongoDB.
9. Update the job status.
10. Make the case playable when its required evidence is ready.

The application must not expose a partially generated case as complete.

If optional media generation fails, the backend may complete the case using explicitly supported and clearly labeled alternatives. Required evidence must never be silently omitted.

## 6.3 Structured Generation

The backend must require Gemini responses to match the application's JSON schema.

It must reject or repair:

- Invalid JSON.
- Missing fields.
- Duplicate IDs.
- Unknown suspect references.
- A culprit ID that does not exist.
- Invalid difficulty values.
- Impossible or contradictory timestamps.
- Missing required clues.
- Public fields that disclose the solution.
- Evidence references that point to nonexistent items.

AI output must be treated as untrusted input, even when it comes from the configured provider.

## 6.4 AI Service Reliability

The application must:

- Use server-side API credentials.
- Apply request timeouts.
- Apply bounded retries.
- Handle rate limits and provider failures.
- Avoid logging API keys or full sensitive provider responses.
- Store model identifiers and generation status for debugging.
- Keep AI prompts in backend service files or configuration rather than duplicating them across frontend components.

Model names and model capabilities must be configurable rather than hardcoded throughout the codebase.

---

# 7. Technology Stack

## Frontend

- React.js.
- Vite for development and production builds.
- React Router for page navigation.
- A consistent component and styling system.
- Fetch or Axios for backend requests.
- Responsive CSS.

## Backend

- Node.js.
- Express.js.
- MongoDB.
- Mongoose for schema validation and database access.
- Google Gemini API through the official supported SDK.
- Zod or an equivalent schema-validation library.
- A suitable session and cookie-management mechanism.

## Storage

- MongoDB for case data, evidence metadata, and investigation progress.
- Object storage for generated image and video assets.
- Environment variables for database URLs, API keys, and provider configuration.

Large binary files must not be stored directly in ordinary MongoDB documents.

## Development tools

- Git and GitHub.
- npm.
- ESLint.
- Automated tests.
- `.env.example` for required environment variable names without actual secrets.

Codex must verify package compatibility and current supported SDK usage before installing dependencies.

---

# 8. Application Architecture

The application must follow a clear separation of concerns.

## Frontend structure

```text
client/
  src/
    components/
      Navbar.jsx
      Button.jsx
      LoadingState.jsx
      ErrorMessage.jsx
      SuspectCard.jsx
      EvidenceCard.jsx
      ChatViewer.jsx
      ImageViewer.jsx
      CCTVViewer.jsx
      Timeline.jsx
    pages/
      HomePage.jsx
      CreateMysteryPage.jsx
      InvestigationPage.jsx
      SolutionPage.jsx
      NotFoundPage.jsx
    services/
      api.js
    hooks/
    utils/
    styles/
    App.jsx
    main.jsx
```

## Backend structure

```text
server/
  src/
    config/
      database.js
      env.js
    models/
      Mystery.js
      InvestigationSession.js
      GenerationJob.js
    routes/
      mysteryRoutes.js
      sessionRoutes.js
      healthRoutes.js
    controllers/
      mysteryController.js
      sessionController.js
    services/
      geminiService.js
      mysteryGenerationService.js
      mysteryValidationService.js
      evidenceGenerationService.js
      mediaProviderService.js
      scoringService.js
    middleware/
      errorHandler.js
      rateLimiter.js
      validateRequest.js
    validators/
      mysterySchemas.js
    utils/
      ids.js
      errors.js
    app.js
    server.js
```

This is the initial suggested structure. Codex may adjust file names or add modules when necessary, but it must preserve the separation between UI, API, business logic, AI integration, and persistence.

---

# 9. MongoDB Data Model

## 9.1 Mystery Collection

Each mystery document must contain:

- `_id`: MongoDB identifier.
- `title`: Public case title.
- `scenario`: Original user-provided scenario.
- `summary`: Public case summary.
- `difficulty`: Easy, Medium, or Hard.
- `mysteryType`: Selected mystery category.
- `status`: Generating, Ready, Failed, or Archived.
- `suspects`: Array of suspect objects.
- `evidence`: Array of evidence metadata objects.
- `timeline`: Canonical timeline.
- `solution`: Private solution object.
- `generationMetadata`: Provider, model, timestamps, and status metadata.
- `createdAt` and `updatedAt`.

### Suspect object

- `id`: Unique case-local ID.
- `name`: Fictional name.
- `age`: Optional fictional age.
- `role`: Relationship to the case.
- `publicBio`: Public background.
- `publicMotive`: Publicly known reason for suspicion.
- `portraitAssetId`: Optional generated asset reference.
- `isCulprit`: Private server-only field or equivalent solution reference.

The culprit designation must never be included in the public suspect response.

### Evidence object

- `id`: Unique evidence ID.
- `type`: Message, Image, CCTV, Statement, Document, or Timeline.
- `title`: Evidence title.
- `description`: Public evidence description.
- `timestamp`: ISO 8601 timestamp or an explicit unknown value.
- `content`: Type-specific structured evidence.
- `assetId`: Optional media asset reference.
- `relatedSuspectIds`: Publicly appropriate suspect references.
- `relatedEvidenceIds`: Publicly appropriate evidence references.
- `generationStatus`: Pending, Ready, or Failed.
- `createdAt`: Creation timestamp.

### Private solution object

- `culpritSuspectId`: Authoritative culprit ID.
- `motive`: Actual motive.
- `eventSequence`: Canonical sequence of events.
- `decisiveEvidenceIds`: Evidence supporting the solution.
- `suspectExclusions`: Explanations for ruling out other suspects.
- `redHerringExplanations`: Explanations for misleading evidence.
- `solutionExplanation`: Final reasoning.

**Security requirement:** MongoDB may store public and private mystery data in the same document, but public API responses must use explicit serializers or DTOs that exclude private fields. Never return a raw Mystery document to the client.

## 9.2 Investigation Session Collection

Fields:

- `_id`: Session ID.
- `mysteryId`: Reference to the mystery.
- `sessionTokenHash`: Hash of a securely generated session token, when anonymous session authentication is used.
- `reviewedEvidenceIds`: IDs of reviewed evidence.
- `notes`: User investigation notes.
- `selectedSuspectId`: Current selection.
- `status`: InProgress, Completed, or Abandoned.
- `startedAt`: Start time.
- `completedAt`: Optional completion time.
- `accusation`: Final accusation object.
- `result`: Correct/incorrect outcome and permitted score fields.
- `createdAt` and `updatedAt`.

## 9.3 Generation Job Collection

Fields:

- `_id`: Job ID.
- `mysteryId`: Associated case ID.
- `status`: Queued, Running, Completed, or Failed.
- `stage`: Current generation stage.
- `progress`: Optional percentage from 0 to 100.
- `errorCode`: Safe error identifier.
- `errorMessage`: User-safe error message.
- `attemptCount`: Retry count.
- `startedAt`, `completedAt`, `createdAt`, and `updatedAt`.

Progress values must reflect real backend work and must not be fabricated solely to animate a progress bar.

---

# 10. REST API Specification

Base path: `/api/v1`

All JSON requests and responses must use consistent field names and error formats.

## 10.1 Health

### `GET /health`

Purpose: Verify that the backend is running.

Response:

```json
{
  "status": "ok"
}
```

Database and provider health checks may be exposed through a separate protected operational endpoint.

## 10.2 Create Mystery

### `POST /mysteries`

Request:

```json
{
  "scenario": "A valuable painting disappears from a locked gallery.",
  "difficulty": "medium",
  "mysteryType": "theft",
  "suspectCount": 4,
  "evidenceIntensity": "standard",
  "setting": "A private gallery during a storm"
}
```

Expected behavior:

- Validate input.
- Create a mystery generation job.
- Generate the case.
- Persist valid case data.
- Return a job ID and mystery ID.
- Do not expose the solution.

For potentially long-running media generation, return `202 Accepted` and let the client poll the generation status.

## 10.3 Generation Status

### `GET /mysteries/:mysteryId/status`

Returns:

- Mystery ID.
- Job status.
- Current stage.
- Actual progress, when available.
- A safe error message if generation failed.

## 10.4 Get Mystery

### `GET /mysteries/:mysteryId`

Returns the public mystery representation, including:

- Public metadata.
- Public suspect profiles.
- Evidence metadata.
- Public timeline.
- Generation readiness.

It must not return the hidden solution or culprit designation.

## 10.5 Get Evidence

### `GET /mysteries/:mysteryId/evidence`

Returns the evidence library, with optional filters such as `type` and `status`.

The server must return only evidence belonging to that mystery.

## 10.6 Get Evidence Item

### `GET /mysteries/:mysteryId/evidence/:evidenceId`

Returns one public evidence item and its permitted related references.

## 10.7 Create Investigation Session

### `POST /mysteries/:mysteryId/sessions`

Creates an investigation session for a ready mystery.

The response includes the session ID and the session's authentication mechanism. Session access must be authorized on subsequent requests.

## 10.8 Update Progress

### `PATCH /sessions/:sessionId/progress`

Request:

```json
{
  "reviewedEvidenceIds": ["ev_01", "ev_03"],
  "notes": "The second message conflicts with the stated timeline.",
  "selectedSuspectId": "sus_02"
}
```

The backend must validate evidence and suspect IDs against the associated mystery.

## 10.9 Submit Accusation

### `POST /sessions/:sessionId/accusation`

Request:

```json
{
  "suspectId": "sus_02"
}
```

The server evaluates the accusation, records the result, and returns the permitted outcome.

The request must be idempotent or reject duplicate submissions safely. The browser must not be able to decide whether the accusation is correct.

## 10.10 Get Solution

### `GET /sessions/:sessionId/solution`

Returns the solution only when the session has completed a valid accusation or the user has used an explicitly supported reveal-answer action.

The solution endpoint must enforce the access policy on the server.

## 10.11 Error Format

All API errors should use a consistent structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please provide a valid scenario."
  }
}
```

Expected HTTP status codes include:

- `200`: Successful request.
- `201`: Resource created.
- `202`: Asynchronous generation accepted.
- `400`: Invalid request.
- `401`: Missing or invalid authentication when required.
- `403`: Unauthorized access.
- `404`: Resource not found.
- `409`: Conflicting state or duplicate final submission.
- `413`: Request payload too large.
- `429`: Rate limit exceeded.
- `500`: Unexpected server error.
- `502` or `503`: AI or media provider unavailable.

Error responses must not expose API keys, internal prompts, stack traces, or the hidden culprit.

---

# 11. Frontend UI and Design System

## 11.1 Visual Direction

The website should feel like a modern detective investigation interface.

Design characteristics:

- Dark investigation-room theme.
- Charcoal or near-black backgrounds.
- Muted gray surfaces.
- Warm amber highlights.
- Subtle red accents for warnings or critical moments.
- Readable typography.
- Clear separation between evidence categories.
- Restrained use of glow, shadows, and animation.

The design must prioritize usability and evidence readability over decorative effects.

## 11.2 Required Pages

### Page A: Home

- Branding.
- Hero section.
- Short product description.
- Create a Mystery CTA.
- How It Works section.
- Feature overview.

### Page B: Create Mystery

- Scenario input.
- Difficulty selector.
- Mystery type selector.
- Suspect count selector.
- Evidence intensity selector.
- Optional setting input.
- Generate button.
- Validation and error states.

### Page C: Generation

- Current generation stage.
- Real progress when available.
- Status messages.
- Retry option for recoverable failures.
- Exit or return navigation.

### Page D: Investigation Room

Recommended layout:

- Left panel: Suspect board.
- Center panel: Selected evidence viewer.
- Right panel: Evidence library, case notes, or case information.
- Secondary section: Timeline.
- Persistent action: Accuse a Suspect.

On mobile, these panels must stack or become tabs.

### Page E: Accusation

- Suspect selection.
- Confirmation of the selected suspect.
- Submit accusation action.
- Clear validation.

### Page F: Solution

- Outcome.
- Correct culprit.
- Motive.
- Canonical timeline.
- Decisive evidence references.
- Explanation.
- Replay or create-another-mystery action.

### Page G: Not Found / Error

- Friendly error message.
- Return-home action.
- No internal server details.

## 11.3 Accessibility and Responsiveness

- Support desktop, tablet, and mobile screens.
- Use semantic HTML.
- Provide keyboard-accessible controls.
- Use visible focus indicators.
- Provide accessible labels for inputs.
- Maintain sufficient text contrast.
- Add meaningful alt text to generated images.
- Respect reduced-motion preferences.
- Do not rely on color alone to communicate evidence status.

---

# 12. Security and Privacy Requirements

1. Keep Gemini API keys and media provider credentials on the backend.
2. Never expose private solution data through frontend code, public API responses, browser storage, or public asset metadata.
3. Validate all incoming requests.
4. Use rate limiting for mystery generation and other expensive endpoints.
5. Apply request-size limits.
6. Restrict CORS to configured application origins in production.
7. Use secure, HTTP-only cookies for session tokens where cookies are used.
8. Apply appropriate CSRF protection when cookie-based authentication is used.
9. Store only necessary session information.
10. Do not execute generated text as code, HTML, or database commands.
11. Use safe text rendering to prevent cross-site scripting.
12. Protect asset URLs and session endpoints from unauthorized access.
13. Do not use actual private conversations, real CCTV footage, or personal data as generated evidence.
14. Do not make real people appear to be involved in fictional crimes.
15. Add request and generation quotas to limit abuse and unexpected provider costs.
16. Keep logs free of credentials and unnecessary personal information.

For anonymous sessions, use cryptographically secure tokens, store only token hashes server-side when practical, and prevent one session from accessing another session's private progress.

---

# 13. Non-Functional Requirements

## Performance

- Normal API requests should aim for a response time under 500 ms at the 95th percentile, excluding AI generation and media processing.
- The interface should show immediate feedback when a long-running generation starts.
- Images and videos should load progressively where supported.
- Generation must be asynchronous when it may exceed ordinary request timeouts.

## Reliability

- Provider failures must result in a recoverable error state.
- Database writes must preserve the consistency of the mystery and its evidence.
- Failed generation jobs must not become playable mysteries.
- Retried operations must not create unintended duplicate cases or accusations.

## Maintainability

- Keep route handlers small.
- Put business logic in services.
- Use explicit request and response schemas.
- Separate AI prompts from API controllers.
- Use centralized error handling.
- Document environment variables and setup commands.

## Scalability

- Do not assume media generation will complete instantly.
- Keep media assets outside MongoDB documents.
- Design generation jobs so a background worker can be introduced later.
- Avoid storing large evidence payloads repeatedly.
- Add appropriate indexes for case and session lookup.

## Observability

Record:

- Generation job ID.
- Mystery ID.
- Provider and model identifiers.
- Stage transitions.
- Retry count.
- Duration.
- Safe error code.

Do not record secrets or unnecessary full prompt contents.

---

# 14. Environment Configuration

Provide a `.env.example` file with placeholders for configuration such as:

```dotenv
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=
GEMINI_API_KEY=
GEMINI_MODEL=
MEDIA_PROVIDER=
MEDIA_PROVIDER_API_KEY=
ASSET_STORAGE_PROVIDER=
ASSET_STORAGE_BUCKET=
SESSION_SECRET=
```

These values are illustrative configuration names. Codex must implement only the variables required by the selected SDKs and services, and document any additional configuration.

Requirements:

- `.env` must be excluded from Git.
- `.env.example` must contain no real secrets.
- The backend must validate required environment variables at startup.
- The frontend must never receive private server environment variables.
- Production deployment must use the hosting provider's secret-management facilities.

---

# 15. Testing Requirements

## Unit tests

Test:

- Scenario validation.
- Difficulty validation.
- Mystery schema validation.
- Culprit reference validation.
- Timeline consistency checks.
- Evidence reference validation.
- Public/private response serialization.
- Accusation scoring.
- Session authorization.

## Integration tests

Test:

- Mystery creation and persistence.
- Generation-job status transitions.
- Retrieval of public case details.
- Evidence retrieval.
- Session creation.
- Progress updates.
- Accusation submission.
- Solution access restrictions.
- Provider timeout and error handling.

## Frontend tests

Test:

- Form validation.
- Generation loading and error states.
- Suspect selection.
- Evidence navigation.
- Notes and reviewed-evidence state.
- Accusation submission.
- Correct and incorrect solution screens.
- Responsive navigation.

## End-to-end acceptance tests

A complete test must:

1. Create a mystery from a scenario.
2. Wait for successful generation.
3. Open the investigation room.
4. Inspect several evidence items.
5. Select a suspect.
6. Submit an accusation.
7. View the solution.
8. Verify that the solution references the evidence that was available during the investigation.

Tests must not depend on live Gemini calls by default. Use mocked provider responses for repeatable automated tests, with a separate optional integration test for a real configured provider.

---

# 16. Definition of Done

The MVP is complete only when all the following conditions are satisfied.

- [ ] A user can create a mystery using a scenario.
- [ ] Difficulty and suspect count are respected.
- [ ] Gemini generates a structured mystery.
- [ ] The mystery contains one valid culprit.
- [ ] The generated case passes validation.
- [ ] The case includes fictional message evidence.
- [ ] The case includes AI-generated image evidence.
- [ ] CCTV/video evidence is provided through a configured AI video provider, or a clearly labeled fallback is used when video generation is unavailable.
- [ ] Evidence items have consistent timestamps and IDs.
- [ ] The user can explore suspects and evidence.
- [ ] The user can compare events using the timeline.
- [ ] The user can save investigation notes and reviewed evidence.
- [ ] The user can submit an accusation.
- [ ] The server determines whether the accusation is correct.
- [ ] The correct solution remains hidden before the permitted reveal.
- [ ] The final solution explains the decisive evidence.
- [ ] Progress is preserved for an authorized returning session.
- [ ] Provider failures display helpful errors.
- [ ] Automated tests cover the core workflow.
- [ ] The project runs using documented setup instructions.
- [ ] No secrets are committed to Git.
- [ ] The website works on desktop and mobile.
- [ ] There are no known critical security issues.

---

# 17. Implementation Plan for Codex

Codex should implement the project in the following phases.

## Phase 1: Foundation

- Initialize the MERN repository.
- Configure the React frontend and Express backend.
- Connect MongoDB.
- Configure environment validation.
- Add health checks.
- Set up linting and tests.
- Create the shared API client and error-handling conventions.

**Completion condition:** The frontend and backend run locally, and the backend can connect to MongoDB.

## Phase 2: Mystery Generation

- Integrate Gemini.
- Define structured generation schemas.
- Generate suspects, timeline, evidence, and private solution.
- Implement validation and bounded repair.
- Save mysteries and generation jobs.
- Add generation status polling.

**Completion condition:** A valid mystery can be generated and stored without exposing its solution to public API responses.

## Phase 3: Evidence and Media

- Implement WhatsApp-style evidence.
- Integrate AI image generation.
- Implement the media provider adapter.
- Integrate AI video generation when configured.
- Implement the labeled CCTV fallback.
- Store generated assets in object storage.
- Link assets to their evidence records.

**Completion condition:** A generated case contains usable, consistent evidence and the correct asset references.

## Phase 4: Investigation UI

- Build the home and creation pages.
- Build the suspect board.
- Build the evidence library and evidence viewers.
- Implement the timeline.
- Implement notes and progress persistence.
- Add loading, empty, and error states.

**Completion condition:** A user can investigate a generated mystery from beginning to end without accessing private solution data.

## Phase 5: Accusation and Reveal

- Implement accusation selection.
- Validate the accusation on the backend.
- Save the final result.
- Enforce solution-access restrictions.
- Build the solution page.
- Add replay and new-mystery actions.

**Completion condition:** The user can complete a case and receive a consistent explanation of the solution.

## Phase 6: Quality Assurance

- Add unit, integration, and end-to-end tests.
- Test provider failures and malformed AI output.
- Check session authorization and solution leakage.
- Test desktop and mobile layouts.
- Document setup, API routes, environment variables, and deployment.
- Fix critical bugs before release.

**Completion condition:** The core acceptance tests pass, and another developer can run the application using the documentation.

---

# 18. Rules for Codex

This specification is the project's Single Source of Truth.

Codex must follow these rules:

1. Read this specification before implementing or modifying the application.
2. Implement the smallest complete feature set that satisfies the requirements.
3. Do not replace MERN or Gemini without explicit approval.
4. Do not invent unsupported Gemini capabilities.
5. Do not expose the culprit or private solution before the permitted reveal.
6. Do not substitute hardcoded demo data for working functionality unless the data is explicitly part of a test or development fixture.
7. Do not silently omit failed evidence generation.
8. Do not invent API responses or report tests as passing without running them.
9. Validate AI-generated content on the backend.
10. Write tests for critical business rules and security boundaries.
11. Keep documentation and `.env.example` synchronized with the implementation.
12. Prefer reusable components and services over duplicated code.
13. Keep secrets out of source control.
14. If a requirement is ambiguous, follow the documented default or record the unresolved decision rather than silently making a major product change.
15. If this specification changes, update this document before implementing conflicting behavior.

## Change Management

When requirements change, update this SSOT first. The code, API contracts, database models, tests, and setup documentation must then be updated to match the new specification.

If an implementation detail conflicts with the SSOT, the SSOT takes precedence unless the requirement is explicitly revised.

---

# 19. Final Product Vision

AI Mystery Room should feel like a personal detective workspace in which every investigation is generated from a user's idea.

The central experience is:

**Create a scenario → Generate a mystery → Examine the evidence → Connect the clues → Accuse a suspect → Discover the truth.**

The product succeeds when the mysteries are not only entertaining, but also consistent, fair, replayable, and technically reliable.

The first release should prioritize a complete, secure investigation workflow over unnecessary features. Additional capabilities such as accounts, multiplayer investigations, leaderboards, public mystery sharing, and advanced media generation can be introduced after the MVP is stable.
