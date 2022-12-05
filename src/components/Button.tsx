import { FC } from "react";

export const Button: FC<{
  text?: string;
  id?: string;
  className?: string;
  onClick: () => void;
  [x: string]: unknown;
}> = ({ text, id, className, onClick, ...props }) => {
  return (
    <button id={id} className={className} onClick={onClick} {...props}>
      {text}
    </button>
  );
};
