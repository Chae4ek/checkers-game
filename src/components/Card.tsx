import { FC, PropsWithChildren } from "react";
import styles from "./styles/Card.module.scss";

export const CardImage: FC<{
  image: string;
  alt: string;
}> = ({ image, alt }) => {
  return (
    <div className={styles.card__inactive__image_border}>
      <img className={`${styles.card__inactive__image} ${styles.non_selectable}`} src={image} alt={alt} />
    </div>
  );
};

export const CardTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className={styles.card__inactive__title}>{children}</h1>;
};

export const CardSubtitle: FC<PropsWithChildren> = ({ children }) => {
  return <h2 className={styles.card__inactive__subtitle}>{children}</h2>;
};

export const CardDescription: FC<
  PropsWithChildren & {
    bold?: boolean;
    italic?: boolean;
  }
> = ({ bold = false, italic = false, children }) => {
  let className = styles.card__inactive__description;
  if (bold) className += ` ${styles.text__style__bold}`;
  if (italic) className += ` ${styles.text__style__italic}`;

  return <p className={className}>{children}</p>;
};

export const CardList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className={styles.card__inactive__list}>{children}</ul>;
};

export const Card: FC<PropsWithChildren & { active: boolean }> = ({ active, children }) => {
  return <div className={active ? styles.card__active : styles.card__inactive}>{children}</div>;
};

export const Span: FC<
  PropsWithChildren & {
    bold?: boolean;
    italic?: boolean;
  }
> = ({ bold = false, italic = false, children }) => {
  let className = "";
  if (bold) className += ` ${styles.text__style__bold}`;
  if (italic) className += ` ${styles.text__style__italic}`;

  return <span className={className}>{children}</span>;
};
