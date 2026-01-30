import { useState, useEffect } from 'react';
import type { RpcBlock, RpcTransaction, RpcTransactionReceipt } from '../types/types';
import {
  getGasPrice,
  getRecentBlocks,
  getRecentTransactions,
  getBlockByNumber,
  getTransactionByHash,
  getTransactionReceipt,
} from '../services/rpc';

export function useEthPrice() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getEthPrice()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useGasPrice() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getGasPrice()
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useRecentBlocks(count: number = 10) {
  const [data, setData] = useState<RpcBlock[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getRecentBlocks(count)
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [count]);

  return { data, loading, error };
}

export function useRecentTransactions(count: number = 10) {
  const [data, setData] = useState<RpcTransaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getRecentTransactions(count)
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [count]);

  return { data, loading, error };
}

export function useBlock(blockNumber: number) {
  const [data, setData] = useState<RpcBlock | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getBlockByNumber(blockNumber, true)
      .then(setData)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [blockNumber]);

  return { data, loading, error };
}

export function useTransaction(txHash: string) {
  const [tx, setTx] = useState<RpcTransaction | null>(null);
  const [receipt, setReceipt] = useState<RpcTransactionReceipt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!txHash) return;
    setLoading(true);
    setError(null);
    Promise.all([getTransactionByHash(txHash), getTransactionReceipt(txHash)])
      .then(([txData, receiptData]) => {
        setTx(txData);
        setReceipt(receiptData);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [txHash]);

  return { tx, receipt, loading, error };
}




// Use Recent Block
// export function useRecentBlocks(count = 10) {
//   return useQuery<RpcBlock[], Error>({
//     queryKey: ['recentBlocks', count],
//     queryFn: () => getRecentBlocks(count),
//   });
// }

// Use Recent Transaction
// export function useRecentTransactions(count = 10) {
//   return useQuery<RpcTransaction[], Error>({
//     queryKey: ['recentTransactions', count],
//     queryFn: () => getRecentTransactions(count),
//   });
// }

// Use Block
// export function useBlock(blockNumber: number) {
//   return useQuery<RpcBlock, Error>({
//     queryKey: ['block', blockNumber],
//     queryFn: () => getBlockByNumber(blockNumber, true),
//     enabled: Number.isFinite(blockNumber),
//   });
// }

// Use Transactions
// import { useQuery } from '@tanstack/react-query';
// import type { RpcTransaction, RpcTransactionReceipt } from '../types/types';
// import { getTransactionByHash, getTransactionReceipt } from '../services/rpc';

// type TransactionData = {
//   tx: RpcTransaction;
//   receipt: RpcTransactionReceipt;
// };

// export function useTransaction(txHash: string) {
//   return useQuery<TransactionData, Error>({
//     queryKey: ['transaction', txHash],
//     queryFn: async () => {
//       const [tx, receipt] = await Promise.all([
//         getTransactionByHash(txHash),
//         getTransactionReceipt(txHash),
//       ]);

//       return { tx, receipt };
//     },
//     enabled: !!txHash,
//   });
// }

// Use Gas Price
// export function useGasPrice() {
//   return useQuery<string, Error>({
//     queryKey: ['gasPrice'],
//     queryFn: getGasPrice,
//     refetchInterval: 10_000, // auto-refresh every 10s (perfect for gas)
//   });
// }





