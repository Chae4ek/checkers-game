export const Button = ({ text, id, className, onClick, disabled }) => {
  return (
    <button id={id} className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
