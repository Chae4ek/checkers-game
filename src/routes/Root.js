import { Navigate, Outlet, useLocation, useRoutes } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { About } from "./About";
import { Play } from "./Play";
import { Rules } from "./Rules";
import styles from "./styles/Main.module.scss";

export const Root = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "about",
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
        {
          path: "*",
          element: <Navigate replace to="/" />,
        },
      ],
    },
  ]);
};

const Layout = () => {
  if (/^[/]$/.test(useLocation().pathname)) return <Navigate replace to="/about" />;

  return (
    <>
      <Header />
      <main>
        <div className={styles.main__content}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};
