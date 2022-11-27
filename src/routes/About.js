import { Card, CardDescription, CardImage, CardList, CardSubtitle, CardTitle, Span } from "../components/Card";
import chessboardImage from "../static/images/chessboard.jpg";
import styles from "../components/styles/Main.module.scss";

export const About = () => {
  return (
    <>
      <div className={styles.main__left}>
        <Card active={true}>
          <CardImage image={chessboardImage} alt="Шахматная доска" />
          <CardTitle>Об игре</CardTitle>
          <CardDescription>
            Этот проект реализует игру в шашки на одном компьютере. Вы можете настроить правила игры на странице
            &quot;Rules&quot; (такие как обязательное взятие или нет, фуки, цепные ходы и другое). Чтобы начать игру,
            перейдите на страницу &quot;Play&quot;. Также используется специальная нотация для возможности сохранения и
            загрузки игры.
          </CardDescription>
        </Card>
      </div>
      <div className={styles.main__right}>
        <Card active={true}>
          <CardTitle>Нотация</CardTitle>
          <CardDescription>
            Используется специальная нотация для записи партии игры: начальной расстановки шашек, правил и ходов, так
            как существуют большое количество разных видов игр в шашки.
          </CardDescription>
          <CardSubtitle>Запись начальной расстановки</CardSubtitle>
          <CardDescription>
            Расстановка записывается с клетки A8 до клетки H1 построчно.
            <br />
            Начальная расстановка не записывается, так как сейчас она может быть только стандартной.
          </CardDescription>
          <CardList>
            <li>Символ &quot;-&quot; == пустая клетка.</li>
            <li>Символ &quot;p&quot; == черная пешка.</li>
            <li>Символ &quot;P&quot; == белая пешка.</li>
            <li>Символ &quot;q&quot; == черная дамка.</li>
            <li>Символ &quot;Q&quot; == белая дамка.</li>
          </CardList>
          <CardDescription italic={true}>
            Например: &quot;-p-p-p-pp-p-p-p--p-p-p-p----------------P-P-P-P--P-P-P-PP-P-P-P-&quot;
          </CardDescription>
          <CardSubtitle>Запись правил</CardSubtitle>
          <CardDescription>Правила не записываются, так как сейчас их нельзя изменить.</CardDescription>
          <CardSubtitle>Запись ходов</CardSubtitle>
          <CardDescription>
            Ходы разделяются пробелом. Если ходит белый игрок, ход записывается заглавными буквами; если ходит черный
            игрок, то маленькими буквами. Существует несколько видов ходов:
          </CardDescription>
          <CardList>
            <li>
              <Span bold={true}>Тихий ход</Span>: записывается номер клетки из которой ходят, затем ставится тире и
              номер клетки, в которую походили.
              <br />
              <Span italic={true}>Например: C3-D4 (при условии, что такой ход разрешен правилами текущей игры)</Span>
            </li>
            <li>
              <Span bold={true}>Ход со взятием</Span>: записывается номер клетки из которой ходят, затем ставится
              двоеточие и номер клетки, в которую походили.
              <br />
              <Span italic={true}>
                Например: C3:E5 (при условии, что на d4 была пешка и такой ход разрешен правилами текущей игры)
              </Span>
            </li>
            <li>
              <Span bold={true}>Цепной ход</Span>: записывается номер клетки из которой ходят, затем номера клеток, в
              которые наступала шашка во время хода, разделенные двоеточием (если было взятие при текущем переходе) или
              тире (если текущий переход тихий).
              <br />
              <Span italic={true}>
                Например: c5:e3:g5 (при условии, что на d4 и f4 были пешки и такой ход разрешен правилами текущей игры)
              </Span>
            </li>
          </CardList>
        </Card>
      </div>
    </>
  );
};
