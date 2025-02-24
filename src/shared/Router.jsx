import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyPage from "../pages/MyPage";
import Layout from "../layout/Layout";
import Test from "../pages/Test";
import TestResult from "../pages/TestResult";
import useLoginStore from "../zustand/loginStore";

//로그인이 필요없는 페이지
const PublicPage = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useLoginStore();
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

//로그인이 필요한 페이지
const PrivitePage = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useLoginStore();
  return !isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<PublicPage element={Login} />} />
          <Route path="/signup" element={<PublicPage element={Signup} />} />
          <Route path="/mypage" element={<PrivitePage element={MyPage} />} />
          <Route path="/test" element={<Test />} />
          <Route path="/results" element={<TestResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
