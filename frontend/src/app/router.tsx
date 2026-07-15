import { createBrowserRouter } from "react-router-dom";
import HomePage from "../features/home-page/home-page";
import RedirectPage from "../features/redirect-page/redirect-page";
import NotFoundPage from "../features/errors/not-found-page";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/:code",
        element:  <RedirectPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
