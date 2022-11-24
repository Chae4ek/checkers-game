import "./styles/Main.css";

export const Main = ({ children }) => {
  return (
    <main>
      <div className="main-content">{children}</div>
    </main>
  );
};
