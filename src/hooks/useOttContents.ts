import { useState, useEffect } from 'react';
import { getOttContents } from '../api/ottServices';
import type { OttContent } from '../api/ottServices';

export const useOttContents = () => {
  const [data, setData] = useState<OttContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const contents = await getOttContents();
        setData(contents);
      } catch (err) {
        setError('Failed to fetch OTT contents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return { data, loading, error };
};
