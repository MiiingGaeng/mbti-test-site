import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex bg-blue-500">
      <h1>MBTI</h1>
      <div>
        <Link to="/signup">
          <button type="button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button type="button">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
