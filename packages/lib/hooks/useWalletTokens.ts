import { useEffect, useState } from 'react';
import { WalletToken } from '../domain/entities/wallet';
import { diContainer } from '../infrastructure/config/di-container';

export const useWalletTokens = (wallet: string, chain: string = 'ronin', limit: number = 25) => {
  const [tokens, setTokens] = useState<WalletToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!wallet) {
      setTokens([]);
      return;
    }

    const fetchTokens = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const walletService = diContainer.getWalletService();
        const data = await walletService.getWalletTokens({ wallet, chain, limit });
        setTokens(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setTokens([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, [wallet, chain, limit]);

  return { tokens, loading, error };
};