import { useState, useEffect, type JSX } from 'react';
import LatestBlocks from './LatestBlocks';
import LatestTransactions from '../components/LatestTransaction';
import { useGasPrice } from '../hooks/useSepolia';
import { weiToEth } from '../utils/formatters';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

interface EthPriceResponse {
  ethereum: {
    usd: number;
  };
}

export default function Home(): JSX.Element {
  const {
    data: gasPrice,
    loading: gasLoading,
    error: gasError,
  } = useGasPrice();
  const [price, setPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState<boolean>(true);
  const [priceError, setPriceError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    )
      .then((res: Response) => res.json() as Promise<EthPriceResponse>)
      .then((data: EthPriceResponse) => setPrice(data.ethereum.usd))
      .catch((err: Error) => setPriceError(err.message))
      .finally(() => setPriceLoading(false));
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
        <div className="p-4 rounded-lg bg-sepolia-dark">
          <h3 className="font-bold">ETH Price</h3>
          {priceLoading ? (
            <LoadingSpinner />
          ) : priceError ? (
            <ErrorMessage message={priceError} />
          ) : (
            <p>${price?.toFixed(2)}</p>
          )}
        </div>
        <div className="p-4 rounded-lg bg-sepolia-dark">
          <h3 className="font-bold">Gas Price</h3>
          {gasLoading ? (
            <LoadingSpinner />
          ) : gasError ? (
            <ErrorMessage message={gasError} />
          ) : (
            <p>{weiToEth(gasPrice || '0')} Gwei</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 p-4 ga lg:grid-cols-2">
        <LatestBlocks />
        <LatestTransactions />
      </div>
    </div>
  );
}
