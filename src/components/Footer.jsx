import styles from "./styles/Footer.module.scss";

export const Footer = () => {
  return (
    <footer>
      <h1 className={styles.footer__title}>Checkers Game</h1>
      <p className={styles.footer__rights}>
        © 2022 - Alexey Nominas. All rights reserved. Check out this project on{" "}
        <a className={styles.footer__link} href="https://github.com/Chae4ek/checkers-game">
          GitHub
        </a>
      </p>
    </footer>
  );
};
