import { useState } from 'react';

interface UseSaveCharacterResult {
  saveCharacter: (data: any) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useSaveCharacter = (): UseSaveCharacterResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/cn505240/character';

  const saveCharacter = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveCharacter,
    isLoading,
    error
  };
};

export default useSaveCharacter;
