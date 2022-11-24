import "./styles/Card.css";

export const CardImage = ({ image, alt }) => {
  return (
    <div className="card-inactive-image_border">
      <img className="card-inactive-image non-selectable" src={image} alt={alt} />
    </div>
  );
};

export const CardTitle = ({ children }) => {
  return <h1 className="card-inactive-title">{children}</h1>;
};

export const CardSubtitle = ({ children }) => {
  return <h2 className="card-inactive-subtitle">{children}</h2>;
};

export const CardDescription = ({ bold = false, italic = false, children }) => {
  let className = "card-inactive-description";
  if (bold) className += " text-style-bold";
  if (italic) className += " text-style-italic";

  return <p className={className}>{children}</p>;
};

export const CardList = ({ children }) => {
  return <ul className="card-inactive-list">{children}</ul>;
};

export const Card = ({ active, children }) => {
  return <div className={active ? "card-active" : "card-inactive"}>{children}</div>;
};

export const Span = ({ bold = false, italic = false, children }) => {
  let className = "";
  if (bold) className += " text-style-bold";
  if (italic) className += " text-style-italic";

  return <span className={className}>{children}</span>;
};
