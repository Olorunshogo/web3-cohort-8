import type { JSX } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Blocks from './pages/Blocks';
import BlockDetail from './pages/BlockDetail';
import TxDetail from './pages/TxDetail';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <header className="bg-sepolia-darker p-4 shadow-md">
        <nav className="container mx-auto flex items-center gap-6">
          <Link to="/" className="text-sepolia-blue font-bold text-xl">
            Sepolia Explorer
          </Link>
          <Link to="/" className="text-gray-300 hover:text-sepolia-blue">
            Home
          </Link>
          <Link to="/blocks" className="text-gray-300 hover:text-sepolia-blue">
            Blocks
          </Link>
          {/* Add more nav links as needed */}
        </nav>
      </header>
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/block/:blockNumber" element={<BlockDetail />} />
          <Route path="/tx/:txHash" element={<TxDetail />} />
          <Route
            path="/txs"
            element={
              <div className="container mx-auto p-4">
                Transactions List (Implement similar to Blocks)
              </div>
            }
          />{' '}
          {/* Placeholder */}
        </Routes>
      </main>
      <footer className="bg-sepolia-darker p-4 mt-8">
        <div className="container mx-auto text-center text-gray-500">
          © 2026 Sepolia Explorer. Powered by Ethereum JSON-RPC.
        </div>
      </footer>
    </BrowserRouter>
  );
}
