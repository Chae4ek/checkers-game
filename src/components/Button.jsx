export const Button = ({ text, id, className, onClick, ...props }) => {
  return (
    <button id={id} className={className} onClick={onClick} {...props}>
      {text}
    </button>
  );
};
