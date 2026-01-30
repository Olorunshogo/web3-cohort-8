import { useState, useEffect, type JSX } from 'react';
import LatestBlocks from '../components/ui/LatestBlocks';
import LatestTransactions from '../components/ui/LatestTransactions';
import { useEthPrice, useGasPrice } from '../hooks/useSepolia';
import { weiToEth } from '../utils/formatters';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';


export default function Home(): JSX.Element {
  const {
    data: ethPrice,
    isLoading: ethPriceLoading,
    error: ethPriceError,
  } = useEthPrice();

  const {
    data: gasPrice,
    isLoading: gasPriceLoading,
    error: gasPriceError,
  } = useGasPrice();

  // const [ethPrice, setPrice] = useState<number | null>(null);
  // const [ethPriceLoading, setPriceLoading] = useState<boolean>(true);
  // const [ethPriceError, setPriceError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch(
  //     'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
  //   )
  //     .then((res: Response) => res.json() as Promise<EthPriceResponse>)
  //     .then((data: EthPriceResponse) => setPrice(data.ethereum.usd))
  //     .catch((err: Error) => setPriceError(err.message))
  //     .finally(() => setPriceLoading(false));
  // }, []);

  return (
    <div className="container p-4 mx-auto">
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
        {/* Eth Price */}
        <div className="p-4 rounded-lg bg-sepolia-dark">
          <h3 className="font-bold">ETH Price</h3>
          {ethPriceLoading ? (
            <LoadingSpinner />
          ) : ethPriceError ? (
            <ErrorMessage message={ethPriceError} />
          ) : (
            <p>${ethPrice?.toFixed(2)}</p>
          )}
        </div>

        {/* Gas Price */}
        <div className="p-4 rounded-lg bg-sepolia-dark">
          <h3 className="font-bold">Gas Price</h3>
          {gasPriceLoading ? (
            <LoadingSpinner />
          ) : gasPriceError ? (
            <ErrorMessage message={gasPriceError} />
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
