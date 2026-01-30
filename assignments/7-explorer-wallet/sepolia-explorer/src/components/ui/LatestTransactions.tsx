import { Link } from 'react-router-dom';
import type { JSX } from 'react';
import { useRecentTransactions } from '../../hooks/useSepolia';
import { shortenHash, weiToEth } from '../../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import type { RpcTransaction } from '../../types/types';

export default function LatestTransactions(): JSX.Element {
  const { data, loading, error } = useRecentTransactions(10);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4 rounded-lg bg-sepolia-dark">
      <h2 className="mb-2 text-lg font-bold">Latest Transactions</h2>
      <table className="w-full text-sm">
        <tbody>
          {data?.map((tx: RpcTransaction) => (
            <tr key={tx.hash} className="border-b border-gray-700">
              <td className="py-2">
                <Link to={`/tx/${tx.hash}`} className="text-sepolia-blue">
                  {shortenHash(tx.hash)}
                </Link>
              </td>
              <td>From {shortenHash(tx.from)}</td>
              <td>To {tx.to ? shortenHash(tx.to) : 'Contract Creation'}</td>
              <td>{weiToEth(tx.value)} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/txs" className="block mt-2 text-sepolia-blue">
        View All Transactions →
      </Link>
    </div>
  );
}
