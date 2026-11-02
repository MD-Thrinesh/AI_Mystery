import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMystery, getEvidence, updateProgress, submitAccusation } from '../services/api';
import Navbar from '../components/Navbar';
import LoadingState from '../components/LoadingState';
import ErrorMessage from '../components/ErrorMessage';
import SuspectCard from '../components/SuspectCard';

export default function InvestigationPage() {
  const { mysteryId, sessionId } = useParams();
  const navigate = useNavigate();
  const [mystery, setMystery] = useState(null);
  const [evidence, setEvidence] = useState([]);
  const [selectedSuspectId, setSelectedSuspectId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mysteryData = await getMystery(mysteryId);
        const evidenceData = await getEvidence(mysteryId);
        setMystery(mysteryData);
        setEvidence(evidenceData.evidence || []);
      } catch (err) {
        setError(err.response?.data?.error?.message || 'Could not load the case.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mysteryId]);

  const handleAccuse = async () => {
    if (!selectedSuspectId) {
      setError('Choose a suspect before accusing.');
      return;
    }

    try {
      const result = await submitAccusation(sessionId, selectedSuspectId);
      await updateProgress(sessionId, { selectedSuspectId });
      navigate(`/solution/${sessionId}?result=${result.correct ? 'win' : 'lose'}`);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Unable to submit accusation.');
    }
  };

  if (loading) return <LoadingState message="Loading the investigation room..." />;
  if (!mystery) return <ErrorMessage message={error || 'Mystery unavailable.'} />;

  return (
    <div className="page-shell">
      <Navbar />
      <main className="investigation-layout">
        <aside className="panel">
          <h2>Suspect Board</h2>
          {mystery.suspects.map((suspect) => (
            <SuspectCard
              key={suspect.id}
              suspect={suspect}
              selected={selectedSuspectId === suspect.id}
              onSelect={setSelectedSuspectId}
            />
          ))}
        </aside>

        <section className="panel main-panel">
          <h2>{mystery.title}</h2>
          <p>{mystery.summary}</p>

          <div className="evidence-list">
            {evidence.map((item) => (
              <div key={item.id} className="evidence-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <small>{item.type} • {item.timestamp}</small>
              </div>
            ))}
          </div>
        </section>

        <aside className="panel right-panel">
          <h2>Case Notes</h2>
          <div className="timeline-box">
            {mystery.timeline.map((event) => (
              <div key={`${event.time}-${event.label}`} className="timeline-item">
                <strong>{event.label}</strong>
                <span>{event.time}</span>
                <p>{event.description}</p>
              </div>
            ))}
          </div>
          <button className="button button-primary" onClick={handleAccuse}>Accuse a Suspect</button>
          <ErrorMessage message={error} />
        </aside>
      </main>
    </div>
  );
}
