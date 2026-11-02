export default function Button({ children, onClick, type = 'button', variant = 'primary', ...props }) {
  return (
    <button
      type={type}
      className={`button button-${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
