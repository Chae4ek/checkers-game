import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import { Footer } from "../../components/Footer";
import "../styles/Play.css";
import {
  postInit,
  clickOnShowButton,
  clickOnCopyButton,
  clickOnExampleButton,
  clickOnStartButton,
  clickOnCancelButton,
  clickOnEndButton,
} from "../../scripts/play/main";

const Chessboard = () => {
  return (
    <table className="chessboard non-selectable">
      <tbody>
        <tr>
          <td className="chessboard-a8">
            <span className="chessboard_text-align-left_top">8</span>
          </td>
          <td className="chessboard-b8"></td>
          <td className="chessboard-c8"></td>
          <td className="chessboard-d8"></td>
          <td className="chessboard-e8"></td>
          <td className="chessboard-f8"></td>
          <td className="chessboard-g8"></td>
          <td className="chessboard-h8"></td>
        </tr>
        <tr>
          <td className="chessboard-a7">
            <span className="chessboard_text-align-left_top">7</span>
          </td>
          <td className="chessboard-b7"></td>
          <td className="chessboard-c7"></td>
          <td className="chessboard-d7"></td>
          <td className="chessboard-e7"></td>
          <td className="chessboard-f7"></td>
          <td className="chessboard-g7"></td>
          <td className="chessboard-h7"></td>
        </tr>
        <tr>
          <td className="chessboard-a6">
            <span className="chessboard_text-align-left_top">6</span>
          </td>
          <td className="chessboard-b6"></td>
          <td className="chessboard-c6"></td>
          <td className="chessboard-d6"></td>
          <td className="chessboard-e6"></td>
          <td className="chessboard-f6"></td>
          <td className="chessboard-g6"></td>
          <td className="chessboard-h6"></td>
        </tr>
        <tr>
          <td className="chessboard-a5">
            <span className="chessboard_text-align-left_top">5</span>
          </td>
          <td className="chessboard-b5"></td>
          <td className="chessboard-c5"></td>
          <td className="chessboard-d5"></td>
          <td className="chessboard-e5"></td>
          <td className="chessboard-f5"></td>
          <td className="chessboard-g5"></td>
          <td className="chessboard-h5"></td>
        </tr>
        <tr>
          <td className="chessboard-a4">
            <span className="chessboard_text-align-left_top">4</span>
          </td>
          <td className="chessboard-b4"></td>
          <td className="chessboard-c4"></td>
          <td className="chessboard-d4"></td>
          <td className="chessboard-e4"></td>
          <td className="chessboard-f4"></td>
          <td className="chessboard-g4"></td>
          <td className="chessboard-h4"></td>
        </tr>
        <tr>
          <td className="chessboard-a3">
            <span className="chessboard_text-align-left_top">3</span>
          </td>
          <td className="chessboard-b3"></td>
          <td className="chessboard-c3"></td>
          <td className="chessboard-d3"></td>
          <td className="chessboard-e3"></td>
          <td className="chessboard-f3"></td>
          <td className="chessboard-g3"></td>
          <td className="chessboard-h3"></td>
        </tr>
        <tr>
          <td className="chessboard-a2">
            <span className="chessboard_text-align-left_top">2</span>
          </td>
          <td className="chessboard-b2"></td>
          <td className="chessboard-c2"></td>
          <td className="chessboard-d2"></td>
          <td className="chessboard-e2"></td>
          <td className="chessboard-f2"></td>
          <td className="chessboard-g2"></td>
          <td className="chessboard-h2"></td>
        </tr>
        <tr>
          <td className="chessboard-a1">
            <span className="chessboard_text-align-left_top">1</span>
            <span className="chessboard_text-align-right_bottom chessboard_text-a1_field-align">a</span>
          </td>
          <td className="chessboard-b1">
            <span className="chessboard_text-align-right_bottom">b</span>
          </td>
          <td className="chessboard-c1">
            <span className="chessboard_text-align-right_bottom">c</span>
          </td>
          <td className="chessboard-d1">
            <span className="chessboard_text-align-right_bottom">d</span>
          </td>
          <td className="chessboard-e1">
            <span className="chessboard_text-align-right_bottom">e</span>
          </td>
          <td className="chessboard-f1">
            <span className="chessboard_text-align-right_bottom">f</span>
          </td>
          <td className="chessboard-g1">
            <span className="chessboard_text-align-right_bottom">g</span>
          </td>
          <td className="chessboard-h1">
            <span className="chessboard_text-align-right_bottom">h</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const ChessboardInterface = () => {
  Promise.resolve().then(() => postInit());

  return (
    <div className="chessboard-interface">
      <div className="move_history">
        <textarea id="move_history-text"></textarea>
        <div className="move_history-buttons">
          <button id="button-show" onClick={clickOnShowButton}>
            Показать
          </button>
          <button id="button-copy" onClick={clickOnCopyButton}></button>
        </div>
      </div>
      <div className="interface-row">
        <button id="button-example" onClick={clickOnExampleButton}>
          Пример
        </button>
        <button id="button-start" onClick={clickOnStartButton}>
          Старт
        </button>
      </div>
      <p id="game_info-text">Нажмите &quot;Старт&quot;, чтобы начать</p>
      <div className="interface-row interface-bottom">
        <button id="button-cancel" onClick={clickOnCancelButton}></button>
        <button id="button-end" onClick={clickOnEndButton}>
          Завершить ход
        </button>
      </div>
    </div>
  );
};

export const Play = () => {
  return (
    <>
      <Header currentPage={2} />
      <Main>
        <Chessboard />
        <ChessboardInterface />
      </Main>
      <Footer />
    </>
  );
};
