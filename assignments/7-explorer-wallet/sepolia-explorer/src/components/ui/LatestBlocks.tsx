import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useRecentBlocks } from '../../hooks/useSepolia';
import { shortenHash, formatTimestamp, hexToNumber } from '../../utils/formatters';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import type { RpcBlock } from '../../types/types';

export default function LatestBlocks(): JSX.Element {
  const { data, isLoading, error } = useRecentBlocks(10);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4 rounded-lg bg-sepolia-dark">
      <h2 className="mb-2 text-lg font-bold">Latest Blocks</h2>
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
      <Link to="/blocks" className="block mt-2 text-sepolia-blue">
        View All Blocks →
      </Link>
    </div>
  );
}
