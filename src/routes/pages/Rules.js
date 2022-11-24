import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import { Footer } from "../../components/Footer";
import styled from "styled-components";
import { Card, CardDescription, CardList, CardTitle, Span } from "../../components/Card";

const MainLeft = styled.div`
  display: inline-block;
  min-width: 260px;
  width: 26%;
  max-width: 700px;
  text-align: left;
  margin-right: 50px;
`;

const MainCenter = styled.div`
  display: inline-block;
  min-width: 260px;
  width: 26%;
  max-width: 700px;
  vertical-align: top;
  text-align: left;
  margin-right: 50px;
`;

const MainRight = styled.div`
  display: inline-block;
  min-width: 260px;
  width: 26%;
  max-width: 700px;
  vertical-align: top;
  text-align: left;
`;

export const Rules = () => {
  return (
    <>
      <Header currentPage={3} />
      <Main>
        <MainLeft>
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
        </MainLeft>
        <MainCenter>
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
        </MainCenter>
        <MainRight>
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
              <li>
                Если выбранной шашкой можно срубить несколько (цепной ход), игрок обязан рубить, пока это возможно.
              </li>
              <li>Если вариантов развития цепного хода несколько, можно выбрать любой из них.</li>
            </CardList>
          </Card>
        </MainRight>
      </Main>
      <Footer />
    </>
  );
};
