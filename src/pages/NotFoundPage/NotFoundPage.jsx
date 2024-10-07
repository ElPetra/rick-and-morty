import { Layout } from "../../layouts/Layout/Layout";
import { ButtonBack } from "../../ui/ButtonBack/ButtonBack";
import { useNavigate } from "react-router-dom";
import s from "./NotFoundPage.module.css";
import img from "./image/Rick-and-Morty.png";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <section className={s.section}>
        <div className={s.sectionUp}>
          <ButtonBack
            className={s.btnBack}
            onClick={() => navigate(-1)}
          ></ButtonBack>
          <h1 className={s.title}>Ooops...такой страницы не существует</h1>
        </div>
        <div className={s.sectionDown}>
          <img src={img} className={s.img} alt="" />
        </div>
      </section>
    </Layout>
  );
};
