import ReactDOM from "react-dom/client";
import App from "./App";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { FavoritesProvider } from "./app/providers/FavoritesProvider";
import { Provider } from "react-redux";
import { store } from "./store/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
      <FavoritesProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </FavoritesProvider>
    </Provider>

);