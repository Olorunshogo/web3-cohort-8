
import type { RpcBlock, RpcTransaction, RpcTransactionReceipt } from "../types/types";


const SEPOLIA_RPC = 'https://ethereum-sepolia-rpc.publicnode.com';

interface RpcRequest {
  jsonrpc: '2.0';
  method: string;
  params: unknown[];
  id: number;
}

interface RpcResponse<T> {
  jsonrpc: '2.0';
  id: number;
  result: T;
  error?: { code: number; message: string };
}

async function rpcPost<T>(method: string, params: unknown[] = []): Promise<T> {
  const payload: RpcRequest = {
    jsonrpc: '2.0',
    method,
    params,
    id: Date.now(),
  };

  const res = await fetch(SEPOLIA_RPC, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`RPC HTTP error: ${res.status}`);

  const json = (await res.json()) as RpcResponse<T>;
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);

  return json.result;
}

// eth_blockNumber: Returns latest block number (hex). Why? To fetch recent blocks by offsetting from head.
export async function getBlockNumber(): Promise<number> {
  const hex = await rpcPost<string>('eth_blockNumber');
  return parseInt(hex, 16);
}

// eth_getBlockByNumber: Fetches block by number/tag. fullTx=true includes tx objects (for details); false=hashes (faster for lists).
// Why? Core for block data; params: block tag/number (hex), fullTx boolean.
export async function getBlockByNumber(
  block: string | number,
  fullTx: boolean = false
): Promise<RpcBlock> {
  const blockParam =
    typeof block === 'number' ? `0x${block.toString(16)}` : block;
  return rpcPost<RpcBlock>('eth_getBlockByNumber', [blockParam, fullTx]);
}

// eth_getTransactionByHash: Fetches tx by hash. Why? For tx details; includes value, input, etc.
export async function getTransactionByHash(
  hash: string
): Promise<RpcTransaction> {
  return rpcPost<RpcTransaction>('eth_getTransactionByHash', [hash]);
}

// eth_getTransactionReceipt: Fetches receipt for status/gas. Why? Supplements tx; status not in eth_getTransactionByHash.
export async function getTransactionReceipt(
  hash: string
): Promise<RpcTransactionReceipt> {
  return rpcPost<RpcTransactionReceipt>('eth_getTransactionReceipt', [hash]);
}

// eth_gasPrice: Current gas price (hex wei). Why? Shows network fee; for homepage stats.
export async function getGasPrice(): Promise<string> {
  return rpcPost<string>('eth_gasPrice');
}

// Helper: Recent blocks via loop. Why? No batch RPC for this; sequential but simple.
export async function getRecentBlocks(count: number = 10): Promise<RpcBlock[]> {
  const latest = await getBlockNumber();
  const blocks: RpcBlock[] = [];
  for (let i = 0; i < count; i++) {
    const block = await getBlockByNumber(latest - i, false);
    blocks.push(block);
  }
  return blocks;
}

// Helper: Recent txs from recent blocks. Why? Flatten tx hashes, fetch details; inefficient but RPC-pure.
export async function getRecentTransactions(
  count: number = 10
): Promise<RpcTransaction[]> {
  const recentBlocks = await getRecentBlocks(5);
  const txHashes: string[] = recentBlocks.flatMap(
    (b) => b.transactions as string[]
  );
  const recentTxHashes = txHashes.slice(0, count);
  const txs: RpcTransaction[] = [];
  for (const hash of recentTxHashes) {
    const tx = await getTransactionByHash(hash);
    txs.push(tx);
  }
  return txs;
}