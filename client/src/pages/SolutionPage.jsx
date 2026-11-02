import { Link, useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSolution } from '../services/api';
import { useEffect, useState } from 'react';

export default function SolutionPage() {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    const loadSolution = async () => {
      try {
        const data = await getSolution(sessionId);
        setSolution(data);
      } catch (error) {
        console.error('Unable to load solution', error);
      }
    };

    loadSolution();
  }, [sessionId]);

  const outcome = searchParams.get('result') === 'win' ? 'Solved' : 'Unsolved';

  return (
    <div className="page-shell">
      <Navbar />
      <main className="solution-page">
        <h1>{outcome}</h1>

        {solution ? (
          <>
            <p className="result-highlight">Culprit: {solution.culpritName}</p>
            <section className="solution-section">
              <h2>Motive</h2>
              <p>{solution.motive}</p>
            </section>
            {solution.method && (
              <section className="solution-section">
                <h2>Method</h2>
                <p>{solution.method}</p>
              </section>
            )}
            {solution.eventSequence?.length > 0 && (
              <section className="solution-box">
                <h2>How the theft unfolded</h2>
                <ol>
                  {solution.eventSequence.map((step, index) => <li key={index}>{step}</li>)}
                </ol>
              </section>
            )}
            <section className="solution-box">
              <h2>Evidence connection</h2>
              <div className="solution-evidence-list">
                {solution.decisiveEvidence?.map((item) => (
                  <article className="solution-evidence-item" key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.explanation}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="solution-section">
              <h2>Final explanation</h2>
              <p>{solution.solutionExplanation}</p>
            </section>
          </>
        ) : (
          <p>Loading the final explanation...</p>
        )}

        <Link className="button button-primary" to="/">Return Home</Link>
      </main>
    </div>
  );
}
