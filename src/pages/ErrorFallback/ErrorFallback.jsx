import { Layout } from "../../layouts/Layout/Layout";
import s from "./ErrorFallback.module.css";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Layout>
      <div className={s.container} role="alert">
        <p className={s.error}>Ooops... Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
        <button onClick={resetErrorBoundary} className={s.button}>
          Try again
        </button>
      </div>
    </Layout>
  );
}
export default ErrorFallback;
