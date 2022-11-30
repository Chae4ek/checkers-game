import { Play } from "../routes/Play";
import { styleVarsForRoot } from "./styleVarsForRoot";

export default {
  title: "Checkers/Play",
  argTypes: {
    "--button__border__color": { control: { type: "color" } },
    "--button__border__selected_color": { control: { type: "color" } },
    "--button__border__active_color": { control: { type: "color" } },
    "--button__text__color": { control: { type: "color" } },
    "--button__background__selected_color": { control: { type: "color" } },
    "--move_history__background__color": { control: { type: "color" } },
    "--move_history_button__color": { control: { type: "color" } },
    "--move_history_button__active_color": { control: { type: "color" } },
    "--move_history_button__background__selected_color": { control: { type: "color" } },
    "--game_info__color": { control: { type: "color" } },
  },
};

const TemplatePlay = (args) => (
  <>
    {styleVarsForRoot(args)}
    <main>
      <Play />
    </main>
  </>
);

export const play = TemplatePlay.bind();
