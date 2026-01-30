import { useState, useEffect } from 'react';
import type { RpcBlock, RpcTransaction, RpcTransactionReceipt } from '../types/types';
import {
  getRecentBlocks,
  getRecentTransactions,
  getBlockByNumber,
  getGasPrice,
  getTransactionByHash,
  getTransactionReceipt,
} from '../services/rpc';
// import type {
//   RpcBlock,
//   RpcTransaction,
//   RpcTransactionReceipt,
// } from '../types/transaction'; // Wait, transaction.ts has RpcTransaction; block.ts has RpcBlock. Fix: import from both.
// import type { RpcBlock } from '../types/block';
// import type {
//   RpcTransaction,
//   RpcTransactionReceipt,
// } from '../types/transaction';

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
