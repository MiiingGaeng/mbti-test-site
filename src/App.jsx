import { AuthProvider } from "./context/AuthContext";
import Router from "./shared/Router.jsx";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
};

export default App;
