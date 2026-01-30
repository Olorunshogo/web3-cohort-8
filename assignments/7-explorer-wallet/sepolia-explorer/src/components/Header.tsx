import { NavLink } from "react-router-dom";
// import "../styles/layout.css";

const Header: React.FC = () => {
  return (
    <header className="header bg-red-900">

      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/blocks">
          Blocks
        </NavLink>
        <NavLink to="/transactions">
          Transactions
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
