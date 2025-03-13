import { useState } from 'react';

interface UseLoadCharacterResult {
  loadCharacter: () => Promise<any>;
  isLoading: boolean;
  error: string | null;
}

const useLoadCharacter = (): UseLoadCharacterResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/cn505240/character';

  const loadCharacter = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while loading');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loadCharacter,
    isLoading,
    error
  };
};

export default useLoadCharacter;
