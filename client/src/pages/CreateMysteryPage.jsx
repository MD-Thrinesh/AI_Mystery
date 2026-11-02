import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import { createMystery, createSession } from '../services/api';

const initialForm = {
  scenario: 'A valuable painting disappears during a storm from a locked gallery while several employees claim they were elsewhere.',
  difficulty: 'medium',
  mysteryType: 'theft',
  suspectCount: 4,
  evidenceIntensity: 'standard',
  setting: 'Private gallery during a storm',
};

export default function CreateMysteryPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'suspectCount' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await createMystery(form);
      const session = await createSession(result.mysteryId);
      navigate(`/investigation/${result.mysteryId}/${session.sessionId}`);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Unable to generate the mystery right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <Navbar />
      <main className="form-page">
        <h1>Create a Mystery</h1>
        <form className="mystery-form" onSubmit={handleSubmit}>
          <label>
            Scenario
            <textarea
              name="scenario"
              value={form.scenario}
              onChange={handleChange}
              rows="6"
              minLength="30"
              maxLength="2000"
              required
            />
          </label>

          <div className="field-row">
            <label>
              Difficulty
              <select name="difficulty" value={form.difficulty} onChange={handleChange}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label>
              Mystery Type
              <select name="mysteryType" value={form.mysteryType} onChange={handleChange}>
                <option value="theft">Theft</option>
                <option value="murder">Murder Mystery</option>
                <option value="disappearance">Disappearance</option>
                <option value="sabotage">Sabotage</option>
                <option value="general">General Mystery</option>
              </select>
            </label>
          </div>

          <div className="field-row">
            <label>
              Suspects
              <input
                type="number"
                name="suspectCount"
                min="3"
                max="6"
                value={form.suspectCount}
                onChange={handleChange}
              />
            </label>

            <label>
              Evidence Intensity
              <select name="evidenceIntensity" value={form.evidenceIntensity} onChange={handleChange}>
                <option value="standard">Standard</option>
                <option value="detailed">Detailed</option>
              </select>
            </label>
          </div>

          <label>
            Optional Setting
            <input name="setting" value={form.setting} onChange={handleChange} />
          </label>

          <ErrorMessage message={error} />

          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Mystery'}
          </button>
          {loading && <LoadingState message="Creating your case and evidence..." />}
        </form>
      </main>
    </div>
  );
}
