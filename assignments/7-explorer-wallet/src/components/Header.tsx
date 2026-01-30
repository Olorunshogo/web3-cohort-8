import { NavLink, Link } from 'react-router';

const Header: React.FC = () => {
  return (
    <>
      {/* Top bar */}
      <header className="flex items-center justify-between gap-6 px-6 h-16 backdrop-blur-md py-2 border-b dark:border-gray-900">
        <img
          src="/Full-logo.png"
          alt="Sepolia Wallet Logo"
          className="object-cover h-12"
        />

        <nav className="flex items-center gap-4">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/blocks">Blocks</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
          <NavLink to="/wallet">Wallet</NavLink>
        </nav>
      </header>
    </>
  );
};

export default Header;
