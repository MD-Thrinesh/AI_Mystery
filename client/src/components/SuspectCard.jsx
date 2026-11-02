export default function SuspectCard({ suspect, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`suspect-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(suspect.id)}
    >
      <div className="suspect-avatar">{suspect.name.charAt(0)}</div>
      <div className="suspect-info">
        <strong>{suspect.name}</strong>
        <span>{suspect.role}</span>
        <small>{suspect.publicMotive}</small>
      </div>
    </button>
  );
}
