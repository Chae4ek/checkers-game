import { createBrowserRouter } from "react-router-dom";
import { About } from "./pages/About";
import { Play } from "./pages/Play";
import { Rules } from "./pages/Rules";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <About />,
  },
  {
    path: "play",
    element: <Play />,
  },
  {
    path: "rules",
    element: <Rules />,
  },
]);
