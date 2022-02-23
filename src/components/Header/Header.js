import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to="/" className="Header-link">
      <span className="header">
        🎬 Megafilms 🎬
      </span>
    </Link>
    
  );
};

export default Header;
