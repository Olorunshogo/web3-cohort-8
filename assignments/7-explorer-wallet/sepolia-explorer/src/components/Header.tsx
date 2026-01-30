import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-red-900 header">

      <img src="Full-logo.png" alt="Sepolia Wallet Logo" className="" />

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
