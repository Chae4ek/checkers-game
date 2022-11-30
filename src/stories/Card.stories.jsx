import { Card, CardDescription, CardImage, CardList, CardTitle, Span } from "../components/Card";
import { styleVarsForRoot } from "./styleVarsForRoot";
import styles from "../routes/styles/Main.module.scss";
import chessboardImage from "../static/images/chessboard.jpg";

export default {
  title: "Checkers/Card",
  argTypes: {
    "--block__description__active_color": { control: { type: "color" } },
    "--block__description__selected_color": { control: { type: "color" } },
    "--block__description__inactive_color": { control: { type: "color" } },
    "--block__border__active_color": { control: { type: "color" } },
    "--block__border__selected_color": { control: { type: "color" } },
    "--block__border__inactive_color": { control: { type: "color" } },
  },
};

const TemplateCardSimple = (args) => {
  const CardWithData = ({ active }) => (
    <Card active={active}>
      <CardTitle>Цепной ход</CardTitle>
      <CardDescription>
        Одной шашкой можно бить несколько шашек за один ход.
        <br />
        <Span italic={true}>Это правило также влияет на правило &quot;Обязательное взятие&quot;.</Span>
      </CardDescription>
    </Card>
  );

  return (
    <div className={styles.main__left}>
      {styleVarsForRoot(args)}
      <CardWithData active={false} />
      <CardWithData active={true} />
    </div>
  );
};

const TemplateCardWithList = (args) => {
  const CardWithData = ({ active }) => (
    <Card active={active}>
      <CardTitle>Обязательное взятие</CardTitle>
      <CardDescription>
        Фуков нет (возможность сделать тихий ход и отдать любую шашку на усмотрение противника, которая могла срубить).
      </CardDescription>
      <CardList>
        <li>Если игрок может взять шашку соперника, он обязан это сделать.</li>
        <li>Если вариантов хода со взятием несколько, можно выбрать любой из них.</li>
        <li>Если выбранной шашкой можно срубить несколько (цепной ход), игрок обязан рубить, пока это возможно.</li>
        <li>Если вариантов развития цепного хода несколько, можно выбрать любой из них.</li>
      </CardList>
    </Card>
  );

  return (
    <div className={styles.main__left}>
      {styleVarsForRoot(args)}
      <CardWithData active={false} />
      <CardWithData active={true} />
    </div>
  );
};

const TemplateCardWithImage = (args) => {
  const CardWithData = ({ active }) => (
    <Card active={active}>
      <CardImage image={chessboardImage} alt="Шахматная доска" />
      <CardTitle>Об игре</CardTitle>
      <CardDescription>
        Этот проект реализует игру в шашки на одном компьютере. Вы можете настроить правила игры на странице
        &quot;Rules&quot; (такие как обязательное взятие или нет, фуки, цепные ходы и другое). Чтобы начать игру,
        перейдите на страницу &quot;Play&quot;. Также используется специальная нотация для возможности сохранения и
        загрузки игры.
      </CardDescription>
    </Card>
  );

  return (
    <div className={styles.main__left}>
      {styleVarsForRoot(args)}
      <CardWithData active={false} />
      <CardWithData active={true} />
    </div>
  );
};

export const simpleCard = TemplateCardSimple.bind();

export const cardWithList = TemplateCardWithList.bind();

export const cardWithImage = TemplateCardWithImage.bind();
