import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useRecentBlocks } from '../../hooks/useSepolia';
import { shortenHash, formatTimestamp, hexToNumber } from '../../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import type { RpcBlock } from '../../types/types';

export default function LatestBlocks(): JSX.Element {
  const { data, loading, error } = useRecentBlocks(10);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="bg-sepolia-dark p-4 rounded-lg">
      <h2 className="text-lg font-bold mb-2">Latest Blocks</h2>
      <table className="w-full text-sm">
        <tbody>
          {data?.map((block: RpcBlock) => (
            <tr key={block.hash} className="border-b border-gray-700">
              <td className="py-2">
                <Link
                  to={`/block/${hexToNumber(block.number)}`}
                  className="text-sepolia-blue"
                >
                  {hexToNumber(block.number)}
                </Link>
              </td>
              <td>{formatTimestamp(block.timestamp)}</td>
              <td>{shortenHash(block.miner)}</td>
              <td>{(block.transactions as string[]).length} txns</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/blocks" className="text-sepolia-blue mt-2 block">
        View All Blocks →
      </Link>
    </div>
  );
}
