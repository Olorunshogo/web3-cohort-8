import { Link } from 'react-router-dom';
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
    <div className="bg-sepolia-dark p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Latest Transactions</h2>
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
      <Link to="/txs" className="text-sepolia-blue mt-2 block">
        View All Transactions →
      </Link>
    </div>
  );
}
