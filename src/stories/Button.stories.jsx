import { Button } from "../components/Button";
import { styleVarsForRoot } from "./styleVarsForRoot";
import styles from "../routes/styles/Play.module.scss";

export default {
  title: "Checkers/Button",
  argTypes: {
    text: { control: { type: "text" } },
    onClick: {},
    "--button__border__color": { control: { type: "color" } },
    "--button__border__selected_color": { control: { type: "color" } },
    "--button__border__active_color": { control: { type: "color" } },
    "--button__text__color": { control: { type: "color" } },
    "--button__background__selected_color": { control: { type: "color" } },
    "--move_history__background__color": { control: { type: "color" } },
  },
};

const Row = ({ children }) => <div style={{ display: "flex", columnGap: 20 }}>{children}</div>;

const TemplateButton = ({ text, onClick, ...args }) => {
  return (
    <>
      {styleVarsForRoot(args)}
      <Row>
        <Button text={text} onClick={onClick} />
        <Button id={styles["button__cancel"]} onClick={onClick} />
      </Row>
      <Row>
        <Button className="hovered_button" onClick={onClick} text={text} />
        <Button className="hovered_button" onClick={onClick} id={styles["button__cancel"]} />
      </Row>
      <Row>
        <Button disabled onClick={onClick} text={text} />
        <Button disabled onClick={onClick} id={styles["button__cancel"]} />
      </Row>
    </>
  );
};

export const button = TemplateButton.bind();
button.args = {
  text: "Button Text",
};
button.parameters = {
  pseudo: { hover: [".hovered_button"] },
};
