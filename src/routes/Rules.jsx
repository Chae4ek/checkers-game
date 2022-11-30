import { Card, CardDescription, CardList, CardTitle, Span } from "../components/Card";
import styles from "./styles/Rules.module.scss";

export const Rules = () => {
  return (
    <>
      <div className={styles.main__left}>
        <Card active={true}>
          <CardTitle>Начальная позиция</CardTitle>
          <CardDescription>
            Доска 8x8, шашки занимают первые три ряда с каждой стороны; белые располагаются, начиная с клетки A1.
          </CardDescription>
        </Card>
        <Card active={true}>
          <CardTitle>Цель игры</CardTitle>
          <CardDescription>Съесть или запереть все шашки противника.</CardDescription>
        </Card>
      </div>
      <div className={styles.main__center}>
        <Card active={true}>
          <CardTitle>Первый ход</CardTitle>
          <CardDescription>Белые ходят первыми.</CardDescription>
        </Card>
        <Card active={true}>
          <CardTitle>Направление хода</CardTitle>
          <CardDescription>
            Простая шашка может ходить только вперед по диагонали, дамка - в любом направлении по диагонали.
          </CardDescription>
        </Card>
        <Card active={true}>
          <CardTitle>Цепной ход</CardTitle>
          <CardDescription>
            Одной шашкой можно бить несколько шашек за один ход.
            <br />
            <Span italic={true}>Это правило также влияет на правило &quot;Обязательное взятие&quot;.</Span>
          </CardDescription>
        </Card>
      </div>
      <div className={styles.main__right}>
        <Card active={false}>
          <CardTitle>Ход со взятием назад</CardTitle>
          <CardDescription>Простая шашка может бить назад.</CardDescription>
        </Card>
        <Card active={true}>
          <CardTitle>Обязательное взятие</CardTitle>
          <CardDescription>
            Фуков нет (возможность сделать тихий ход и отдать любую шашку на усмотрение противника, которая могла
            срубить).
          </CardDescription>
          <CardList>
            <li>Если игрок может взять шашку соперника, он обязан это сделать.</li>
            <li>Если вариантов хода со взятием несколько, можно выбрать любой из них.</li>
            <li>Если выбранной шашкой можно срубить несколько (цепной ход), игрок обязан рубить, пока это возможно.</li>
            <li>Если вариантов развития цепного хода несколько, можно выбрать любой из них.</li>
          </CardList>
        </Card>
      </div>
    </>
  );
};
