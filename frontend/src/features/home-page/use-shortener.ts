import { useState } from 'react';
import { shortenUrl } from './api';

export const useShortener = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const shorten = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      return await shortenUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { shorten, loading, error };
};
