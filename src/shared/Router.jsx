import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPage from "../pages/MyPage";
import Layout from "../layout/Layout";
import Test from "../pages/Test";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//로그인이 필요없는 페이지
const PublicPage = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

//로그인이 필요한 페이지
const PrivtePage = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicPage element={Login} />} />
          <Route path="/signup" element={<PublicPage element={Signup} />} />
          <Route path="/MyPage" element={<PrivtePage element={MyPage} />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
