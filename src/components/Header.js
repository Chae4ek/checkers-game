import "./styles/Header.css";

export const Header = ({ currentPage }) => {
  const pageClass = "header-link";
  const currentPageClass = "header-link header-link-current_page";

  return (
    <header className="non-selectable">
      <h1 className="header-left">Checkers Game</h1>
      <nav className="header-right">
        <a className={currentPage === 1 ? currentPageClass : pageClass} href="/#">
          About
        </a>
        <a className={currentPage === 2 ? currentPageClass : pageClass} href="play#">
          Play
        </a>
        <a className={currentPage === 3 ? currentPageClass : pageClass} href="rules#">
          Rules
        </a>
      </nav>
    </header>
  );
};
