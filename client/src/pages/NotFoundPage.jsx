import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-shell not-found">
      <h1>Page not found</h1>
      <p>The investigation room you tried to access does not exist.</p>
      <Link className="button button-primary" to="/">Return home</Link>
    </div>
  );
}
