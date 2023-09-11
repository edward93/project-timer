import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./styles/index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TimerInitComponent from "./components/Timer/TimerInit.Component.tsx";
import TimerComponent from "./components/Timer/Timer.Component.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <TimerInitComponent />,
      },
      {
        path: "timer/:id?/:tStart/:tEnd",
        element: <TimerComponent />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
