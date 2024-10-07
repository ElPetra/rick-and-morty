import s from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <p className={s.footerText}>
        Made with ❤️ by Petra for <span className={s.circle}> ASTON </span>{" "}
        company
      </p>
    </footer>
  );
};
