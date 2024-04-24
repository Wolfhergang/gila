import {
  createBrowserRouter, 
  RouterProvider
} from "react-router-dom";

import MessagesPage from "./messages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MessagesPage,
  },
  {
    path: "/add",
    element: <div>Add component</div>,
  },
]);

const MainRouter = () => <RouterProvider router={router} />


export default MainRouter