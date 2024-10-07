import { useForm } from "react-hook-form";
import { Layout } from "../../layouts/Layout/Layout";
import s from "./RegistrationPage.module.css";
import { register as registerUser } from "../../store/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonBack } from "../../ui/ButtonBack/ButtonBack";

export const RegistrationPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const [successRegistrationMessage, setSuccessRegistrationMessage] =
    useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthorizated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthorizated) {
      setSuccessRegistrationMessage(true);

      const timer = setTimeout(() => {
        setSuccessRegistrationMessage(false);
        navigate("/rick-and-morty");
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAuthorizated]);

  const onSubmit = (data) => {
    console.log(data);

    dispatch(registerUser(data));
  };

  console.log(errors);

  return (
    <Layout>
      <ButtonBack onClick={() => navigate(-1)} />
      {!successRegistrationMessage && (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="username">
              Имя пользователя
            </label>
            <input
              {...register("username", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 3,
                  message: "Минимальная длина имени 3 символа",
                },
                maxLength: {
                  value: 15,
                  message: "Максимальная длина имени 15 символов",
                },
              })}
              className={s.input}
              type="text"
              name="username"
            />

            {errors.username && (
              <p className={s.error}>{errors.username.message}</p>
            )}
          </div>
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
              Введите пароль
            </label>
            <input
              {...register("password", {
                required: "Поле обязательно для заполнения",
                minLength: {
                  value: 8,
                  message: "Минимальная длина пароля 8 символов",
                },
                maxLength: {
                  value: 16,
                  message: "Максимальная длина пароля 16 символов",
                },
                pattern: {
                  value: /(?=.*[A-Z])/,
                  message:
                    "Пароль должен содержать хотя бы один заглавный символ",
                },
              })}
              className={s.input}
              type="text"
              name="password"
            />

            {errors.password && (
              <p className={s.error}>{errors.password.message}</p>
            )}
          </div>
          <div className={s.formGroup}>
            <label className={s.label} htmlFor="confirmPassword">
              Подтвердите пароль
            </label>
            <input
              {...register("confirmPassword", {
                required: "Поле обязательно для заполнения",
                validate: (value) =>
                  value === watch("password") || "Пароли не совпадают",
              })}
              className={s.input}
              type="text"
              name="confirmPassword"
            />

            {errors.confirmPassword && (
              <p className={s.error}>{errors.confirmPassword.message}</p>
            )}
          </div>
          <div className={s.btnGroup}>
            <Link to="/login" className={s.link}>
              <button className={s.btn} type="submit">
                Войти
              </button>
            </Link>

            <button className={s.btn} type="submit">
              Регистрация
            </button>
          </div>

          {error && <p className={s.error}>{error}</p>}
        </form>
      )}

      {successRegistrationMessage && (
        <p className={s.success}>Вы успешно зарегистрировались!</p>
      )}
    </Layout>
  );
};
