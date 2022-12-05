import { ComponentStory } from "@storybook/react";
import { Button } from "../components/Button";
import { styleVarsForRoot } from "./helper";
import styles from "../routes/styles/Play.module.scss";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { FC, PropsWithChildren } from "react";

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

const Row: FC<PropsWithChildren> = ({ children }) => <div style={{ display: "flex", columnGap: 20 }}>{children}</div>;

const TemplateButton: FC<{ text: string; onClick: () => void }> = ({ text, onClick, ...args }) => {
  return (
    <>
      {styleVarsForRoot(args)}
      <Row>
        <Button data-testid="active_button" text={text} onClick={onClick} />
        <Button id={styles["button__cancel"]} onClick={onClick} />
      </Row>
      <Row>
        <Button className="hovered_button" onClick={onClick} text={text} />
        <Button className="hovered_button" onClick={onClick} id={styles["button__cancel"]} />
      </Row>
      <Row>
        <Button disabled onClick={onClick} data-testid="disabled_button" text={text} />
        <Button disabled onClick={onClick} id={styles["button__cancel"]} />
      </Row>
    </>
  );
};

export const button = TemplateButton.bind({}) as ComponentStory<typeof TemplateButton>;
button.args = {
  text: "Button Text",
};
button.parameters = {
  pseudo: { hover: [".hovered_button"] },
};
button.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByTestId("active_button");
  userEvent.click(button);

  const disabledButton = canvas.getByTestId("disabled_button");
  userEvent.click(disabledButton);

  await waitFor(() => expect(args.onClick).toHaveBeenCalledTimes(1));
};
