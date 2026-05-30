import { useState, useEffect } from 'react';
import { getKidsContents } from '../api/kidsServices';
import type { KidsContent } from '../api/kidsServices';

export const useKidsContents = () => {
  const [data, setData] = useState<KidsContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const contents = await getKidsContents();
        setData(contents);
      } catch (err) {
        setError('Failed to fetch Kids contents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return { data, loading, error };
};
