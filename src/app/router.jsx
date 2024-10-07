import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { CardInfoPage } from "../pages/CardInfoPage/CardInfoPage";
import { AuthPage } from "../pages/AuthPage/AuthPage";
import { RegistrationPage } from "../pages/RegistrationPage/RegistrationPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../pages/ErrorFallback/ErrorFallback";
import { lazy, Suspense } from "react";
import { Loader } from "../ui/Loader/Loader";
import s from "../pages/HomePage/HomePage.module.css";
import { Layout } from "../layouts/Layout/Layout";

const FavoritesPage = lazy(() =>
  import("../pages/FavoritesPage/FavoritesPage")
);

export const router = createBrowserRouter([
  {
    path: "/Rick-and-Morty",
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/Rick-and-Morty")}
      >
        <HomePage />
      </ErrorBoundary>
    ),
  },
  {
    path: "character/:characterId",
    element: <CardInfoPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/favorites",
    element: (
      <Suspense
        fallback={
          <Layout>
            <div className={s.loader}>
              <Loader />
            </div>
          </Layout>
        }
      >
        <FavoritesPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: <AuthPage />,
  },
  {
    path: "/register",
    element: <RegistrationPage />,
  },
]);
