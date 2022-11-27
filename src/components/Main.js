import styles from "./styles/Main.module.scss";

export const Main = ({ children }) => {
  return (
    <main>
      <div className={styles.main__content}>{children}</div>
    </main>
  );
};
