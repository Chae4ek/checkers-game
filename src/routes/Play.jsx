import { useEffect } from "react";
import { Button } from "../components/Button";
import {
  postInit,
  clickOnShowButton,
  clickOnCopyButton,
  clickOnExampleButton,
  clickOnStartButton,
  clickOnCancelButton,
  clickOnEndButton,
} from "../scripts/play/main";
import styles from "./styles/Play.module.scss";

const Chessboard = () => {
  return (
    <table className={`${styles.chessboard} ${styles.non_selectable}`}>
      <tbody>
        <tr>
          <td className={styles.chessboard__a8}>
            <span className={styles.chessboard_text__align__left_top}>8</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span className={styles.chessboard_text__align__left_top}>7</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span className={styles.chessboard_text__align__left_top}>6</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span className={styles.chessboard_text__align__left_top}>5</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span className={styles.chessboard_text__align__left_top}>4</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span className={styles.chessboard_text__align__left_top}>3</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span className={styles.chessboard_text__align__left_top}>2</span>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <span className={styles.chessboard_text__align__left_top}>1</span>
            <span
              className={`${styles.chessboard_text__align__right_bottom} ${styles.chessboard_text__a1_field__align}`}
            >
              a
            </span>
          </td>
          <td>
            <span className={styles.chessboard_text__align__right_bottom}>b</span>
          </td>
          <td>
            <span className={styles.chessboard_text__align__right_bottom}>c</span>
          </td>
          <td>
            <span className={styles.chessboard_text__align__right_bottom}>d</span>
          </td>
          <td>
            <span className={styles.chessboard_text__align__right_bottom}>e</span>
          </td>
          <td>
            <span className={styles.chessboard_text__align__right_bottom}>f</span>
          </td>
          <td>
            <span className={styles.chessboard_text__align__right_bottom}>g</span>
          </td>
          <td>
            <span className={styles.chessboard_text__align__right_bottom}>h</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ChessboardInterface = () => {
  return (
    <div className={styles.chessboard__interface}>
      <div className={styles.move_history}>
        <textarea id={styles["move_history__text"]}></textarea>
        <div className={styles.move_history__buttons}>
          <Button text="Показать" id={styles["button__show"]} onClick={clickOnShowButton} />
          <Button id={styles["button__copy"]} onClick={clickOnCopyButton} />
        </div>
      </div>
      <div className={styles.interface__row}>
        <Button text="Пример" id={styles["button__example"]} onClick={clickOnExampleButton} />
        <Button text="Старт" id={styles["button__start"]} onClick={clickOnStartButton} />
      </div>
      <p id={styles["game_info__text"]}>Нажмите &quot;Старт&quot;, чтобы начать</p>
      <div className={`${styles.interface__row} ${styles.interface__bottom}`}>
        <Button id={styles["button__cancel"]} onClick={clickOnCancelButton} />
        <Button text="Завершить ход" id={styles["button__end"]} onClick={clickOnEndButton} />
      </div>
    </div>
  );
};

export const Play = () => {
  useEffect(() => postInit(), []);

  return (
    <>
      <Chessboard />
      <ChessboardInterface />
    </>
  );
};
