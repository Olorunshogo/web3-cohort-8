import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useBlock } from '../hooks/useSepolia';
import {
  shortenHash,
  formatTimestamp,
  hexToNumber,
  weiToEth,
} from '../utils/formatters';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import type { RpcTransaction } from '../types/types';
import type { JSX } from 'react';

export default function BlockDetail(): JSX.Element {
  const { blockNumber } = useParams<{ blockNumber?: string }>();
  const num = blockNumber ? parseInt(blockNumber, 10) : 0;
  const { data, loading, error } = useBlock(num);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <ErrorMessage message="Block not found" />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Block #{hexToNumber(data.number)}
      </h1>
      <div className="bg-sepolia-dark p-4 rounded-lg mb-4">
        <p>
          <strong>Hash:</strong> {data.hash}
        </p>
        <p>
          <strong>Parent Hash:</strong> {data.parentHash}
        </p>
        <p>
          <strong>Timestamp:</strong> {formatTimestamp(data.timestamp)}
        </p>
        <p>
          <strong>Miner:</strong> {shortenHash(data.miner)}
        </p>
        <p>
          <strong>Gas Used / Limit:</strong> {weiToEth(data.gasUsed)} /{' '}
          {weiToEth(data.gasLimit)}
        </p>
      </div>
      <h2 className="text-lg font-bold mb-2">Transactions</h2>
      <table className="w-full text-sm bg-sepolia-dark rounded-lg">
        <tbody>
          {(data.transactions as RpcTransaction[]).map((tx: RpcTransaction) => (
            <tr key={tx.hash} className="border-b border-gray-700">
              <td className="py-2 px-4">
                <Link to={`/tx/${tx.hash}`} className="text-sepolia-blue">
                  {shortenHash(tx.hash)}
                </Link>
              </td>
              <td className="py-2 px-4">From {shortenHash(tx.from)}</td>
              <td className="py-2 px-4">
                To {tx.to ? shortenHash(tx.to) : 'Contract'}
              </td>
              <td className="py-2 px-4">{weiToEth(tx.value)} ETH</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}