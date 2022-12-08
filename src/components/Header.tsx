import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles/Header.module.scss";

export const Header = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const setPage = (page: number, title: string) => {
    document.title = title;
    setCurrentPage(page);
  };

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const trySetPage = (page: number, title: string, pattern: RegExp) => {
      if (pattern.test(pathname)) setPage(page, title);
    };
    setPage(0, "Checkers Game");
    trySetPage(1, "Checkers Game | About", /^[/]about/);
    trySetPage(2, "Checkers Game | Play", /^[/]play/);
    trySetPage(3, "Checkers Game | Rules", /^[/]rules/);
  }, [pathname]);

  const getStyle = (page: number) => {
    let style = styles.header__link;
    if (currentPage === page) style += ` ${styles.header__link__current_page}`;
    return style;
  };

  return (
    <header className={styles.non_selectable}>
      <h1 className={styles.header__left}>Checkers Game</h1>
      <nav className={styles.header__right}>
        <Link className={getStyle(1)} to="/about">
          About
        </Link>
        <Link className={getStyle(2)} to="/play">
          Play
        </Link>
        <Link className={getStyle(3)} to="/rules">
          Rules
        </Link>
      </nav>
    </header>
  );
};