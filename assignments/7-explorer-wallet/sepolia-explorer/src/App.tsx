import type { JSX } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Blocks from './pages/Blocks';
import BlockDetail from './pages/BlockDetail';
import TxDetail from './pages/TxDetail';

export default function App(): JSX.Element {
  return (
    <BrowserRouter>
      <header className="p-4 shadow-md bg-sepolia-darker">
        <nav className="container flex items-center gap-6 mx-auto">
          <Link to="/" className="text-xl font-bold text-sepolia-blue">
            Sepolia Explorer
          </Link>
          <Link to="/blocks" className="text-gray-300 hover:text-sepolia-blue">
            Blocks
          </Link>
          <Link to="/transactions" className="text-gray-300 hover:text-sepolia-blue">
            Transactions
          </Link>
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
              <div className="container p-4 mx-auto">
                Transactions List (Implement similar to Blocks)
              </div>
            }
          />{' '}
          {/* Placeholder */}
        </Routes>
      </main>
      <footer className="p-4 mt-8 bg-sepolia-darker">
        <div className="container mx-auto text-center text-gray-500">
          © 2026 Sepolia Explorer. Powered by Ethereum JSON-RPC.
        </div>
      </footer>
    </BrowserRouter>
  );
}

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </React.StrictMode>
// );
