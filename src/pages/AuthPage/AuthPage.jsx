import { useForm } from "react-hook-form";
import { Layout } from "../../layouts/Layout/Layout";
import s from "./AuthPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/reducers/authSlice";
import { useEffect } from "react";
import { ButtonBack } from "../../ui/ButtonBack/ButtonBack";

export const AuthPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const { isAuthorizated, error } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorizated) {
      navigate("/rick-and-morty");
    }
  }, [isAuthorizated]);

  return (
    <Layout>
      <ButtonBack onClick={() => navigate(-1)} />
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="email">
            Email
          </label>
          <input
            {...register("email", {
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Некорректный email",
              },
            })}
            className={s.input}
            type="text"
            name="email"
          />

          {errors.email && <p className={s.error}>{errors.email.message}</p>}
        </div>
        <div className={s.formGroup}>
          <label className={s.label} htmlFor="password">
            Enter password
          </label>
          <input
            {...register("password", {
              required: "Поле обязательно для заполнения",
            })}
            className={s.input}
            type="text"
            name="password"
          />

          {errors.password && (
            <p className={s.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={s.btnGroup}>
          <button className={s.btn} type="submit">
            Войти
          </button>
          <Link to="/register">
            <button className={s.btn} type="submit">
              Регистрация
            </button>
          </Link>
        </div>
        {error && <p className={s.error}>{error}</p>}
      </form>
    </Layout>
  );
};
