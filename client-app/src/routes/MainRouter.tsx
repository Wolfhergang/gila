import {
  Route,
  Routes,
} from "react-router-dom";

import MessagesPage from "./messages";
import AddMessagePage from "./messages/add";
import Layout from "../components/UI/Layout";

const MainRouter = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<MessagesPage />} />
      <Route path="add" element={<AddMessagePage />} />
    </Route>
  </Routes>
)

export default MainRouter;